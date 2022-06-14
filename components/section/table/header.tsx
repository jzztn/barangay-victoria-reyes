interface IProps {
  name: string
}
const TableHeader = ({ name }: IProps) => {
  return <div className="text-sm font-semibold tracking-wide">{name}</div>
}

export default TableHeader
