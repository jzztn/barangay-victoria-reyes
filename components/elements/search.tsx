import Icon from './icon'
import { SearchIcon } from '@heroicons/react/solid'

const Search = () => {
  return (
    <div className="flex items-center gap-3 py-3">
      <Icon
        Type={SearchIcon}
        iconSize="w-4 h-4"
        circleSize="w-10 h-10"
        link="#"
        color={true}
      />

      <input type="text" className='w-full h-full outline-none' placeholder="Search" />
    </div>
  )
}

export default Search
