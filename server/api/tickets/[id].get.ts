import { requireAuth } from '../../utils/auth'
import { mockTickets, mockComments } from '../../data/mockTickets'

export default defineEventHandler((event) => {
  const user = requireAuth(event)
  const id = getRouterParam(event, 'id')

  const ticket = mockTickets.find(t => t.id === id)
  if (!ticket) {
    throw createError({ statusCode: 404, statusMessage: 'Ticket not found' })
  }

  // Only owner or admin can view
  if (ticket.userId !== user.id && user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const comments = mockComments.filter(c => c.ticketId === id)
  return { ticket, comments }
})
