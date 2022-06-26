import { Status } from '@prisma/client'
import Image from 'next/image'
import { useState } from 'react'
import useUserStore from '../../../stores/use-user-store'
import Button from '../../elements/button'

interface IProps {
  title: string
  paragraph: string
  request: boolean
  type: string
  id: string
  amount: string
}

const Card = ({ title, paragraph, request, type, id, amount }: IProps) => {
  const [requestTicket] = useState({
    id: '',
    type: type,
    status: Status.PENDING,
    createAt: new Date(),
    userId: id,
  })
  const createTicket = useUserStore((state) => state.create.ticket)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative group py-4 px-5 grid justify-center items-center text-center gap-4 md:gap-3 rounded-md">
      <h1 className="text-black/80 font-semibold tracking-wide font-poppins">
        {title}
      </h1>
      <p className="text-sm leading-relaxed md:max-w-lg text-gray">
        {paragraph}
      </p>

      {request && (
        <div>
          <Button
            label="Request"
            color={true}
            handler={() => setIsOpen(true)}
          />
        </div>
      )}
      {request && isOpen && (
        <div className="relative z-50">
          <div className="fixed inset-0 bg-black/30" />
          <div className="overflow-hidden fixed inset-0 md:max-w-xl lg:max-w-6xl mx-auto lg:my-40">
            <div className="bg-white h-full py-10 px-10 flex flex-col gap-16 justify-center items-center text-center font-poppins rounded-md">
              <div className="flex flex-col gap-2">
                <span className="text-sm">You are requesting</span>
                <h1 className="whitespace-nowrap text-3xl lg:text-4xl font-bold trackng-wide">{title}</h1>
              </div>
              <p className="max-w-4xl leading-relaxed tracking-wide">
                Your total amount is{' '}
                <span className="font-bold">{amount}</span>. Please pay to
                our barangay site upon your claiming day. The requested document
                will be available in{' '}
                <span className="font-semibold">1 (1) hour</span> after
                requesting. Kindly go to your notfications to track the status
                of your requested document. Thankyou and God Bless!
              </p>

              <div className=" flex gap-3 ml-auto">
                <Button
                  label="Request"
                  color={true}
                  handler={() => {
                    setIsOpen(false)
                    createTicket({ ticket: requestTicket })
                  }}
                />
                <Button
                  label="Close"
                  color={false}
                  handler={() => setIsOpen(false)}
                />
              </div>
              <div className="absolute w-96 h-96 lg:w-[300px] lg:h-[300px] top-[50%] bottom-[50%] -translate-y-[50%] left-[50%] right-[50%] -translate-x-[50%] z-50 grid justify-items-center items-center opacity-20">
                <Image src="/images/logo.png" layout="fill" objectFit="cover" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-0 h-1 bg-primary mt-5 rounded-full group-hover:w-full transition-all ease-in-out duration-700 cursor-pointer"></div>
    </div>
  )
}

export default Card
