import { defineField, defineType } from 'sanity'
import { ACCEPTED_IMAGE_TYPES, validateImageSize } from '../lib/imageValidation'

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
      name: 'city',
      title: 'Місто секції',
      type: 'string',
      description: 'Наприклад: Kyiv, Lviv, Odesa',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Логотип секції',
      type: 'image',
      options: { hotspot: true, accept: ACCEPTED_IMAGE_TYPES },
      description: 'Логотип або фото секції для карточки. Ліміти Sanity Free: макс. 2 МБ, формати JPG/PNG/WebP. Рекомендуємо стискати фото перед завантаженням.',
      validation: (rule) => rule.required().custom(validateImageSize(2, 3000, 3000)),
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
      name: 'instagram',
      title: 'Instagram сторінка (обов\'язково)',
      type: 'url',
      description: 'Посилання на Instagram секції. Відкривається при кліку на кнопку "Read More".',
      validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
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