import OpenAI from "openai";
import { loadEnvConfig } from '@next/env';
import { ApolloClient, InMemoryCache } from "@apollo/client"

/**
 * We have to manually load the environment variables because NextJS does not 
 * automatically do this when running tests.
 */
if (process.env.NODE_ENV === 'test') {
  console.log('Load environment variables for testing')
  loadEnvConfig(process.cwd())
} else {
  // Do nothing
}

/**
 * Wire up and configure services.
 */
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Very strange that this doesn't require authorization.
 */
export const artsyClient = new ApolloClient({
  uri: "https://metaphysics-production.artsy.net/v2",
  cache: new InMemoryCache(),
  headers: {
    // "X-Xapp-Token": process.env.ARTSY_API_TOKEN ?? "",
    // "x-access-token": process.env.ARTSY_API_TOKEN ?? "",
  }
});
