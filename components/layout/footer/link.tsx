import Link from "next/link"

interface IProps {
  link:string
  label:string
  value:string
}

const FooterLink = ({link, label, value}:IProps) => {
  return (
    <Link href={link}>
      <h1 className='text-xs font-medium tracking-wide'>
        {label}
        <span className='text-xs font-normal tracking-wide'>{value}</span>
      </h1>
    </Link>
  )
}

export default FooterLink