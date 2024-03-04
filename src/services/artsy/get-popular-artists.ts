import { Either, EitherAsync, Left, Right } from "purify-ts"
import { artsyClient } from "config/server"
import { gql } from "@apollo/client"
import { Artist } from "."

/**
 * Get popular artists using GraphQL.
 */
export type GetPopularArtists = () => Result
type Result = EitherAsync<string, Artist[]>

const popularArtistsQuery = gql` {
  highlights {
    popularArtists(size: 10) {
      slug
      internalID
      name
      years
      nationality
      blurb
      image {
        url
      }
    }
  }
}`

export default function getPopularArtists(count: number): Result {
  const handleResult = (result: any) => {
    return parsePopularArtists(result.data.highlights.popularArtists)
  }
  const handleError = (error: any) => {
    console.error(error)
    return Left("Unexpected error")
  }
  return EitherAsync.fromPromise(async () => {
    return artsyClient.query({ query: popularArtistsQuery })
    .then(handleResult)
    .catch(handleError);
  })
}

/**
 * A better way of doing this would be schema validation with something like
 * YUP, but I'm going to skip that, because I've already spent too much time on
 * this.
 */
function parsePopularArtists(data: any): Either<string, Artist[]> {
  if (Array.isArray(data)) {
    return Either.sequence(data.map(parseArtist))
  } else {
    return Left('Expected array of popular artists not found')
  }
}

/** Cleaner ways to parse, but good enough first pass */
function parseArtist(data: any): Either<string, Artist> {
  if ("__typename" in data && data.__typename === "Artist") {
    return Right({
      id: data.internalID,
      slug: data.slug,
      name: data.name,
      year: data.years,
      description: data.blurb,
      nationality: data.nationality,
      image: data.image.url,
    })
  } else {
    return Left("Unexpected type found when parsing artist data")
  }
}
