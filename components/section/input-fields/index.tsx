const Fields = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='grid gap-10 lg:grid-cols-2 mt-10 lg:gap-20'>{children}</div>
  )
}

export default Fields