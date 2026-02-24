import { type SchemaTypeDefinition } from 'sanity'
import news from './news'
import event from './event'
import section from './section'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [news, event, section],
}