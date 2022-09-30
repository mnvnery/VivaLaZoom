import Head from 'next/head'
import '../styles/globals.css'
import LayoutWrapper from '../components/LayoutWrapper'

function MyApp({ Component, pageProps }) {
  return (
  <>
    <Head>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>Viva La Zoom</title>
      <meta name="description" content="Viva La Zoom provides a suite of video production services and products to fit your specific needs." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <LayoutWrapper>
      <Component {...pageProps} />
    </LayoutWrapper>
  </>
  )
}

export default MyApp
