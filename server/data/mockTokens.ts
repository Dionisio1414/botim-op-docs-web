// Maps token string -> userId
export const accessTokens = new Map<string, string>()
export const refreshTokens = new Map<string, string>()

let counter = 0

export function generateToken(prefix: string): string {
  counter++
  return `${prefix}_${Date.now()}_${counter}_${Math.random().toString(36).slice(2, 10)}`
}
