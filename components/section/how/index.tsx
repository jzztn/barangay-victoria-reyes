import React from 'react'
import Step from './step'

const How = () => {
  return (
    <div id="how" className="grid gap-5 px-2">
      <h1 className="font-semibold text-xl tracking-wider text-left md:ml-28 lg:text-2xl">
        How to Use?
      </h1>
      <div className="grid justify-items-center lg:grid-cols-2 lg:mt-6">
        <div className="grid justify-items-center ">
          {/* steps */}
          <Step
            count="1"
            title="Sign In using Google Account"
            paragraph="Connnect to our website by signing in oyour google account"
          />

          <Step
            count="2"
            title="Register your Personal Information"
            paragraph="Register first the essential informations needed by the barangay system to request any document needed."
          />

          <Step
            count="3"
            title="Request any type of Barangay Document as needed"
            paragraph="When you are a registered resident, you can now request any kind of barangay documents as per your personal reasons effortlessly."
          />

          <Step
            count="4"
            title="Payment"
            paragraph="Pay the certificate fee by filling-up the  Payment Form if it is online. But you can also pay on-site before claiming."
          />

          <Step
            count="5"
            title="Wait for Request Approval"
            paragraph="Wait for the approval of barangay regarding to your request document in your notifications. You can see your request status and request info in your Notifications."
          />

          <Step
            count="6"
            title="Claim Your Request Document On-Site"
            paragraph="You can now claim the document to Barangay Victoria Reyes immediately."
            end={true}
          />
        </div>

        {/* phone */}
        <div className="hidden lg:block">
          <div className='grid justify-center mt-14'>
            <div className="w-[352px] h-[722px]">
              <img
                src="\images\phone.png"
                alt="Steps Phone Version"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default How
