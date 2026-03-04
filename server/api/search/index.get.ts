import { mockDocs } from '../../data/mockDocs'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const q = (query.q as string || '').toLowerCase().trim()

  if (!q) {
    return { results: [] }
  }

  const results = mockDocs
    .filter(d => d.status === 'published')
    .filter(d =>
      d.title.toLowerCase().includes(q)
      || d.description.toLowerCase().includes(q)
      || d.body.toLowerCase().includes(q),
    )
    .map(d => ({
      slug: d.slug,
      title: d.title,
      description: d.description,
      section: d.section,
    }))

  return { results }
})
