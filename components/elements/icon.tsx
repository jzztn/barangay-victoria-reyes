import Link from "next/link"

interface IProps {
  Type:React.ComponentType<React.SVGProps<SVGSVGElement>>
  circleSize:string
  iconSize:string
  link:string
}

const Icon = ({Type, circleSize , iconSize, link}:IProps) => {
  return (
    <Link href={link}>
    <div className={`group hover:bg-primary/30 rounded-full grid place-content-center cursor-pointer ${circleSize}`}>
      <Type className={`${iconSize} text-black group-hover:text-primary`}/>
    </div></Link>
  )
}

export default Icon