interface IProps {
  name:string
}
const Name = ({name} : IProps) => {
  return (
    <h1 className='text-sm font-medium tracking-wide mr-10'>{name}</h1>
  )
}

export default Name