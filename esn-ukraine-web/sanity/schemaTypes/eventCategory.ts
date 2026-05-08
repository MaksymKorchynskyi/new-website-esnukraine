import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'eventCategory',
    title: 'Категорії подій',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Назва категорії',
            type: 'string',
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
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: { title: 'title' },
    },
})
