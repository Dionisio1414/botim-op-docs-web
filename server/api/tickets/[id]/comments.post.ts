import { requireAuth } from '../../../utils/auth'
import { mockTickets, mockComments, nextCommentIdFn } from '../../../data/mockTickets'

export default defineEventHandler(async (event) => {
  const user = requireAuth(event)
  const id = getRouterParam(event, 'id')

  const ticket = mockTickets.find(t => t.id === id)
  if (!ticket) {
    throw createError({ statusCode: 404, statusMessage: 'Ticket not found' })
  }

  // Only owner or admin can comment
  if (ticket.userId !== user.id && user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const body = await readBody<{ body?: string }>(event)
  if (!body?.body?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Comment body is required' })
  }

  const comment = {
    id: nextCommentIdFn(),
    ticketId: id!,
    userId: user.id,
    userName: user.name,
    body: body.body,
    createdAt: new Date().toISOString(),
  }

  mockComments.push(comment)
  return { comment }
})
