import type { GetServerSideProps, NextPage } from 'next'
import { signOut } from 'next-auth/react'
import prisma from '../../../adapters/prisma'
import Layout from '../../../components/layout'
import type { User } from '../../../prisma/definition'
import serializeData from '../../../utilities/serialize-data'

interface Props {
  user: User
}

const User: NextPage<Props> = ({ user }) => {
  return (
    <Layout store={{ user }}>
      <button onClick={() => signOut()}>Sign out</button>
    </Layout>
  )
}

export default User

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const user = await prisma.user.findUnique({
    where: { email: `${String(query.username)}@gmail.com` },
    include: {
      profile: true,
      records: {
        where: { withId: null },
        include: { members: true },
      },
    },
  })
  return {
    props: {
      user: serializeData(user),
    },
  }
}
