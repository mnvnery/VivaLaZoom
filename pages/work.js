import siteMetadata from '../data/siteMetadata'
import { request } from '../lib/datocms'
import Image from 'next/image'
import Link from 'next/link'
import SoftMotion from '../components/SoftMotion'

const WORK_QUERY = `{
    workPage {
    projects {
        large
        shortDescription
        pullOutQuote
        slug
        story
        testimonial
        testimonialName
        testimonialRole
        title
        vision
        category
        brief
        videoLink {
        url
        }
        thumbnail {
        url
        }
        allImages {
        url
        }
    }
    footerImage {
        url
    }
    }
}`

export async function getStaticProps() {
    const work = await request({
    query: WORK_QUERY,
    })
    return {
    props: {
        work: work.workPage,
    },
    }
}

export default function Work({ work }) {
return (
<>
    <div className="mb-10 mt-7 grid-cols-2 gap-7 md:mt-0 md:grid xxl:mt-10 xxl:gap-12">
    {work.projects.map((p, i) => (
        <div key={i} className={`hover-view ${p.large ? 'col-span-2' : ''}`}>
        <Link href={`/work/${p.slug}`}>
            <div>
            <div
                className={`relative w-full ${
                p.large ? 'h-[65vh] md:h-[90vh]' : 'h-[35vh] md:h-[65vh]'
                }`}
            >
                <Image
                src={p.thumbnail.url}
                objectFit="cover"
                layout="fill"
                className={`${p.large ? 'rounded-xl md:rounded-none' : 'rounded-xl'}`}
                />
            </div>
            <div className="view relative cursor-pointer">
                <div className={`triangle absolute right-0 bottom-0 ${p.large ? '' : ''}`}></div>
                <div className="absolute right-4 bottom-2 text-xl text-white md:text-2xl xxl:right-6 xxl:bottom-4 xxl:text-4xl">
                View
                </div>
            </div>
            <div className="mt-5 mb-7 border-t border-black pt-4 md:mb-0 md:pt-5 xxl:mt-10 xxl:pt-8">
                <div className="text-xl uppercase md:text-2xl xxl:text-5xl">{p.title}</div>
                <div className="text-xl font-bold uppercase md:text-2xl xxl:text-5xl">
                {p.category}
                </div>
            </div>
            </div>
        </Link>
        </div>
    ))}
    </div>
    <SoftMotion>
    <div className="relative my-16 h-12 w-full md:my-28 md:h-44 xxl:my-32 xxl:h-[22vh]">
        <Image src={work.footerImage.url} objectFit="contain" layout="fill" />
    </div>
    </SoftMotion>
</>
)
}