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
import { LockOpenIcon, PencilAltIcon, UserIcon } from '@heroicons/react/solid'
import Icon from '../../components/elements/icon'
import Image from 'next/image'
import useAdminStore from '../../stores/use-admin-store'

const Profile: NextPage = () => {
  // router
  const router = useRouter()
  // search input field
  const [input, setInput] = useState('')
  const [edit, setEdit] = useState(false)

  const [adminAccoutn, setAdminAccount] = useState({
    username: '',
    password: '',
  })
  const { isLogin, login } = useAdminStore()

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
      <div className="bg-black/40 h-screen fix inset-0 grid jusify-items-center items-center">
        <div className="h-screen grid place-items-center">
          <div>
            <div className="bg-white shadow-md shadow-gray/40 px-6 py-10 max-w-3xl mx-auto rounded-md">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1 text-center font-poppins">
                  <h1 className="font-medium tracking-wide">Admin Login</h1>
                  <h2 className="text-xs font-poppins">
                    to continue to{' '}
                    <span className="text-primary font-semibold">
                      Barangay Victoria Reyes
                    </span>
                  </h2>
                </div>
                <input
                  type="text"
                  placeholder="username"
                  onChange={(e) =>
                    setAdminAccount({
                      ...adminAccoutn,
                      username: e.target.value,
                    })
                  }
                  className="py-3 w-96 pl-2 rounded-md bg-slate-50 placeholder:text-sm "
                />
                <input
                  type="password"
                  placeholder="password"
                  onChange={(e) =>
                    setAdminAccount({
                      ...adminAccoutn,
                      password: e.target.value,
                    })
                  }
                  className="py-3 w-96 pl-2 rounded-md bg-slate-50 mb-5 placeholder:text-sm "
                />

                <Button label="Login" color={true} handler={handleLogin} />
              </div>
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
          <section className="relative grid grid-rows-[auto,auto,auto,1fr] gap-8 px-10 py-7">
            <div className="absolute w-96 h-96 lg:w-[450px] lg:h-[450px] top-[50%] bottom-[50%] -translate-y-[50%] left-[50%] right-[50%] -translate-x-[50%] -z-50 grid justify-items-center items-center opacity-30">
              <Image src="/images/logo.png" layout="fill" objectFit="cover" />
            </div>
            <div className="flex gap-5 items-center">
              <h1 className="font-semibold tracking-wide">Admin Account</h1>
              <button onClick={() => setEdit(!edit)}>
                <PencilAltIcon className="w-5 h-5 hover:-translate-y-1 hover:text-primary cursor-pointer transition-all duration-300" />
              </button>
            </div>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-1">
                <h2 className="text-xs lg:text-sm font-medium tracking-wide">
                  Username
                </h2>
                <div className="flex items-center gap-2">
                  <Icon
                    Type={UserIcon}
                    circleSize="w-7 h-7"
                    iconSize="w-3 h-3"
                    link="#"
                    color={true}
                  />

                  <input
                    type="text"
                    value="admin"
                    className="border-[1px] border-gray/50 rounded-md py-2 w- lg:w-96 outline-none pl-4"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="text-xs lg:text-sm font-medium tracking-wide">
                  Password
                </h2>
                <div className="flex items-center gap-2">
                  <Icon
                    Type={LockOpenIcon}
                    circleSize="w-7 h-7"
                    iconSize="w-3 h-3"
                    link="#"
                    color={true}
                  />
                  <input
                    type="password"
                    value="admin"
                    className="border-[1px] border-gray/50 rounded-md py-2 w-full lg:w-96 outline-none pl-4"
                  />
                </div>
              </div>

              {edit && (
                <div className="flex flex-col gap-1">
                  <h2 className="text-xs lg:text-sm font-medium tracking-wide">
                    Confirm Password
                  </h2>
                  <div className="flex items-center gap-2">
                    <Icon
                      Type={LockOpenIcon}
                      circleSize="w-7 h-7"
                      iconSize="w-3 h-3"
                      link="#"
                      color={true}
                    />
                    <input
                      type="password"
                      value="admin"
                      className="border-[1px] border-gray/50 rounded-md py-2 w-full lg:w-96 outline-none pl-4"
                    />
                  </div>
                </div>
              )}

              {/* buttons */}
              {edit && (
                <div className="flex items-center gap-6 ml-auto mt-16">
                  <Button label="Cancel" color={false} />
                  <Button label="Save Changes" color={true} />
                </div>
              )}
            </div>
          </section>
        </section>
      </Main>
    </section>
  )
}

export default Profile
