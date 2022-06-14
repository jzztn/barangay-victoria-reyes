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
import SearchSection from '../../../components/section/search-filter-sort'
import SidePanel from '../../../components/section/side-panel'
import Table from '../../../components/section/table'
import TableHeader from '../../../components/section/table/header'
import TableRow from '../../../components/section/table/row'
import TableRows from '../../../components/section/table/rows'
import TableStatus from '../../../components/section/table/status'
import Registration from '../../../components/styled/modals/registration'
import SideBar from '../../../components/styled/sidebar'
import type { User } from '../../../prisma/definition'
import serializeData from '../../../utilities/serialize-data'

interface Props {
  user: User
}

const Notifications: NextPage<Props> = ({ user }) => {
  return (
    <Layout store={{ user }}>
      <Header>
        {/* mobile navbar */}
        <div className="lg:hidden">
          <NavigationBar fixed={false}>
            <Logo place="justify-start" />
            <SideBar
              items={[
                { name: 'Request', link: `/user` },
                {
                  name: 'Notifications',
                  link: `/user/${user.email.split('@')[0]}/notifications`,
                },
                {
                  name: 'Profile',
                  link: `/user/${user.email.split('@')[0]}/profile`,
                },
                { name: 'Logout', link: '#' },
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
          <SidePanel image={user.image} name={user.email.split('@')[0]} />
          <section className="grid grid-rows-[auto,auto,auto,1fr] gap-8 px-10 py-7">
            <h1 className="font-semibold tracking-wide">Notifications</h1>
            <SearchSection />

            {/* notification count */}
            <h4 className="text-xs lg:text-sm font-medium">
              ALL ( <span className="font-bold">20</span> )
            </h4>

            {/* table */}
            <Table>
              {/* headers */}
              <div className="grid grid-flow-col items-center">
                <TableHeader name="Full Name" />
                <TableHeader name="Type" />
                <TableHeader name="Request Date" />
                <div className="ml-auto">
                  <TableHeader name="Status" />
                </div>
              </div>
              {/* row */}
              <div className="flex flex-col gap-2">
                <TableRows>
                  <TableRow name="Jazztine Cruz" />
                  <TableRow name="Clearance Certificate" />
                  <TableRow name="September 12, 2022" />
                  <div className="ml-auto">
                    <TableStatus status="Approved" />
                  </div>
                </TableRows>

                <TableRows>
                  <TableRow name="Jazztine Cruz" />
                  <TableRow name="Clearance Certificate" />
                  <TableRow name="September 12, 2022" />
                  <div className="ml-auto">
                    <TableStatus status="Approved" />
                  </div>
                </TableRows>

                <TableRows>
                  <TableRow name="Jazztine Cruz" />
                  <TableRow name="Clearance Certificate" />
                  <TableRow name="September 12, 2022" />
                  <div className="ml-auto">
                    <TableStatus status="Approved" />
                  </div>
                </TableRows>

                <TableRows>
                  <TableRow name="Jazztine Cruz" />
                  <TableRow name="Clearance Certificate" />
                  <TableRow name="September 12, 2022" />
                  <div className="ml-auto">
                    <TableStatus status="Approved" />
                  </div>
                </TableRows>

                <TableRows>
                  <TableRow name="Jazztine Cruz" />
                  <TableRow name="Clearance Certificate" />
                  <TableRow name="September 12, 2022" />
                  <div className="ml-auto">
                    <TableStatus status="Approved" />
                  </div>
                </TableRows>

                <TableRows>
                  <TableRow name="Jazztine Cruz" />
                  <TableRow name="Clearance Certificate" />
                  <TableRow name="September 12, 2022" />
                  <div className="ml-auto">
                    <TableStatus status="Approved" />
                  </div>
                </TableRows>

                <TableRows>
                  <TableRow name="Jazztine Cruz" />
                  <TableRow name="Clearance Certificate" />
                  <TableRow name="September 12, 2022" />
                  <div className="ml-auto">
                    <TableStatus status="Approved" />
                  </div>
                </TableRows>

                <TableRows>
                  <TableRow name="Jazztine Cruz" />
                  <TableRow name="Clearance Certificate" />
                  <TableRow name="September 12, 2022" />
                  <div className="ml-auto">
                    <TableStatus status="Approved" />
                  </div>
                </TableRows>

                <TableRows>
                  <TableRow name="Jazztine Cruz" />
                  <TableRow name="Clearance Certificate" />
                  <TableRow name="September 12, 2022" />
                  <div className="ml-auto">
                    <TableStatus status="Approved" />
                  </div>
                </TableRows>
              </div>
            </Table>
          </section>
        </section>
      </Main>
    </Layout>
  )
}

export default Notifications

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
