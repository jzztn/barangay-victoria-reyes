import { Member, Resident } from '../../../prisma/definition'
import Icon from '../../elements/icon'

interface IProps {
  label: string
  icon?: any
  type: string
  fieldName: string
  inputField: Resident | Member
  setInputField: any
  value: any
}
const Field = ({
  label,
  icon,
  type,
  value,
  fieldName,
  inputField,
  setInputField,
}: IProps) => {
  return (
    <>
      {type === 'text' && (
        <div className="grid gap-2">
          <h2 className="text-xs lg:text-sm font-medium tracking-wide">
            {label}
          </h2>

          <div className="flex items-center gap-2">
            {icon && (
              <Icon
                Type={icon}
                circleSize="w-7 h-7"
                iconSize="w-3 h-3"
                link="#"
                color={true}
              />
            )}
            <input
              type="text"
              className="border-[1px] border-gray/50 rounded-md py-2 w-full outline-none pl-4"
              value={value}
              onChange={(e) =>
                setInputField({ ...inputField, [fieldName]: e.target.value })
              }
            />
          </div>
        </div>
      )}

      {type === 'date' && (
        <div className="grid gap-2">
          <h2 className="text-xs lg:text-sm font-medium tracking-wide">
            {label}
          </h2>

          <div className="flex items-center gap-2">
            {icon && (
              <Icon
                Type={icon}
                circleSize="w-7 h-7"
                iconSize="w-4 h-4"
                link="#"
                color={true}
              />
            )}
            <input
              type="date"
              className="border-[1px] border-gray/50 rounded-md py-3 w-full outline-none bg-white pl-4"
              value={value}
              onChange={(e) =>
                setInputField({ ...inputField, [fieldName]: e.target.value })
              }
            />
          </div>
        </div>
      )}

      {type === 'checkbox' && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="border-[1px] border-gray/50 rounded-md py-3 w-full outline-none bg-white"
            value={value}
            onChange={(e) =>
              setInputField({ ...inputField, [fieldName]: e.target.value })
            }
          />
          <h2 className="text-xs lg:text-sm font-medum tracking-wide whitespace-nowrap">
            {label}
          </h2>
        </div>
      )}
    </>
  )
}

export default Field
