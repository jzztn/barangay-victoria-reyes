import { Profile, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Record } from '../../prisma/definition'
import useUserStore from '../../stores/use-user-store'

interface Props {
  children: React.ReactNode
  store: {
    user: User
    profile: Profile
    records: Record[]
  }
}

const Layout = ({ children, store }: Props) => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      useUserStore.getState().read({ ...store })
      return
    }
    router.push('/')
    useUserStore.getState().unRead()
  }, [session])

  return session && <div>{children}</div>
}

export default Layout
