import { requireRole } from '../../utils/auth'
import { mockTickets } from '../../data/mockTickets'

export default defineEventHandler(async (event) => {
  requireRole(event, 'admin')

  const id = getRouterParam(event, 'id')
  const ticket = mockTickets.find(t => t.id === id)

  if (!ticket) {
    throw createError({ statusCode: 404, statusMessage: 'Ticket not found' })
  }

  const body = await readBody<{
    status?: 'open' | 'in_progress' | 'resolved' | 'closed'
    priority?: 'low' | 'medium' | 'high'
  }>(event)

  if (body?.status) ticket.status = body.status
  if (body?.priority) ticket.priority = body.priority
  ticket.updatedAt = new Date().toISOString()

  return { ticket }
})
