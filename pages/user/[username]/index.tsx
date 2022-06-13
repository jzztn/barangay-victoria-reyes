import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { signOut } from 'next-auth/react'
import prisma from '../../../adapters/prisma'
import Button from '../../../components/elements/button'
import Layout from '../../../components/layout'
import type { User } from '../../../prisma/definition'
import serializeData from '../../../utilities/serialize-data'

interface Props {
  user: User
}

const User: NextPage<Props> = ({ user }) => {
  return (
    <Layout store={{ user }}>
      <div className="fixed inset-0">
        <div className='border-gray/50 border-[1px] py-3 px-6 grid justify-items-center gap-3 text-center'>
          <div className='w-14 h-14 rounded-full overflow-hidden'>
            <img src={user.image} alt="user" className='w-full h-full' />
          </div>
          <h2 className='font-medium tracking-wide'>{user.name}</h2>
          <Button label="Sign Out" color={true} handler={() => signOut()}/>
        </div>
      </div>
    </Layout>
  )
}

export default User

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: { email: `${String(params!.username)}@gmail.com` },
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

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany({
    include: {
      profile: true,
      records: {
        where: { withId: null },
        include: { members: true },
      },
    },
  })

  const paths = users.map((user) => {
    return {
      params: { username: String(user.email!.split('@')[0]) },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}
