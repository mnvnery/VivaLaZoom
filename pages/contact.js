import { request } from '../lib/datocms'

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
    console.log(contact)
    return (
    <>
    <div className='bg-petrol rounded-xl text-white px-10 py-20 mb-20 flex justify-between'>
        <div className='text-3xl font-bold uppercase'>
            <div>{contact.email}</div>
            <div>{contact.phone}</div>
            <div className='mt-8'>INSTAGRAM</div>
            <div>LINKEDIN</div>
            <div>BEHANCE</div>
        </div>
        <div>
            {/* 
        <form action="/send-data-here" method="post">
            <label for="first">First name:</label>
            <input type="text" id="first" name="first" />
            <label for="last">Last name:</label>
            <input type="text" id="last" name="last" />
            <button type="submit">Submit</button>
        </form>
        */}
        </div>
    </div>
    </>
)
}