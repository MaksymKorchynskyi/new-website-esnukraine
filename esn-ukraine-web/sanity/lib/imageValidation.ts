import { CustomValidator } from 'sanity'

/**
 * Дозволені формати для завантаження зображень у Sanity Studio.
 * Відсікає важкі нестиснені формати (TIFF, BMP, PSD, RAW тощо).
 */
export const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/webp'

/**
 * Дозволені формати для завантаження прикріплених документів.
 */
export const ACCEPTED_FILE_TYPES = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'

/**
 * Валідатор для перевірки розміру та роздільної здатності зображень.
 * Допомагає вкладатися в ліміти безкоштовного тарифу Sanity (Free Tier).
 */
export function validateImageSize(
  maxSizeMB: number = 2,
  maxWidth: number = 3500,
  maxHeight: number = 3500
): CustomValidator {
  return async (value: any, context) => {
    if (!value || !value.asset || !value.asset._ref) {
      return true
    }

    const ref = typeof value.asset._ref === 'string' ? value.asset._ref : ''
    if (!ref) return true

    // 1. Швидка перевірка роздільної здатності через ID асета (_ref: image-id-widthxheight-format)
    const match = ref.match(/^image-[a-f0-9]+-(\d+)x(\d+)-([a-z0-9]+)$/i)
    if (match) {
      const width = parseInt(match[1], 10)
      const height = parseInt(match[2], 10)
      if (maxWidth && width > maxWidth) {
        return `Ширина зображення (${width}px) перевищує максимально допустиму (${maxWidth}px). Будь ласка, зменшіть роздільну здатність фото перед завантаженням для економії лімітів Sanity.`
      }
      if (maxHeight && height > maxHeight) {
        return `Висота зображення (${height}px) перевищує максимально допустиму (${maxHeight}px). Будь ласка, зменшіть роздільну здатність фото перед завантаженням для економії лімітів Sanity.`
      }
    }

    // 2. Перевірка фактичної ваги файлу через Sanity Client
    try {
      const client = context.getClient({ apiVersion: '2024-01-01' })
      const asset = await client.fetch(
        `*[_id == $id][0]{ size }`,
        { id: ref }
      )
      if (asset && typeof asset.size === 'number') {
        const maxBytes = maxSizeMB * 1024 * 1024
        if (asset.size > maxBytes) {
          const currentSizeMB = (asset.size / (1024 * 1024)).toFixed(2)
          return `Розмір фото (${currentSizeMB} МБ) перевищує ліміт у ${maxSizeMB} МБ для безкоштовного тарифу Sanity. Будь ласка, стисніть зображення (наприклад, через tinypng.com або squoosh.app) та завантажте знову.`
        }
      }
    } catch (err) {
      // Якщо виникла помилка мережі при перевірці в студії, не блокуємо збереження
      console.error('Помилка валідації розміру асета:', err)
    }

    return true
  }
}

/**
 * Валідатор для перевірки розміру прикріплених файлів (PDF, DOCX тощо).
 */
export function validateFileSize(maxSizeMB: number = 5): CustomValidator {
  return async (value: any, context) => {
    if (!value || !value.asset || !value.asset._ref) {
      return true
    }

    const ref = typeof value.asset._ref === 'string' ? value.asset._ref : ''
    if (!ref) return true

    try {
      const client = context.getClient({ apiVersion: '2024-01-01' })
      const asset = await client.fetch(
        `*[_id == $id][0]{ size }`,
        { id: ref }
      )
      if (asset && typeof asset.size === 'number') {
        const maxBytes = maxSizeMB * 1024 * 1024
        if (asset.size > maxBytes) {
          const currentSizeMB = (asset.size / (1024 * 1024)).toFixed(2)
          return `Розмір файлу (${currentSizeMB} МБ) перевищує ліміт у ${maxSizeMB} МБ. Будь ласка, оптимізуйте файл перед завантаженням для економії місця на безкоштовному тарифі Sanity.`
        }
      }
    } catch (err) {
      console.error('Помилка валідації розміру файлу:', err)
    }

    return true
  }
}
