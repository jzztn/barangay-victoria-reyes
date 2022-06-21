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
import LandingPageLayout from '../components/layout/landing-page'
import Hero from '../components/section/hero'
import Advantages from '../components/section/advantages'
import How from '../components/section/how'
import Loading from '../components/section/loading'
import SideBar from '../components/styled/sidebar'

const LadingPage: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) return
    router.push(`/user/${String(session.user!.email!.split('@').at(0))}/profile`)
  }, [session])

  if (session !== null) return <Loading/>

  return (
    <LandingPageLayout>
      <Header>
        {/* mobile navbar */}
        <div className="lg:hidden">
          <NavigationBar fixed={true}>
            <Logo place="justify-start" />
            <SideBar logout={false} items={[
              {name:"About Us" ,link:"#hero"},
              {name:"Advantages" ,link:"#advantages"},
              {name:"How" ,link:"#how"},
              {name:"Visit Us", link:"#footer"},
              {name:"Admin Login", link:"/admin"},
            ]}/>
          </NavigationBar>
        </div>

        {/* laptop navbar */}
        <div className="hidden lg:block">
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
              <NavLink name="Visit Us" link="#footer" neumorphism={true} />
              <NavLink name="Admin Login" link="/admin" neumorphism={false} />
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
