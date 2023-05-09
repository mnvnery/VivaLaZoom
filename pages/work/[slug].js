import { request } from '../../lib/datocms'
import Image from 'next/image'
import Button from '../../components/Button'
import dynamic from 'next/dynamic'
import EmblaCarousel from '../../components/EmblaCarousel'
import Link from 'next/link'
import SoftMotion from '../../components/SoftMotion'
import ProjectCard from '../../components/ProjectCard'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

const PROJECTS_QUERY = `{
allProjects {
    slug
}
}`

const FILTERED_QUERY = `
    query projectBySlug($slug: String) {
        project(filter: {slug: {eq: $slug}}) {
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
            suggestedProjects {
                slug
                title 
                shortDescription
                thumbnail {
                    url
                }
            }
        }
    }`

export default function Project({ data }) {
    return (
        <>
        <div className="mt-5 mb-12 hidden text-2xl font-bold uppercase md:mb-8 md:block md:text-5xl">
            {data.title}
        </div>
        <div className="relative mt-8 pt-[56.25%] md:mt-0">
            <ReactPlayer
            url={data.videoLink.url}
            playing
            controls
            muted
            loop
            width="100%"
            height="100%"
            className="absolute top-0 left-0 h-full md:h-[90%]"
            />
        </div>
        <div className="mt-5 mb-12 border-t border-black pt-4 text-2xl font-bold uppercase md:hidden md:text-6xl">
            {data.title}
        </div>
        <SoftMotion>
            <div className="float-right ml-20 mb-12 font-playfair text-xl md:float-none md:ml-0 md:mt-10 md:mb-14 md:w-3/5 md:text-5xl xxl:mb-24 xxl:text-7xl">
            {data.pullOutQuote}
            </div>
        </SoftMotion>
        <SoftMotion>
            <div className="mb-12 grid-cols-2 gap-5 md:mx-32 md:grid xxl:mx-40">
            <div></div>
            <div className="text-xl md:text-2xl xxl:text-5xl">
                <span className="font-bold md:font-normal">The Brief</span> <br />
                <br />
                <span className="paragraphs body-text">{data.brief}</span>
            </div>
            </div>
        </SoftMotion>
        <SoftMotion>
            <div className="mb-8 grid grid-cols-2 gap-5 md:mx-32 md:mb-12 xxl:mx-40">
            <div className="relative h-[20vh] w-full md:h-[40vh]">
                <Image src={data.allImages[0].url} objectFit="cover" layout="fill" />
            </div>
            <div className="relative h-[20vh] w-full md:h-[40vh]">
                <Image src={data.allImages[1].url} objectFit="cover" layout="fill" />
            </div>
            </div>
        </SoftMotion>
        <SoftMotion>
            <div className="mb-8 grid-cols-2 gap-5 md:mb-12 md:grid">
            <div className="text-xl md:mr-32 md:text-2xl xxl:text-5xl">
                <span className="font-bold md:font-normal">The Story</span>
                <br />
                <br />
                <span className="paragraphs body-text">{data.story}</span>
            </div>
            <div></div>
            </div>
        </SoftMotion>
        <SoftMotion>
            <div className="mb-12 md:mx-32 xxl:mx-40">
            <div className="relative h-[40vh] w-full md:h-[90vh]">
                <Image src={data.allImages[2].url} objectFit="cover" layout="fill" />
            </div>
            </div>
        </SoftMotion>
        <SoftMotion>
            <div className="mb-12 grid-cols-2 gap-5 md:mx-32 md:grid xxl:mx-40">
            <div></div>
            <div className="text-xl md:text-2xl xxl:text-5xl">
                <span className="font-bold md:font-normal">The Vision</span> <br />
                <br />
                <span className="paragraphs body-text">{data.vision}</span>
            </div>
            </div>
        </SoftMotion>
        <SoftMotion>
            <div className="mb-12 grid grid-cols-2 gap-5 md:grid-cols-3">
            {data.allImages.slice(3).map((image, i) => (
                <div key={i} className="relative h-[20vh] w-full md:h-[40vh]">
                <Image src={image.url} objectFit="cover" layout="fill" />
                </div>
            ))}
            </div>
        </SoftMotion>
        <SoftMotion>
            {data.testimonial == '' ? (
            ''
            ) : (
            <div className="mb-16 grid-cols-[0.3fr_1fr] gap-5 md:grid xxl:py-16">
                <div className="text-lg md:text-2xl xxl:text-5xl">
                <div>{data.testimonialName}</div>
                <div className="text-slate-400 md:text-slate-600">{data.testimonialRole}</div>
                </div>
                <div className="ml-16 mt-8 body-text font-playfair text-xl md:mr-24 md:mt-0 md:text-4xl xxl:text-7xl">
                {data.testimonial}
                </div>
            </div>
            )}
        </SoftMotion>
        <SoftMotion>
        {data.suggestedProjects.length > 0 && (
            <div className="mx-[-1em] md:mx-[-2em] mb-[-4em] rounded-t-xl bg-gray-100 px-8 pb-20 pt-8 xxl:mx-[-5em] xxl:mb-[-8em] xxl:px-20 xxl:pt-20 xxl:pb-40">
            <div className="hidden md:block">
                <div className="mb-5 text-2xl xxl:mb-12 xxl:text-5xl">Other Work</div>
                <div className="grid grid-cols-3 gap-5">
                {data.suggestedProjects.map((w, i) => (
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
            <div className="md:hidden">
                <EmblaCarousel title="Latest Work">
                {data.suggestedProjects.map((w, i) => (
                    <div className="embla__slide" key={i}>
                    <Link href={w.slug}>
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
            <div className="mt-6 pb-10 text-center md:mt-14 xxl:mt-32 xxl:mb-16">
                <Button href="/work" text="Discover all work"></Button>
            </div>
            </div>
        )}
        </SoftMotion>
        </>
    )
    }

    export async function getStaticPaths() {
    const projects = await request({
        query: PROJECTS_QUERY,
    })

    return {
        paths: projects.allProjects.map((project) => {
        return {
            params: {
            slug: project.slug,
            },
        }
        }),
        fallback: false,
    }
    }

    export async function getStaticProps({ params }) {
    const data = await request({
        query: FILTERED_QUERY,
        variables: { slug: params.slug },
    })

    return {
        props: {
        data: data.project,
        },
    }
}