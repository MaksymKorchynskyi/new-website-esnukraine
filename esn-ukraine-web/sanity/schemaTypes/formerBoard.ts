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
      description: 'Показується як заголовок блоку на сторінці Former Boards.',
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
      description: 'Члени борду в тому порядку, в якому їх показувати на сайті. Порядок можна змінити перетягуванням.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Ім\'я та прізвище',
              type: 'string',
              description: 'Латиницею, наприклад: Dariia Beliaieva.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'position',
              title: 'Посада',
              type: 'string',
              description: 'Англійською, наприклад: President.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Фото',
              type: 'image',
              options: { hotspot: true, accept: ACCEPTED_IMAGE_TYPES },
              description: 'Фото члена борду. На сайті показується в колі, тож обличчя має бути по центру. Макс. 2,5 МБ і 3000×3500 px.',
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
