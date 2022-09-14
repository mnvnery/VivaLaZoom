import Image from 'next/image'
import Link from 'next/link'

const ProjectCard = ({ thumbnail, title, description, href }) => (
  <div className="hover-view">
    <Link href={href}>
      <div>
        <div className="relative h-[55vh] md:h-[70vh] w-full">
          <Image src={thumbnail} objectFit="cover" layout="fill" />
        </div>
        <div className="view relative">
          <div className="triangle absolute right-0 bottom-0"></div>
          <div className="absolute right-4 bottom-2 text-xl text-white md:text-2xl xxl:right-6 xxl:bottom-4 xxl:text-4xl">
            View
          </div>
        </div>
        <div className="mt-5">
          <div className="text-xl xxl:text-4xl">{title}</div>
          <div className="text-xl text-slate-600 xxl:text-4xl">{description}</div>
        </div>
      </div>
    </Link>
  </div>
)

export default ProjectCard
