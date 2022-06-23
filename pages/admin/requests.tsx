import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next'
import prisma from '../../adapters/prisma'
import Name from '../../components/elements/account-name'
import Button from '../../components/elements/button'
import Layout from '../../components/layout'
import Header from '../../components/layout/header'
import Main from '../../components/layout/main'
import NavigationBar from '../../components/section/navbar'
import NavLinks from '../../components/section/navbar/nav-links'
import SidePanel from '../../components/section/side-panel'
import SideBar from '../../components/styled/sidebar'
import type { Resident, User } from '../../prisma/definition'
import serializeData from '../../utilities/serialize-data'
import Logo from '../../components/elements/logo'
import { useRouter } from 'next/router'
import Search from '../../components/elements/search'
import Filter from '../../components/elements/filter'
import Table from '../../components/section/table'
import TableHeaders from '../../components/section/table/header'
import TableHeader from '../../components/section/table/header/header'
import TableRows from '../../components/section/table/row'
import TableRow from '../../components/section/table/row/row'
import TableStatus from '../../components/section/table/status'
import { useState } from 'react'
import { Ticket } from '@prisma/client'
import moment from 'moment'
import Image from 'next/image'

type TTicket = (Ticket & { user: User })[]

interface Props {
  users: User[]
  residents: Resident[]
  tickets: TTicket
}

