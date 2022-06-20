const TableHeaders = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-flow-col">
      {children}
    </div>
  )
}

export default TableHeaders
