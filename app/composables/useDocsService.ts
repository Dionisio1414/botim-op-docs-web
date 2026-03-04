import type { MockDoc } from '../../server/data/mockDocs'

export function useDocsService() {
  const { api } = useApi()

  function listDocs() {
    return api<{ docs: MockDoc[] }>('/admin/docs')
  }

  function getDoc(id: string) {
    return api<{ doc: MockDoc }>(`/admin/docs/${id}`)
  }

  function createDoc(data: Partial<MockDoc>) {
    return api<{ doc: MockDoc }>('/admin/docs', {
      method: 'POST',
      body: data,
    })
  }

  function updateDoc(id: string, data: Partial<MockDoc>) {
    return api<{ doc: MockDoc }>(`/admin/docs/${id}`, {
      method: 'PATCH',
      body: data,
    })
  }

  function deleteDoc(id: string) {
    return api<{ ok: boolean }>(`/admin/docs/${id}`, {
      method: 'DELETE',
    })
  }

  return { listDocs, getDoc, createDoc, updateDoc, deleteDoc }
}
