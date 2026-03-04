import { requireRole } from '../../../utils/auth'
import { mockDocs } from '../../../data/mockDocs'

export default defineEventHandler(async (event) => {
  requireRole(event, 'admin', 'editor')

  const id = getRouterParam(event, 'id')
  const doc = mockDocs.find(d => d.id === id)

  if (!doc) {
    throw createError({ statusCode: 404, statusMessage: 'Doc not found' })
  }

  const body = await readBody<{
    slug?: string
    title?: string
    description?: string
    body?: string
    section?: string
    icon?: string
    status?: 'published' | 'draft'
  }>(event)

  if (body?.slug) doc.slug = body.slug
  if (body?.title) doc.title = body.title
  if (body?.description !== undefined) doc.description = body.description
  if (body?.body) doc.body = body.body
  if (body?.section) doc.section = body.section
  if (body?.icon !== undefined) doc.icon = body.icon
  if (body?.status) doc.status = body.status
  doc.updatedAt = new Date().toISOString()

  return { doc }
})
