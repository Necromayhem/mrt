import type { Users } from './types'

export async function fetchUsers(): Promise<Users> {
  try {
    const response = await fetch('https://json.medrocket.ru/users/')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Failed to fetch users:', err.message)
    } else {
      console.error('An unknown error occurred')
    }
    throw err
  }
}
