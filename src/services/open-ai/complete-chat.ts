import { EitherAsync } from "purify-ts/EitherAsync";
import { openai } from "config/server";
import { Messages } from ".";
import { AppError } from "../types";
import { Either, Left, Right } from "purify-ts/Either";
import { ChatCompletion } from "openai/resources/index.mjs";
import { BadRequestError } from "openai"

/**
 * CompleteChat
 * ChatGPT text completion. Pass in messages to prime the model and get a response.
 * 
 * Defining a CompleteChat type that can be used to define other functions to
 * easily create test doubles, if needed.
 * 
 * @param messages - messages to prime the model
 * @returns - a response from the model.
 */
export type CompleteChat = (messages: Messages) => Result
type Result = EitherAsync<AppError, string>

/**
 * Intentionally hardcording the OpenAi dependency here for simplicity
 * because there isn't any heavy logic in here that I want to test.
 */
export function completeChat(messages: Messages): Result {
  const chatBody = {
    model: "gpt-3.5-turbo",
    messages,
  }

  /**
   * It is possible that the chat completion result is empty. Ideally I could
   * define an error type for that, but in this case it's sufficient to pass
   * along the error to the caller, and they can handle it.
   */
  const handleResult = (result: ChatCompletion): Either<AppError, string> => {
    const content = result.choices[0].message.content
    return content ? Right(content) : Left('No chat completion response')
  }

  /**
   * Most errors are expected, and not exceptional so I'm going to convert
   * them into AppErrors.
   */
  const handleError = (error: any) => {
    if (error instanceof BadRequestError) {
      return Left(error.message)
    } else {
      console.log("Error: ", error)
      return Left('Unexpected error')
    }
  }

  /**
   * I decided to wrap the Promise response from OpenAI in an EitherAsync. This
   * maintains the asynchronous nature of the call, and also introduces the Either
   * type; I'm expecting occasional hiccups when communicating to an external
   * service, and most of those should not throw exceptions, but are errors that
   * the callers can handle with grace.
   */
  return EitherAsync.fromPromise(async () => {
    return openai.chat.completions.create(chatBody)
      .then(handleResult)
      .catch(handleError)
  })
}
