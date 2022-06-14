import { Dialog } from "@headlessui/react"

interface IProps {
  children: React.ReactNode
  title:string
  isOpen:boolean
  setIsOpen:any
}
const Modal = ({children, title, isOpen, setIsOpen} :IProps) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
    <div className="fixed inset-0 bg-black/30" />
    <div className="fixed inset-0 md:max-w-xl lg:max-w-6xl mx-auto lg:my-16">
      <Dialog.Panel className="bg-white h-full py-6 px-10 overflow-y-scroll grid gap-3">
        <Dialog.Title className="font-semibold text-xl lg:text-2xl tracking-wide">
          {title}
        </Dialog.Title>

        {children}
      </Dialog.Panel>
    </div>
  </Dialog>
  )
}

export default Modal