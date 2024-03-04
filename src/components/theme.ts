import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        background: "#000"
      }
    })
  }
})

export default theme
