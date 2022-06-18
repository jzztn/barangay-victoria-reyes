import { Prisma } from '@prisma/client'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import prisma from '../../../adapters/prisma'
import Name from '../../../components/elements/account-name'
import Button from '../../../components/elements/button'
import Filter from '../../../components/elements/filter'
import Logo from '../../../components/elements/logo'
import Search from '../../../components/elements/search'
import Layout from '../../../components/layout'
import Header from '../../../components/layout/header'
import Main from '../../../components/layout/main'
import NavigationBar from '../../../components/section/navbar'
import NavLinks from '../../../components/section/navbar/nav-links'
import SidePanel from '../../../components/section/side-panel'
import Table from '../../../components/section/table'
import TableHeader from '../../../components/section/table/header'
import TableRow from '../../../components/section/table/row'
import TableRows from '../../../components/section/table/rows'
import TableStatus from '../../../components/section/table/status'
import SideBar from '../../../components/styled/sidebar'
import type { User } from '../../../prisma/definition'
import serializeData from '../../../utilities/serialize-data'

interface Props {
  user: User
}

const Notifications: NextPage<Props> = ({ user }) => {
  console.log(user)
  // search input field
  const [input, setInput] = useState('')

  // filter placeholder
  const [placeholder, setPlaceholder] = useState('Filter By')

  // dummy data
  const [requests] = useState([
    {
      name: 'Jazztine Cruz',
      type: 'Clearance Certificate',
      date: 'September 16, 2022',
      status: 'approved',
    },
    {
      name: 'Jazztine Cruz',
      type: 'Barangay Certificate',
      date: 'October 16, 2022',
      status: 'declined',
    },
    {
      name: 'Jazztine Cruz',
      type: 'Cedula',
      date: 'September 22, 2022',
      status: 'pending',
    },
    {
      name: 'Jazztine Cruz',
      type: 'Certificate of Indigency',
      date: 'September 1, 2022',
      status: 'approved',
    },
    {
      name: 'Jazztine Cruz',
      type: 'Clearance Certificate',
      date: 'June 16, 2022',
      status: 'pending',
    },
    {
      name: 'Jazztine Cruz',
      type: 'Barangay Certificate',
      date: 'August 02, 2022',
      status: 'declined',
    },
  ])

  return (
    <Layout store={{ user }}>
      <Header>
        {/* mobile navbar */}
        <div className="lg:hidden">
          <NavigationBar fixed={false}>
            <Logo place="justify-start" />
            <SideBar
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
            <div className='grid lg:grid-cols-[1fr,auto] gap-5 lg:gap-10'>
              <Search input={input} setInput={setInput} />
              <Filter
                placeholder={placeholder}
                setPlaceholder={setPlaceholder}
              />
            </div>

            {/* notification count */}
            <h4 className="text-xs lg:text-sm font-medium">
              ALL ( <span className="font-bold">{requests.length}</span> )
            </h4>

            {/* table */}
            <div>
              {/* default datas */}
              {input === '' && placeholder === 'Filter By' && (
                <Table>
                  {/* headers */}
                  <div className="grid grid-flow-col items-center ">
                    <TableHeader name="Full Name" />
                    <TableHeader name="Type" />
                    <TableHeader name="Request Date" />
                    <div className="ml-auto">
                      <TableHeader name="Status" />
                    </div>
                  </div>

                  {/* rows */}
                  <div className="flex flex-col gap-2">
                    {requests.map((request, index) => (
                      <TableRows key={index}>
                        <TableRow name={request.name} />
                        <TableRow name={request.type} />
                        <TableRow name={request.date} />
                        <div className="ml-auto">
                          <TableStatus status={request.status} />
                        </div>
                      </TableRows>
                    ))}
                  </div>
                </Table>
              )}

              {/* search data */}
              {input !== '' && placeholder === 'Filter By' && (
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

                  {/* rows */}
                  <div className="flex flex-col gap-2">
                    {requests
                      .filter(
                        (request) =>
                          request.type.toLowerCase().includes(input) ||
                          request.status.toLowerCase().includes(input) ||
                          request.date.toLowerCase().includes(input)
                      )
                      .map((request, index) => (
                        <TableRows key={index}>
                          <TableRow name={request.name} />
                          <TableRow name={request.type} />
                          <TableRow name={request.date} />
                          <div className="ml-auto">
                            <TableStatus status={request.status} />
                          </div>
                        </TableRows>
                      ))}
                  </div>
                </Table>
              )}

              {/* search data in filtered items */}
              {input !== '' && placeholder !== 'Filter By' && (
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

                  {/* rows */}
                  <div className="flex flex-col gap-2">
                    {requests
                      .filter(
                        (request) =>
                          request.type.toLowerCase() === placeholder ||
                          request.status.toLowerCase() === placeholder ||
                          request.date.toLowerCase() === placeholder
                      )
                      .filter(
                        (request) =>
                          request.type.toLowerCase().includes(input) ||
                          request.status.toLowerCase().includes(input) ||
                          request.date.toLowerCase().includes(input)
                      )
                      .map((request, index) => (
                        <TableRows key={index}>
                          <TableRow name={request.name} />
                          <TableRow name={request.type} />
                          <TableRow name={request.date} />
                          <div className="ml-auto">
                            <TableStatus status={request.status} />
                          </div>
                        </TableRows>
                      ))}
                  </div>
                </Table>
              )}

              {/* filter data */}
              {input === '' && placeholder !== 'Filter By' && (
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

                  {/* rows */}
                  <div className="flex flex-col gap-2">
                    {requests
                      .filter(
                        (request) =>
                          request.type.toLowerCase() === placeholder ||
                          request.status.toLowerCase() === placeholder ||
                          request.date.toLowerCase() === placeholder
                      )
                      .map((request, index) => (
                        <TableRows key={index}>
                          <TableRow name={request.name} />
                          <TableRow name={request.type} />
                          <TableRow name={request.date} />
                          <div className="ml-auto">
                            <TableStatus status={request.status} />
                          </div>
                        </TableRows>
                      ))}
                  </div>
                </Table>
              )}
            </div>
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
      tickets: true,
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
