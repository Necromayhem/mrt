import type { Albums } from './types'

export async function fetchAlbums(userId: number): Promise<Albums> {
  try {
    const response = await fetch(`https://json.medrocket.ru/albums?userId=${userId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Failed to fetch albums:', err.message)
    } else {
      console.error('An unknown error occurred')
    }
    throw err
  }
}