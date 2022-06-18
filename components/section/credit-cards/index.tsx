const CreditCards = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='grid lg:max-w-2xl lg:grid-cols-2 gap-y-3'>
      {children}
    </div>
  )
}

export default CreditCards