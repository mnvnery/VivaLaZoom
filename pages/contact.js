import { request } from '../lib/datocms'
import Head from 'next/head'

const CONTACT_QUERY = `{
    contact {
        instagram
        linkedin
        behance
        phone
        email
    }
}`


export async function getStaticProps() {
    const data = await request({
        query: CONTACT_QUERY,
    })

    return {
        props: {
            contact: data.contact,
        },
    }
}

export default function Contact({contact}) {
    return (
    <>

    <div className="min-h-[8vh] md:min-h-[11vh] 2xl:min-h-[7vh] xxl:min-h-[9vh] mb-28">
            <div className={`flex justify-center items-center z-20 xxl:top-60`}>
                <div layout  className={`bg-pink min-h-[20px] min-w-[10em] rounded-xl md:mx-0`}>
                    <div className='flex flex-col xxl:text-4xl pt-6'>
                    <div className='px-5 md:px-14 pt-6 pb-12 xxl:pb-20'>
                    <form name="contact" method="POST" action="https://api.web3forms.com/submit" className='grid grid-cols-2 gap-5'>
                    <input type="hidden" name="access_key" value="3e12a349-5362-4658-9e29-11a7b22cb4a4" />
                        <div>
                        <label for="first">Name</label><br/>
                        <input type="text" id="first" name="first" className="bg-transparent border-b rounded-none border-black mb-2 max-w-[90%] md:max-w-full xxl:mb-10"/><br/>
                        </div>
                        <div>
                        <label for="last">Company</label><br/>
                        <input type="text" id="last" name="last" className="bg-transparent border-b rounded-none border-black mb-2 max-w-[90%] md:max-w-full xxl:mb-10"/><br/>
                        </div>
                        <div>
                        <label for="first">Email</label><br/>
                        <input type="text" id="first" name="first" className="bg-transparent border-b rounded-none border-black mb-2 max-w-[90%] md:max-w-full xxl:mb-10"/><br/>
                        </div>
                        <div>
                        <label for="last">Tel</label><br/>
                        <input type="text" id="last" name="last" className="bg-transparent border-b border-black mb-2 max-w-[90%] md:max-w-full xxl:mb-10"/><br/>
                        </div>
                        <div className='col-span-2'>
                        <label for="last">Message</label><br/>
                        <textarea maxlength="5000" id="Message" name="Message" data-name="Message" required="" className="border border-black bg-transparent p-3 w-full mt-1.5"></textarea><br/>
                        </div>
                        <button type="submit" className="rounded-full bg-black text-pink border border-black px-5 py-2 hover:bg-transparent hover:text-black xxl:px-10 xxl:py-4 xxl:text-4xl mt-5 xxl:mt-12">Submit</button>
                    </form>
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
                    </div>
                </div>
            </div>
        </div>
    </>
)
}