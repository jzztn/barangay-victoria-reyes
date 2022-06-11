import { useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

const LadingPage: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) return
    router.push(`/user/${String(session.user!.email!.split('@').at(0))}`)
  }, [session])

  if (session !== null) return <>Loadin...</>

  return (
    <div>
      <button onClick={() => signIn('google')}>Sign in</button>
    </div>
  )
}

export default LadingPage
