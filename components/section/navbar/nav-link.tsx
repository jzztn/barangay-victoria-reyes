import Link from 'next/link'

interface IProps {
  link: string
  name: string
  neumorphism: boolean
}

const NavLink = ({ link, name, neumorphism }: IProps) => {
  return (
    <Link href={link}>
      <li
        className={`${
          neumorphism
            ? 'hover:shadow-md hover:shadow-gray/40'
            : 'hover:bg-primary/30'
        } text-black text-sm font-medium tracking-wide cursor-pointer hover:text-primary py-2 px-5 md:px-6 rounded-md transition-all duration-300`}
      >
        {name}
      </li>
    </Link>
  )
}

export default NavLink
