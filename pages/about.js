import { request } from '../lib/datocms'
import Image from 'next/image'
import siteMetadata from '../data/siteMetadata'
import Button from '../components/Button'
import SoftMotion from '../components/SoftMotion'
import { motion } from 'framer-motion'

function colour(hex) {
    if (hex === '#FFBAC4') {
        return 'pink'
    }
    if (hex === '#FF5467') {
        return 'coral'
    }
    if (hex === '#5136B7') {
        return 'purple'
    }
    if (hex === '#F6F6F6') {
        return 'gray-100'
    }
    return 'beige'
}

const ABOUT_QUERY = `{
    about {
        whoWeAre
        whoWeAreExtra
        people {
        name
        role
        email
        portrait {
            url
        }
        }
        image1 {
        url
        }
        image2 {
        url
        }
        headerImage {
        url
        width
        height
        }
        history
        manifesto {
        backgroundColor {
            hex
        }
        textColor {
            hex
        }
        icon {
            url
        }
        number
        text
        }
    }
}`

export async function getStaticProps() {
    const aboutPage = await request({
        query: ABOUT_QUERY,
    })
    return {
        props: {
        aboutPage,
        },
    }
}

export default function About({ aboutPage }) {
    return (
        <>
        <div className="absolute top-0 left-0 mx-[-1vw] h-[20vh] w-[102vw] md:h-[40vh]">
            <Image
            src={aboutPage.about.headerImage.url}
            objectFit="cover"
            layout="fill"
            className="object-bottom"
            />
        </div>
        <div className="mt-[16vh] md:mt-[22vh] 2xl:mt-[30vh] xxl:mt-[28vh]"></div>
        <div className="mb-12 md:mb-16 xxl:mb-24 md:flex justify-between items-center">
            <div className='md:w-3/4'>
            <div className="mb-5 text-xl md:mb-3 md:text-2xl xxl:mb-8 xxl:mt-8 xxl:text-5xl">
            Who we are
            </div>
            <div className="text-3xl font-bold md:text-5xl xxl:text-7xl">
            {aboutPage.about.whoWeAre}
            </div>
            </div>
            <div className='relative h-52 w-52 hidden md:block xxl:w-64 xxl:h-64'>
                <Image
                src={'/static/images/asterisk.svg'}
                objectFit="contain"
                layout="fill" />
            </div>
        </div>

        <SoftMotion>
            <div className="mb-7 flex flex-col items-center md:flex-row md:space-x-10 xxl:mb-14 xxl:space-x-20">
            <div className="relative mb-12 h-40 w-40">
                <Image src="/static/images/star.svg" objectFit="cover" layout="fill" />
            </div>
            <div className="self-start text-xl md:text-2xl xxl:text-5xl">
                <div dangerouslySetInnerHTML={{__html: aboutPage.about.whoWeAreExtra}} />
            </div>
            </div>
        </SoftMotion>
        <SoftMotion>
            <div className="mb-7 border border-y border-x-0 border-black py-4">
            <div className="text-center text-2xl font-bold text-coral md:text-5xl xxl:text-7xl">
                WE NEVER STOP
            </div>
            <div className="marquee-container">
                <div className="marquee flex flex-nowrap justify-around text-center text-2xl font-bold md:text-5xl xxl:text-7xl">
                <div className="hidden md:block">MOVING</div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden w-9 px-2 md:block md:w-12 xxl:w-16"
                    viewBox="0 0 20.4 16.17"
                >
                    <polygon points="12.32 .02 20.4 8.11 12.32 16.17 12.32 .02" />
                    <polygon points="6.16 0 14.24 8.1 6.16 16.16 6.16 0" />
                    <polygon points="0 0 8.08 8.09 0 16.15 0 0" />
                </svg>
                <div>IMAGINING</div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-9 px-2 md:w-12 xxl:w-16"
                    viewBox="0 0 20.4 16.17"
                >
                    <polygon points="12.32 .02 20.4 8.11 12.32 16.17 12.32 .02" />
                    <polygon points="6.16 0 14.24 8.1 6.16 16.16 6.16 0" />
                    <polygon points="0 0 8.08 8.09 0 16.15 0 0" />
                </svg>
                <div className="hidden md:block">MAKING</div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden w-9 px-2 md:block md:w-12 xxl:w-16"
                    viewBox="0 0 20.4 16.17"
                >
                    <polygon points="12.32 .02 20.4 8.11 12.32 16.17 12.32 .02" />
                    <polygon points="6.16 0 14.24 8.1 6.16 16.16 6.16 0" />
                    <polygon points="0 0 8.08 8.09 0 16.15 0 0" />
                </svg>
                <div>INNOVATING </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-9 px-2 md:w-12 xxl:w-16"
                    viewBox="0 0 20.4 16.17"
                >
                    <polygon points="12.32 .02 20.4 8.11 12.32 16.17 12.32 .02" />
                    <polygon points="6.16 0 14.24 8.1 6.16 16.16 6.16 0" />
                    <polygon points="0 0 8.08 8.09 0 16.15 0 0" />
                </svg>
                </div>
                <div className="marquee marquee2 flex flex-nowrap justify-around text-center text-2xl font-bold md:text-5xl xxl:text-7xl">
                <div>MOVING</div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-9 px-2 md:w-12 xxl:w-16"
                    viewBox="0 0 20.4 16.17"
                >
                    <polygon points="12.32 .02 20.4 8.11 12.32 16.17 12.32 .02" />
                    <polygon points="6.16 0 14.24 8.1 6.16 16.16 6.16 0" />
                    <polygon points="0 0 8.08 8.09 0 16.15 0 0" />
                </svg>
                <div className="hidden md:block">IMAGINING</div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden w-9 px-2 md:block md:w-12 xxl:w-16"
                    viewBox="0 0 20.4 16.17"
                >
                    <polygon points="12.32 .02 20.4 8.11 12.32 16.17 12.32 .02" />
                    <polygon points="6.16 0 14.24 8.1 6.16 16.16 6.16 0" />
                    <polygon points="0 0 8.08 8.09 0 16.15 0 0" />
                </svg>
                <div>MAKING</div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-9 px-2 md:w-12 xxl:w-16"
                    viewBox="0 0 20.4 16.17"
                >
                    <polygon points="12.32 .02 20.4 8.11 12.32 16.17 12.32 .02" />
                    <polygon points="6.16 0 14.24 8.1 6.16 16.16 6.16 0" />
                    <polygon points="0 0 8.08 8.09 0 16.15 0 0" />
                </svg>
                <div className="hidden md:block">INNOVATING </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden w-9 px-2 md:block md:w-12 xxl:w-16"
                    viewBox="0 0 20.4 16.17"
                >
                    <polygon points="12.32 .02 20.4 8.11 12.32 16.17 12.32 .02" />
                    <polygon points="6.16 0 14.24 8.1 6.16 16.16 6.16 0" />
                    <polygon points="0 0 8.08 8.09 0 16.15 0 0" />
                </svg>
                </div>
            </div>
            </div>
            <div className="text-center xxl:my-20">
            <Button href="/work" text="Discover our work"></Button>
            </div>
        </SoftMotion>
        <SoftMotion>
            <div className="relative mt-16 mb-12 h-[35vh] w-full md:h-[80vh]">
            <Image
                src={aboutPage.about.image1.url}
                objectFit="cover"
                layout="fill"
                className="rounded-b-xl rounded-tr-xl"
            />
            <div className="flex h-full w-full items-center justify-center">
                <div className="absolute">
                    <div className='relative w-[40vw] h-40 md:h-32 md:w-[25vw] xxl:h-56'>
                        <Image src={'/static/images/mim.svg'} objectFit='contain' layout='fill'/>
                    </div>
                </div>
            </div>
            </div>
        </SoftMotion>
        <SoftMotion>
            <div className="mb-3 mt-10 text-2xl md:mt-0 md:mb-10 xxl:mb-16 xxl:mt-20 xxl:text-5xl">
            People
            </div>
            <div className="grid-cols-3 gap-8 md:grid">
            {aboutPage.about.people.map((person, i) => (
                <div key={i}>
                <div className="relative mb-4 h-[55vh] w-full">
                    <Image src={person.portrait.url} objectFit="cover" layout="fill" />
                </div>
                <div className="flex items-start justify-between border-t border-black pt-3 md:block xxl:text-4xl">
                    <div className="xxl:mb-16">
                    <div>{person.role}</div>
                    <div className="mb-7 font-bold">{person.name}</div>
                    </div>
                    <a
                    href={person.email}
                    className="rounded-full border border-black px-5 py-1 hover:bg-black hover:text-white md:py-2"
                    >
                    Email
                    </a>
                </div>
                </div>
            ))}
            </div>
        </SoftMotion>
        <SoftMotion>
            <div className="mb-10 mt-16 border-t  border-black pt-4 text-2xl md:border-0 xxl:mb-20 xxl:mt-32 xxl:text-5xl">
            Our Manifesto
            </div>
            <div className="grid grid-cols-2 md:mx-32 md:grid-cols-4 xxl:mx-56">
            {aboutPage.about.manifesto.map((step, i) => (
                <div
                key={i}
                className={`bg-${colour(step.backgroundColor.hex)} text-${colour(
                    step.textColor.hex
                )} item flex flex-col justify-between p-3 xxl:p-7`}
                >
                <div>
                    <div className="text-xl xxl:text-4xl">{step.number}</div>
                    <div className="font-playfair text-xl uppercase md:text-3xl xxl:text-5xl">
                    {step.text}
                    </div>
                </div>
                <div className="relative mt-5 h-12 w-12 md:h-16 md:w-16 xxl:mt-14 xxl:h-28 xxl:w-28">
                    <Image src={step.icon.url} objectFit="cover" layout="fill" />
                </div>
                </div>
            ))}
            </div>
        </SoftMotion>
        <SoftMotion>
            <div className='bg-gray-100 mx-[-1em] md:mx-[-2em] px-8 py-12 mt-24 rounded-t-xl xxl:mt-40 xxl:mx-[-5em] xxl:px-20'>
            <div className="mb-10 text-2xl xxl:mb-20 xxl:text-5xl">Our History</div>
            <div className="paragraphs mx-10 mb-44 text-xl md:mx-32 md:columns-2 md:text-2xl xxl:mx-56 xxl:text-5xl xxl:mb-56">
                <div dangerouslySetInnerHTML={{__html: aboutPage.about.history}} />
            </div>
            </div>
        </SoftMotion>
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ stiffness: 50, duration: 0.7 }}
        >
            <div className="relative mb-12 h-[35vh] w-full md:h-[85vh] md:w-[60vw] mt-[-8em] md:mt-[-10em] xxl:mt-[-15em] xxl:h-[70vh]">
            <Image src={aboutPage.about.image2.url} objectFit="contain" layout="fill" />
            </div>
        </motion.div>
        </>
    )
}