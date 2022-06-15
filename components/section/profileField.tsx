import { Profile, User } from "../../prisma/definition"
import Icon from "../elements/icon"

interface IProps {
  user:User
  icon:any
  inputField:Profile
  setInputField:any
  defaultValue:string
  value:string
  field:string
}
const ProfileField = ({user, icon, inputField, setInputField, defaultValue, value, field} :IProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-medium tracking-wide">{field[0].toUpperCase() + field.slice(1)}</h2>
      <div className="flex items-center gap-3">
        <Icon
          Type={icon}
          iconSize="w-4 h-4"
          circleSize="w-8 h-8"
          color={true}
          link="#"
        />

        {user.profile !== null ? (
          <input
            type="text"
            defaultValue={defaultValue}
            onChange={(e) =>
              setInputField({ ...inputField, [field]: e.target.value })
            }
            className="w-96 py-3 pl-4"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) =>
              setInputField({ ...inputField, [field]: e.target.value })
            }
            className="w-96 py-3 pl-4"
          />
        )}
      </div>
    </div>
  )
}

export default ProfileField
