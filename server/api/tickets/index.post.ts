import { requireAuth } from '../../utils/auth'
import { mockTickets, nextTicketIdFn } from '../../data/mockTickets'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const body = await readBody<{
    title?: string
    description?: string
    priority?: 'low' | 'medium' | 'high'
  }>(event)

  if (!body?.title || !body?.description) {
    throw createError({ statusCode: 400, statusMessage: 'Title and description are required' })
  }

  const ticket = {
    id: nextTicketIdFn(),
    title: body.title,
    description: body.description,
    status: 'open' as const,
    priority: body.priority || 'medium' as const,
    userId: user.id,
    userName: user.name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockTickets.push(ticket)
  return { ticket }
})
