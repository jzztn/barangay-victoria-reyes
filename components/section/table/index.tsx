const Table = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="grid grid-rows-[auto,1fr] gap-10 overflow-x-scroll h-full">
      {children}
    </div>
  )
}

export default Table