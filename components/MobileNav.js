import { useState } from 'react'
import Link from 'next/link'
import headerNavLinks from '../data/headerNavLinks'
import Image from 'next/image'
import siteMetadata from '../data/siteMetadata'

const MobileNav = () => {
const [navShow, setNavShow] = useState(false)

const onToggleNav = () => {
setNavShow((status) => {
    if (status) {
    document.body.style.overflow = 'auto'
    } else {
    // Prevent scrolling
    document.body.style.overflow = 'hidden'
    }
    return !status
})
}

return (
<div className="sm:hidden">
    <button
    type="button"
    className="ml-1 mr-1 h-8 w-8 rounded py-1"
    aria-label="Toggle Menu"
    onClick={onToggleNav}
    >
    <svg
        width="32"
        height="32"
        viewBox="0 0 25 25"
        fill="currentColor"
        className="text-gray-900"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z"
        />
    </svg>
    </button>
    <div
    className={`fixed top-0 left-0 z-10 h-full w-full transform bg-petrol fill-white text-white duration-300 ease-in-out ${
        navShow ? 'translate-x-0' : 'translate-x-full'
    }`}
    >
    <div className="mt-6 flex justify-between">
        <Link href="/">
        <div className="relative ml-6 h-10 w-1/2">
            <Image src={'/static/images/logo-white.svg'} layout="fill" objectFit="contain" alt='logo'/>
        </div>
        </Link>

        <button
        type="button"
        className="mr-4 h-8 w-8 rounded"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        >
        <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
        >
            <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
        </svg>
        </button>
    </div>
    <nav className="fixed mt-16 flex h-[75%] flex-col justify-between">
        <div>
        {headerNavLinks.map((link) => (
            <div key={link.title} className="px-5 py-4">
            <Link
                href={link.href} 
            >
                <a onClick={onToggleNav}
                className="text-7xl leading-8 text-white">{link.title}
                </a>
            </Link>
            </div>
        ))}
        <div className="px-5 py-4">
            <a href={`mailto:${siteMetadata.email}`} className="text-7xl leading-8 text-white">
            Contact
            </a>
        </div>
        </div>
        <div className="px-5 font-bold uppercase leading-tight">
        <a href={`mailto:${siteMetadata.email}`} className="hover:text-pink">
            HELLO
            <br />
            @VIVALAZOOM.CO.UK
            </a>
            <br />
            <a href={`tel:${siteMetadata.phone}`} className="hover:text-pink mb-5">
            +44(0)161 225 1045
            </a>
        <br />
        <a href="https://www.instagram.com/viva_la_zoom/" target="_blank" rel="noreferrer">
            INSTAGRAM
        </a>
        <br />
        <a href="https://twitter.com/vivalazoomuk" target="_blank" rel="noreferrer">
            TWITTER
        </a>
        <br />
        <a href="https://en-gb.facebook.com/vivalazoom/" target="_blank" rel="noreferrer">
            FACEBOOK
        </a>
        </div>
    </nav>
    </div>
</div>
)
}

export default MobileNav
