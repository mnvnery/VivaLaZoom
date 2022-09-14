import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"
import headerNavLinks from '../data/headerNavLinks'
import siteMetadata from '../data/siteMetadata'
import MobileNav from "./MobileNav"
import Footer from "./Footer"

export default function LayoutWrapper({ children }) {
const router = useRouter()
return (
    <>
    <div className="flex h-screen flex-col justify-between">
        <header className="z-[1] mx-4 mt-8 flex items-center justify-between md:mx-8 md:mt-10 xxl:mx-20 xxl:mt-20">
        <Link href="/">
            <div className="relative h-12 w-3/5 md:h-28 md:w-2/5 xxl:h-36 xxl:w-1/3 hover:cursor-pointer">
                <Image src="/static/images/logo.svg" layout="fill" objectFit="contain" alt="logo" />
            </div>
        </Link>
        <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
            {headerNavLinks.map((link) => (
                <Link
                key={link.title}
                href={link.href}
                >
                <a className={`p-1 text-2xl text-gray-900 hover:underline sm:p-4 xxl:p-8 xxl:text-5xl ${
                    router.pathname == link.href ? 'underline' : ''
                }`}>{link.title}</a>
                </Link>
            ))}
            <a
                href={`mailto:${siteMetadata.email}`}
                className="p-1 text-2xl text-gray-900 hover:underline sm:p-4 xxl:p-8 xxl:text-5xl"
            >
                Contact
            </a>
            </div>
            <MobileNav />
        </div>
        </header>
        <main className="mx-4 md:mx-8 md:mt-10 xxl:mx-20">{children}</main>
        <div className="flex justify-center">
        <div className="z-[1] mx-4 mb-[-1em] grid grid-cols-[1fr_0.06fr] items-center gap-2 rounded-t-xl bg-pink px-8 pt-3 pb-12 text-[4.2vw] transition-all hover:-translate-y-4 md:px-10 md:text-xl xxl:px-16 xxl:pt-7 xxl:pb-24 xxl:text-4xl">
            <div>
            Have a project in mind?{' '}
            <a href="mailto:hello@vivalazoom.co.uk" className="underline">
                Get in touch
            </a>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full" viewBox="0 0 20.4 16.17">
            <polygon points="12.32 .02 20.4 8.11 12.32 16.17 12.32 .02" />
            <polygon points="6.16 0 14.24 8.1 6.16 16.16 6.16 0" />
            <polygon points="0 0 8.08 8.09 0 16.15 0 0" />
            </svg>
        </div>
        </div>
        <Footer />
    </div>
    </>
)
}