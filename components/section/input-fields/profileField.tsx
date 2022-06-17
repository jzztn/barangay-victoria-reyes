import { Profile, User } from '../../../prisma/definition'
import Icon from '../../elements/icon'

interface IProps {
  user: User
  icon: any
  inputField: Profile
  setInputField: any
  defaultValue: string
  value: string
  field: string
  edit:boolean
}
const ProfileField = ({
  user,
  icon,
  inputField,
  setInputField,
  defaultValue,
  value,
  field,
  edit,
}: IProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-medium tracking-wide">
        {field[0].toUpperCase() + field.slice(1)}
      </h2>
      <div className="flex items-center gap-3">
        <Icon
          Type={icon}
          iconSize="w-4 h-4"
          circleSize="w-8 h-8"
          color={true}
          link="#"
        />

        {edit ? (
          <div>
            {user.profile !== null ? (
              // edit is true and theres alreadt have a profile
              <input
                type="text"
                defaultValue={defaultValue}
                onChange={(e) =>
                  setInputField({ ...inputField, [field]: e.target.value })
                }
                className="w-96 py-3 pl-4 bg-primary/40"
              />
            ) : (
              // edit is true and theres no profile yet
              <div>
                <input
                  type="text"
                  defaultValue={value}
                  onChange={(e) =>
                    setInputField({ ...inputField, [field]: e.target.value })
                  }
                  className="w-96 py-3 pl-4"
                />
                <span className='text-red-500 text-xs italic mt-1'>Fill up this field first</span>
              </div>
            )}
          </div>
        ) : (
          <div>
            {user.profile !== null ? (
              // edit is false and theres already have a profile
              <input
                type="text"
                value={defaultValue}
                onChange={(e) =>
                  setInputField({ ...inputField, [field]: e.target.value })
                }
                className="w-96 py-3 pl-4 outline-none bg-yellow-500"
              />
            ) : (
              // edit is false and theres no profile yet
              <input
                type="text"
                defaultValue={value}
                onChange={(e) =>
                  setInputField({ ...inputField, [field]: e.target.value })
                }
                className="w-96 py-3 pl-4"
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileField
