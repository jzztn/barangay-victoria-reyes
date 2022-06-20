interface IProps {
  fixed:boolean
  children:React.ReactNode
}

const NavigationBar = ({children, fixed}:IProps) => {
  return (
    <nav className={`${fixed ? "fixed top-0 bg-white p-5" : "bg-white shadow-sm shadow-gray/50 p-4"} w-full grid grid-flow-col space-between items-center`}>
      {children}
    </nav>
  )
}

export default NavigationBar