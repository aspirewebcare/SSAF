import React, { useEffect, useRef, useState } from "react";
import CustomSelect from "../shared/CustomeSelect/CustomSelect";
import CustomDropDown from "../shared/Dropdown/CustomDropDown";
import icons from "../shared/icons";

const AddNewItem = () => {
  let titleCss = "text-sm font-semibold mb-2";
  const [dropSort, setDropSort] = useState(false)
  const ref = useRef(null);
  const button = useRef(null);
  const [selectDrop] = useState({ value: '', text: '' });
  const [search, setSearch] = useState('')

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropSort && ref.current && !ref.current.contains(event.target) && button.current && !button.current.contains(event.target)) {
        setDropSort(false)
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [dropSort]);


  useEffect(() => {
    search && !dropSort && setDropSort(true)
    
        // eslint-disable-next-line
  }, [search])

  return (
    <div>
      <div>
        <div className="pb-3">
          <p className={titleCss}>Search Item</p>

          <div className="relative">
            <div ref={button} className='w-full' onFocus={() => search && setDropSort(true)} onChange={(e) => setSearch(e.target.value)} >
              <div className=" pl-3 border rounded-lg w-full flex items-center  relative">
                <icons.search className="text-gray-400 text-xl" />
                <input
                  placeholder="Search Item"
                  className="outline-none py-3 pl-3 w-full"
                  type="text"
                  name="search"
                  id="search"
                  defaultValue={selectDrop.text}
                />
              </div>
              <div ref={ref} className={`${dropSort ? "visible opacity-100 translate-y-0" : 'invisible opacity-0 -translate-y-3'} duration-200 absolute z-[110] shadow-2xl  rounded-lg   p-2 top-16 left-0  w-full bg-white`}>
                <SearchItem search={search} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 py-3">
          <div className="w-1/2">
            <CustomSelect
              label="Category"
              placeholder="Category"
              name="category"
              selectItmes={[{
                id: 1,
                value: "Category",
                data: "Category",
              }, {
                id: 2,
                value: "Category 1",
                data: "Category 1",
              }, {
                id: 3,
                value: "Category 2",
                data: "Category 2",
              }, {
                id: 4,
                value: "Category 3",
                data: "Category 3",
              }]}
            />
          </div>
          <div className="w-1/2">
            <CustomSelect
              label="Sub Category"
              placeholder="Sub Category"
              name="sub_category"
              selectItmes={[{
                id: 1,
                value: "Sub Category",
                data: "Sub Category",
              }, {
                id: 2,
                value: "Sub Category 1",
                data: "Sub Category 1",
              }, {
                id: 3,
                value: "Sub Category 2",
                data: "Sub Category 2",
              }, {
                id: 4,
                value: "Sub Category 3",
                data: "Sub Category 3",
              }]}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 py-3">
          <div className="w-1/2">
            <CustomSelect
              label="Maker"
              placeholder="Maker"
              name="maker"
              selectItmes={[{
                id: 1,
                value: "Maker",
                data: "Maker",
              }, {
                id: 2,
                value: "Maker 1",
                data: "Maker 1",
              }, {
                id: 3,
                value: "Maker 2",
                data: "Maker 2",
              }, {
                id: 4,
                value: "Maker 3",
                data: "Maker 3",
              }]}
            />
          </div>
          <div className="w-1/2">
            <CustomSelect
              label="Model"
              placeholder="Model"
              name="model"
              selectItmes={[{
                id: 1,
                value: "Model",
                data: "Model",
              }, {
                id: 2,
                value: "Model 1",
                data: "Model 1",
              }, {
                id: 3,
                value: "Model 2",
                data: "Model 2",
              }, {
                id: 4,
                value: "Model 3",
                data: "Model 3",
              }]}
            />
          </div>
        </div>
        <div className="w-full py-3">
          <p className={titleCss}>Item Name</p>

          <input
            placeholder="Item Name"
            className="outline-none py-3 px-3 border rounded-lg w-full "
            type="text"
            name="item_name"
            id="item_name"
          />
        </div>
        <div className="w-full pt-3">
          <p className={titleCss}>Description</p>

          <textarea
            placeholder="Enter description"
            className="outline-none py-3 px-3 border rounded-lg w-full h-[120px]"
            type="text"
            name="description"
            id="description"
          />
        </div>
        <div className="flex items-center gap-2 py-3">
          <div className="w-1/2">
            <p className={titleCss}>Quantity</p>

            <input
              placeholder="Enter quantity"
              className="outline-none py-3 px-3 border rounded-lg w-full "
              type="number"
              name="quantity"
              id="quantity"
            />
          </div>
          <div className="w-1/2">
            <p className={titleCss}>Item weight</p>
            <div className="pr-3 border rounded-lg w-full flex items-center mt-2">
              <input
                placeholder="Enter item Weight"
                className="outline-none py-3 px-3 w-full rounded-lg"
                type="number"
                name="item_weight"
                id="item_weight"
              />
              <span>KG</span>
            </div>
          </div>
        </div>
        <div className="py-2">
          <p className="font-semibold text-sm">Item worth</p>

          <div className="pr-3 border rounded-lg w-full flex items-center mt-2">
            <input
              placeholder="Enter item worth"
              className="outline-none py-3 px-3 w-full rounded-lg"
              type="number"
              name="item_worth"
              id="item_worth"
            />
            <CustomDropDown
              bodyCss='!w-full !p-0 overflow-auto'
              buttonCss='!w-full !border-0'
              buttons={
                <button className="flex justify-between text-left items-center  rounded-lg outline-none w-full ">
                  <span className="flex  items-center text-black">USD <icons.arrowDown /></span>
                </button>
              }
              items={
                [
                  { id: 1, text: 'USD', value: 'USD' },
                  { id: 2, text: 'EURO', value: 'EURO' },
                ]
              }
            />

          </div>
        </div>
        <div className="w-full py-3">
          <p className="font-semibold text-sm">Item dimensions (L,W,H)</p>
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="border flex items-center  pr-3   rounded-lg p-0  w-full  mt-3">
              <input
                className="w-full  py-3 pl-3 rounded-lg outline-none"
                type="number"
                name="length"
                id="length"
                placeholder="Length"
              />
              <span>CM</span>
            </div>
            <div className="border flex items-center pr-3   rounded-lg p-0  w-full  mt-3">
              <input
                className="w-full  py-3 pl-3 rounded-lg outline-none"
                type="number"
                name="width"
                id="width"
                placeholder="Width"
              />
              <span>CM</span>
            </div>
            <div className="border flex items-center pr-3   rounded-lg p-0  w-full  mt-3">
              <input
                className="w-full  py-3 pl-3 rounded-lg outline-none"
                type="number"
                name="height"
                id="height"
                placeholder="Height"
              />
              <span>CM</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="w-full mt-3 py-3">
          <CustomSelect
            label="How was the item received in the office?"
            placeholder="Shipped In"
            name="shipped"
            selectItmes={[{
              id: 1,
              value: "Shipped In",
              data: "Shipped In",
            }, {
              id: 2,
              value: "Shipped In 1",
              data: "Shipped In 1",
            }, {
              id: 3,
              value: "Shipped In 2",
              data: "Shipped In 2",
            }, {
              id: 4,
              value: "Shipped In 3",
              data: "Shipped In 3",
            }]}
          />
        </div>
        <hr className="py-3 mt-3" />
        <h1 className="font-semibold text-xl mb-3">
          Order info{" "}
          <span className="text-gray-400 font-normal">(If applicable)</span>
        </h1>
        <div className="w-full py-3">
          <CustomSelect
            label="Source (If available)"
            placeholder="Enter source"
            name="source"
            selectItmes={[{
              id: 1,
              value: "yes",
              data: "Yes",
            }, {
              id: 2,
              value: "no",
              data: "No",
            }]}
          />
        </div>
        <div className="w-full py-3">
          <p className={titleCss}>Order Number (If present)</p>
          <input
            placeholder="Enter order number "
            className="outline-none py-3 px-3  border rounded-lg w-full"
            type="number"
            name="order_number"
            id="order_number"
          />
        </div>
        <div className="w-full py-3">
          <p className={titleCss}>Tracking Number</p>

          <input
            placeholder="Enter tracking number"
            className="outline-none py-3 px-3  border rounded-lg w-full"
            type="text"
            name="tracking_number"
            id="tracking_number"
          />
        </div>
        <div className="w-full py-3">
          <p className={titleCss}>Carrier</p>

          <input
            placeholder="Carrier"
            className="outline-none py-3 px-3  border rounded-lg w-full"
            type="text"
            name="carrier"
            id="carrier"
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewItem;


const SearchItem = ({ search }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [search])
  return (
    <div className='py-3 pr-2 flex flex-col gap-5 px-4'>
      {
        loading && <div className="flex  justify-center">  <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg></div>
      }
      {!loading && <>

        {
          [1, 2].map(item => (
            <React.Fragment key={item}>
              <FindItem />
              <hr />
            </React.Fragment>
          ))
        }

      </>
      }
    </div>
  )
}

const FindItem = () => {
  const [drop, setDrop] = useState(true);

  return (
    <div>
      <div onClick={() => setDrop(prev => !prev)} className="flex justify-between items-center cursor-pointer font-medium">
        <span>Consumer Electronics</span>
        <icons.arrowDown className="" />
      </div>
      <div className={`${drop ? 'h-fit' : 'h-0'} duration-150 overflow-hidden`}>
        <p className="text-sm text-[#212121] mt-5 mb-2">Cellphones</p>
        <p className="text-sm text-[#212121] ml-3 my-4 font-medium  uppercase">Apple</p>
        <ul>
          <li className="border  rounded-lg p-3 mb-2">iphone 11 white 64 gb</li>
          <li className="border  rounded-lg p-3 mb-2">iphone 11 white 128 gb</li>
        </ul>
      </div>
    </div>
  )
}