import { requireAuth } from '../../utils/auth'
import { mockTickets } from '../../data/mockTickets'

export default defineEventHandler((event) => {
  const user = requireAuth(event)

  // Admins see all tickets, others see only their own
  const tickets = user.role === 'admin'
    ? mockTickets
    : mockTickets.filter(t => t.userId === user.id)

  return { tickets }
})
