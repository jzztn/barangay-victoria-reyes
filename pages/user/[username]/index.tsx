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
import RequestDocuments from '../../../components/section/request'
import SidePanel from '../../../components/section/side-panel'
import Registration from '../../../components/styled/modals/registration'
import SideBar from '../../../components/styled/sidebar'
import type { User } from '../../../prisma/definition'
import serializeData from '../../../utilities/serialize-data'

interface Props {
  user: User
}

const User: NextPage<Props> = ({ user }) => {
  console.log(user.email.split('@')[0])
  return (
    <Layout store={{ user }}>
      <Header>
        {/* mobile navbar */}
        <div className="lg:hidden">
          <NavigationBar fixed={false}>
            <Logo place="justify-start" />
            <SideBar admin={false}
              items={[
                { name: 'Request', link: `/user/${user.email.split('@')[0]}` },
                {
                  name: 'Notifications',
                  link: `/user/${user.email.split('@')[0]}/notifications`,
                },
                {
                  name: 'Profile',
                  link: `/user/${user.email.split('@')[0]}/profile`,
                },
                {
                  name: 'Payment',
                  link: `/user/${user.email.split('@')[0]}/payment`,
                },
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
              <Button label="Log Out" color={true} handler={() => signOut()} />
            </NavLinks>
          </NavigationBar>
        </div>
      </Header>

      <Main>
        <section className="h-full grid lg:grid-cols-[auto,1fr]">
          <SidePanel image={user.image} name={user.email.split('@')[0]} admin={false} />
          <section
            className={`grid ${
              user.authorized ? 'justify-center items-center' : ''
            }`}
          >
            {user.authorized ? (
              <Registration user={user} />
            ) : (
              <RequestDocuments user={user} />
            )}
          </section>
        </section>
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
