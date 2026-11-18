import { defineField, defineType } from 'sanity'
import { ACCEPTED_IMAGE_TYPES, validateImageSize } from '../lib/imageValidation'

export default defineType({
  name: 'section',
  title: 'Секції (ESN Sections)',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Порядковий номер (Order)',
      type: 'number',
      description: 'Число для сортування (наприклад: 1, 2, 3...). Секції з меншим числом відображатимуться першими на сайті.',
      initialValue: 10,
    }),
    defineField({
      name: 'name',
      title: 'Назва секції',
      type: 'string',
      description: 'Повна назва секції, як вона показується на картці. Наприклад: ESN Kyiv.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'Місто секції',
      type: 'string',
      description: 'Місто англійською, наприклад: Kyiv, Lviv, Odesa. Використовується для прямого посилання на картку секції: esnukraine.org/our-sections#kyiv.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Логотип секції',
      type: 'image',
      options: { hotspot: true, accept: ACCEPTED_IMAGE_TYPES },
      description: 'Логотип секції для картки на сторінці Our Sections. Найкраще PNG з прозорим фоном. Макс. 2 МБ і 3000 px, формати JPG/PNG/WebP/AVIF.',
      validation: (rule) => rule.required().custom(validateImageSize(2, 3000, 3000)),
    }),
    defineField({
      name: 'summary',
      title: 'Короткий опис (для карточки)',
      type: 'text',
      rows: 3,
      description: 'Кілька речень про секцію (від 10 до 300 символів). Показуються на картці.',
      validation: (rule) => rule.required().min(10).max(300),
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram сторінка (обов\'язково)',
      type: 'url',
      description: 'Посилання на Instagram секції (https://www.instagram.com/...). Відкривається кнопкою «Instagram» на картці.',
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