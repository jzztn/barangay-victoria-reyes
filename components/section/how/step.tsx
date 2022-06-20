interface IProps {
  count: string
  title: string
  paragraph: string
  end ? : boolean
}

const Step = ({ count, title, paragraph, end }: IProps) => {
  return (
    <div className="flex items-start gap-5 mt-8 lg:mt-6 w-[327px] md:w-[500px]">
      <div className='grid grid-flow-row gap-6 justify-center place-items-center'>
        {/* count */}
        <div className="bg-primary/30 w-10 h-10 rounded-full grid place-items-center cursor-pointer">
          <span className="text-primary text-xs font-semibold">{count}</span>
        </div>

        {/* line */}
        <div className={`${end ? "" :  "bg-gray/50 w-[1px] h-20"}`}></div>
      </div>

      {/* title and paragraph */}
      <div className='flex flex-col gap-2 lg:gap-2'>
        <h1 className="font-semibold tracking-wide">{title}</h1>
        <p className="text-left text-xs max-w-lg text-gray leading-relaxed ">
          {paragraph}
        </p>
      </div>
    </div>
  )
}

export default Step
