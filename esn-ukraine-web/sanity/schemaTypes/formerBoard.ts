import { defineField, defineType, defineArrayMember } from 'sanity'
import { ACCEPTED_IMAGE_TYPES, validateImageSize } from '../lib/imageValidation'

export default defineType({
  name: 'formerBoard',
  title: 'Колишні борди (Former Boards)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва (наприклад: Board 2021/22)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Порядковий номер',
      type: 'number',
      description: 'Число для сортування (наприклад, 2021). Більше число буде вище у списку.',
      validation: (rule) => rule.required(),
      initialValue: 2020,
    }),
    defineField({
      name: 'members',
      title: 'Члени борду',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Ім\'я та прізвище',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'position',
              title: 'Посада',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Фото',
              type: 'image',
              options: { hotspot: true, accept: ACCEPTED_IMAGE_TYPES },
              description: 'Фото члена борду.',
              validation: (rule) => rule.required().custom(validateImageSize(2.5, 3000, 3500)),
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Альтернативний текст (Alt опис під фото)',
                  description: 'Наприклад: Фото члена борду',
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
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'order',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: `Порядок: ${subtitle}`,
      }
    }
  },
})
