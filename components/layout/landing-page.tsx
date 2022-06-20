const LandingPageLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='h-screen grid grid-rows-[auto,1fr,auto] mt-10'>{children}</div>
  )
}

export default LandingPageLayout