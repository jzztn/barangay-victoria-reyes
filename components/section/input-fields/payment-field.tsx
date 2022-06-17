interface IProps {
  title:string
  placeholder:string
  type:string
}

const PaymentField = ({title, placeholder, type}:IProps) => {
  return (
    <>
    {type === "text" ? 
    <div className="flex flex-col gap-2">
      <h2 className="text-xs lg:text-sm font-medium tracking-wide">{title}</h2>
      <input
        type="text"
        placeholder={placeholder}
        className="py-3 pl-2 w-96"
      />
    </div> : (
      <div className="flex flex-col gap-2">
      <h2 className="text-xs lg:text-sm font-medium tracking-wide">{title}</h2>
      <textarea
        placeholder={placeholder}
        className="py-3 pl-2 w-96"
      />
    </div>
    )}
    
    </>
  )
}

export default PaymentField
