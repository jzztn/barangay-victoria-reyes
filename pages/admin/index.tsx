import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next'
import { signOut } from 'next-auth/react'
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
import { useState } from 'react'
import Search from '../../components/elements/search'
import Filter from '../../components/elements/filter'
import Table from '../../components/section/table'
import TableHeaders from '../../components/section/table/header'
import TableHeader from '../../components/section/table/header/header'
import TableRows from '../../components/section/table/row'
import TableRow from '../../components/section/table/row/row'
import { useRouter } from 'next/router'
import moment from 'moment'
import useAdminStore from '../../stores/use-admin-store'

interface Props {
  users: User[]
  residents: Resident[]
}

const Admin: NextPage<Props> = ({ users, residents }) => {
  console.log(users)
  // search input field
  const [input, setInput] = useState('')

  // filter placeholder
  const [placeholder, setPlaceholder] = useState('Filter By')

  const [adminAccoutn, setAdminAccount] = useState({
    username: '',
    password: '',
  })

  const {isLogin, login, logout} = useAdminStore()
  const router = useRouter()

  const handleLogin = () => {
    if (
      adminAccoutn.username === 'admin' &&
      adminAccoutn.password === 'admin123'
    ) {
      login()
    }
  }

  if (!isLogin) {
    return (
      <div className="h-screen grid place-items-center">
        <div>
          <div className="bg-white shadow-md shadow-gray px-6 py-10 max-w-3xl mx-auto rounded-md">
            <div className="flex flex-col gap-5">
              <h1 className="font-medium tracking-wide text-center font-poppins">
                Admin Login
              </h1>
              <input
                type="text"
                placeholder="username"
                onChange={(e) =>
                  setAdminAccount({ ...adminAccoutn, username: e.target.value })
                }
                className="py-3 w-96 pl-2 rounded-md bg-slate-50"
              />
              <input
                type="password"
                placeholder="password"
                onChange={(e) =>
                  setAdminAccount({ ...adminAccoutn, password: e.target.value })
                }
                className="py-3 w-96 pl-2 rounded-md bg-slate-50 mb-5"
              />

              <Button label="Login" color={true} handler={handleLogin} />

              <span className="text-xs text-primary font-semibold text-center">
                Barangay Victoria Reyes
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="h-screen grid grid-rows-[auto,1fr]">
      <Header>
        {/* mobile navbar */}
        <div className="lg:hidden">
          <NavigationBar fixed={false}>
            <Logo place="justify-start" />
            <SideBar
              logout={true}
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
                handler={logout}
              />
            </NavLinks>
          </NavigationBar>
        </div>
      </Header>

      <Main>
        <section className="h-full grid lg:grid-cols-[auto,1fr]">
          <SidePanel image="\images\admin.png" admin={true} />
          <section className="grid grid-rows-[auto,auto,auto,1fr] gap-8 px-10 py-7">
            <h1 className="font-semibold tracking-wide">Residents</h1>

            <Search input={input} setInput={setInput} />

            {/* user count */}
            <h4 className="text-xs lg:text-sm font-medium">
              ALL ( <span className="font-bold">{residents.length}</span> )
            </h4>

            {/* table */}
            <div className="overflow-hidden">
              {/* search datas */}
              {input === '' ? (
                // display data
                <Table>
                  {/* headers */}
                  <TableHeaders>
                    <TableHeader name="First Name" />
                    <TableHeader name="Middle Name" />
                    <TableHeader name="Last Name" />
                    <TableHeader name="Gender" />
                    <TableHeader name="Contact Number" />
                    <TableHeader name="Birthdate" />
                    <TableHeader name="Birthplace" />
                    <TableHeader name="Address" />
                    <TableHeader name="Started Year" />
                    <TableHeader name="Homeowner" />
                    <TableHeader name="Voter" />
                  </TableHeaders>

                  {/* rows */}
                  <div className="flex flex-col gap-2">
                    {users.map((user) => {
                      return user.records!.map((record) => (
                        <TableRows key={record.id}>
                          <TableRow name={record.firstName} />
                          <TableRow name={record.middleName} />
                          <TableRow name={record.lastName} />
                          <TableRow name={record.gender} />
                          <TableRow name={record.contact} />
                          <TableRow name={record.birthdate} />
                          <TableRow name={record.birthplace} />
                          <TableRow name={record.address} />
                          <TableRow
                            name={moment(record.startedAt).format('LL')}
                          />
                          <TableRow name={record.homeowner.toString()} />
                          <TableRow name={record.voter.toString()} />
                        </TableRows>
                      ))
                    })}
                  </div>
                </Table>
              ) : (
                // filtered data
                <Table>
                  {/* headers */}
                  <TableHeaders>
                    <TableHeader name="First Name" />
                    <TableHeader name="Middle Name" />
                    <TableHeader name="Last Name" />
                    <TableHeader name="Gender" />
                    <TableHeader name="Contact Number" />
                    <TableHeader name="Birthdate" />
                    <TableHeader name="Birthplace" />
                    <TableHeader name="Address" />
                    <TableHeader name="Started Year" />
                    <TableHeader name="Homeowner" />
                    <TableHeader name="Voter" />
                  </TableHeaders>

                  {/* rows */}
                  <div className="flex flex-col gap-2">
                    {users.map((user) => {
                      return user
                        .records!.filter(
                          (record) =>
                            record.firstName.toLowerCase().includes(input) ||
                            record.middleName.toLowerCase().includes(input) ||
                            record.lastName.toLowerCase().includes(input) ||
                            record.address.toLowerCase().includes(input) ||
                            record.birthplace.toLowerCase().includes(input) ||
                            record.birthdate.toLowerCase().includes(input) ||
                            record.gender.toLowerCase().includes(input) ||
                            record.contact.toLowerCase().includes(input) ||
                            record.homeowner
                              .toString()
                              .toLowerCase()
                              .includes(input) ||
                            record.voter
                              .toString()
                              .toLowerCase()
                              .includes(input) ||
                            record.startedAt
                              .toString()
                              .toLowerCase()
                              .includes(input)
                        )
                        .map((record) => (
                          <TableRows key={record.id}>
                            <TableRow name={record.firstName} />
                            <TableRow name={record.middleName} />
                            <TableRow name={record.lastName} />
                            <TableRow name={record.gender} />
                            <TableRow name={record.contact} />
                            <TableRow name={record.birthdate} />
                            <TableRow name={record.birthplace} />
                            <TableRow name={record.address} />
                            <TableRow
                              name={moment(record.startedAt).format('LL')}
                            />
                            <TableRow name={record.homeowner.toString()} />
                            <TableRow name={record.voter.toString()} />
                          </TableRows>
                        ))
                    })}
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

export default Admin

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

  return {
    props: {
      users: serializeData(users),
      residents: serializeData(residents),
    },
  }
}
