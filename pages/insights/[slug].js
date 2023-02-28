import { request } from '../../lib/datocms'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import dynamic from 'next/dynamic'

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
            content
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
    console.log(data.contentBlocks[1].text)
    return (
        <>
        <div className="absolute top-0 left-0 mx-[-1vw] h-[85vh] w-[102vw]">
            <Image
            src={data.coverImage.url}
            objectFit="cover"
            layout="fill"
            className="object-bottom"
            />
        </div>
        <div className="mt-[75vh]"></div>
        <div className='md:grid grid-cols-[0.5fr_1.5fr]'>
        <div className='text-2xl'>{data.title}</div>
        <div className="mx-20 mb-16 text-2xl">
        {data.contentBlocks.map((w, i) => (
                    <div key={i}>
                        {(w.imageFile != undefined &&
                            <div className={`relative my-7`}>
                                <Image src={w.imageFile.url} objectFit="cover" width={w.imageFile.width} height={w.imageFile.height} alt={w.imageFile.alt} />
                            </div>)
                            || (w.text != undefined &&
                                <div dangerouslySetInnerHTML={{__html: w.text}} className={`leading-tight`}/>)

                            || (w.quote != undefined &&
                                    <div dangerouslySetInnerHTML={{__html: w.quote}} className={`float-right ml-20 mb-12 font-playfair text-xl md:float-none md:ml-[-3em] md:mt-10 md:mb-14 md:w-3/5 md:text-5xl xxl:mb-24 xxl:text-7xl`}/>)

                            || (w.vimeoLink !== undefined &&
                                <div className="relative mt-8 pt-[56.25%] md:my-7">
                                    <ReactPlayer
                                    url={w.vimeoLink.url}
                                    playing
                                    controls
                                    muted
                                    loop
                                    width="100%"
                                    height="100%"
                                    className="absolute top-0 left-0 h-full md:h-[90%]"
                                    />
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