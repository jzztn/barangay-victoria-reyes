import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { signOut } from 'next-auth/react'
import prisma from '../../../adapters/prisma'
import Name from '../../../components/elements/account-name'
import Button from '../../../components/elements/button'
import Logo from '../../../components/elements/logo'
import Layout from '../../../components/layout'
import Header from '../../../components/layout/header'
import Main from '../../../components/layout/main'
import NavigationBar from '../../../components/section/navbar'
import NavLinks from '../../../components/section/navbar/nav-links'
import SidePanel from '../../../components/section/side-panel'
import Registration from '../../../components/styled/modals/registration'
import SideBar from '../../../components/styled/sidebar'
import type { User } from '../../../prisma/definition'
import serializeData from '../../../utilities/serialize-data'

interface Props {
  user: User
}

const User: NextPage<Props> = ({ user }) => {
  return (
    <Layout store={{ user }}>
      <Header>
        {/* mobile navbar */}
        <div className="lg:hidden">
          <NavigationBar fixed={true}>
            <Logo place="justify-start" />
            <SideBar
              items={[
                { name: 'Request', link: '#' },
                { name: 'Notifications', link: '#' },
                { name: 'Profile', link: '#' },
                { name: 'Logout', link: '/' },
              ]}
            />
          </NavigationBar>
        </div>

        {/* laptop navbar */}
        <div className="hidden lg:block">
          <NavigationBar fixed={false}>
            <Logo place="justify-start" />
            <NavLinks>
              <Name name={user.name} />
              <Button label="Log Out" color={true} handler={() => signOut()}/>
            </NavLinks>
          </NavigationBar>
        </div>
      </Header>

      <Main>
        {/* mobile */}
        <div className="lg:hidden">
          <section className='h-full grid justify-center'>
            <Registration />
          </section>
        </div>

        {/* laptop */}
        <div className="hidden lg:block">
          <section className="h-full grid grid-cols-[auto,1fr] ">
            <SidePanel image={user.image}/>
            <Registration/>
          </section>
        </div>
      </Main>
    </Layout>
  )
}

export default User

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: { email: `${String(params!.username)}@gmail.com` },
    include: {
      profile: true,
      records: {
        where: { withId: null },
        include: { members: true },
      },
    },
  })
  return {
    props: {
      user: serializeData(user),
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany({
    include: {
      profile: true,
      records: {
        where: { withId: null },
        include: { members: true },
      },
    },
  })

  const paths = users.map((user) => {
    return {
      params: { username: String(user.email!.split('@')[0]) },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}
