import Image from "next/image"

interface IProps {
  title: string
  image: string

}

const CreditCard = ({ title, image }: IProps) => {
  return (
    <div className="w-full py-3 px-4 grid grid-cols-[1fr,auto] items-center rounded-md lg:w-80 border-[1px] border-gray/50 cursor-pointer hover:bg-slate-100 transition-all duration-300">
      <div className='flex gap-3 items-center'>
        <input type="radio"/>
        <h1 className="text-sm font-medium tracking-wide">{title}</h1>
      </div>

      <div className='w-20 h-8 relative'>
        <Image src={image} layout="fill" objectFit="scale-down"/>
      </div>
    </div>
  )
}

export default CreditCard