import { writeFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400, statusMessage: 'Slug required' })

  const { content } = await readBody<{ content: string }>(event)
  if (typeof content !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Content required' })
  }

  const filePath = join(process.cwd(), 'content', 'docs', `${slug}.md`)
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, content, 'utf-8')

  return { ok: true, slug }
})
