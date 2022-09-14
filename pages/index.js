import Image from 'next/image'
import { request } from '../lib/datocms'
import { motion } from "framer-motion"
import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const ABOUT_QUERY = `{
  about {
      image1 {
          url
      }
  }
}`

export async function getStaticProps() {
  const data = await request({
      query: ABOUT_QUERY,
  })
  return {
      props: {
      data,
      },
  }
}

export default function Home({data}) {
  return (
    <>
    <div className="relative mt-10 mb-8 rounded-xl pt-[56.25%] md:mt-0 xxl:mt-10 xxl:mb-16">
        <ReactPlayer
          url='https://vimeo.com/747234731'
          playing
          muted
          loop
          width="100%"
          height="100%"
          className="absolute top-0 left-0 overflow-hidden rounded-xl"
        />
      </div>
    <motion.div initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}>
      <div className='relative w-screen h-40'>
        <Image src={data.about.image1.url} objectFit='cover' layout='fill'/>
      </div>
    </motion.div>
    </>
  )
}
