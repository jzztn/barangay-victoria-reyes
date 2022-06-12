import SignInButton from "../elements/button/signIn-button"

const Hero = () => {
  return (
    <div id="hero" className="grid gap-10 md:gap-20 mt-10 md:mt-20">
      <div className='grid gap-6 lg:gap-10 justify-center text-center'>
        <h1 className="text-xl lg:text-4xl font-black font-poppins tracking-wide">
          Inquire Documents Effortlessly
        </h1>
        <p className="text-gray text-sm tracking-wider leading-relaxed md:max-w-3xl lg:max-w-5xl text-center px-3">
          Barangay Victoria Management System is a website that entails to
          provide a user-friendly and convenient interface in terms of
          requesting and processing registration within its community. This
          serves as an automated service so that the user may have an option to
          process and request for the services without the need to walk-in on
          barangay centers.
        </p>

        {/* signin */}
        <SignInButton/>
      </div>

      <div className='max-w-7xl lg:mx-auto'>
        <img src="\images\request-laptop-version.png" alt="Request Laptop Version" className="w-full h-full" />
      </div>
    </div>
  )
}

export default Hero
