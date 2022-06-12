interface IProps {
  place: string
}
const Logo = ({ place }: IProps) => {
  return (
    <div className={`flex items-center gap-3 ${place}`}>
      <h1 className="text-black font-bold text-sm tracking-wide">
        Barangay Victoria Reyes
      </h1>
      <div className="w-1 h-1 bg-black rounded-full" />
      <h1 className="text-black font-semibold text-sm tracking-wide">
        Dasmariñas
      </h1>
    </div>
  )
}

export default Logo
