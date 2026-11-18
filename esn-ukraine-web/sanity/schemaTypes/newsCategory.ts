import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'newsCategory',
    title: 'Категорії новин',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Назва категорії',
            type: 'string',
            description: 'Мітка, яка показується на картці новини, наприклад: Report.',
            validation: (rule) => rule.required().min(2).max(50),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 50,
            },
            // Сайт це поле не використовує, тому воно приховане. Уже введені дані зберігаються.
            hidden: true,
        }),
    ],
    preview: {
        select: { title: 'title' },
    },
})
