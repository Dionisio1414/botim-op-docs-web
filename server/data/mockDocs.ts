import { navigation as seedNav, pages as seedPages } from './docs'
import type { NavSection } from './docs'

export interface MockDoc {
  id: string
  slug: string
  title: string
  description: string
  body: string
  section: string
  icon?: string
  status: 'published' | 'draft'
  createdAt: string
  updatedAt: string
}

// Seed mock docs from existing hardcoded data
let nextId = 1
export const mockDocs: MockDoc[] = []

for (const section of seedNav) {
  for (const child of section.children) {
    const page = seedPages[child.slug]
    if (page) {
      mockDocs.push({
        id: `d${nextId++}`,
        slug: child.slug,
        title: page.title,
        description: page.description,
        body: page.body,
        section: section.slug,
        icon: child.icon,
        status: 'published',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      })
    }
  }
}

export function nextDocId() {
  return `d${nextId++}`
}

// Derive navigation from mockDocs
export function getNavigation(): NavSection[] {
  const sectionMap = new Map<string, NavSection>()

  // Define section metadata
  const sectionMeta: Record<string, { title: string, icon: string }> = {
    'guides': { title: 'Guides', icon: 'i-lucide-rocket' },
    'api-reference': { title: 'API Reference', icon: 'i-lucide-code' },
    'examples': { title: 'Examples', icon: 'i-lucide-file-code' },
  }

  for (const doc of mockDocs) {
    if (doc.status !== 'published') continue

    if (!sectionMap.has(doc.section)) {
      const meta = sectionMeta[doc.section] || { title: doc.section, icon: 'i-lucide-folder' }
      sectionMap.set(doc.section, {
        title: meta.title,
        icon: meta.icon,
        slug: doc.section,
        children: [],
      })
    }

    sectionMap.get(doc.section)!.children.push({
      title: doc.title,
      slug: doc.slug,
      icon: doc.icon,
    })
  }

  // Preserve original section order
  const order = ['guides', 'api-reference', 'examples']
  const sorted = order
    .filter(s => sectionMap.has(s))
    .map(s => sectionMap.get(s)!)

  // Add any sections not in the predefined order
  for (const [key, val] of sectionMap) {
    if (!order.includes(key)) sorted.push(val)
  }

  return sorted
}
