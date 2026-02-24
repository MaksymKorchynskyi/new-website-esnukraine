import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'section',
  title: 'Секції (ESN Sections)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Назва Секції (напр. ESN Kyiv)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
      description: 'Частина посилання, напр. esn-kyiv',
    }),
    defineField({
      name: 'city',
      title: 'Місто',
      type: 'string',
    }),
    defineField({
      name: 'foundedDate',
      title: 'Дата заснування (необов\'язково)',
      type: 'date',
    }),
    defineField({
      name: 'mainImage',
      title: 'Фото команди або лого',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Короткий опис (для списку)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Повний опис секції',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Link',
      type: 'url',
    }),
    defineField({
      name: 'telegram',
      title: 'Telegram/Channel Link',
      type: 'url',
    }),
  ],
})