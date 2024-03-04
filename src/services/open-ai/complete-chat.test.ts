import { sampleMessages } from "./messages"
import { completeChat } from "./complete-chat";
import { Messages } from "."

/**
 * Ideally this test would be grouped as integration, slow and external. Those
 * groupings will prevent it slowing down fast unit tests.
 */
describe("ChatGPT Text Completion", () => {
  test("No messages provided", async () => {
    expect.assertions(2)
    const sampleMessages: Messages = []
    return completeChat(sampleMessages).then(result => {
      expect(result.isLeft()).toBeTruthy()
      result.mapLeft(r => expect(r).toContain('is too short'))
    })
  })
  
  test("Successful completion", async () => {
    expect.assertions(1)
    return completeChat(sampleMessages).then(result => {
      result.map(r => console.log(r))
      expect(result.isRight()).toBeTruthy()
    })
  })
})
