import { GetServerSideProps, NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import prisma from '../../adapters/prisma'
import { User } from '../../prisma/definition'
import useUserStore from '../../stores/use-user-store'
import serializeData from '../../utilities/serialize-data'

interface Props {
  initialUser: User
}

const Index: NextPage<Props> = ({ initialUser }) => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      useUserStore.getState().read(initialUser)
      return
    }
    router.push('/')
    useUserStore.getState().unRead()
  }, [session])

  return (
    session && (
      <div>
        Signed in as {session.user!.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: String(query.userId),
    },
    include: {
      profile: true,
      records: true,
    },
  })
  return {
    props: {
      initialUser: serializeData(user),
    },
  }
}
