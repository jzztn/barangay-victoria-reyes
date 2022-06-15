import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import { Resident } from '../../../prisma/definition'

interface IProps {
  inputField: Resident
}

const Household = ({ inputField }: IProps) => {
  return (
    <>
      {inputField.members!.map((member) => (
        <Disclosure key={member.id}>
          {({ open }) => (
            <>
              <Disclosure.Button className="grid grid-cols-[1fr,auto] px-4 py-2 border-[1px] border-gray/50 rounded-md">
                <h1 className="text-left text-sm lg:text-sm font-medium tracking-wide">
                  {member.firstName} {member.lastName}
                </h1>
                {open ? (
                  <ChevronUpIcon className="w-5 h-5" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5" />
                )}
              </Disclosure.Button>

              {open && (
                <Disclosure.Panel>
                  <div className="grid gap-3 text-left lg:gap-y-3 lg:gap-x-10 border-[1px] border-gray/50 rounded-md p-3 lg:p-6 z-50">
                    <div className="text-sm">
                      First Name:{' '}
                      <span className="font-semibold tracking-wide">
                        {member.firstName}
                      </span>
                    </div>
                    <div className="text-sm">
                      Middle Name:{' '}
                      <span className="font-semibold tracking-wide">
                        {member.middleName}
                      </span>
                    </div>
                    <div className="text-sm">
                      Last Name:{' '}
                      <span className="font-semibold tracking-wide">
                        {member.lastName}
                      </span>
                    </div>
                    <div className="text-sm">
                      Occupation:{' '}
                      <span className="font-semibold tracking-wide">
                        {member.occupation}
                      </span>
                    </div>
                    <div className="text-sm">
                      Relationship:{' '}
                      <span className="font-semibold tracking-wide">
                        {member.relationship}
                      </span>
                    </div>
                    <div className="text-sm">
                      Contact Number:{' '}
                      <span className="font-semibold tracking-wide">
                        {member.contact}
                      </span>
                    </div>
                  </div>
                </Disclosure.Panel>
              )}
            </>
          )}
        </Disclosure>
      ))}
    </>
  )
}

export default Household
