import { readdir, stat, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

interface DocFile {
  slug: string
  title: string
  path: string
  updatedAt: string
}

async function walkDir(dir: string, base: string): Promise<DocFile[]> {
  const files: DocFile[] = []
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  }
  catch {
    return files
  }

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await walkDir(fullPath, base))
    }
    else if (entry.name.endsWith('.md')) {
      const rel = relative(base, fullPath)
      const fileStat = await stat(fullPath)
      const content = await readFile(fullPath, 'utf-8')
      const titleMatch = content.match(/^title:\s*['"]?(.+?)['"]?\s*$/m)
      files.push({
        slug: rel.replace(/\.md$/, ''),
        title: titleMatch?.[1] ?? entry.name.replace(/\.md$/, ''),
        path: fullPath,
        updatedAt: fileStat.mtime.toISOString(),
      })
    }
  }

  return files
}

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const contentDir = join(process.cwd(), 'content', 'docs')
  return await walkDir(contentDir, contentDir)
})
