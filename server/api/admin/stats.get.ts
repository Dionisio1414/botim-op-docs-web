import { requireRole } from '../../utils/auth'
import { mockUsers } from '../../data/mockUsers'
import { mockDocs } from '../../data/mockDocs'
import { mockTickets } from '../../data/mockTickets'

export default defineEventHandler((event) => {
  requireRole(event, 'admin')

  return {
    stats: {
      totalUsers: mockUsers.length,
      totalDocs: mockDocs.length,
      publishedDocs: mockDocs.filter(d => d.status === 'published').length,
      draftDocs: mockDocs.filter(d => d.status === 'draft').length,
      totalTickets: mockTickets.length,
      openTickets: mockTickets.filter(t => t.status === 'open').length,
      resolvedTickets: mockTickets.filter(t => t.status === 'resolved' || t.status === 'closed').length,
    },
  }
})
