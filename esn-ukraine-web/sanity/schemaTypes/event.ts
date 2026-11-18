import { defineField, defineType } from 'sanity'
import { formatDate } from '../lib/utils'
import { ACCEPTED_FILE_TYPES, ACCEPTED_IMAGE_TYPES, validateFileSize, validateImageSize } from '../lib/imageValidation'

export default defineType({
  name: 'event',
  title: 'Події (Events)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва події',
      type: 'string',
      description: 'Назва події англійською, як її побачать відвідувачі: на картці події, на сторінці події та в Google. Від 5 до 150 символів.',
      validation: (rule) => rule.required().min(5).max(150),
    }),
    defineField({
      name: 'slug',
      title: 'Посилання (Slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
      description: 'Кінець адреси сторінки: esnukraine.org/events/ваш-slug. Натисніть «Generate», щоб створити його з назви. Лише малі латинські літери, цифри та дефіси, без апострофів і пробілів. Не змінюйте slug після публікації: старе посилання перестане працювати.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Дата та час створення',
      type: 'datetime',
      description: 'Службова дата: коли подію додали на сайт. Відвідувачі її не бачать, вона потрібна для Google. Заповнюється автоматично, змінювати не потрібно.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Короткий опис (Summary)',
      type: 'text',
      rows: 3,
      description: '1–3 речення про подію (від 10 до 300 символів). Показується на картці події, під назвою на сторінці події і в описі для Google та соцмереж.',
      validation: (rule) => rule.required().min(10).max(300),
    }),
    defineField({
      name: 'date',
      title: 'Дата проведення',
      type: 'datetime',
      description: 'Коли відбулася подія. Показується на картці й на сторінці події, за нею впорядкований список Past Events. Подія зʼявляється на сайті лише після настання цієї дати (оновлення може зайняти до доби). Анонси майбутніх подій додавайте в «Майбутні події».',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Місце проведення',
      type: 'string',
      description: 'Місто або «Online». Наприклад: Kyiv. Показується на картці події.',
    }),
    defineField({
      name: 'registrationLink',
      title: 'Посилання на реєстрацію (Google Form)',
      type: 'url',
      description: 'Необовʼязково. Посилання на форму реєстрації, що починається з https://. Якщо заповнено, на сторінці події зʼявиться кнопка «Register».',
    }),
    defineField({
      name: 'mainImage',
      title: 'Прев\'ю зображення (для карточки)',
      type: 'image',
      options: { hotspot: true, accept: ACCEPTED_IMAGE_TYPES },
      description: 'Головне фото події. Показується на картці події (сторінка Events і головна) та праворуч від назви на сторінці події. На головній фото обрізається до вертикального формату, тож важливе має бути в центрі кадру. Макс. 12 МБ і 10000 px, формати JPG/PNG/WebP/AVIF. Рекомендуємо стискати фото перед завантаженням (tinypng.com або squoosh.app).',
      validation: (rule) => rule.required().custom(validateImageSize(12, 10000, 10000)),
    }),
    defineField({
      name: 'isSpotlight',
      title: 'Показувати в Spotlight на головній',
      type: 'boolean',
      description: 'Увімкніть, щоб подія зʼявилася у великому слайдері вгорі головної сторінки. У слайдері до 5 найновіших новин і подій з цією позначкою. Для слайда береться Банер, а якщо його немає — Превʼю зображення.',
      initialValue: false,
    }),
    defineField({
      name: 'bannerImage',
      title: 'Банер (задній фон)',
      type: 'image',
      options: { hotspot: true, accept: ACCEPTED_IMAGE_TYPES },
      description: 'Необовʼязково. Широке горизонтальне фото (найкраще 16:9) для слайдера на головній, якщо увімкнено Spotlight, і як ледь помітний фон за назвою на сторінці події. Якщо не додати, використовується Превʼю зображення. Макс. 12 МБ і 10000 px, формати JPG/PNG/WebP/AVIF.',
      validation: (rule) => rule.custom(validateImageSize(12, 10000, 10000)),
    }),
    defineField({
      name: 'body',
      title: 'Текст сторінки події',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Звичайний', value: 'normal' },
            { title: 'Великий вступ (Lead)', value: 'lead' },
            { title: 'Малий текст (Small)', value: 'small' },
            { title: 'Заголовок H2', value: 'h2' },
            { title: 'Заголовок H3', value: 'h3' },
            { title: 'Заголовок H4', value: 'h4' },
            { title: 'Цитата', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Жирний', value: 'strong' },
              { title: 'Курсив', value: 'em' },
              { title: 'Підкреслений', value: 'underline' },
              { title: 'Закреслений', value: 'strike-through' },
              { title: 'Код (Inline)', value: 'code' },
            ],
            annotations: [
              {
                name: 'textColor',
                type: 'object',
                title: 'Колір тексту',
                fields: [
                  {
                    name: 'color',
                    type: 'string',
                    title: 'Колір (HEX)',
                    options: {
                      list: [
                        { title: '#00AEEF (ESN Cyan)', value: '#00AEEF' },
                        { title: '#EC008C (ESN Magenta)', value: '#EC008C' },
                        { title: '#2E3192 (ESN Dark Blue)', value: '#2E3192' },
                        { title: '#7AC143 (ESN Green)', value: '#7AC143' },
                        { title: '#F47B20 (ESN Orange)', value: '#F47B20' },
                        { title: '#000000 (Чорний)', value: '#000000' },
                        { title: '#FFFFFF (Білий)', value: '#FFFFFF' },
                        { title: '#6B7280 (Сірий)', value: '#6B7280' },
                        { title: '#EF4444 (Червоний)', value: '#EF4444' },
                      ],
                    },
                  },
                ],
              },
              {
                name: 'textSize',
                type: 'object',
                title: 'Розмір тексту',
                fields: [
                  {
                    name: 'size',
                    type: 'string',
                    title: 'Розмір (px)',
                    options: {
                      list: [
                        { title: '12px', value: '12px' },
                        { title: '14px', value: '14px' },
                        { title: '16px', value: '16px' },
                        { title: '18px', value: '18px' },
                        { title: '20px', value: '20px' },
                        { title: '24px', value: '24px' },
                        { title: '30px', value: '30px' },
                        { title: '36px', value: '36px' },
                        { title: '48px', value: '48px' },
                        { title: '60px', value: '60px' },
                        { title: '72px', value: '72px' },
                      ],
                    },
                  },
                ],
              },
              {
                name: 'link',
                type: 'object',
                title: 'Посилання',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    description: 'Повна адреса з https:// (наприклад, https://esn.org), сторінка цього сайту (наприклад, /news) або email у форматі mailto:name@esn.org.',
                    validation: (rule) =>
                      rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'object',
          name: 'divider',
          title: 'Розділювач (Лінія)',
          fields: [
            defineField({
              name: 'style',
              type: 'string',
              title: 'Стиль',
              options: {
                list: [
                  { title: 'Звичайна лінія', value: 'solid' },
                  { title: 'Пунктирна лінія', value: 'dashed' },
                ],
              },
              initialValue: 'solid',
            }),
          ],
        },
        {
          type: 'image',
          title: 'Фото у тексті',
          options: { hotspot: true, accept: ACCEPTED_IMAGE_TYPES },
          validation: (rule) => rule.custom(validateImageSize(2, 10000, 10000)),
          fields: [
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Підпис до фото',
              description: 'Необовʼязково. Текст, який показується під фото.',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt текст',
              description: 'Коротко, що на фото: для незрячих відвідувачів і Google. Наприклад: «Волонтери ESN Kyiv на Welcome Week».',
            }),
            defineField({
              name: 'width',
              type: 'string',
              title: 'Ширина фото',
              description: 'Яку частину ширини тексту займає фото. 100% — на всю ширину.',
              options: {
                list: [
                  { title: '25%', value: '25' },
                  { title: '33%', value: '33' },
                  { title: '50%', value: '50' },
                  { title: '66%', value: '66' },
                  { title: '75%', value: '75' },
                  { title: '100% (на всю ширину)', value: '100' },
                ],
                layout: 'radio',
              },
              initialValue: '100',
            }),
            defineField({
              name: 'alignment',
              type: 'string',
              title: 'Розташування',
              description: 'Ліворуч / по центру / праворуч. При виборі ліворуч або праворуч текст обтікає фото.',
              options: {
                list: [
                  { title: '← Ліворуч (текст обтікає справа)', value: 'left' },
                  { title: 'По центру', value: 'center' },
                  { title: 'Праворуч (текст обтікає зліва) →', value: 'right' },
                ],
                layout: 'radio',
              },
              initialValue: 'center',
            }),
            defineField({
              name: 'rounded',
              type: 'boolean',
              title: 'Закруглені кути',
              description: 'Увімкнути закруглення кутів фото.',
              initialValue: true,
            }),
          ],
        },
        {
          type: 'object',
          name: 'imageGallery',
          title: 'Кілька фото в ряд',
          fields: [
            defineField({
              name: 'images',
              type: 'array',
              title: 'Фотографії',
              description: 'Від 2 до 6 фото, до 2 МБ кожне.',
              of: [
                {
                  type: 'image',
                  options: { hotspot: true, accept: ACCEPTED_IMAGE_TYPES },
                  validation: (rule) => rule.custom(validateImageSize(2, 10000, 10000)),
                  fields: [
                    defineField({
                      name: 'caption',
                      type: 'string',
                      title: 'Підпис',
                      description: 'Необовʼязково. Текст унизу поверх фото.',
                    }),
                    defineField({
                      name: 'alt',
                      type: 'string',
                      title: 'Alt текст',
                      description: 'Коротко, що на фото: для незрячих відвідувачів і Google.',
                    }),
                  ],
                },
              ],
              validation: (rule) => rule.min(2).max(6),
            }),
            defineField({
              name: 'columns',
              type: 'number',
              title: 'Кількість колонок',
              description: 'Скільки фото в ряд на компʼютері. На телефоні завжди 2 в ряд.',
              options: {
                list: [
                  { title: '2 в ряд', value: 2 },
                  { title: '3 в ряд', value: 3 },
                  { title: '4 в ряд', value: 4 },
                ],
              },
              initialValue: 2,
            }),
            defineField({
              name: 'rounded',
              type: 'boolean',
              title: 'Закруглені кути',
              description: 'Увімкнути закруглення кутів фото у галереї.',
              initialValue: false,
            }),
            defineField({
              name: 'gap',
              type: 'string',
              title: 'Відстань між фото',
              options: {
                list: [
                  { title: 'Без відстані', value: 'none' },
                  { title: 'Маленька', value: 'small' },
                  { title: 'Середня', value: 'medium' },
                  { title: 'Велика', value: 'large' },
                ],
              },
              initialValue: 'medium',
            }),
          ],
          preview: {
            select: { images: 'images', columns: 'columns' },
            prepare({ images, columns }) {
              return {
                title: `Галерея: ${images?.length || 0} фото, ${columns || 2} в ряд`,
              }
            },
          },
        },
      ],
      description: 'Основний текст сторінки події. Тут можна додати заголовки, списки, посилання, фото між абзацами («Фото у тексті»), кілька фото в ряд і лінію-розділювач.',
    }),
    defineField({
      name: 'attachmentFiles',
      title: 'Прикріплені файли (Attachment Files)',
      type: 'array',
      of: [
        {
          type: 'file',
          title: 'Файл',
          options: { accept: ACCEPTED_FILE_TYPES },
          validation: (rule) => rule.custom(validateFileSize(10)),
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Назва файлу (для відображення на сайті)',
              description: 'Як файл називатиметься на сайті. Наприклад: «Положення про конкурс» або «Програма заходу». Якщо залишити порожнім, буде показано імʼя файлу.',
            }),
            defineField({
              name: 'description',
              type: 'string',
              title: 'Короткий опис файлу',
              // Сайт цей текст не показує, тому поле приховане. Уже введені дані зберігаються.
              hidden: true,
            }),
          ],
        },
      ],
      description: 'Необовʼязково. Документи (PDF, Word, Excel, PowerPoint), які відвідувачі зможуть переглянути й завантажити. Показуються під текстом сторінки події, перед фотогалереєю. До 10 МБ на файл.',
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          title: 'Фото',
          options: { hotspot: true, accept: ACCEPTED_IMAGE_TYPES },
          validation: (rule) => rule.custom(validateImageSize(2, 10000, 10000)),
          fields: [
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Підпис',
              description: 'Необовʼязково. Текст, який видно під час перегляду фото на весь екран.',
            }),
          ],
        },
      ],
      description: 'Необовʼязково. Фото, які показуються сіткою внизу сторінки події. Клік відкриває фото на весь екран. До 2 МБ і 10000 px на фото.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? formatDate(subtitle) : 'Без дати',
        media,
      }
    },
  },
})