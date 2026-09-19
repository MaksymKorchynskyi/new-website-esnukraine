import { type SchemaTypeDefinition } from 'sanity'
import news from './news'
import event from './event'
import section from './section'
import newsCategory from './newsCategory'
import eventCategory from './eventCategory'
import boardMember from './boardMember'
import networkPhoto from './networkPhoto'
import formerBoard from './formerBoard'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [news, event, section, newsCategory, eventCategory, boardMember, networkPhoto, formerBoard],
}