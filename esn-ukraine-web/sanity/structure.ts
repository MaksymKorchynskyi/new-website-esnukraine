import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Управління контентом ESN Ukraine')
    .items([
      S.listItem()
        .title('Новини (News)')
        .schemaType('news')
        .child(
          S.documentTypeList('news')
            .title('Всі новини')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),
      S.listItem()
        .title('Події (Events)')
        .schemaType('event')
        .child(
          S.documentTypeList('event')
            .title('Всі події')
            .defaultOrdering([{ field: 'date', direction: 'desc' }])
        ),
      S.divider(),
      S.listItem()
        .title('Секції ESN (Sections)')
        .schemaType('section')
        .child(
          S.documentTypeList('section')
            .title('Секції')
            .defaultOrdering([{ field: 'order', direction: 'asc' }, { field: 'name', direction: 'asc' }])
        ),
      S.listItem()
        .title('Члени Борду (Board Members)')
        .schemaType('boardMember')
        .child(
          S.documentTypeList('boardMember')
            .title('Борд')
            .defaultOrdering([{ field: 'order', direction: 'asc' }, { field: 'name', direction: 'asc' }])
        ),
      S.divider(),
      S.listItem()
        .title('Категорії новин')
        .schemaType('newsCategory')
        .child(S.documentTypeList('newsCategory')),
      S.listItem()
        .title('Категорії подій')
        .schemaType('eventCategory')
        .child(S.documentTypeList('eventCategory')),
      S.divider(),
      S.listItem()
        .title('Фото "Our Network" (Головна)')
        .schemaType('networkPhoto')
        .child(
          S.documentTypeList('networkPhoto')
            .title('Фото для Our Network')
            .defaultOrdering([{ field: 'slot', direction: 'asc' }, { field: 'order', direction: 'asc' }])
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['news', 'event', 'section', 'boardMember', 'networkPhoto', 'newsCategory', 'eventCategory'].includes(
            listItem.getId() || ''
          )
      ),
    ])
