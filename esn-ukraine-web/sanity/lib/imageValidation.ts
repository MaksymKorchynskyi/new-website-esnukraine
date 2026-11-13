import type { CustomValidator } from 'sanity'

/** Image formats editors may upload (heavy uncompressed formats such as TIFF/BMP/PSD are rejected). */
export const ALLOWED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'avif'] as const

/**
 * Дозволені формати для завантаження зображень у Sanity Studio (атрибут `accept`).
 */
export const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/webp,image/avif'

/**
 * Дозволені формати для завантаження прикріплених документів.
 */
export const ACCEPTED_FILE_TYPES = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'

/** Максимальна роздільність за замовчуванням: Vercel/Sanity обробляють до 8192 px. */
const DEFAULT_MAX_DIMENSION = 6000

interface AssetValue {
  asset?: { _ref?: string } | null
}

interface ParsedAssetId {
  width: number
  height: number
  format: string
}

/** Sanity asset ids look like `image-<sha1>-<width>x<height>-<format>`. */
function parseImageRef(ref: string): ParsedAssetId | null {
  const match = ref.match(/^image-[a-f0-9]+-(\d+)x(\d+)-([a-z0-9]+)$/i)
  if (!match) return null
  return { width: parseInt(match[1], 10), height: parseInt(match[2], 10), format: match[3].toLowerCase() }
}

async function fetchAssetSize(
  context: Parameters<CustomValidator>[1],
  ref: string,
): Promise<number | null> {
  try {
    const client = context.getClient({ apiVersion: '2024-01-01' })
    const asset = await client.fetch<{ size?: number } | null>(`*[_id == $id][0]{ size }`, { id: ref })
    return asset && typeof asset.size === 'number' ? asset.size : null
  } catch (err) {
    // Мережева помилка під час перевірки в Studio: не блокуємо збереження
    console.error('Помилка валідації розміру асета:', err)
    return null
  }
}

/**
 * Валідатор для перевірки формату, ваги та роздільної здатності зображень.
 * Важливо: валідація виконується ПІСЛЯ завантаження, тобто відхилений файл уже
 * лежить у сховищі Sanity, і його треба видалити вручну.
 */
export function validateImageSize(
  maxSizeMB: number = 2,
  maxWidth: number = DEFAULT_MAX_DIMENSION,
  maxHeight: number = DEFAULT_MAX_DIMENSION,
): CustomValidator<AssetValue | undefined> {
  const widthLimit = maxWidth > 0 ? maxWidth : DEFAULT_MAX_DIMENSION
  const heightLimit = maxHeight > 0 ? maxHeight : DEFAULT_MAX_DIMENSION

  return async (value, context) => {
    const ref = typeof value?.asset?._ref === 'string' ? value.asset._ref : ''
    if (!ref) return true

    // 1. Формат і роздільна здатність з ID асета (без запиту до API)
    const parsed = parseImageRef(ref)
    if (parsed) {
      if (!(ALLOWED_IMAGE_FORMATS as readonly string[]).includes(parsed.format)) {
        return `Непідтримуваний формат зображення (${parsed.format.toUpperCase()}). Дозволено JPG, PNG, WebP, AVIF.`
      }
      if (parsed.width > widthLimit) {
        return `Ширина зображення (${parsed.width}px) перевищує максимально допустиму (${widthLimit}px). Будь ласка, зменшіть роздільну здатність фото перед завантаженням.`
      }
      if (parsed.height > heightLimit) {
        return `Висота зображення (${parsed.height}px) перевищує максимально допустиму (${heightLimit}px). Будь ласка, зменшіть роздільну здатність фото перед завантаженням.`
      }
    }

    // 2. Перевірка фактичної ваги файлу через Sanity Client
    const size = await fetchAssetSize(context, ref)
    if (size !== null) {
      const maxBytes = maxSizeMB * 1024 * 1024
      if (size > maxBytes) {
        const currentSizeMB = (size / (1024 * 1024)).toFixed(2)
        return `Розмір фото (${currentSizeMB} МБ) перевищує ліміт у ${maxSizeMB} МБ. Будь ласка, стисніть зображення (наприклад, через tinypng.com або squoosh.app) та завантажте знову.`
      }
    }

    return true
  }
}

/**
 * Попередження для PNG-фотографій понад 1 МБ: для фото JPEG/WebP у кілька разів легший.
 * Використовуйте з `.warning()`, щоб не блокувати збереження.
 */
export function warnLargePng(maxSizeMB: number = 1): CustomValidator<AssetValue | undefined> {
  return async (value, context) => {
    const ref = typeof value?.asset?._ref === 'string' ? value.asset._ref : ''
    if (!ref) return true
    const parsed = parseImageRef(ref)
    if (!parsed || parsed.format !== 'png') return true

    const size = await fetchAssetSize(context, ref)
    if (size !== null && size > maxSizeMB * 1024 * 1024) {
      return `PNG-фото понад ${maxSizeMB} МБ: конвертуйте у JPEG або WebP, щоб сторінка вантажилась швидше.`
    }
    return true
  }
}

/**
 * Валідатор для перевірки розміру прикріплених файлів (PDF, DOCX тощо).
 */
export function validateFileSize(maxSizeMB: number = 10): CustomValidator<AssetValue | undefined> {
  return async (value, context) => {
    const ref = typeof value?.asset?._ref === 'string' ? value.asset._ref : ''
    if (!ref) return true

    const size = await fetchAssetSize(context, ref)
    if (size !== null) {
      const maxBytes = maxSizeMB * 1024 * 1024
      if (size > maxBytes) {
        const currentSizeMB = (size / (1024 * 1024)).toFixed(2)
        return `Розмір файлу (${currentSizeMB} МБ) перевищує ліміт у ${maxSizeMB} МБ. Будь ласка, оптимізуйте файл перед завантаженням для економії місця на безкоштовному тарифі Sanity.`
      }
    }

    return true
  }
}
