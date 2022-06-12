const NavLinks = ({children}:{children:React.ReactNode}) => {
  return (
    <ul className='flex items-center ml-auto gap-3'>{children}</ul>
  )
}

export default NavLinks