import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'news',
  title: 'Новини',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок новини',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(150),
    }),
    defineField({
      name: 'slug',
      title: 'Посилання (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      description: 'Це частина URL адреси. Натисни "Generate", щоб створити автоматично.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Дата та час публікації',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Прев\'ю зображення (для карточки)',
      type: 'image',
      options: { hotspot: true },
      description: 'Це фото буде показано у карточці новини на сторінці "News".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Короткий опис (Summary)',
      type: 'text',
      rows: 3,
      description: 'Кілька речень для прев\'ю на сторінці новин та у карточці.',
      validation: (rule) => rule.required().min(10).max(300),
    }),
    defineField({
      name: 'body',
      title: 'Текст статті',
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
          ],
        },
      ],
      description: 'Основний текст статті. Можна вставляти фото між абзацами.',
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
      description: 'Додаткові фото, які будуть відображені як галерея під статтею.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
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