import Image from 'next/image'
import { request } from '../lib/datocms'
import { motion } from "framer-motion"
import dynamic from 'next/dynamic'
import EmblaCarousel from '../components/EmblaCarousel'
import Button from '../components/Button'
import ProjectCard from '../components/ProjectCard'
import Link from 'next/link'
import SoftMotion from '../components/SoftMotion'

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });


const HOMEPAGE_QUERY = `{
  homePage {
    clientsText
    clientLogos {
      url
      width
      height
    }
    whoWeAre
    showreel {
      url
    }
  }
}`

const INSIGHTS_QUERY = `{
  allInsights(first:3) {
    slug
    title
    category
    coverImage {
      url
    }
    textWhite
  }
}`

const WORK_QUERY = `
  {
    allProjects(first:3) {
      thumbnail {
        url
      }
      title
      shortDescription
      slug
    }
  }  
`

export async function getStaticProps() {
  const home = await request({
    query: HOMEPAGE_QUERY,
  })
  const insights = await request({
    query: INSIGHTS_QUERY,
  })

  const work = await request({
    query: WORK_QUERY,
  })
  return {
    props: {
      home,
      insights,
      work,
    },
  }
}


export default function Home({ home, insights, work }) {
  return (
    <>
    <div className="relative mb-8 rounded-xl pt-[56.25%] md:mt-0 xxl:mb-16">
        <ReactPlayer
          url={home.homePage.showreel.url}
          playing
          muted
          loop
          controls="false"
          width="100%"
          height="100%"
          className="absolute top-0 left-0 overflow-hidden rounded-xl"
        />
      </div>
    {/* Who we are section */}
    <SoftMotion>
    <div className="mx-[-1em] md:mx-[-2em] mb-6 bg-pink px-8 pt-8 xxl:mx-[-5em] xxl:px-20 xxl:py-10">
        <div className="md:w-3/4">
          <div className="mb-5 text-xl md:mb-3 md:text-2xl xxl:mb-8 xxl:mt-8 xxl:text-5xl">
            Who we are
          </div>
          <div
            className="text-3xl font-bold md:text-5xl xxl:text-7xl"
            dangerouslySetInnerHTML={{ __html: home.homePage.whoWeAre }}
          />
        </div>
        <div className="py-10 text-center">
          <Button href="/about" text="Find out more"></Button>
        </div>
      </div>
    </SoftMotion>
      <SoftMotion>
      <div className="hidden md:block">
        <div className="mb-3 text-2xl xxl:mb-12 xxl:mt-20 xxl:text-5xl">Latest Work</div>
        <div className="grid grid-cols-3 gap-5 xxl:gap-10">
          {work.allProjects.map((w, i) => (
            <div key={i}>
              <ProjectCard
                thumbnail={w.thumbnail.url}
                title={w.title}
                description={w.shortDescription}
                href={`/work/${w.slug}`}
              />
            </div>
          ))}
        </div>
      </div>
      </SoftMotion>
      <SoftMotion>
      <div className="md:hidden">
        <EmblaCarousel title="Latest Work">
          {work.allProjects.map((w, i) => (
            <div className="embla__slide relative" key={i}>
              <Link href={`/work/${w.slug}`}>
                <div className="relative">
                  <div className="relative h-[70vh] w-full">
                    <Image src={w.thumbnail.url} objectFit="cover" layout="fill" />
                  </div>
                  <div className="mt-5">
                    <div className="text-xl">{w.title}</div>
                    <div className="text-xl text-slate-600">{w.shortDescription}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </EmblaCarousel>
      </div>
      </SoftMotion>
      <div className="py-10 text-center xxl:py-24">
        <Button href="/work" text="Discover all work"></Button>
      </div>
      <SoftMotion>
        <div className="mx-[-1em] md:mx-[-2em] rounded-xl bg-gray-100 px-8 pt-6 xxl:mx-[-5em] xxl:px-20 xxl:pt-14">
          <div className="hidden md:block">
            <div className="mb-3 text-2xl xxl:mb-12 xxl:text-5xl">Insights</div>
            <div className="grid grid-cols-3 gap-5 xxl:gap-10">
              {insights.allInsights.map((insight, i) => (
                <div key={i} className="hover-view cursor-pointer">
                  <Link href={`insights/${insight.slug}`}>
                  <div className="relative">
                    <div className="relative h-[40vh] w-full">
                      <Image
                        src={insight.coverImage.url}
                        objectFit="cover"
                        layout="fill"
                        className="rounded-xl"
                      />
                    </div>

                    <div className="absolute top-5 left-5 xxl:top-8 xxl:left-8">
                      <div className={`text-xl xxl:mb-10 xxl:text-5xl ${insight.textWhite ? 'text-white' : 'text-black'}`}>{insight.category}</div>
                      <div className={`w-2/3 text-2xl font-bold uppercase xxl:text-6xl ${insight.textWhite ? 'text-white' : 'text-black'}`}>
                        {insight.title}
                      </div>
                    </div>
                    <div className="view relative cursor-pointer">
                      <div className="triangle-black absolute right-0 bottom-0"></div>
                      <div className="absolute right-4 bottom-2 text-xl text-white md:text-2xl xxl:right-6 xxl:bottom-4 xxl:text-4xl">
                        View
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <EmblaCarousel title="Insights">
              {insights.allInsights.map((insight, i) => (
                <div className="embla__slide relative" key={i}>
                  <Link href={`insights/${insight.slug}`}>
                  <div className="relative">
                    <div className="relative h-[40vh] w-full">
                      <Image
                        src={insight.coverImage.url}
                        objectFit="cover"
                        layout="fill"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="absolute top-5 left-5">
                      <div className={`text-xl`}>{insight.category}</div>
                      <div className={`w-2/3 text-2xl font-bold uppercase xxl:text-5xl`}>
                        {insight.title}
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
              ))}
            </EmblaCarousel>
          </div>
          <div className="py-10 text-center xxl:py-20">
            <Button href="/insights" text="Discover all insights"></Button>
          </div>
        </div>
      </SoftMotion>
      <SoftMotion>
        <div className="my-10 md:flex md:space-x-20 xxl:my-16">
          <div className="md:w-1/2">
            <div className="mb-5 text-2xl xxl:mb-8 xxl:text-5xl">Clients</div>
            <div className="w-4/5 text-xl xxl:text-5xl">{home.homePage.clientsText}</div>
          </div>
          <div className="flex w-[90%] flex-wrap items-center justify-center pt-10 md:w-1/2 md:pt-0">
            {home.homePage.clientLogos.map((logo, i) => (
              <div key={i} className="relative w-1/3 px-2">
                <Image src={logo.url} width={logo.width} height={logo.height} />
              </div>
            ))}
          </div>
        </div>
      </SoftMotion>
    </>
  )
}
