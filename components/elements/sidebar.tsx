import { ChevronDoubleRightIcon } from '@heroicons/react/solid'

interface IProps {
  children: React.ReactNode
  close: any
}
const Sidebar = ({ children, close }: IProps) => {
  return (
    <div className="lg:hidden h-full w-64 fixed right-0 top-0 bg-white py-6 px-8">
      <button className="bg-white w-10 h-10 shadow-gray/50 shadow-md rounded-full grid place-items-center">
        <ChevronDoubleRightIcon
          className="w-5 h-5 hover:text-primary"
          onClick={close}
        />
      </button>

      <ul className="mt-20 grid gap-6">{children}</ul>
    </div>
  )
}

export default Sidebar
