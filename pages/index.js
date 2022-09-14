import Image from 'next/image'
import { request } from '../lib/datocms'

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
    <div>
      <div className='relative w-screen h-40'>
        <Image src={data.about.image1.url} objectFit='cover' layout='fill'/>
      </div>
    </div>
  )
}
