import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'section',
  title: 'Секції (ESN Sections)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Назва секції',
      type: 'string',
      description: 'Наприклад: ESN Kyiv',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
      description: 'Частина посилання, напр. esn-kyiv. Натисни "Generate".',
    }),
    defineField({
      name: 'summary',
      title: 'Короткий опис (для карточки)',
      type: 'text',
      rows: 3,
      description: 'Кілька речень, які будуть показані на карточці секції.',
      validation: (rule) => rule.required().min(10).max(300),
    }),
    defineField({
      name: 'mainImage',
      title: 'Логотип секції (прев\'ю)',
      type: 'image',
      options: { hotspot: true },
      description: 'Логотип або фото секції для карточки.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Повний опис секції (для окремої сторінки)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Звичайний', value: 'normal' },
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
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Посилання',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule: any) =>
                      rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          title: 'Фото у тексті',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Підпис до фото',
              description: 'Опціональний підпис під зображенням.',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt текст',
              description: 'Опис зображення для доступності.',
            }),
            defineField({
              name: 'width',
              type: 'string',
              title: 'Ширина фото',
              description: 'Яку частину ширини сторінки займає фото.',
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
              of: [
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    defineField({
                      name: 'caption',
                      type: 'string',
                      title: 'Підпис',
                    }),
                    defineField({
                      name: 'alt',
                      type: 'string',
                      title: 'Alt текст',
                    }),
                  ],
                },
              ],
              validation: (rule: any) => rule.min(2).max(6),
            }),
            defineField({
              name: 'columns',
              type: 'number',
              title: 'Кількість колонок',
              description: 'Скільки фото показувати в ряд.',
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
            prepare({ images, columns }: { images?: any[]; columns?: number }) {
              return {
                title: `Галерея: ${images?.length || 0} фото, ${columns || 2} в ряд`,
              }
            },
          },
        },
      ],
      description: 'Текст і фото для повної сторінки секції.',
    }),
    defineField({
      name: 'city',
      title: 'Місто секції',
      type: 'string',
      description: 'Обов\'язкове поле. Наприклад: Kyiv, Lviv, Odesa.',
      validation: (rule) => rule.required(),
    }),

    // ==========================================
    // СОЦІАЛЬНІ МЕРЕЖІ
    // ==========================================
    defineField({
      name: 'instagram',
      title: 'Instagram (обов\'язково)',
      type: 'url',
      description: 'Посилання на Instagram секції. Показується на карточці.',
      validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'email',
      title: 'Email секції (обов\'язково)',
      type: 'string',
      description: 'Електронна пошта секції. Показується на карточці.',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
      description: 'Посилання на Facebook (необов\'язково).',
    }),
    defineField({
      name: 'telegram',
      title: 'Telegram',
      type: 'url',
      description: 'Посилання на Telegram канал (необов\'язково).',
    }),
    defineField({
      name: 'twitter',
      title: 'X (Twitter)',
      type: 'url',
      description: 'Посилання на X / Twitter (необов\'язково).',
    }),
    defineField({
      name: 'linktree',
      title: 'Linktree',
      type: 'url',
      description: 'Посилання на Linktree (необов\'язково).',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube',
      type: 'url',
      description: 'Посилання на YouTube канал (необов\'язково).',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      description: 'Посилання на LinkedIn (необов\'язково).',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'city',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `📍 ${subtitle}` : '',
        media,
      }
    },
  },
})