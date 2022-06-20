import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import { Status } from '@prisma/client'
import { useState } from 'react'
import Dropdown from '../../styled/dropdown'

interface IProps {
  admin: boolean
  ticketId?: string
  status: string
}

const TableStatus = ({ admin, ticketId, status}: IProps) => {
  const [currentStatus, setCurrentStatus] = useState(status)
  const [statuses] = useState([
    'Approved',
    'Pending',
    'Rejected',
    'Processing',
    'Ready',
    'Payment',
  ])

  const handleUpdateStatus = async ({ id, status }: any) => {
    await fetch('/api/ticket/update', {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        key: 'status',
        value: status,
      }),
    })
  }
  return (
    <>
      {admin ? (
        <Dropdown
          value={currentStatus}
          onChange={setCurrentStatus}
          buttonName={currentStatus}
        >
          {statuses.map((status, index) => (
            <Listbox.Option
              key={index}
              className="hover:bg-primary/40 hover:text-primary text-sm cursor-pointer bg-white"
              value={status}
            >
              {({ active, selected }) => (
                <h3
                  onClick={() => {
                    handleUpdateStatus({
                      id: ticketId,
                      status: status.toUpperCase(),
                    })
                    setCurrentStatus(status)
                  }}
                  className={`${
                    active ? 'bg-primary/40 text-primary' : 'text-black'
                  } flex items-center gap-3 p-3 whitespace-nowrap`}
                >
                  {selected && (
                    <CheckIcon className="bg-primary/30 rounded-full p-1 text-primary w-5 h-5" />
                  )}
                  {status}
                </h3>
              )}
            </Listbox.Option>
          ))}
        </Dropdown>
      ) : (
        <div className="text-sm tracking-wide text-primary font-semibold">
          {currentStatus}
        </div>
      )}
    </>
  )
}

export default TableStatus
