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
  ChevronDownIcon,
  CheckIcon,
} from '@heroicons/react/solid'
import Household from '../../section/input-fields/household'
import { Resident, User } from '../../../prisma/definition'
import useUserStore from '../../../stores/use-user-store'
import { Gender, Relationship } from '@prisma/client'
import Icon from '../../elements/icon'

const Registration = () => {
  const [isOpen, setIsOpen] = useState(false)
  const createRecord = useUserStore((state) => state.create.record)
  const [inputField, setInputField] = useState<Resident>({
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
    relationship: null,
    startedAt: '',
    withId: null,
    members: [],
    authorId: '',
  })

  const [selectedGender, setSelectedGender] = useState(Gender.FEMALE)

  useEffect(() => {
    setInputField({ ...inputField, gender: selectedGender })
  }, [selectedGender])

  console.log(inputField)

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

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 md:max-w-xl lg:max-w-6xl mx-auto lg:my-16">
          <Dialog.Panel className="bg-white h-full py-6 px-10 overflow-y-scroll grid gap-3">
            <Dialog.Title className="font-semibold text-xl lg:text-2xl tracking-wide">
              Registration Form
            </Dialog.Title>

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

                  <Listbox value={selectedGender} onChange={setSelectedGender}>
                    <Listbox.Button className="border-[1px] border-gray/50 rounded-md p-3 text-left text-sm grid grid-cols-[1fr,auto] items-center">
                      <span>{selectedGender}</span>
                      <ChevronDownIcon className="w-5 h-5" />
                    </Listbox.Button>
                    <Listbox.Options className="border-[1px] border-gray/50 rounded-md text-left text-sm">
                      <Listbox.Option
                        className="hover:bg-primary/40 hover:text-primary text-sm cursor-pointer"
                        value={Gender.FEMALE}
                      >
                        {({ active, selected }) => (
                          <h3
                            className={`${
                              active
                                ? 'bg-primary/40 text-primary'
                                : 'text-black'
                            } flex items-center gap-3 p-3`}
                          >
                            {selected && (
                              <CheckIcon className="bg-primary/30 rounded-full p-1 text-primary w-5 h-5" />
                            )}
                            {Gender.FEMALE}
                          </h3>
                        )}
                      </Listbox.Option>

                      <Listbox.Option
                        className="hover:bg-primary/40 hover:text-primary text-sm cursor-pointer"
                        value={Gender.MALE}
                      >
                        {({ active, selected }) => (
                          <h3
                            className={`${
                              active
                                ? 'bg-primary/40 text-primary'
                                : 'text-black'
                            } flex items-center gap-3 p-3`}
                          >
                            {selected && (
                              <CheckIcon className="bg-primary/30 rounded-full p-1 text-primary w-5 h-5" />
                            )}
                            {Gender.MALE}
                          </h3>
                        )}
                      </Listbox.Option>

                      <Listbox.Option
                        className="hover:bg-primary/40 hover:text-primary text-sm cursor-pointer"
                        value={Gender.OTHERS}
                      >
                        {({ active, selected }) => (
                          <h3
                            className={`${
                              active
                                ? 'bg-primary/40 text-primary'
                                : 'text-black'
                            } flex items-center gap-3 p-3`}
                          >
                            {selected && (
                              <CheckIcon className="bg-primary/30 rounded-full p-1 text-primary w-5 h-5" />
                            )}
                            {Gender.OTHERS}
                          </h3>
                        )}
                      </Listbox.Option>
                    </Listbox.Options>
                  </Listbox>
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
                  value={inputField.birthdate}
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
                  value={inputField.contact}
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

              <div>
                <Household
                  inputField={inputField}
                  setInputField={setInputField}
                />
              </div>
            </Fields>

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
                  console.log(inputField)
                }}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}

export default Registration
