import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, statusMessage: 'Slug required' })

  const filePath = join(process.cwd(), 'content', 'docs', `${slug}.md`)

  try {
    const content = await readFile(filePath, 'utf-8')
    return { slug, content }
  }
  catch {
    throw createError({ statusCode: 404, statusMessage: 'Document not found' })
  }
})
