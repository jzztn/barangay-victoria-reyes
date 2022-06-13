import Field from './field'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/solid'
import Button from '../../elements/button'
import { Disclosure, Listbox } from '@headlessui/react'
import { Member, Resident } from '../../../prisma/definition'
import { useEffect, useState } from 'react'
import { Gender, Relationship } from '@prisma/client'

interface IProps {
  inputField: Resident
  setInputField: any
}

const Household = ({ inputField, setInputField }: IProps) => {
  const [memberField, setMemberField] = useState<Member>({
    id: '',
    verified: true,
    firstName: '',
    middleName: '',
    lastName: '',
    gender: Gender.OTHERS,
    birthdate: '',
    birthplace: '',
    address: '',
    occupation: '',
    contact: '',
    homeowner: true,
    voter: true,
    relationship: Relationship.BROTHER,
    startedAt: '',
    withId: null,
    members: [],
    authorId: '',
  })
  const [selectedRelationship, setSelectedRelationship] = useState(
    Relationship.MOTHER
  )
  const [relationships, setRelationships] = useState([
    'FATHER',
    'MOTHER',
    'SON',
    'DAUGHTER',
    'HUSBAND',
    'WIFE',
    'BROTHER',
    'SISTER',
    'GRANDFATHER',
    'GRANDMOTHER',
    'GRANDSON',
    'GRANDDAUGHTER',
    'UNCLE',
    'AUNT',
    'NEWPHEW',
    'NIECE',
    'COUSIN',
    'BOYFRIEND',
    'GIRLFRIEND',
    'OTHERS',
  ])

  useEffect(() => {
    setMemberField({ ...memberField, relationship: selectedRelationship })
  }, [selectedRelationship])

  return (
    <div className="grid gap-5">
      <h2 className="font-medium tracking-wide">Household</h2>

      <div className="grid gap-3 border-[1px] border-gray/50 rounded-md p-3 lg:p-6">
        <div className="grid gap-2 lg:grid-cols-2">
          <Field
            type="text"
            label="First Name"
            value={memberField.firstName}
            inputField={memberField}
            setInputField={setMemberField}
            fieldName="firstName"
          />

          <Field
            type="text"
            label="Middle Name"
            value={memberField.middleName}
            inputField={memberField}
            setInputField={setMemberField}
            fieldName="middleName"
          />

          <Field
            type="text"
            label="Last Name"
            value={memberField.lastName}
            inputField={memberField}
            setInputField={setMemberField}
            fieldName="lastName"
          />

          <Field
            type="text"
            label="Contact Number"
            value={memberField.contact}
            inputField={memberField}
            setInputField={setMemberField}
            fieldName="contact"
          />

          {/* relationship */}
          <div className="grid gap-2 w-full ">
            <h2 className="text-xs lg:text-sm font-medium tracking-wide">
              Relationship
            </h2>

            <Listbox
              as="div"
              value={selectedRelationship}
              onChange={setSelectedRelationship}
              className="relative"
            >
              <Listbox.Button className="w-full border-[1px] border-gray/50 rounded-md p-3 text-left text-sm grid grid-cols-[1fr,auto] items-center">
                <span>{selectedRelationship}</span>
                <ChevronDownIcon className="w-5 h-5" />
              </Listbox.Button>
              <Listbox.Options className="absolute top-14 w-full h-40 left-0 bg-white border-[1px] border-gray/50 rounded-md text-left text-sm overflow-y-scroll">
                {relationships.map((relationship, index) => (
                  <Listbox.Option
                    key={index}
                    className="hover:bg-primary/40 hover:text-primary text-sm cursor-pointer"
                    value={relationship}
                  >
                    {({ active, selected }) => (
                      <h3
                        className={`${
                          active ? 'bg-primary/40 text-primary' : 'text-black'
                        } flex items-center gap-3 p-3`}
                      >
                        {selected && (
                          <CheckIcon className="bg-primary/30 rounded-full p-1 text-primary w-5 h-5" />
                        )}
                        {relationship}
                      </h3>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
          <Field
            type="text"
            label="Occupation"
            value={memberField.occupation}
            inputField={memberField}
            setInputField={setMemberField}
            fieldName="occupation"
          />
        </div>

        <div className="ml-auto">
          <Button
            label="Add"
            color={true}
            handler={() => {
              setInputField({
                ...inputField,
                members: [...inputField.members!, memberField],
              })
              setMemberField({
                id: '',
                verified: true,
                firstName: '',
                middleName: '',
                lastName: '',
                gender: Gender.OTHERS,
                birthdate: '',
                birthplace: '',
                address: '',
                occupation: '',
                contact: '',
                homeowner: true,
                voter: true,
                relationship: Relationship.BROTHER,
                startedAt: '',
                withId: null,
                members: [],
                authorId: '',
              })
            }}
          />
        </div>
      </div>

      {/* household */}
      <h4 className="text-xs lg:text-sm font-medium">
        ALL ( <span className="font-bold">{inputField.members!.length}</span> )
      </h4>

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
    </div>
  )
}

export default Household
