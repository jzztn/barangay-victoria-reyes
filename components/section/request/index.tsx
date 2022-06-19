import { User } from '../../../prisma/definition'
import Cards from '../cards'
import Card from '../cards/card'

interface IProps {
  user:User
}
const RequestDocuments = ({user}: IProps) => {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] gap-5 px-10 py-7">
      <h1 className="font-semibold tracking-wide">Request Documents</h1>
      <div className="grid justify-center items-center">
        <Cards>
          <Card
            title="Barangay Certificate"
            paragraph="a document certifies that you are a good resident in the barangay and have a good moral character. It also signifies that you do not have any negative record and this is necessary in any official transactions."
            request={true}
            type="barangay certificate"
            id={user.id}
          />
          <Card
            title="Clearance Certificate"
            paragraph="a requirement before the municipality issues any license for the bu-siness or activity. The barangay clearance is obtained from the barangay where the intended business of activity is located or conducted."
            request={true}
            type="clearance certificate"
            id={user.id}

          />
          <Card
            title="Cedula"
            paragraph="a document issued to Filipinos upon payment of a residence tax. It can also serve as valid identification for individuals and corporations residing or located in the same municipality where it is acquired."
            request={true}
            type="cedula"
            id={user.id}

          />
          <Card
            title="Certificate of Indigency"
            paragraph="is issued to less fortunate resident who desires to avail assistance such as Scholarship, Medical Services, Free Legal Aid from Public Attorney's Office (PAO) and the like."
            request={true}
            type="certificate of indigency"
            id={user.id}

          />
        </Cards>
      </div>

      <span className="text-gray text-xs lg:text-sm tracking-wide leading-relaxed">
        *After you click the request button, it has been already requested to
        the admin. kindly proceed to the payment form and go to the
        notifications for the status of your request.
      </span>
    </div>
  )
}

export default RequestDocuments
