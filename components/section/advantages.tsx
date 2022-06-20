import Cards from "./cards"
import AdvantageCard from "./cards/advantage-card"

const Advantages = () => {
  return (
    <div id="advantages" className='grid justify-center items-center'>
      <Cards>
          <AdvantageCard
            title="Processing and Transferring Data Quickly"
            paragraph="Our Automated System makes every process and transferring of each resident data much faster and accurately"
          />

          <AdvantageCard
            title="No More Manual Encoding"
            paragraph="Our Automated System alters the process of manual encoding of each resident information where it makes the work of our officers more easier and faster."

          />

          <AdvantageCard
            title="Easily Make A Request"
            paragraph="You can now request any barangay document faster and effortless."

          />

          <AdvantageCard
            title="No More Manual Registration Forms"
            paragraph="You can register online to our system and fill-up every necessary information quickly."
          />
        </Cards>
    </div>
  )
}

export default Advantages