import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"
import headerNavLinks from '../data/headerNavLinks'
import siteMetadata from '../data/siteMetadata'
import MobileNav from "./MobileNav"
import Footer from "./Footer"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useForm } from '@formspree/react';
import {AiOutlineCheckCircle} from 'react-icons/ai'


function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState(null);

    useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
        const scrollY = window.pageYOffset;
        const direction = scrollY > lastScrollY ? "down" : "up";
        if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
        setScrollDirection(direction);
        }
        lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
        window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
    }, [scrollDirection]);

    return scrollDirection;
};


export default function LayoutWrapper({ children }) {
const [state, handleSubmit] = useForm('mzbqwwol');
const [isOpen, setIsOpen] = useState(false)
const scrollDirection = useScrollDirection();
const [scrollY, setScrollY] = useState(0);
const router = useRouter()

useEffect(() => {
    const handleScroll = () => {
        setScrollY(window.scrollY);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
}, []);

const showContact = router.pathname === '/contact' ? false : true;

return (
    <>
    <div className="flex h-auto flex-col justify-between">
        <header className={`sticky ${ scrollDirection === "down" ? "-top-36 xxl:-top-80" : "top-0"} ${ scrollY > 5 ? 'bg-white' : 'bg-transparent'} transition-all duration-500 z-[1] px-4 py-6 flex items-center justify-between md:px-8 md:py-8 xxl:px-20 xxl:py-20`}>
        <Link href="/">
            <div className="relative h-16 w-3/4 md:h-20 md:w-2/6 2xl:w-[27%] xxl:h-36 xxl:w-1/3 hover:cursor-pointer">
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
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 text-2xl text-gray-900 hover:underline sm:p-4 xxl:p-8 xxl:text-5xl"
            >
                Contact
            </button>
            </div>
            <MobileNav />
        </div>
        </header>
        <main className="mx-4 md:mx-8 xxl:mx-20">{children}</main>
        {showContact &&
        <div className="relative min-h-[8vh] md:min-h-[11vh] 2xl:min-h-[7vh] xxl:min-h-[9vh]">
            <div className={`-translate-x-1/2 left-1/2 ${isOpen ? 'fixed top-20 flex justify-center items-center z-20 xxl:top-60' : 'absolute z-[1] mb-[-2em] transition-transform hover:-translate-y-2 w-full px-5 md:w-auto'}`}>
                <motion.div layout  className={`bg-pink ${isOpen ? 'min-h-[20px] min-w-[10em] rounded-xl mx-10 md:mx-0' : 'rounded-t-xl' }`}>
                    {!isOpen &&
                    <motion.div layout="position" onClick={() => setIsOpen(!isOpen)} className={`cursor-pointer p-2 grid grid-cols-[1.1fr_0.06fr] gap-3 items-center px-8 pt-3 pb-12 text-[4.2vw] md:px-10 md:text-xl xxl:px-16 xxl:pt-7 xxl:pb-24 xxl:text-4xl`}>
                        <div className="w-full">
                            Have a project in mind?{' '}
                            <span className="underline">
                                Get in touch
                            </span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-full" viewBox="0 0 20.4 16.17">
                            <polygon points="12.32 .02 20.4 8.11 12.32 16.17 12.32 .02" />
                            <polygon points="6.16 0 14.24 8.1 6.16 16.16 6.16 0" />
                            <polygon points="0 0 8.08 8.09 0 16.15 0 0" />
                        </svg>
                    </motion.div>
                    }
                    {isOpen &&
                    <motion.div className='flex flex-col xxl:text-4xl'>
                    <button
                    type="button"
                    className="ml-1 mt-4 mr-4 h-8 w-8 rounded py-1 self-end"
                    aria-label="Toggle Menu"
                    onClick={() => setIsOpen(!isOpen)} 
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
                    <div className='px-5 md:px-14 pt-6 pb-12 xxl:pb-20'>
                    {state.succeeded ? 
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-2xl pb-2"><AiOutlineCheckCircle/></span>
                        Thank you for getting in touch!
                    </div>
                    :
                    <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-5'>
                        <input type="hidden" name="form-name" value="contact-form" />
                        <div>
                        <label htmlFor="name">Name</label><br/>
                        <input type="text" id="name" name="Name" className="bg-transparent rounded-none border-b border-black mb-2 max-w-[90%] md:max-w-full xxl:mb-10"/><br/>
                        </div>
                        <div>
                        <label htmlFor="company">Company</label><br/>
                        <input type="text" id="company" name="Company" className="bg-transparent rounded-none border-b border-black mb-2 max-w-[90%] md:max-w-full xxl:mb-10"/><br/>
                        </div>
                        <div>
                        <label htmlFor="email">Email</label><br/>
                        <input type="text" id="email" name="Email" className="bg-transparent rounded-none border-b border-black mb-2 max-w-[90%] md:max-w-full xxl:mb-10"/><br/>
                        </div>
                        <div>
                        <label htmlFor="phone">Tel</label><br/>
                        <input type="text" id="phone" name="Phone" className="bg-transparent border-b border-black mb-2 max-w-[90%] md:max-w-full xxl:mb-10"/><br/>
                        </div>
                        <div className='col-span-2'>
                        <label htmlFor="message">Message</label><br/>
                        <textarea maxlength="5000" id="Message" name="Message" data-name="Message" required="" className="border border-black bg-transparent p-3 w-full mt-1.5"></textarea><br/>
                        </div>
                        <button type="submit" disabled={state.submitting} className="rounded-full bg-black text-pink border border-black px-5 py-2 hover:bg-transparent hover:text-black xxl:px-10 xxl:py-4 xxl:text-4xl mt-5 xxl:mt-12">Submit</button>
                    </form>
                    }
                    </div>
                    <div className='text-lg md:text-xl font-bold uppercase flex justify-between bg-black text-pink px-5 md:px-10 py-8 rounded-b-xl space-x-5 xxl:text-3xl'>
                        <div className='leading-6 xxl:leading-tight'>
                            <div className='hover:text-white'>hello@vivalazoom</div>
                            <div className='hover:text-white'>+44(0)161 225 1045</div>
                        </div>
                        <div className='leading-6 xxl:leading-tight'>
                            <div className='hover:text-white'>INSTAGRAM</div>
                            <div className='hover:text-white'>LINKEDIN</div>
                            <div className='hover:text-white'>BEHANCE</div>
                        </div>
                    </div>
                    </motion.div>
                    }
                </motion.div>
            </div>
        </div>
        }
        {showContact && <Footer/>}
        <div className={`h-screen w-screen fixed top-0 left-0 z-10  bg-white ${isOpen ? 'opacity-75 duration-300' : 'opacity-0 duration-75 pointer-events-none'}`} onClick={() => setIsOpen(!isOpen)}></div>
    </div>
    </>
)
}