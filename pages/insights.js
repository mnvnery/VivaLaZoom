import { request } from '../lib/datocms'
import Image from 'next/image'
import Link from 'next/link'
import SoftMotion from '../components/SoftMotion'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })


const INSIGHTS_QUERY = `{
    insightsPage {
        headerImage {
        url
        }
        footerImage {
        url
        }
        intro
        inbetween
        articles {
        title
        slug
        category
        date
        size
        coverImage {
            url
        }
        layoverColor {
            hex
        }
        textWhite
        }
        seo {
            title
            description
            image {
                url
            }
        }
    }
}`

function postSize(size) {
    if (size === 'small') {
        return 'col-span-12 md:col-span-4'
    }
    if (size === 'medium') {
        return 'col-span-12'
    }
    if (size === 'large') {
        return 'col-span-12'
    }
}

function imageHeight(size) {
    if (size === 'small') {
        return 'h-[40vh] md:h-[40vh] xxl:h-[35vh]'
    }
    if (size === 'medium') {
        return 'h-[40vh] md:h-[53vh] xxl:h-[46vh]'
    }
    if (size === 'large') {
        return 'h-[60vh] md:h-[70vh xxl:h-[60vh]'
    }
}

function flexSize(size) {
    if (size === 'small') {
        return ''
    }
    if (size === 'medium') {
        return 'w-full md:w-1/2'
    }
    if (size === 'large') {
        return 'w-full md:w-2/3'
    }
}

function colour(hex) {
    if (hex === '#FFBAC4') {
        return 'bg-pink'
    }
    if (hex === '#FF5467') {
        return 'bg-coral'
    }
    if (hex === '#5136B7') {
        return 'bg-purple'
    }
    if (hex === '#F6F6F6') {
        return 'bg-gray-100'
    }
    if (hex === null) {
        return ''
    }
}



export async function getStaticProps() {
    const page = await request({
        query: INSIGHTS_QUERY,
    })
    return { props: { page: page.insightsPage } }
}

export default function Insights({ page }) {
    return (
        <>
        <Head>
        <title>
            {page.seo.title}
        </title>
        <meta
            name="description"
            content={page.seo.description}
            key="desc"
        />
        </Head> 
        <div className="absolute top-0 left-0 mx-[-1vw] h-[20vh] w-[102vw] md:h-[40vh]">
            <Image
            src={page.headerImage.url}
            objectFit="cover"
            layout="fill"
            className="object-left-bottom"
            />
        </div>
        <div className="mt-[16vh] md:mt-[22vh] 2xl:mt-[30vh] xxl:mt-[28vh]"></div>
        <SoftMotion>
        <div className="mb-12 md:mb-16 md:w-3/4 xxl:mb-24">
            <div className="mb-5 text-xl md:mb-8 md:text-2xl xxl:mb-10 xxl:text-5xl">Insights</div>
            <div className="text-3xl font-bold md:text-5xl xxl:text-7xl">{page.intro}</div>
        </div>
        </SoftMotion>
        <SoftMotion>
        <div className="mb-16 grid-cols-3 gap-7 space-y-5 md:grid md:space-y-0">
            {page.articles.slice(0, 3).map((insight, i) => (
            <div key={i} className="hover-view">
                <Link href={`/insights/${insight.slug}`}>
                <div>
                    <div className="relative">
                    <div className="relative h-[40vh] w-full xxl:h-[35vh]">
                        <Image
                        src={insight.coverImage.url}
                        objectFit="cover"
                        layout="fill"
                        className="rounded-xl"
                        />
                    </div>

                    <div className="absolute top-5 left-5 xxl:top-8 xxl:left-8">
                        <div className={`mb-5 text-2xl xxl:mb-10 xxl:text-5xl ${insight.textWhite ? 'text-white' : 'text-black'}`}>{insight.category}</div>
                        <div className={`w-2/3 text-3xl font-bold uppercase leading-extra-tight xxl:text-6xl ${insight.textWhite ? 'text-white' : 'text-black'}`}>
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
                </div>
                </Link>
            </div>
            ))}
        </div>
        </SoftMotion>
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ stiffness: 50, duration: 0.7 }}
        >
        <div className="mb-16 text-5xl leading-extra-tight md:w-2/3 md:text-8xl xxl:w-4/5 xxl:text-[10em]">
            {page.inbetween}
        </div>
        </motion.div>
        <div className="mb-16 grid grid-flow-dense grid-cols-12 gap-5 md:gap-7">
            {page.articles.slice(3).map((insight, i) => (
            <div key={i} className={`hover-view ${postSize(insight.size)} ${imageHeight(insight.size)}`}>
                <SoftMotion>
                <Link href={`/insights/${insight.slug}`}>
                <div className={insight.size === 'small' ? '' : 'flex w-full space-x-7'}>
                    <div className={`relative ${flexSize(insight.size)}`}>
                    <div className={`relative w-full ${imageHeight(insight.size)}`}>
                        <Image
                        src={insight.coverImage.url}
                        objectFit="cover"
                        layout="fill"
                        className={`${
                            insight.size === 'small' ? 'rounded-xl' : 'rounded-xl rounded-tl-none'
                        }`}
                        />
                    </div>
                    <div
                        className={`absolute top-0 left-0 ${imageHeight(insight.size)} w-full mix-blend-multiply ${
                        insight.size === 'small' ? 'rounded-xl' : 'rounded-xl rounded-tl-none'
                        } ${insight.layoverColor ? colour(insight.layoverColor.hex) : ''}`}
                    ></div>
                    <div
                        className={`absolute top-5 left-5 xxl:top-8 xxl:left-8 ${
                        insight.textWhite ? 'text-white' : 'text-black'
                        }`}
                    >
                        <div className="mb-5 text-2xl xxl:mb-10 xxl:text-5xl">{insight.category}</div>
                        <div
                        className={`${
                            insight.size === 'small'
                            ? 'w-2/3 text-3xl xxl:text-6xl'
                            : 'w-2/5 text-4xl xxl:text-7xl'
                        } font-bold uppercase leading-extra-tight`}
                        >
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
                    <div
                    className={`${
                        insight.size === 'large'
                        ? 'relative hidden h-[auto] md:block md:w-1/3'
                        : 'hidden'
                    }`}
                    >
                    <Image
                        src={'/static/images/asterisk.svg'}
                        objectFit="contain"
                        layout="fill"
                    ></Image>
                    </div>
                    <div
                    className={`${
                        insight.size === 'medium'
                        ? 'relative hidden rounded-xl md:block md:w-1/2'
                        : 'hidden'
                    }`}
                    >
                        <ReactPlayer
                        url='https://vimeo.com/615880369'
                        playing
                        muted
                        loop
                        controls={false}
                        width="100%"
                        height="100%"
                        className="absolute top-0 left-0 overflow-hidden rounded-xl"
                        />
                    </div>
                </div>
                </Link>
                </SoftMotion>
            </div>
            ))}
        </div>
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ stiffness: 50, duration: 0.7 }}
        >
        <div className="relative my-10 h-[18vh] w-full md:my-16 md:h-[65vh]">
            <Image src={page.footerImage.url} objectFit="contain" layout="fill" />
        </div>
        </motion.div>
        </>
    )
}