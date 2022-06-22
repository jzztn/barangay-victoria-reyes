const TableRows = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white bg-opacity-70 py-3 px-4 grid grid-flow-col items-center rounded-md hover:bg-primary/40 hover:border-none hover:text-green-800 cursor-pointer transition-all duration-300">
      {children}
    </div>
  )
}

export default TableRows
