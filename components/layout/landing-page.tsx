const LandingPageLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='h-screen grid grid-rows-[auto,1fr,auto]'>{children}</div>
  )
}

export default LandingPageLayout