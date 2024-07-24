import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
import Layout from '@/componets/layout'

function App({ Component, pageProps }) {
  return (
    <>
      <head>
        
      </head>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </ChakraProvider>      
    </>
  )
}

export default App
