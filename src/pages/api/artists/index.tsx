import { NextApiRequest, NextApiResponse } from "next";
import getPopularArtists from "services/artsy/get-popular-artists"

/**
 * Would prefer to use NextConnect, but just keeping this simple
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Hard coding things just to get this finished.
  return getPopularArtists(10)
    .map(artists => res.status(200).json({ artists }))
    .mapLeft(error => res.status(500).json({ error }))
}
