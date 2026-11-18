import { defineField, defineType } from 'sanity'
import { ACCEPTED_IMAGE_TYPES, validateImageSize } from '../lib/imageValidation'

export default defineType({
  name: 'boardMember',
  title: 'Члени борду (National Board)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ім\'я та прізвище (або назва)',
      type: 'string',
      description: 'Імʼя та прізвище латиницею, наприклад: Dariia Beliaieva. Показується, коли відвідувач відкриває фото.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Посада / Позиція',
      type: 'string',
      description: 'Посада англійською, наприклад: President, Communication Manager. Показується поруч з імʼям на збільшеному фото.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Категорія / Розділ борду',
      type: 'string',
      description: 'Блок на сторінці National Board, у якому буде картка.',
      options: {
        list: [
          { title: 'The Board 2025-26', value: 'board' },
          { title: 'The Board Support 2025-26', value: 'support' },
          { title: 'The Audit Board & Advisory Council', value: 'audit' },
        ],
      },
      initialValue: 'board',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Порядковий номер',
      type: 'number',
      description: 'Порядок картки всередині блоку: 1 — перша. Картки з однаковим числом сортуються за імʼям.',
      initialValue: 10,
    }),
    defineField({
      name: 'image',
      title: 'Фотографія (продовгувата / вертикальна 4:5)',
      type: 'image',
      options: { hotspot: true, accept: ACCEPTED_IMAGE_TYPES },
      description: 'Вертикальне фото 4:5 (наприклад, 1200×1500 px). На сайті картка має формат 4:5: довше фото обрізається знизу. Макс. 2 МБ і 3000×3500 px, формати JPG/PNG/WebP/AVIF. Стискайте фото перед завантаженням (tinypng.com або squoosh.app).',
      validation: (rule) => rule.required().custom(validateImageSize(2, 3000, 3500)),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Альтернативний текст (Alt опис під фото)',
          description: 'Опис фото (наприклад: назва людини та посада) для SEO та доступності',
          validation: (rule) => rule.required(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image',
    },
  },
})
