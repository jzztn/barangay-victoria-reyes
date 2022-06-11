import { useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Component() {
  const { data: session } = useSession()
  const router = useRouter()

  const authenticate = async () => {
    const response = await fetch(`/api/users/search/${session!.user!.email}`)
    const data = await response.json()
    router.push(`/${data.id}`)
  }

  useEffect(() => {
    if (session) authenticate()
  }, [session])

  return (
    session === null && (
      <div>
        Not signed in <br />
        <button onClick={() => signIn('google')}>Sign in</button>
      </div>
    )
  )
}
