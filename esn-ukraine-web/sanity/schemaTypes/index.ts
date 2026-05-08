import { type SchemaTypeDefinition } from 'sanity'
import news from './news'
import event from './event'
import section from './section'
import newsCategory from './newsCategory'
import eventCategory from './eventCategory'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [news, event, section, newsCategory, eventCategory],
}