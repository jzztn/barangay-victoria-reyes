import type { NextPage } from 'next'
import Name from '../../components/elements/account-name'
import Button from '../../components/elements/button'
import Header from '../../components/layout/header'
import Main from '../../components/layout/main'
import NavigationBar from '../../components/section/navbar'
import NavLinks from '../../components/section/navbar/nav-links'
import SidePanel from '../../components/section/side-panel'
import SideBar from '../../components/styled/sidebar'
import Logo from '../../components/elements/logo'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { PencilAltIcon } from '@heroicons/react/solid'

const Profile: NextPage = () => {
  // router
  const router = useRouter()
  // search input field
  const [input, setInput] = useState('')
  const [edit, setEdit] = useState(false)

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
            <div className='flex gap-5 items-center'>
              <h1 className="font-semibold tracking-wide">Admin Account</h1>
              <button onClick={() => setEdit(!edit)}>
                <PencilAltIcon className="w-5 h-5 hover:-translate-y-1 hover:text-primary cursor-pointer transition-all duration-300" />
              </button>
            </div>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-1">
                <h2>Username</h2>
                <input
                  type="text"
                  value="admin"
                  className="border-[1px] border-gray py-3 lg:w-96 pl-2 rounded-md"
                />
              </div>

              <div className="flex flex-col gap-1">
                <h2>Password</h2>
                <input
                  type="password"
                  value="admin"
                  className="border-[1px] border-gray py-3 lg:w-96 pl-2 rounded-md"
                />
              </div>
            </div>
          </section>
        </section>
      </Main>
    </section>
  )
}

export default Profile
