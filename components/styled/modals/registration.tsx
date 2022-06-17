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

interface IProps {
  user: User
}
const Registration = ({ user }: IProps) => {
  console.log(user.profile)
  const [isOpen, setIsOpen] = useState(false)
  const createRecord = useUserStore((state) => state.create.record)
  const updateUserAuthorization = useUserStore((state) => state.update.user)
  const [inputField, setInputField] = useState<Resident>({
    id: '',
    verified: true,
    firstName: '',
    middleName: '',
    lastName: '',
    gender: user.profile!.gender,
    birthdate: '',
    birthplace: '',
    address: '',
    occupation: '',
    contact: '',
    homeowner: true,
    voter: true,
    relationship: null,
    startedAt: '',
    withId: null,
    members: [],
    authorId: '',
  })

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
              value={user.profile!.firstName}
              inputField={inputField}
              setInputField={setInputField}
              fieldName="firstName"
            />
            <Field
              type="text"
              label="Middle Name"
              icon={UserIcon}
              value={user.profile!.middleName}
              inputField={inputField}
              setInputField={setInputField}
              fieldName="middleName"
            />
            <Field
              type="text"
              label="Last Name"
              icon={UserIcon}
              value={user.profile!.lastName}
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
              value={user.profile!.birthdate}
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
              <Field
                type="checkbox"
                label="HomeOwner"
                value={inputField.homeowner}
                inputField={inputField}
                setInputField={setInputField}
                fieldName="homeowner"
              />
              <Field
                type="checkbox"
                label="Registered Voter"
                value={inputField.voter}
                inputField={inputField}
                setInputField={setInputField}
                fieldName="voter"
              />
            </div>
          </div>

          {/* members */}
          <div>
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
              createRecord({ record: inputField })
              updateUserAuthorization({key:"authorized", value:false})
              router.push(`/user/${user.email.split('@')[0]}`)
            }}
          />
        </div>
      </Modal>
    </>
  )
}

export default Registration