const Requests: NextPage<Props> = ({ users, residents, tickets }) => {
  console.log(tickets)
  const router = useRouter()

  // search input field
  const [input, setInput] = useState('')

  // filter placeholder
  const [placeholder, setPlaceholder] = useState('Filter By')

  return (
    <section className="h-screen grid grid-rows-[auto,1fr]">
      <Header>
        {/* mobile navbar */}
        <div className="lg:hidden">
          <NavigationBar fixed={false}>
            <Logo place="justify-start" />
            <SideBar
              admin={true}
              items={[
                { name: 'Residents', link: '/admin' },
                {
                  name: 'Requests',
                  link: '/admin/requests',
                },
                {
                  name: 'Registrations',
                  link: '/admin/registrations',
                },
                {
                  name: 'Profile',
                  link: '/admin/profile',
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
              <Name name="Administration" />
              <Button
                label="Log Out"
                color={true}
                handler={() => router.push('/')}
              />
            </NavLinks>
          </NavigationBar>
        </div>
      </Header>

      <Main>
        <section className="h-full grid lg:grid-cols-[auto,1fr]">
          <SidePanel image="\images\admin.png" admin={true} />
          <section className="grid grid-rows-[auto,auto,auto,1fr] gap-8 px-10 py-7">
            <div className="absolute w-96 h-96 lg:w-[450px] lg:h-[450px] top-[50%] bottom-[50%] -translate-y-[50%] left-[50%] right-[50%] -translate-x-[50%] -z-50 grid justify-items-center items-center opacity-30">
              <Image src="/images/logo.png" layout="fill" objectFit="cover" />
            </div>
            <h1 className="font-semibold tracking-wide">Requests</h1>
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
              ALL ( <span className="font-bold">{tickets.length}</span> )
            </h4>

            {/* table */}
            <div className="overflow-hidden">
              {/* default datas */}
              {input === '' && placeholder === 'Filter By' && (
                <Table>
                  {/* headers */}
                  <TableHeaders>
                    <TableHeader name="Full Name" />
                    <TableHeader name="Type" />
                    <TableHeader name="Request Date" />
                    <div className="ml-auto">
                      <TableHeader name="Status" />
                    </div>
                  </TableHeaders>

                  {/* rows */}
                  <div className="flex flex-col">
                    {tickets!.map((ticket, index) => (
                      <TableRows key={index}>
                        <TableRow
                          name={`${ticket.user.profile?.firstName} ${ticket.user.profile?.lastName}`}
                        />
                        <TableRow
                          name={
                            ticket.type[0].toUpperCase() + ticket.type.slice(1)
                          }
                        />
                        <TableRow name={moment(ticket.createAt).format('LL')} />
                        <div className="ml-auto">
                          <TableStatus
                            admin={true}
                            ticketId={ticket.id}
                            status={ticket.status}
                          />
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
                    <TableHeader name="Full Name" />
                    <TableHeader name="Type" />
                    <TableHeader name="Request Date" />
                    <div className="ml-auto">
                      <TableHeader name="Status" />
                    </div>
                  </TableHeaders>

                  {/* rows */}
                  <div className="flex flex-col ">
                    {tickets
                      .filter(
                        (ticket) =>
                          ticket.type.toLowerCase().includes(input) ||
                          ticket.status.toLowerCase().includes(input) ||
                          moment(ticket.createAt)
                            .format('LL')
                            .toLowerCase()
                            .includes(input)
                      )
                      .map((ticket) => (
                        <TableRows key={ticket.id}>
                          <TableRow
                            name={`${ticket.user.profile?.firstName} ${ticket.user.profile?.lastName}`}
                          />
                          <TableRow
                            name={
                              ticket.type[0].toUpperCase() +
                              ticket.type.slice(1)
                            }
                          />
                          <TableRow
                            name={moment(ticket.createAt).format('LL')}
                          />
                          <div className="ml-auto">
                            <TableStatus
                              admin={true}
                              ticketId={ticket.id}
                              status={ticket.status}
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
                    <TableHeader name="Full Name" />
                    <TableHeader name="Type" />
                    <TableHeader name="Request Date" />
                    <div className="ml-auto">
                      <TableHeader name="Status" />
                    </div>
                  </TableHeaders>

                  {/* rows */}
                  <div className="flex flex-col ">
                    {tickets!
                      .filter(
                        (ticket) =>
                          ticket.type.toLowerCase() === placeholder ||
                          ticket.status.toLowerCase() === placeholder ||
                          moment(ticket.createAt).format('LL').toLowerCase() ===
                            placeholder
                      )
                      .filter(
                        (ticket) =>
                          ticket.type.toLowerCase().includes(input) ||
                          ticket.status.toLowerCase().includes(input) ||
                          ticket.createAt
                            .toString()
                            .toLowerCase()
                            .includes(input)
                      )
                      .map((ticket) => (
                        <TableRows key={ticket.id}>
                          <TableRow
                            name={`${ticket.user.profile?.firstName} ${ticket.user.profile?.lastName}`}
                          />
                          <TableRow
                            name={
                              ticket.type[0].toUpperCase() +
                              ticket.type.slice(1)
                            }
                          />
                          <TableRow
                            name={moment(ticket.createAt).format('LL')}
                          />
                          <div className="ml-auto">
                            <TableStatus
                              admin={true}
                              ticketId={ticket.id}
                              status={ticket.status}
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
                    <TableHeader name="Full Name" />
                    <TableHeader name="Type" />
                    <TableHeader name="Request Date" />
                    <div className="ml-auto">
                      <TableHeader name="Status" />
                    </div>
                  </TableHeaders>

                  {/* rows */}
                  <div className="flex flex-col">
                    {tickets!
                      .filter(
                        (ticket) =>
                          ticket.type.toLowerCase() === placeholder ||
                          ticket.status.toLowerCase() === placeholder ||
                          moment(ticket.createAt).format('LL').toLowerCase() ===
                            placeholder
                      )
                      .map((ticket) => (
                        <TableRows key={ticket.id}>
                          <TableRow
                            name={`${ticket.user.profile?.firstName} ${ticket.user.profile?.lastName}`}
                          />
                          <TableRow
                            name={
                              ticket.type[0].toUpperCase() +
                              ticket.type.slice(1)
                            }
                          />
                          <TableRow
                            name={moment(ticket.createAt).format('LL')}
                          />
                          <div className="ml-auto">
                            <TableStatus
                              admin={true}
                              ticketId={ticket.id}
                              status={ticket.status}
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
    </section>
  )
}

export default Requests

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany({
    include: {
      records: true,
    },
  })

  const residents = await prisma.resident.findMany({
    where: {
      withId: null,
    },

    include: {
      members: true,
    },
  })

  const tickets = await prisma.ticket.findMany({
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  })

  return {
    props: {
      users: serializeData(users),
      residents: serializeData(residents),
      tickets: serializeData(tickets),
    },
  }
}
