import { CheckIcon } from '@heroicons/react/solid'
import Button from '../../elements/button'
import { Listbox } from '@headlessui/react'
import { Member, Resident } from '../../../prisma/definition'
import { useEffect, useState } from 'react'
import { Gender, Relationship } from '@prisma/client'
import Household from './member'
import Field from '../input-fields/field'
import Dropdown from '../../styled/dropdown'
import cuid from 'cuid'

interface IProps {
  inputField: Resident
  setInputField: any
}

const Members = ({ inputField, setInputField }: IProps) => {
  const [memberField, setMemberField] = useState<Member>({
    id: cuid(),
    verified: false,
    firstName: '',
    middleName: '',
    lastName: '',
    gender: Gender.OTHERS,
    birthdate: new Date(),
    birthplace: '',
    address: '',
    occupation: '',
    contact: '',
    homeowner: false,
    voter: true,
    relationship: Relationship.BROTHER,
    startedAt: new Date(),
    authorId: '',
  })
  const [selectedRelationship, setSelectedRelationship] = useState(
    Relationship.MOTHER
  )
  const [relationships] = useState([
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
      <h2 className="font-medium tracking-wide text-xs lg:text-sm">Household</h2>

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

          <Field
            type="text"
            label="Birth Place"
            value={memberField.birthplace}
            inputField={memberField}
            setInputField={setMemberField}
            fieldName="birthplace"
          />

          {/* relationship */}
          <div className="grid gap-2 w-full ">
            <h2 className="text-xs lg:text-sm font-medium tracking-wide">
              Relationship
            </h2>

            <Dropdown
              value={selectedRelationship}
              onChange={setSelectedRelationship}
              buttonName={selectedRelationship}
            >
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
            </Dropdown>
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
                id: cuid(),
                verified: false,
                firstName: '',
                middleName: '',
                lastName: '',
                gender: Gender.OTHERS,
                birthdate: new Date(),
                birthplace: '',
                address: '',
                occupation: '',
                contact: '',
                homeowner: false,
                voter: true,
                relationship: Relationship.BROTHER,
                startedAt: new Date(),
                authorId: '',
              })
            }}
          />
        </div>
      </div>

      {/* members */}
      <h4 className="text-xs lg:text-sm font-medium">
        ALL ( <span className="font-bold">{inputField.members!.length}</span> )
      </h4>

      <Household inputField={inputField} />
    </div>
  )
}

export default Members
