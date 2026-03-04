export interface MockComment {
  id: string
  ticketId: string
  userId: string
  userName: string
  body: string
  createdAt: string
}

export interface MockTicket {
  id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high'
  userId: string
  userName: string
  createdAt: string
  updatedAt: string
}

export const mockTickets: MockTicket[] = []
export const mockComments: MockComment[] = []

let nextTicketId = 1
let nextCommentId = 1

export function nextTicketIdFn() {
  return `t${nextTicketId++}`
}

export function nextCommentIdFn() {
  return `c${nextCommentId++}`
}
