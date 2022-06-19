interface IProps {
  title: string
  paragraph: string
}

const AdvantageCard = ({ title, paragraph }: IProps) => {
  return (
    <div className="group py-4 px-5 grid justify-center items-center text-center gap-4 md:gap-3 rounded-md">
      <h1 className="text-black/80 font-semibold tracking-wide font-poppins">
        {title}
      </h1>
      <p className="text-sm leading-relaxed md:max-w-lg text-gray">
        {paragraph}
      </p>

      <div className="w-0 h-1 bg-primary mt-5 rounded-full group-hover:w-full transition-all ease-in-out duration-700 cursor-pointer"></div>
    </div>
  )
}

export default AdvantageCard
