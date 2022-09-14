import Link from 'next/link'

const Button = ({ href, text }) => (
<Link href={href}>
<a className="rounded-full border border-black px-5 py-2 text-2xl hover:bg-black hover:text-white xxl:px-10 xxl:py-4 xxl:text-4xl">
    {text}
</a>
</Link>
)

export default Button
