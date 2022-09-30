import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ContactCard = ({contact}) => {

return (
    <>
    <div className={`${isOpen ? 'fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-white/75 z-20' : 'z-[1] mb-[-1em]'}`}>
    <motion.div transition={{ layout: {duration: 1, type: 'spring' }}} layout onClick={() => setIsOpen(!isOpen)} className={`bg-pink ${isOpen ? 'min-h-[20px] min-w-[10em] rounded-xl mx-10 md:mx-0' : 'rounded-t-xl' }`}>
        {!isOpen &&
        <motion.div layout="position" className={`p-2 grid grid-cols-[1fr_0.06fr] gap-3 items-center px-8 pt-3 pb-12 text-[4.2vw] md:px-10 md:text-xl xxl:px-16 xxl:pt-7 xxl:pb-24 xxl:text-4xl`}>
            <div>
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
        <motion.div className='flex flex-col'>
        <button
        type="button"
        className="ml-1 mt-4 mr-4 h-8 w-8 rounded py-1 self-end"
        aria-label="Toggle Menu"
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
        <div className='px-5 md:px-14 pt-6 pb-12'>
        <form action="/send-data-here" method="post" className='grid grid-cols-2 gap-5'>
            <div>
            <label for="first">Name</label><br/>
            <input type="text" id="first" name="first" className="bg-transparent border-b border-black mb-2 max-w-[90%] md:max-w-full"/><br/>
            </div>
            <div>
            <label for="last">Company</label><br/>
            <input type="text" id="last" name="last" className="bg-transparent border-b border-black mb-2 max-w-[90%] md:max-w-full"/><br/>
            </div>
            <div>
            <label for="first">Email</label><br/>
            <input type="text" id="first" name="first" className="bg-transparent border-b border-black mb-2 max-w-[90%] md:max-w-full"/><br/>
            </div>
            <div>
            <label for="last">Tel</label><br/>
            <input type="text" id="last" name="last" className="bg-transparent border-b border-black mb-2 max-w-[90%] md:max-w-full"/><br/>
            </div>
            <div className='col-span-2'>
            <label for="last">Message</label><br/>
            <textarea maxlength="5000" id="Message" name="Message" data-name="Message" required="" className="border border-black bg-transparent p-3 w-full mt-1.5"></textarea><br/>
            </div>
            <button type="submit" className="rounded-full bg-black text-pink border border-black px-5 py-2 hover:bg-transparent hover:text-black xxl:px-10 xxl:py-4 xxl:text-4xl mt-5">Submit</button>
        </form>
        </div>
        <div className='text-lg md:text-xl font-bold uppercase flex justify-between bg-black text-pink px-5 md:px-10 py-8 rounded-b-xl space-x-5'>
            <div className='leading-6'>
                <div className='hover:text-white'>hello@vivalazoom</div>
                <div className='hover:text-white'>+44(0)161 225 1045</div>
            </div>
            <div className='leading-6'>
                <div className='hover:text-white'>INSTAGRAM</div>
                <div className='hover:text-white'>LINKEDIN</div>
                <div className='hover:text-white'>BEHANCE</div>
            </div>
        </div>
        </motion.div>
        }
    </motion.div>
    </div>
    </>
)
}

export default ContactCard

