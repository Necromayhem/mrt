export type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export type Photo = {
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export type Album = {
  userId: number
  id: number
  title: string
}

export type Users = User[]
export type Albums = Album[]
