import { useState } from 'react'
import { User } from '../../../prisma/definition'
import Cards from '../cards'
import Card from '../cards/card'

interface IProps {
  user:User
}
const RequestDocuments = ({user}: IProps) => {
  const [documents] = useState([
    {title: "Barangay Certificate", amount: "50.00"},
    {title: "Clearance Certificate", amount: "75.00"},
    {title: "Certificate of Indigency", amount: "100.00"},
    {title: "Cedula", amount: "50.00"},,
  ])
  return (
    <div className="grid grid-rows-[auto,1fr,auto] gap-5 px-10 py-7">
      <h1 className="font-semibold tracking-wide">Request Documents</h1>
      <div className="grid justify-center items-center">
        <Cards>
          <Card
            title="Barangay Certificate"
            paragraph="a document certifies that you are a good resident in the barangay and have a good moral character. It also signifies that you do not have any negative record and this is necessary in any official transactions."
            request={true}
            type={documents[0]!.title}
            amount={documents[0]!.amount}
            id={user.id}
          />
          <Card
            title="Clearance Certificate"
            paragraph="a requirement before the municipality issues any license for the bu-siness or activity. The barangay clearance is obtained from the barangay where the intended business of activity is located or conducted."
            request={true}
            type={documents[1]!.title}
            amount={documents[1]!.amount}
            id={user.id}

          />
          <Card
            title="Cedula"
            paragraph="a document issued to Filipinos upon payment of a residence tax. It can also serve as valid identification for individuals and corporations residing or located in the same municipality where it is acquired."
            request={true}
            type={documents[3]!.title}
            amount={documents[3]!.amount}
            id={user.id}

          />
          <Card
            title="Certificate of Indigency"
            paragraph="is issued to less fortunate resident who desires to avail assistance such as Scholarship, Medical Services, Free Legal Aid from Public Attorney's Office (PAO) and the like."
            request={true}
            type={documents[2]!.title}
            amount={documents[2]!.amount}
            id={user.id}
          />
        </Cards>
      </div>
    </div>
  )
}

export default RequestDocuments
