import Button from '../elements/button'
import Filter from '../elements/filter'
import Search from '../elements/search'
import Sort from '../elements/sort'

const SearchSection = () => {
  return (
    <div className="grid lg:grid-cols-[1fr,auto,auto] gap-10 items-center">
      <Search />
      <div className="flex items-center gap-3">
        <Sort />
        <Filter />
      </div>
      <div className="flex items-center gap-3">
        <Button label="Select" color={false} />
        <Button label="Delete All" color={false} />
      </div>
    </div>
  )
}

export default SearchSection
