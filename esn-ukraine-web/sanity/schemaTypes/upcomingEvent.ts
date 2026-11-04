import { defineField, defineType } from 'sanity'
import { formatDate } from '../lib/utils'
import { ACCEPTED_IMAGE_TYPES, validateImageSize } from '../lib/imageValidation'
import { ESN_CAUSES } from '../../lib/esnCauses'

/**
 * Простий анонс майбутньої події для сторінки "Upcoming Events".
 * Без окремої сторінки події: картка веде на посилання (реєстрація / Instagram).
 * Після дати проведення анонс автоматично зникає з сайту.
 */
export default defineType({
  name: 'upcomingEvent',
  title: 'Майбутні події (Upcoming Events)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва події',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'date',
      title: 'Дата та час проведення',
      type: 'datetime',
      description: 'Після цієї дати подія автоматично зникне зі сторінки "Upcoming Events".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Секція-організатор',
      type: 'reference',
      to: [{ type: 'section' }],
      description: 'Залиште порожнім, якщо це національна подія ESN Ukraine.',
    }),
    defineField({
      name: 'causes',
      title: 'Категорії (ESN Causes)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ESN_CAUSES.map(({ title, value }) => ({ title, value })),
        layout: 'grid',
      },
      description: 'Позначте один або кілька напрямів ESN, до яких належить подія. Використовується для фільтра на сайті.',
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'location',
      title: 'Місце проведення',
      type: 'string',
      description: 'Наприклад: Kyiv, KPI Campus або Online',
    }),
    defineField({
      name: 'image',
      title: 'Фото / постер',
      type: 'image',
      options: { hotspot: true, accept: ACCEPTED_IMAGE_TYPES },
      description: 'Необовʼязково. Макс. 2 МБ, формати JPG/PNG/WebP.',
      validation: (rule) => rule.custom(validateImageSize(2, 0, 0)),
    }),
    defineField({
      name: 'description',
      title: 'Короткий опис',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'link',
      title: 'Посилання (реєстрація, Instagram тощо)',
      type: 'url',
      description: 'Необовʼязково. Куди веде кнопка на картці події.',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  orderings: [
    { title: 'Дата (найближчі спершу)', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      section: 'section.name',
      media: 'image',
    },
    prepare({ title, date, section, media }) {
      const parts = [date ? formatDate(date) : 'Без дати', section || 'ESN Ukraine']
      return { title, subtitle: parts.join(' · '), media }
    },
  },
})
