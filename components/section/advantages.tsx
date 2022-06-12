import Cards from "./cards"
import Card from "./cards/card"

const Advantages = () => {
  return (
    <div id="advantages" className='grid justify-center items-center'>
      <Cards>
          <Card
            title="Processing and Transferring Data Quickly"
            paragraph="Our Automated System makes every process and transferring of each resident data much faster accurately"
            request={false}
          />

          <Card
            title="No More Manual Encoding"
            paragraph="Our Automated System alters the process of manual encoding of each resident information in which makes the work of our officers more easier."
            request={false}

          />

          <Card
            title="Easily Make A Request"
            paragraph="You can now request any barangay document as per needed in your personal reasons without making much effort."
            request={false}

          />

          <Card
            title="No More Manual Registration Forms"
            paragraph="You can register online to our system and fill-up every necessary information quickly."
            request={false}
          />
        </Cards>
    </div>
  )
}

export default Advantages