
export type Artist = {
  id: string            // internal id from Artsy.net
  slug: string          // 
  name: string          // Andy Warhol
  year: number          // 1983
  description: string   // About the artist
  nationality: string   // Canadian
  image: string         // http…
}

export type Artwork = {
  id: string          // UUID from Artsy.net
  title: string       // The Old Violin
  artist: string      // Andy Warhol
  year: number        // 1983
  thumbnail: string   // http…
  image: string       // http…
  rights: string      // National Gallery
}
