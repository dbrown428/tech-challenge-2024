import "styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react"
import theme from "components/theme"
import { DataProvider } from "components/use-data"
import { SignupProvider } from "components/signup/use-signup"

/**
 * I struggled with the internal decision of making external calls to some random
 * GraphQL api on the internet. I've always been taught all traffic should through your 
 * server, and then out to external apis. It dawned on me, much to late, in the process 
 * that the external GraphQL api was irrelevant and it was meant to be a standin for 
 * the Leondardo.ai api. My mistake.
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <SignupProvider>
        <ChakraProvider theme={theme}>
          {/* <ApolloProvider client={client}> */}
            <Component {...pageProps} />
          {/* </ApolloProvider> */}
        </ChakraProvider>
      </SignupProvider>
    </DataProvider>
  )
}
