import type { MockTicket, MockComment } from '../../server/data/mockTickets'

export function useTicketsService() {
  const { api } = useApi()

  function listTickets() {
    return api<{ tickets: MockTicket[] }>('/tickets')
  }

  function getTicket(id: string) {
    return api<{ ticket: MockTicket, comments: MockComment[] }>(`/tickets/${id}`)
  }

  function createTicket(data: { title: string, description: string, priority?: string }) {
    return api<{ ticket: MockTicket }>('/tickets', {
      method: 'POST',
      body: data,
    })
  }

  function updateTicket(id: string, data: { status?: string, priority?: string }) {
    return api<{ ticket: MockTicket }>(`/tickets/${id}`, {
      method: 'PATCH',
      body: data,
    })
  }

  function addComment(ticketId: string, body: string) {
    return api<{ comment: MockComment }>(`/tickets/${ticketId}/comments`, {
      method: 'POST',
      body: { body },
    })
  }

  return { listTickets, getTicket, createTicket, updateTicket, addComment }
}
