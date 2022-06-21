import Icon from '../elements/icon'
import {
  NewspaperIcon,
  BellIcon,
  AdjustmentsIcon,
  CurrencyDollarIcon,
  HomeIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/solid'

interface IProps {
  image: any
  name?: string
  admin: boolean
}
const SidePanel = ({ image, name, admin }: IProps) => {
  return (
    <>
      {!admin ? (
        <div className="hidden lg:block">
          <div className="h-full grid grid-rows-[1fr,auto] gap-5 jusitfy-center p-6 shadow-md shadow-gray/50">
            <div className="flex flex-col gap-10">
              <Icon
                Type={NewspaperIcon}
                circleSize="w-10 h-10"
                iconSize="w-5 h-5"
                color={false}
                link={`/user/${name}`}
              />
              <Icon
                Type={BellIcon}
                circleSize="w-10 h-10"
                iconSize="w-5 h-5"
                color={false}
                link={`/user/${name}/notifications`}
              />
              <Icon
                Type={AdjustmentsIcon}
                circleSize="w-10 h-10"
                iconSize="w-5 h-5"
                color={false}
                link={`/user/${name}/profile`}
              />
              <Icon
                Type={CurrencyDollarIcon}
                circleSize="w-10 h-10"
                iconSize="w-5 h-5"
                color={false}
                link={`/user/${name}/payment`}
              />
            </div>

            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={image} alt="Profile" className="w-full h-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden lg:block">
          <div className="h-full grid grid-rows-[1fr,auto] gap-5 jusitfy-center p-6 shadow-md shadow-gray/50">
            <div className="flex flex-col gap-10">
              <Icon
                Type={UserGroupIcon}
                circleSize="w-10 h-10"
                iconSize="w-5 h-5"
                color={false}
                link="/admin"
              />
              <Icon
                Type={NewspaperIcon}
                circleSize="w-10 h-10"
                iconSize="w-5 h-5"
                color={false}
                link="/admin/requests"
              />
              <Icon
                Type={HomeIcon}
                circleSize="w-10 h-10"
                iconSize="w-5 h-5"
                color={false}
                link="/admin/registrations"
              />
              <Icon
                Type={UserIcon}
                circleSize="w-10 h-10"
                iconSize="w-5 h-5"
                color={false}
                link="/admin/profile"
              />
            </div>

            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={image} alt="Admin Profile" className="w-full h-full" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SidePanel
