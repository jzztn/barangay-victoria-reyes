const TableRows = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white shadow-sm shadow-gray-200 py-3 px-4 grid grid-flow-col items-center gap-5 rounded-md hover:bg-primary/30 hover:border-none hover:text-primary cursor-pointer transition-all duration-300">
      {children}
    </div>
  )
}

export default TableRows
