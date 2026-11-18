import { type SchemaTypeDefinition } from 'sanity'
import news from './news'
import event from './event'
import upcomingEvent from './upcomingEvent'
import section from './section'
import newsCategory from './newsCategory'
import boardMember from './boardMember'
import networkPhoto from './networkPhoto'
import formerBoard from './formerBoard'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [news, event, upcomingEvent, section, newsCategory, boardMember, networkPhoto, formerBoard],
}