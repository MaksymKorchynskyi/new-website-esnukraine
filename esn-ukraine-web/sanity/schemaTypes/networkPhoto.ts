import { defineField, defineType } from 'sanity'
import { ACCEPTED_IMAGE_TYPES, validateImageSize } from '../lib/imageValidation'

export default defineType({
  name: 'networkPhoto',
  title: 'Фотографії "Our Network" (Головна)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва / Опис фотографії (Alt текст)',
      type: 'string',
      description: 'Наприклад: Волонтери ESN Kyiv на Welcome Week',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slot',
      title: 'В якому слоті на головній сторінці відображати?',
      type: 'string',
      options: {
        list: [
          { title: 'Слот A: Верхній лівий (горизонтальне фото)', value: 'slotA' },
          { title: 'Слот B: Нижній лівий (горизонтальне фото)', value: 'slotB' },
          { title: 'Слот C: Правий високий (вертикальне / квадратне фото)', value: 'slotC' },
        ],
        layout: 'radio',
      },
      initialValue: 'slotA',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Фотографія',
      type: 'image',
      options: { hotspot: true, accept: ACCEPTED_IMAGE_TYPES },
      description: 'Завантажте якісне фото волонтерів, заходу чи команди. Важливо для безкоштовного тарифу Sanity: макс. розмір 2 МБ, формати JPG/PNG/WebP. Рекомендуємо стискати фото на tinypng.com перед завантаженням.',
      validation: (rule) => rule.required().custom(validateImageSize(2, 3500, 3500)),
    }),
    defineField({
      name: 'order',
      title: 'Порядок відображення (необов\'язково)',
      type: 'number',
      description: 'Число для сортування (наприклад, 1, 2, 3...)',
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slot: 'slot',
      media: 'image',
    },
    prepare({ title, slot, media }) {
      const slotMap: Record<string, string> = {
        slotA: '📍 Слот A (Верхній лівий)',
        slotB: '📍 Слот B (Нижній лівий)',
        slotC: '📍 Слот C (Правий високий)',
      };
      return {
        title: title || 'Без назви',
        subtitle: slotMap[slot] || slot,
        media,
      };
    },
  },
})
