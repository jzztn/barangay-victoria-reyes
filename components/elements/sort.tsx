import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import Dropdown from '../styled/dropdown'

const Sort = () => {
  const [selectedCategory, setSelectedCategory] = useState('Type')
  const [categories] = useState([
    'request date',
    'type',
    'status',
  ])
  return (
    <Dropdown
      value={selectedCategory}
      onChange={setSelectedCategory}
      buttonName={selectedCategory}
    >
      {categories.map((category, index) => (
        <Listbox.Option
          key={index}
          className="hover:bg-primary/40 hover:text-primary text-sm cursor-pointer"
          value={category}
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

export default Sort
