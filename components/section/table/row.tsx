interface IProps {
  name: string
}

const TableRow = ({ name }: IProps) => {
  return <div className="text-sm tracking-wide text-left w-[300px]">{name}</div>
}

export default TableRow