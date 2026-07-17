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
      description: 'Наприклад: Dariia Beliaieva',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Посада / Позиція',
      type: 'string',
      description: 'Наприклад: President, Communication Manager',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Категорія / Розділ борду',
      type: 'string',
      description: 'Оберіть групу, в якій відображатиметься картка на сторінці',
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
      description: 'Число для сортування всередині категорії (1, 2, 3...)',
      initialValue: 10,
    }),
    defineField({
      name: 'image',
      title: 'Фотографія (продовгувата / вертикальна 4:5)',
      type: 'image',
      options: { hotspot: true, accept: ACCEPTED_IMAGE_TYPES },
      description: 'Рекомендується завантажувати вертикальне / продовгувате зображення борду (співвідношення 4:5 або 3:4). Ліміти Sanity Free: макс. 2 МБ, формати JPG/PNG/WebP. Обов\'язково стискайте фото (наприклад, через tinypng.com або squoosh.app)!',
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
    defineField({
      name: 'description',
      title: 'Опис (відкривається при натисканні на фото)',
      type: 'text',
      rows: 4,
      description: 'Детальна інформація про людину або позицію, яка буде відображатися при відкритті фото зблизька в модальному вікні.',
    }),
    defineField({
      name: 'section',
      title: 'Секція ESN',
      type: 'string',
      description: 'Наприклад: ESN Kyiv, ESN Lviv',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
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
