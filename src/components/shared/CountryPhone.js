import React, { useEffect, useState } from "react";
import { countries } from "../../DummyData/allCountryJson";
import icons from '../shared/icons';
import { CustomSelectWithSearch } from "./Dropdown/CustomDropDown";

const CountryPhone = ({ defaultValue = '', register }) => {


  return (
    <>
      <div className="flex items-center gap-2 border rounded-lg   text-gray-600 w-full mt-2 mb-4 pr-3 relative">
        <div className="w-fit">
          <CountrySelect items={countries} />
        </div>
        <input
          {...register("phone_number")}
          defaultValue={defaultValue ? defaultValue.replace('+', '') : ''}
          className="outline-none text-gray-600  rounded-lg pr-1 pl-0 py-[15px] w-full"
          placeholder="Phone Number"
          type="number"
          name="phone_number"
        />
      </div>
    </>
  );
};

export default CountryPhone;

export  const CountrySelect = ({ items, customClass = "" }) => {
  const [selectedPerson, setSelectedPerson] = useState(items[181]);
  const [search, setSearch] = useState('');
  const [filterItems, setFilterItems] = useState([]);
  const [closeDrop, setCloseDrop] = useState(false);


  useEffect(() => {
    if (search === '') {
      return setFilterItems(items);
    } else {
      let filter = items.filter(item => (typeof item.name === 'string') && item?.name.toLowerCase().includes(search.toLowerCase()))
      setFilterItems(filter)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const selectItem = (item) => {
    setSelectedPerson(item)
    setCloseDrop(prev => !prev)
  }

  return (
    <div className={`w-fit`}>
      <CustomSelectWithSearch onClose={closeDrop} search={search} setSearch={setSearch} buttonCss='!border-0' buttons={
        <div className="flex w-fit  gap-1 items-center pl-3">
          <img className="w-6" src={selectedPerson.image} alt="flag" />
          <icons.arrowDown className="text-xl" />
        </div>
      }>
        {
          filterItems.length ? filterItems.map((item,ind) => (
            <CustomSelectWithSearch.Item handleClick={() => selectItem(item)} key={ind}>
              <div className="w-8">
                <img className="w-full" src={item.image} alt="flag" />
              </div>
              <span>{item.name}</span>
              <div className="round green_checkbox flex ml-auto mr-1">
                <input
                  checked={item.name === selectedPerson.name ? true : false}
                  type="checkbox"
                  id={item.name}
                  readOnly
                />
                <label
                  htmlFor={item.name}
                  className="cursor-pointer text-ellipsis whitespace-nowrap"
                >
                </label>
              </div>
            </CustomSelectWithSearch.Item>
          ))
            :
            <CustomSelectWithSearch.Item customClass='justify-center'>
              Not  Found!
            </CustomSelectWithSearch.Item>
        }
      </CustomSelectWithSearch>
    </div>
  );
};
