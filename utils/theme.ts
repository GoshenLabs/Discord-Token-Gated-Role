// utils/theme.js

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    // Customize your dark mode colors here
    // For example:
    primary: "#00FF00",
    secondary: "#FF0000",
  },
});

export default theme;
