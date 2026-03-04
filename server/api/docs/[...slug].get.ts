import { mockDocs } from '../../data/mockDocs'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  const doc = mockDocs.find(d => d.slug === slug && d.status === 'published')

  if (!doc) {
    throw createError({ statusCode: 404, statusMessage: `Page not found: ${slug}` })
  }

  return {
    title: doc.title,
    description: doc.description,
    body: doc.body,
  }
})
