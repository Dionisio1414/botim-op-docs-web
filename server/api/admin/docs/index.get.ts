import { requireRole } from '../../../utils/auth'
import { mockDocs } from '../../../data/mockDocs'

export default defineEventHandler((event) => {
  requireRole(event, 'admin', 'editor')
  return { docs: mockDocs }
})
