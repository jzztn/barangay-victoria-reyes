import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import Dropdown from '../styled/dropdown'

interface IProps {
  placeholder: string
  setPlaceholder: any
  resident: boolean
}
const Filter = ({ placeholder, setPlaceholder, resident }: IProps) => {
  const [categories] = useState([
    'clearance certificate',
    'cedula',
    'barangay certificate',
    'certificate of indigency',
    'approved',
    'declined',
    'pending',
    'processing',
  ])

  const [residentCategories] = useState([
    'First Name',
    'Middle Name',
    'Last Name',
    'Gender',
    'Contact',
    'Birthdate',
    'Birthplace',
    'Address',
    'Started Year',
    'Homeowner',
    'Voter',
  ])
  return (
    <Dropdown
      value={placeholder}
      onChange={setPlaceholder}
      buttonName={placeholder}
    >
      {!resident &&
        categories.map((category, index) => (
          <Listbox.Option
            key={index}
            className="hover:bg-primary/40 hover:text-primary text-sm cursor-pointer"
            value={category}
            onClick={() => setPlaceholder(category)}
          >
            {({ active, selected }) => (
              <h3
                className={`${
                  active ? 'bg-primary/40 text-primary' : 'text-black'
                } flex items-center gap-3 p-3 whitespace-nowrap`}
              >
                {selected && (
                  <CheckIcon className="bg-primary/30 rounded-full p-1 text-primary w-5 h-5" />
                )}
                {category[0].toUpperCase() + category.slice(1)}
              </h3>
            )}
          </Listbox.Option>
        ))}

      {resident &&
        residentCategories.map((category, index) => (
          <Listbox.Option
            key={index}
            className="hover:bg-primary/40 hover:text-primary text-sm cursor-pointer"
            value={category}
            onClick={() => setPlaceholder(category)}
          >
            {({ active, selected }) => (
              <h3
                className={`${
                  active ? 'bg-primary/40 text-primary' : 'text-black'
                } flex items-center gap-3 p-3 whitespace-nowrap`}
              >
                {selected && (
                  <CheckIcon className="bg-primary/30 rounded-full p-1 text-primary w-5 h-5" />
                )}
                {category}
              </h3>
            )}
          </Listbox.Option>
        ))}
    </Dropdown>
  )
}

export default Filter
