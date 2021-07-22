import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from "../src/lib/AlurakutCommons"
import { useRouter } from "next/router";



const GlobalStyle = createGlobalStyle`
  /* Reset */  
  * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
  }


  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    background-color: #D9E6F6;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
      <title>Orkut  {router.pathname.replace('/','')}</title>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
