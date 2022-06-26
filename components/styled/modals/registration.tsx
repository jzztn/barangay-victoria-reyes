import { Dialog, Listbox } from '@headlessui/react'
import { useEffect, useState } from 'react'
import Button from '../../elements/button'
import Fields from '../../section/input-fields'
import Field from '../../section/input-fields/field'
import {
  UserIcon,
  CalendarIcon,
  MapIcon,
  PhoneIcon,
  HomeIcon,
  CheckIcon,
} from '@heroicons/react/solid'
import { Resident, User } from '../../../prisma/definition'
import useUserStore from '../../../stores/use-user-store'
import { Gender } from '@prisma/client'
import Members from '../../section/members'
import Modal from '.'
import Dropdown from '../dropdown'
import { useRouter } from 'next/router'
import moment from 'moment'

interface IProps {
  user: User
}
const Registration = ({ user }: IProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const createRecord = useUserStore((state) => state.create.record)
  const updateUserAuthorization = useUserStore((state) => state.update.user)
  const [inputField, setInputField] = useState<Resident>({
    id: '',
    verified: false,
    firstName: user.profile!.firstName,
    middleName: user.profile!.middleName,
    lastName: user.profile!.lastName,
    gender: user.profile!.gender,
    birthdate: user.profile!.birthdate,
    birthplace: '',
    address: '',
    occupation: '',
    contact: user.profile!.contact,
    homeowner: true,
    voter: true,
    relationship: null,
    startedAt: new Date(),
    withId: null,
    members: [],
    authorId: '',
  })

  console.log(user)

  const [selectedGender, setSelectedGender] = useState(Gender.FEMALE)
  const [genders] = useState(['MALE', 'FEMALE', 'OTHERS'])
  const router = useRouter()

  useEffect(() => {
    setInputField({ ...inputField, gender: selectedGender })
  }, [selectedGender])

  return (
    <>
      {/* button */}
      <div className="flex flex-col justify-center items-center text-center gap-3">
        <div className="flex gap-3 relative">
          {/* left shapes */}
          <div className="w-5 h-5 absolute -top-4 -left-6">
            <img
              src="\images\left-shapes.png"
              alt="shapes"
              className="w-full h-full"
            />
          </div>
          <Button
            label="Register"
            color={true}
            handler={() => setIsOpen(true)}
          />
          <div className="w-5 h-5 absolute -top-4 -right-6">
            <img
              src="\images\right-shapes.png"
              alt="shapes"
              className="w-full h-full"
            />
          </div>
        </div>
        <span className="text-gray text-xs md:text-sm tracking-wide">
          You are not yet registered
        </span>
      </div>

      <Modal title="Registration Form" isOpen={isOpen} setIsOpen={setIsOpen}>
        <Fields>
          <div className="grid gap-6">
            <Field
              type="text"
              label="First Name"
              icon={UserIcon}
              value={inputField.firstName}
              inputField={inputField}
              setInputField={setInputField}
              fieldName="firstName"
            />
            <Field
              type="text"
              label="Middle Name"
              icon={UserIcon}
              value={inputField.middleName}
              inputField={inputField}
              setInputField={setInputField}
              fieldName="middleName"
            />
            <Field
              type="text"
              label="Last Name"
              icon={UserIcon}
              value={inputField.lastName}
              inputField={inputField}
              setInputField={setInputField}
              fieldName="lastName"
            />
            {/* gender */}
            <div className="grid gap-2">
              <h2 className="text-xs lg:text-sm font-medium tracking-wide">
                Gender
              </h2>

              <Dropdown
                value={selectedGender}
                onChange={setSelectedGender}
                buttonName={selectedGender}
              >
                {genders.map((gender, index) => (
                  <Listbox.Option
                    key={index}
                    className="hover:bg-primary/40 hover:text-primary text-sm cursor-pointer"
                    value={gender}
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
                        {gender}
                      </h3>
                    )}
                  </Listbox.Option>
                ))}
              </Dropdown>
            </div>
            <Field
              type="text"
              label="Complete Address"
              icon={MapIcon}
              value={inputField.address}
              inputField={inputField}
              setInputField={setInputField}
              fieldName="address"
            />
            <Field
              type="date"
              label="Birthday"
              icon={CalendarIcon}
              value={moment(user.profile?.birthdate).format().slice(0, 10)}
              inputField={inputField}
              setInputField={setInputField}
              fieldName="birthdate"
            />
            <Field
              type="text"
              label="Birth Place"
              icon={UserIcon}
              value={inputField.birthplace}
              inputField={inputField}
              setInputField={setInputField}
              fieldName="birthplace"
            />
            <Field
              type="text"
              label="Contact Number"
              icon={PhoneIcon}
              value={user.profile!.contact}
              inputField={inputField}
              setInputField={setInputField}
              fieldName="contact"
            />
            <Field
              type="text"
              label="Occupation"
              icon={UserIcon}
              value={inputField.occupation}
              inputField={inputField}
              setInputField={setInputField}
              fieldName="occupation"
            />
            <Field
              type="date"
              label="In what year did you start living here?"
              icon={HomeIcon}
              value={inputField.startedAt}
              inputField={inputField}
              setInputField={setInputField}
              fieldName="startedAt"
            />

            <div className="flex gap-10">
              {/* homeowner */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="border-[1px] border-gray/50 rounded-md py-3 outline-none bg-white"
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      homeowner: e.target.checked,
                    })
                  }
                />
                <h2 className="text-xs lg:text-sm font-medum tracking-wide whitespace-nowrap">
                  Homeowner
                </h2>
              </div>
              
              {/* registerd voter */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="border-[1px] border-gray/50 rounded-md py-3 outline-none bg-white"
                  onChange={(e) =>
                    setInputField({
                      ...inputField,
                      voter: e.target.checked,
                    })
                  }
                />
                <h2 className="text-xs lg:text-sm font-medum tracking-wide whitespace-nowrap">
                  Registered Voter
                </h2>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* proof of Residency */}
            <div className="grid gap-2">
              <h2 className="text-xs lg:text-sm font-medium tracking-wide">
                Proof of Residency
              </h2>

              <input
                type="file"
                className="border-[1px] border-gray/50 rounded-md py-2 w-full outline-none pl-4"
              />
            </div>

            {/* members */}

            <Members inputField={inputField} setInputField={setInputField} />
          </div>
        </Fields>

        {/* buttons */}
        <div className="flex items-center gap-6 ml-auto">
          <Button
            label="Cancel"
            color={false}
            handler={() => setIsOpen(false)}
          />
          <Button
            label="Register"
            color={true}
            handler={() => {
              updateUserAuthorization({ key: 'authorized', value: false })
              createRecord({ record: inputField })
              setIsOpen(false)
              router.push(`/user/${user.email.split('@')[0]}`)
            }}
          />
        </div>
      </Modal>
    </>
  )
}

export default Registration
