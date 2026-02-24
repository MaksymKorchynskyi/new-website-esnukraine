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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eventType',
      title: 'Тип події',
      type: 'string',
      options: {
        list: [
          { title: 'Майбутня подія (Реєстрація)', value: 'upcoming' },
          { title: 'Звіт (Минула подія)', value: 'past' },
        ],
        layout: 'radio'
      },
      initialValue: 'upcoming',
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
      hidden: ({document}) => document?.eventType === 'past', 
    }),
    defineField({
      name: 'mainImage',
      title: 'Обкладинка',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Опис або Звіт',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})