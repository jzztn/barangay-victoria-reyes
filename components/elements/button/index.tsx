interface IProps {
  label: string
  color: boolean
}
const Button = ({ label, color }: IProps) => {
  return (
    <button
      className={`${
        color
          ? 'bg-primary/30 text-primary hover:-translate-y-1'
          : 'text-black hover:bg-primary/30 hover:text-primary'
      } py-2 px-5 md:px-7 font-medium tracking-wider text-xs md:text-sm rounded-md cursor-pointer transition-all duration-500`}
    >
      {label}
    </button>
  )
}
export default Button
