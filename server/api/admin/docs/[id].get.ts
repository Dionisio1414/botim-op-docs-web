import { requireRole } from '../../../utils/auth'
import { mockDocs } from '../../../data/mockDocs'

export default defineEventHandler((event) => {
  requireRole(event, 'admin', 'editor')

  const id = getRouterParam(event, 'id')
  const doc = mockDocs.find(d => d.id === id)

  if (!doc) {
    throw createError({ statusCode: 404, statusMessage: 'Doc not found' })
  }

  return { doc }
})
