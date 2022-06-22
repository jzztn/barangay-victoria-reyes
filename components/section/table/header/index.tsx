const TableHeaders = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-flow-col bg-white shadow-sm shadow-gray-200 px-9 py-3">
      {children}
    </div>
  )
}

export default TableHeaders
