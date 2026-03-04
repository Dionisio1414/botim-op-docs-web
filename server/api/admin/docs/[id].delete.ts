import { requireRole } from '../../../utils/auth'
import { mockDocs } from '../../../data/mockDocs'

export default defineEventHandler((event) => {
  requireRole(event, 'admin')

  const id = getRouterParam(event, 'id')
  const idx = mockDocs.findIndex(d => d.id === id)

  if (idx === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Doc not found' })
  }

  mockDocs.splice(idx, 1)
  return { ok: true }
})
