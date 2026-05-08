import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Події (Events)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва події',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(150),
    }),
    defineField({
      name: 'slug',
      title: 'Посилання (Slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
      description: 'Це частина URL адреси. Натисни "Generate", щоб створити автоматично.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Дата та час створення',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Короткий опис (Summary)',
      type: 'text',
      rows: 3,
      description: 'Кілька речень для прев\'ю на сторінці подій та у карточці.',
      validation: (rule) => rule.required().min(10).max(300),
    }),
    defineField({
      name: 'category',
      title: 'Категорія',
      type: 'reference',
      to: [{ type: 'eventCategory' }],
      description: 'Опціонально. Оберіть категорію або створіть нову.',
    }),

    defineField({
      name: 'date',
      title: 'Дата проведення',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Місце проведення',
      type: 'string',
    }),
    defineField({
      name: 'registrationLink',
      title: 'Посилання на реєстрацію (Google Form)',
      type: 'url',
    }),
    defineField({
      name: 'mainImage',
      title: 'Прев\'ю зображення (для карточки)',
      type: 'image',
      options: { hotspot: true },
      description: 'Це фото буде показано у карточці події на сторінці "Events".',
      validation: (rule) => rule.required(),
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
                    validation: (rule) =>
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
              validation: (rule) => rule.min(2).max(6),
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
            prepare({ images, columns }) {
              return {
                title: `Галерея: ${images?.length || 0} фото, ${columns || 2} в ряд`,
              }
            },
          },
        },
      ],
      description: 'Основний текст сторінки події. Можна вставляти фото між абзацами.',
    }),
    defineField({
      name: 'gallery',
      title: 'Фотогалерея',
      type: 'array',
      of: [
        {
          type: 'image',
          title: 'Фото',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Підпис',
            }),
          ],
        },
      ],
      description: 'Додаткові фото, які будуть відображені як галерея під описом.',
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
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString('uk-UA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
          : 'Без дати',
        media,
      }
    },
  },
})