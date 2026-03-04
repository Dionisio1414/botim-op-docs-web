export interface MockUser {
  id: string
  email: string
  password: string
  name: string
  role: 'admin' | 'editor' | 'viewer'
  status: 'active' | 'disabled'
  createdAt: string
}

export const mockUsers: MockUser[] = [
  {
    id: 'u1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    status: 'active',
    createdAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'u2',
    email: 'editor@example.com',
    password: 'editor123',
    name: 'Editor User',
    role: 'editor',
    status: 'active',
    createdAt: '2025-02-01T00:00:00Z',
  },
  {
    id: 'u3',
    email: 'viewer@example.com',
    password: 'viewer123',
    name: 'Viewer User',
    role: 'viewer',
    status: 'active',
    createdAt: '2025-03-01T00:00:00Z',
  },
]

let nextId = 4
export function nextUserId() {
  return `u${nextId++}`
}
