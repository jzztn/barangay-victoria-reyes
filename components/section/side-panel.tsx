import Icon from '../elements/icon'
import {
  NewspaperIcon,
  BellIcon,
  AdjustmentsIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/solid'

interface IProps {
  image: any
  name: string
}
const SidePanel = ({ image, name }: IProps) => {
  return (
    <div className='hidden lg:block'>
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

        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={image} alt="Profile" className="w-full h-full" />
        </div>
      </div>
    </div>
  )
}

export default SidePanel
