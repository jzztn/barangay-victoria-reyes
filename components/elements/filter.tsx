import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import Dropdown from '../styled/dropdown'

interface IProps {
  placeholder: string
  setPlaceholder: any
}
const Filter = ({ placeholder, setPlaceholder }: IProps) => {
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
  return (
    <Dropdown
      value={placeholder}
      onChange={setPlaceholder}
      buttonName={placeholder}

    >
      {categories.map((category, index) => (
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
    </Dropdown>
  )
}

export default Filter
