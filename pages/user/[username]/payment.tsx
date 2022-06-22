import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { signOut } from 'next-auth/react'
import prisma from '../../../adapters/prisma'
import Name from '../../../components/elements/account-name'
import Button from '../../../components/elements/button'
import Logo from '../../../components/elements/logo'
import Layout from '../../../components/layout'
import Header from '../../../components/layout/header'
import Main from '../../../components/layout/main'
import CreditCards from '../../../components/section/credit-cards'
import CreditCard from '../../../components/section/credit-cards/credit-card'
import PaymentField from '../../../components/section/input-fields/payment-field'
import NavigationBar from '../../../components/section/navbar'
import NavLinks from '../../../components/section/navbar/nav-links'
import RequestDocuments from '../../../components/section/request'
import SidePanel from '../../../components/section/side-panel'
import Registration from '../../../components/styled/modals/registration'
import SideBar from '../../../components/styled/sidebar'
import type { User } from '../../../prisma/definition'
import serializeData from '../../../utilities/serialize-data'

interface Props {
  user: User
}

const Payment: NextPage<Props> = ({ user }) => {
  return (
    <Layout store={{ user }}>
      <Header>
        {/* mobile navbar */}
        <div className="lg:hidden">
          <NavigationBar fixed={false}>
            <Logo place="justify-start" />
            <SideBar logout={true}
              items={[
                { name: 'Request', link: `/user/${user.email.split('@')[0]}` },
                {
                  name: 'Notifications',
                  link: `/user/${user.email.split('@')[0]}/notifications`,
                },
                {
                  name: 'Profile',
                  link: `/user/${user.email.split('@')[0]}/profile`,
                },
                {
                  name: 'Payment',
                  link: `/user/${user.email.split('@')[0]}/payment`,
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
              <Name name={user.name} />
              <Button label="Log Out" color={true} handler={() => signOut()} />
            </NavLinks>
          </NavigationBar>
        </div>
      </Header>

      <Main>
        <section className="h-full grid lg:grid-cols-[auto,1fr]">
          <SidePanel image={user.image} name={user.email.split('@')[0]} admin={false}/>
          <section className="flex flex-col gap-10 px-10 py-7 lg:gap-10">
            <h1 className="font-semibold tracking-wide">Payment Form</h1>
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="grid gap-12">
                <PaymentField
                  title="Card Holder"
                  placeholder="eg: Lorem Ipsum"
                  type="text"
                />
                <PaymentField
                  title="Card Number"
                  placeholder="eg: 0124xxxxxxxx"
                  type="text"
                />
                <PaymentField
                  title="Contact Number"
                  placeholder="eg: 0906xxxxxxx"
                  type="text"
                />
                <PaymentField
                  title="Email Address"
                  placeholder="eg: loremipsum@gmail.com"
                  type="text"
                />
                <PaymentField
                  title="Remarks"
                  placeholder="eg: Payment for Clearance Certificate"
                  type="textarea"
                />
              </div>

              <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xs lg:text-sm font-medium tracking-wide">Choose Bank Option</h2>
                  <CreditCards>
                    <CreditCard title="GCash" image="/images/gcash.png" />
                    <CreditCard title="Paypal" image="/images/paypal.png" />
                    <CreditCard title="Paymaya" image="/images/paymaya.png" />
                    <CreditCard
                      title="MasterCard"
                      image="/images/mastercard.png"
                    />
                  </CreditCards>
                </div>
                <div className="grid grid-cols-[1fr,auto] max-w-2xl items-center">
                  <span className="text-sm text-black/80 font-medium">
                    Total Amount
                  </span>
                  <span className="text-2xl font-semibold font-poppins">
                    250.00
                  </span>
                </div>

                {/* buttons */}
                <div className="flex items-center gap-6 ml-auto mt-auto">
                  <Button
                    label="Cancel"
                    color={false}
                  />
                  <Button
                    label="Pay"
                    color={true}
                  />
                </div>
              </div>
            </div>
          </section>
        </section>
      </Main>
    </Layout>
  )
}

export default Payment

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const user = await prisma.user.findUnique({
    where: { email: `${String(query!.username)}@gmail.com` },
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
    // revalidate: 1
  }
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const users = await prisma.user.findMany({
//     include: {
//       profile: true,
//       records: {
//         where: { withId: null },
//         include: { members: true },
//       },
//     },
//   })

//   const paths = users.map((user) => {
//     return {
//       params: { username: String(user.email!.split('@')[0]) },
//     }
//   })

//   return {
//     paths,
//     fallback: 'blocking',
//   }
// }
