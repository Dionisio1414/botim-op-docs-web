import { writeFile, mkdir, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const { slug, content } = await readBody<{ slug: string, content: string }>(event)

  if (!slug || typeof content !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Slug and content required' })
  }

  const filePath = join(process.cwd(), 'content', 'docs', `${slug}.md`)

  try {
    await access(filePath)
    throw createError({ statusCode: 409, statusMessage: 'Document already exists' })
  }
  catch (e: any) {
    if (e.statusCode === 409) throw e
  }

  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, content, 'utf-8')

  return { ok: true, slug }
})
