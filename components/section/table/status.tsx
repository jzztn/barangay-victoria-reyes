interface IProps {
  status: string
}

const TableStatus = ({ status }: IProps) => {
  return <div className="text-sm tracking-wide text-primary">{status}</div>
}

export default TableStatus
