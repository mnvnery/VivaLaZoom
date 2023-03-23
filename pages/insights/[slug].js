import { request } from '../../lib/datocms'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import dynamic from 'next/dynamic'
import cn from "classnames";

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

const ARTICLES_QUERY = `{
    allInsights {
        slug
    }
}`

const FILTERED_QUERY = `
    query insightBySlug($slug: String) {
        insight(filter: {slug: {eq: $slug}}) {
            title
            slug
            layoverColor {
            hex
            }
            date
            category
            contentBlocks {
                ... on ImageRecord {
                    id
                    imageFile {
                        url
                        alt
                        height
                        width
                    }
                    }
                    ... on TextRecord {
                    id
                    text
                    }
                    ... on QuoteRecord {
                        id
                        quote
                    }
                    ... on ImageGalleryRecord {
                        id
                        images {
                            url
                            focalPoint {
                                x
                                y
                            }
                        }
                        columns
                        columnsMobile
                        orientation
                    }
                    ... on VideoRecord {
                    id
                    vimeoLink {
                        url
                    }
                    }
                }
            coverImage {
            url
            }
        }
}`

export async function getStaticPaths() {
    const articles = await request({
        query: ARTICLES_QUERY,
    })

    return {
        paths: articles.allInsights.map((article) => {
        return {
            params: {
            slug: article.slug,
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
        data: data.insight,
        },
    }
}

export default function Project({ data }) {
    return (
        <>
        <div className="absolute top-0 left-0 mx-[-1vw] h-[40vh] md:h-[85vh] w-[102vw]">
            <Image
            src={data.coverImage.url}
            objectFit="cover"
            layout="fill"
            className="object-bottom"
            />
        </div>
        <div className="mt-[30vh] md:mt-[75vh]"></div>
        <div className='md:grid grid-cols-[0.5fr_1.5fr]'>
        <div className='text-2xl mb-10 font-bold w-4/5 xxl:text-5xl'>{data.title}</div>
        <div className="md:mx-32 mb-16 text-xl md:text-2xl md:mr-[15%]">
        {data.contentBlocks.map((w, i) => (
                    <div key={i}>
                        {(w.imageFile != undefined &&
                            <div className={`relative my-7`}>
                                <Image src={w.imageFile.url} objectFit="cover" width={w.imageFile.width} height={w.imageFile.height} alt={w.imageFile.alt} />
                            </div>)
                            || (w.text != undefined &&
                                <div dangerouslySetInnerHTML={{__html: w.text}} className={`paragraphs md:leading-tight xxl:leading-tight xxl:text-5xl`}/>)

                            || (w.quote != undefined &&
                                    <div dangerouslySetInnerHTML={{__html: w.quote}} className={`float-right ml-20 mb-12 font-playfair text-2xl mt-5 md:float-none md:ml-[-3em] md:mt-10 md:mb-14 md:w-4/6 md:text-5xl xxl:mb-24 xxl:text-7xl xxl:mt-14`}/>)

                            || (w.vimeoLink !== undefined &&
                                <div className="relative my-7 pt-[56.25%] md:my-7 xxl:my-12">
                                    <ReactPlayer
                                    url={w.vimeoLink.url}
                                    controls
                                    loop
                                    width="100%"
                                    height="100%"
                                    className="absolute top-0 left-0 h-full md:h-[90%]"
                                    />
                                </div>)
                            || (w.columns !== undefined &&
                                <div className={cn("mb-12 grid gap-4 mt-7 xxl:gap-8 xxl:mt-12", {
                                    "grid-cols-1": w.columnsMobile === 1,
                                    "grid-cols-2": w.columnsMobile === 2,
                                    "md:grid-cols-1": w.columns === 1,
                                    "md:grid-cols-2": w.columns === 2,
                                    "md:grid-cols-3": w.columns === 3,
                                })}>
                                {w.images.map((image, i) => (
                                    <div key={i} className={`relative ${w.orientation ? 'md:h-[38vh] xxl:h-[35vh]' : 'md:h-[50vh] xxl:h-[45vh]' }`}>
                                    <Image src={image.url} objectFit="cover" layout="fill" objectPosition={`${image.focalPoint.x * 100}% ${image.focalPoint.y * 100}%`}/>
                                    </div>
                                ))}
                                </div>
                                )
                        
                        }
                    </div>
                ))}
        </div>
        </div>
        </>
    )
}