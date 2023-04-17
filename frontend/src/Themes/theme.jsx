import { extendTheme } from "@chakra-ui/react";


const theme = extendTheme({
    config: {
        initialColorMode: 'light',
    },
    colors: {
        darkBlack: "#edf2f7",
        lightBlack: "#252526",
    },
    styles: {
        global: {
            body: {
                bg: "white !important",
            },
            'option': {
            },
            'button:hover': {
            }
        },
    },
    initialColorMode: "dark"
})

export default theme