import type { Profile, User } from '@prisma/client'
import type { GetServerSideProps, NextPage } from 'next'
import { signOut } from 'next-auth/react'
import prisma from '../../../adapters/prisma'
import Layout from '../../../components/layout'
import type { Record } from '../../../prisma/definition'
import serializeData from '../../../utilities/serialize-data'

interface Props {
  user: User
  profile: Profile
  records: Record[]
}

const User: NextPage<Props> = ({ user, profile, records }) => {
  return (
    <Layout store={{ user, profile, records }}>
      <button onClick={() => signOut()}>Sign out</button>
    </Layout>
  )
}

export default User

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const user = await prisma.user.findUnique({
    where: { email: `${String(query.username)}@gmail.com` },
  })
  const profile = await prisma.profile.findUnique({
    where: { userId: String(query.userId) },
  })
  const residents = await prisma.resident.findMany({
    where: { authorId: String(query.userId) },
    include: { members: true },
  })
  return {
    props: {
      user: serializeData(user),
      profile: serializeData(profile),
      records: serializeData(residents),
    },
  }
}
