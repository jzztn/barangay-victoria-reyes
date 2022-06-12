import SignInButton from "../../elements/button/signIn-button"
import Logo from "../../elements/logo"
import FooterLink from "./link"

const Footer = () => {
  return (
    <div id="footer" className='grid justify-center text-center gap-2 p-6 mt-32'>
      <SignInButton/>
      <Logo place="justify-center mt-5"/>
      <FooterLink link="#" label="Visit Us: " value="8X9F+8P2, Fatima Rd, Victoria Reves, Dasmariñas, 4114 Cavite"/>
      <FooterLink link="#" label="Facebook Page: " value="Facebook/ Victoria-Reyes-Dasmarinas"/>
    </div>
  )
}

export default Footer