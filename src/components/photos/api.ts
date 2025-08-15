import type { Photo } from './types'

export async function fetchPhotos(albumId: number): Promise<Photo[]> {
  try {
    const response = await fetch(`https://json.medrocket.ru/photos?albumId=${albumId}`)
    if (!response.ok) {
      throw new Error(`Ошибка HTTP! статус: ${response.status}`)
    }
    return await response.json()
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Ошибка загрузки фотографий:', err.message)
    } else {
      console.error('Произошла неизвестная ошибка')
    }
    throw err
  }
}