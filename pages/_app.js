import Head from 'next/head'
import '../styles/globals.css'
import LayoutWrapper from '../components/LayoutWrapper'
import GoogleAnalytics from "@bradgarropy/next-google-analytics"

function MyApp({ Component, pageProps }) {
  return (
  <>
    <Head>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>VLZ: Video Production Manchester // 3D Motion Graphics Unreal</title>
      <meta name="description" content="Video production Manchester offers corporate video services from scriptwriting and filming to 3d Motion graphics and Unreal engine content for virtual production" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <GoogleAnalytics measurementId="G-CHPCPYNDQC" />
    <LayoutWrapper>
      <Component {...pageProps} />
    </LayoutWrapper>
  </>
  )
}

export default MyApp
