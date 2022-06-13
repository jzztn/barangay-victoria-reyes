import Card from "./card"

const Cards = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='grid md:grid-cols-2 gap-8 md:gap-16'>
      {children}
    </div>
  )
}

export default Cards