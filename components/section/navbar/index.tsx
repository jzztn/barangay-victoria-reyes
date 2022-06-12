interface IProps {
  fixed:boolean
  children:React.ReactNode
}

const NavigationBar = ({children, fixed}:IProps) => {
  return (
    <nav className={`${fixed ? "fixed top-0 bg-white/70 backdrop-blur p-5" : ""} w-full grid grid-flow-col space-between items-center`}>
      {children}
    </nav>
  )
}

export default NavigationBar