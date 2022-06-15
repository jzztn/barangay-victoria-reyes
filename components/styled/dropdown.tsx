import { Listbox } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"

interface IProps {
  children:React.ReactNode
  value:any
  onChange: any
  buttonName: string
}
const Dropdown = ({ children, value, onChange, buttonName}: IProps) => {
  return (
    <Listbox
      as="div"
      value={value}
      onChange={onChange}
      className="relative"
    >
      <Listbox.Button className="w-52 border-[1px] border-gray/50 rounded-md p-3 text-left text-sm grid grid-cols-[1fr,auto] gap-5 items-center">
        <span>{buttonName}</span>
        <ChevronDownIcon className="w-5 h-5" />
      </Listbox.Button>
      <Listbox.Options className="absolute top-14 w-full h-40 left-0 bg-white border-[1px] border-gray/50 rounded-md text-left text-sm overflow-y-scroll">
        {children}
      </Listbox.Options>
    </Listbox>
  )
}

export default Dropdown
