import Image from 'next/image'
import { request } from '../lib/datocms'
import { motion } from "framer-motion"

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
    <motion.div initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}>
      <div className='relative w-screen h-40'>
        <Image src={data.about.image1.url} objectFit='cover' layout='fill'/>
      </div>
    </motion.div>
  )
}
