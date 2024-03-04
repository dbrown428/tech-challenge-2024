import { NextApiRequest, NextApiResponse } from "next";
import { completeChat } from "services/open-ai/complete-chat"
import { actAsArtMajor } from "services/open-ai/messages"

/**
 * Would prefer to use NextConnect, but just keeping this simple. This is very fragile, but 
 * I've run out of time to run. Should do validation and sanitize data.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const artistName = req.body.artist
  const username = req.body.username
  const jobTitle = req.body.jobtitle
  const prompt = `Write a playful description about a painting created by the artist ${artistName}. The painting is titled ${username} and the subject of the painting is "${jobTitle}".`

  return completeChat(actAsArtMajor(prompt))
    .map(message => res.status(200).json({ message }))
    .mapLeft(error => res.status(500).json({ error }))
}
