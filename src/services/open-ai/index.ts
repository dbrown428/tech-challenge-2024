import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

/** 
 * Want to define a wrapper type so we aren't polluting the app with external imports.
 * Should take this to the next level and consider factoring out the OpenAi params too.
 */
export type Messages = Array<ChatCompletionMessageParam>
