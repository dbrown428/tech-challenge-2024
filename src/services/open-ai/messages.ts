import { Messages } from "."

/**
 * Had different intentions for this file, but ran out of time to clean it up.
 */
export const sampleMessages: Messages = [
  { role: "system", content: "You are a mechanical engineer" },
  { role: "user", content: "Please explain thermodynamics to me at a forth grade level" },
]

export function actAsArtMajor(prompt: string): Messages {
  return [
    { role: "system", content: "You are a funny art history major." },
    { role: "user", content: prompt },
  ]
}

export function actAsDaVinci(prompt: string): Messages {
  return [
    { role: 'system', 'content': 'You are the famous Leonardo DaVinci.' },
    { role: 'user', 'content': prompt }
  ]
}

export function actAsStoryTeller(prompt: string): Messages {
  return [
    { role: 'system', 'content': 'You are a funny story teller.' },
    { role: 'user', 'content': prompt }
  ]
}
