const Table = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="flex flex-col gap-10">
      {children}
    </div>
  )
}

export default Table