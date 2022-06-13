import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { User } from '../../prisma/definition'
import useUserStore from '../../stores/use-user-store'

interface Props {
  children: React.ReactNode
  store: {
    user: User
  }
}

const Layout = ({ children, store }: Props) => {
  const user = useUserStore(({ user }) => user)
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

  return session && user && <div className="h-screen">{children}</div>
}

export default Layout
