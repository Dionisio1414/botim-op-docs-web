import { requireRole } from '../../../utils/auth'
import { mockDocs, nextDocId } from '../../../data/mockDocs'

export default defineEventHandler(async (event) => {
  requireRole(event, 'admin', 'editor')

  const body = await readBody<{
    slug?: string
    title?: string
    description?: string
    body?: string
    section?: string
    icon?: string
    status?: 'published' | 'draft'
  }>(event)

  if (!body?.slug || !body?.title || !body?.body || !body?.section) {
    throw createError({ statusCode: 400, statusMessage: 'slug, title, body, and section are required' })
  }

  if (mockDocs.some(d => d.slug === body.slug)) {
    throw createError({ statusCode: 409, statusMessage: 'A doc with this slug already exists' })
  }

  const doc = {
    id: nextDocId(),
    slug: body.slug,
    title: body.title,
    description: body.description || '',
    body: body.body,
    section: body.section,
    icon: body.icon,
    status: body.status || 'draft' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockDocs.push(doc)
  return { doc }
})
