interface IProps {
  name: string
}
const TableHeader = ({ name }: IProps) => {
  return <div className="text-sm font-semibold tracking-wide w-[300px]">{name}</div>
}

export default TableHeader
