import { Prisma } from '@prisma/client'
import moment from 'moment'
import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next'
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
import TableHeaders from '../../../components/section/table/header'
import TableHeader from '../../../components/section/table/header/header'
import TableRow from '../../../components/section/table/row/row'
import TableRows from '../../../components/section/table/row'
import TableStatus from '../../../components/section/table/status'
import SideBar from '../../../components/styled/sidebar'
import type { User } from '../../../prisma/definition'
import serializeData from '../../../utilities/serialize-data'
import Image from 'next/image'

interface Props {
  user: User
}

const Notifications: NextPage<Props> = ({ user }) => {
  console.log(user)
  // search input field
  const [input, setInput] = useState('')

  // filter placeholder
  const [placeholder, setPlaceholder] = useState('Filter By')

  return (
    <Layout store={{ user }}>
      <Header>
        {/* mobile navbar */}
        <div className="lg:hidden">
          <NavigationBar fixed={false}>
            <Logo place="justify-start" />
            <SideBar
              admin={false}
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
          <SidePanel
            image={user.image}
            name={user.email.split('@')[0]}
            admin={false}
          />
          <section className="h-screen overflow-hidden grid grid-rows-[auto,auto,auto,1fr] gap-8 px-10 py-7">
            <h1 className="font-semibold tracking-wide">Notifications</h1>
            <div className="grid lg:grid-cols-[1fr,auto] gap-5 lg:gap-10">
              <Search input={input} setInput={setInput} />
              <Filter
                placeholder={placeholder}
                setPlaceholder={setPlaceholder}
                resident={false}
              />
            </div>

            {/* notification count */}
            <h4 className="text-xs lg:text-sm font-medium mb-8">
              ALL ( <span className="font-bold">{user.tickets!.length}</span> )
            </h4>

            {/* table */}
            <div className="h-[470px] overflow-hidden">
              {/* default datas */}
              {input === '' && placeholder === 'Filter By' && (
                <Table>
                  {/* headers */}
                  <TableHeaders>
                    <TableHeader name="Request ID" />
                    <TableHeader name="Full Name" />
                    <TableHeader name="Type" />
                    <TableHeader name="Request Date" />
                    <div className="ml-auto">
                      <TableHeader name="Status" />
                    </div>
                  </TableHeaders>

                  {/* rows */}
                  <div>
                    {user.tickets!.map((request) => (
                      <TableRows key={request.id}>
                        <TableRow name={request.id} />
                        <TableRow name={user.name} />
                        <TableRow
                          name={
                            request.type[0].toUpperCase() +
                            request.type.slice(1)
                          }
                        />
                        <TableRow
                          name={moment(request.createAt).format('LL')}
                        />
                        <div className="ml-auto">
                          <TableStatus admin={false} status={request.status} />
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
                  <TableHeaders>
                    <TableHeader name="Request ID" />
                    <TableHeader name="Full Name" />
                    <TableHeader name="Type" />
                    <TableHeader name="Request Date" />
                    <div className="ml-auto">
                      <TableHeader name="Status" />
                    </div>
                  </TableHeaders>

                  {/* rows */}
                  <div>
                    {user
                      .tickets!.filter(
                        (request) =>
                          request.id
                            .toLowerCase()
                            .includes(input.toLowerCase()) ||
                          request.type
                            .toLowerCase()
                            .includes(input.toLowerCase()) ||
                          request.status
                            .toLowerCase()
                            .includes(input.toLowerCase()) ||
                          moment(request.createAt)
                            .format('LL')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                      )
                      .map((request) => (
                        <TableRows key={request.id}>
                          <TableRow name={request.id} />

                          <TableRow name={user.name} />
                          <TableRow
                            name={
                              request.type[0].toUpperCase() +
                              request.type.slice(1)
                            }
                          />
                          <TableRow
                            name={moment(request.createAt).format('LL')}
                          />
                          <div className="ml-auto">
                            <TableStatus
                              admin={false}
                              status={request.status}
                            />
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
                  <TableHeaders>
                    <TableHeader name="Request ID" />
                    <TableHeader name="Full Name" />
                    <TableHeader name="Type" />
                    <TableHeader name="Request Date" />
                    <div className="ml-auto">
                      <TableHeader name="Status" />
                    </div>
                  </TableHeaders>

                  {/* rows */}
                  <div>
                    {user
                      .tickets!.filter(
                        (request) =>
                          request.type.toLowerCase() === placeholder ||
                          request.status.toLowerCase() === placeholder ||
                          moment(request.createAt)
                            .format('LL')
                            .toLowerCase() === placeholder
                      )
                      .filter(
                        (request) =>
                          request.id
                            .toLowerCase()
                            .includes(input.toLowerCase()) ||
                          request.type
                            .toLowerCase()
                            .includes(input.toLowerCase()) ||
                          request.status
                            .toLowerCase()
                            .includes(input.toLowerCase()) ||
                          request.createAt
                            .toString()
                            .toLowerCase()
                            .includes(input.toLowerCase())
                      )
                      .map((request) => (
                        <TableRows key={request.id}>
                          <TableRow name={request.id} />

                          <TableRow name={user.name} />
                          <TableRow
                            name={
                              request.type[0].toUpperCase() +
                              request.type.slice(1)
                            }
                          />
                          <TableRow
                            name={moment(request.createAt).format('LL')}
                          />
                          <div className="ml-auto">
                            <TableStatus
                              admin={false}
                              status={request.status}
                            />
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
                  <TableHeaders>
                    <TableHeader name="Request ID" />
                    <TableHeader name="Full Name" />
                    <TableHeader name="Type" />
                    <TableHeader name="Request Date" />
                    <div className="ml-auto">
                      <TableHeader name="Status" />
                    </div>
                  </TableHeaders>

                  {/* rows */}
                  <div>
                    {user
                      .tickets!.filter(
                        (request) =>
                          request.type.toLowerCase() === placeholder ||
                          request.status.toLowerCase() === placeholder ||
                          moment(request.createAt)
                            .format('LL')
                            .toLowerCase() === placeholder
                      )
                      .map((request) => (
                        <TableRows key={request.id}>
                          <TableRow name={request.id} />

                          <TableRow name={user.name} />
                          <TableRow
                            name={
                              request.type[0].toUpperCase() +
                              request.type.slice(1)
                            }
                          />
                          <TableRow
                            name={moment(request.createAt).format('LL')}
                          />
                          <div className="ml-auto">
                            <TableStatus
                              admin={false}
                              status={request.status}
                            />
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const user = await prisma.user.findUnique({
    where: { email: `${String(query!.username)}@gmail.com` },
    include: {
      profile: true,
      records: {
        where: { withId: null },
        include: { members: true },
      },
      tickets: {
        orderBy: {
          createAt: 'desc',
        },
      }
    },
  })

  return {
    props: {
      user: serializeData(user),
    },
    // revalidate: 1
  }
}

