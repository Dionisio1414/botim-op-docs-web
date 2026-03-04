import { getNavigation } from '../../data/mockDocs'

export default defineEventHandler(() => {
  return { sections: getNavigation() }
})
