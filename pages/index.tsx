import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import Main from '../components/layout/main'
import Footer from '../components/layout/footer'
import Header from '../components/layout/header'
import NavigationBar from '../components/section/navbar'
import Logo from '../components/elements/logo'
import NavLinks from '../components/section/navbar/nav-links'
import NavLink from '../components/section/navbar/nav-link'
import { MenuAlt3Icon } from '@heroicons/react/solid'
import LandingPageLayout from '../components/layout/landing-page'
import Hero from '../components/section/hero'
import Advantages from '../components/section/advantages'
import How from '../components/section/how'
import Sidebar from '../components/elements/sidebar'
import Loading from '../components/section/loading'

const LadingPage: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!session) return
    router.push(`/user/${String(session.user!.email!.split('@').at(0))}`)
  }, [session])

  if (session !== null) return <Loading/>

  return (
    <LandingPageLayout>
      <Header>
        {/* mobile navbar */}
        <div className="lg:hidden">
          <NavigationBar fixed={false}>
            <Logo place="justify-start" />
            <MenuAlt3Icon
              className="w-6 h-6 ml-auto hover:text-primary cursor-pointer trnasition-colors duration-300"
              onClick={() => setOpen(!open)}
            />
          </NavigationBar>
        </div>
        {open && (
          <Sidebar close={() => setOpen(!open)}>
            <NavLink name="About Us" link="#hero" neumorphism={false} />
            <NavLink name="Advantages" link="#advantages" neumorphism={false} />
            <NavLink name="How" link="#how" neumorphism={false} />
            <NavLink name="Visit Us" link="#footer" neumorphism={false} />
          </Sidebar>
        )}

        {/* laptop navbar */}
        <div className="hidden md:block">
          <NavigationBar fixed={true}>
            <Logo place="justify-start" />
            <NavLinks>
              <NavLink name="About Us" link="#hero" neumorphism={true} />
              <NavLink
                name="Advantages"
                link="#advantages"
                neumorphism={true}
              />
              <NavLink name="How" link="#how" neumorphism={true} />
              <NavLink name="Visit Us" link="#footer" neumorphism={false} />
            </NavLinks>
          </NavigationBar>
        </div>
      </Header>

      <Main>
        <Hero />
        <Advantages />
        <How />
      </Main>
      <Footer />
    </LandingPageLayout>
  )
}

export default LadingPage
