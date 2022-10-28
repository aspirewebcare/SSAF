import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from "underscore";
import { AuthContext } from "../../App";
import ApiRequest from "../../hooks/ApiRequest";
import { checkAuthorized } from "../../hooks/commonFunc";
import CustomSelect from "../shared/CustomeSelect/CustomSelect";
import icons from "../shared/icons";
import Loader from "../shared/Loader";

const AddNewItem = ({ setValue = () => { }, register = () => { }, errors = {} }) => {
  let titleCss = "text-sm font-semibold mb-2";
  const [dropSort, setDropSort] = useState(false)
  const ref = useRef(null);
  const button = useRef(null);
  const [selectDrop] = useState({ value: '', text: '' });
  const [search, setSearch] = useState('')
  const [loggedUser] = useContext(AuthContext)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showCategorys, setShowCategorys] = useState([]);
  const [selectCategory, setSelectCategory] = useState({});


  useEffect(() => {
    register('item_category_uid', { required: true })
    if (JSON.stringify(showCategorys) !== '{}') setValue('item_category_uid', selectCategory?.category_uid)
  }, [selectCategory])
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
    search && !dropSort && setDropSort(true); setLoading(true)
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        getCategoryDataBySearch(search)
      }
    }, 1500)

    return () => clearTimeout(delayDebounceFn)
    // eslint-disable-next-line
  }, [search])

  const getCategoryDataBySearch = (search) => {

    if (loggedUser?.jwt_token) {
      ApiRequest('GET', `/categories/search?search_str=${search}&limit=50&offset=0`, loggedUser.jwt_token,)
        .then(result => {

          if (result.hasOwnProperty('errors')) {

          }
          if (result.hasOwnProperty('data')) {
            let loadData = result?.data;
            let newGroupe = _.groupBy(loadData, "main_category")
            const categoryOptions = [];
            for (const [key, value] of Object.entries(newGroupe)) {
              categoryOptions.push({ value, key });
            }
            setShowCategorys(categoryOptions)
          }

        })
        .catch(error => {
          if (!checkAuthorized(error)) {
            localStorage.clear();
            navigate('/login')
          }
        })
        .finally(() => {
          setLoading(false)

        })
    }
  }

  return (
    <div>
      <div>
        <div className="pb-3">
          <p className={titleCss}>Search Item</p>

          <div className="relative">
            <div ref={button} className='w-full' onFocus={() => search && setDropSort(true)} onChange={(e) => setSearch(e.target.value)} >
              <div className={`pl-3 border rounded-lg w-full flex items-center  relative"${errors.item_category_uid ? 'border-red-500' : ''}`} >
                <icons.search className="text-gray-400 text-xl" />
                <input
                  placeholder="Search Item"
                  className="outline-none py-3 pl-3 w-full"
                  type="text"
                  name="item_category_uid"
                  defaultValue={selectDrop.text}
                  autoComplete='new-password'
                />
              </div>
              <div ref={ref} className={`${dropSort ? "visible opacity-100 translate-y-0" : 'invisible opacity-0 -translate-y-3'} duration-200 absolute z-[110] shadow-2xl  rounded-lg   p-2 top-16 left-0  w-full bg-white`}>
                <SearchItem setDropSort={setDropSort} setSelectCategory={setSelectCategory} showCategorys={showCategorys} loading={loading} search={search} />
              </div>
            </div>
          </div>
          {errors.item_category_uid && <p className="text-xs text-red-500 mt-1">Enter Number</p>}

        </div>
        <div className="flex items-center gap-4 py-3">
          <div className="w-1/2">
            <CustomSelect
              value={selectCategory?.main_category}
              register={register}
              label="Category"
              placeholder="Category"
              name="category"
            />
          </div>
          <div className="w-1/2">
            <CustomSelect
              value={selectCategory?.sub_category}
              register={register}
              label="Sub Category"
              placeholder="Sub Category"
              name="sub_category"
              required={false}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 py-3">
          <div className="w-1/2">
            <CustomSelect
              value={selectCategory?.maker}
              register={register}
              label="Maker"
              placeholder="Maker"
              name="maker"
              required={false}
            />
          </div>
          <div className="w-1/2">
            <CustomSelect
              value={selectCategory?.model}
              register={register}
              label="Model"
              placeholder="Model"
              name="model"
              required={false}
            />
          </div>
        </div>
        <div className="w-full py-3">
          <p className={titleCss}>Item Name</p>
          <input
            {...register('name', { required: true })}
            placeholder="Item Name"
            className={`outline-none py-3 px-3 border rounded-lg w-full ${errors.name ? 'border-red-500' : ''}`}
            type="text"
            name="name"
            id="name"
          />
          {
            errors.name && <p className="text-xs text-red-500 mt-1">Enter email</p>
          }

        </div>
        <div className="w-full pt-3">
          <p className={titleCss}>Description</p>

          <textarea
            {...register('description', { required: true })}
            placeholder="Enter description"
            className={`outline-none py-3 px-3 border rounded-lg w-full h-[120px] ${errors.description ? 'border-red-500' : ''}`}
            type="text"
            name="description"
            id="description"
          />
          {
            errors.description && <p className="text-xs text-red-500 mt-1">Enter description</p>
          }
        </div>
        <div className="flex items-center gap-2 py-3">
          <div className="w-1/2">
            <p className={titleCss}>Quantity</p>

            <input
              {...register('quantity', { required: true })}

              placeholder="Enter quantity"
              className={`outline-none py-3 px-3 border rounded-lg w-full ${errors.quantity ? 'border-red-500' : ''}`}
              type="number"
              name="quantity"
              id="quantity"
            />
            {
              errors.quantity && <p className="text-xs text-red-500 mt-1">Enter quantity</p>
            }
          </div>
          <div className="w-1/2">
            <p className={titleCss}>Item weight</p>
            <div className="pr-3 border rounded-lg w-full flex items-center mt-2">
              <input
                {...register('item_weight', { required: true })}
                placeholder="Enter item Weight"
                className={`outline-none py-3 px-3 w-full rounded-lg ${errors.item_weight ? 'border-red-500' : ''}`}
                type="number"
                name="item_weight"
                id="item_weight"
              />
              <span>KG</span>
            </div>
            {
              errors.item_weight && <p className="text-xs text-red-500 mt-1">Enter Weight</p>
            }
          </div>
        </div>
        <div className="py-2">
          <p className="font-semibold text-sm">Item worth</p>

          <div className={`pr-3 border rounded-lg w-full flex items-center mt-2 ${errors.item_worth ? 'border-red-500' : ''}`}>
            <input
              {...register('item_worth', { required: true })}

              placeholder="Enter item worth"
              className='outline-none py-3 px-3 w-full rounded-lg'
              type="number"
              name="item_worth"
              id="item_worth"
            />
            <select name="" id="" className="!border-0">
              <option value="USD">USD</option>
              <option value="EURO">EURO</option>
            </select>
          </div>
          {
            errors.item_worth && <p className="text-xs text-red-500 mt-1">Enter item worth</p>
          }
        </div>
        <div className="w-full py-3">
          <p className="font-semibold text-sm">Item dimensions (L,W,H)</p>
          <div className="flex flex-col lg:flex-row gap-3">
            <div className={`border flex items-center pr-3 rounded-lg p-0 w-full mt-3 ${errors.length ? 'border-red-500' : ''}`}>
              <input
                {...register('length', { required: true })}
                className='w-full  py-3 pl-3 rounded-lg outline-none '
                type="number"
                name="length"
                id="length"
                placeholder="Length"
              />
              <span>CM</span>
            </div>
            <div className={`border flex items-center pr-3   rounded-lg p-0  w-full  mt-3 ${errors.width ? 'border-red-500' : ''}`}>
              <input
                {...register('width', { required: true })}

                className='w-full  py-3 pl-3 rounded-lg outline-none '
                type="number"
                name="width"
                id="width"
                placeholder="Width"
              />
              <span>CM</span>
            </div>
            <div className={`border flex items-center pr-3   rounded-lg p-0  w-full  mt-3 ${errors.height ? 'border-red-500' : ''}`}>
              <input
                {...register('height', { required: true })}
                className='w-full  py-3 pl-3 rounded-lg outline-none '
                type="number"
                name="height"
                id="height"
                placeholder="Height"
              />
              <span>CM</span>
            </div>
          </div>
          {
            (errors.height || errors.length || errors.width) && <p className="text-xs text-red-500 mt-1">Enter feild</p>
          }
        </div>
        <hr />
        <div className="w-full mt-3 py-3">
          <CustomSelect
            register={register}
            errors={errors}
            label="How was the item received in the office?"
            placeholder="Shipped In"
            name="drop_off_options"
            selectItmes={[{
              id: 1,
              value: "DROP_OFF",
              data: "Drop off",
            }, {
              id: 2,
              value: "ONLINE",
              data: "Online",
            }]}
            required={true}
          />
        </div>
        <hr className="py-3 mt-3" />
        <h1 className="font-semibold text-xl mb-3">
          Order info{" "}
          <span className="text-gray-400 font-normal">(If applicable)</span>
        </h1>
        <div className="w-full py-3">
          <CustomSelect
            register={register}
            errors={errors}
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
            {...register('order_number')}
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
            {...register('tracking_number', { required: true })}

            placeholder="Enter tracking number"
            className={`outline-none py-3 px-3  border rounded-lg w-full ${errors.tracking_number ? 'border-red-500' : ''}`}
            type="text"
            name="tracking_number"
            id="tracking_number"
          />
          {errors.tracking_number && <p className="text-xs text-red-500 mt-1">Enter Number</p>}
        </div>
        <div className="w-full py-3">
          <p className="font-bold text-sm text-gray-800 ">
            Carrier
          </p>
          <select
            className={`py-3 px-3 mt-2 border rounded-lg w-full ${errors.carrier ? 'border-red-500' : 'border-gray-50'}`}
            name="carrier"
            id="carrier"
            {...register('carrier', { required: true })}
          >
            <option value="" hidden>Carrier</option>
            <option value="USPS">DHL</option>
            <option value="FEDEX">Fedex</option>
            <option value="DHL">DHL</option>
            <option value="UPS">UPS</option>
            <option value="OTHER">OTHER</option>
          </select>
          {errors.carrier && <p className="text-xs text-red-500 mt-1">Enter Carrier</p>}

        </div>
      </div>
    </div >
  );
};

export default AddNewItem;


const SearchItem = ({ setDropSort, setSelectCategory, showCategorys, loading }) => {

  if (loading) return (
    <div className='py-3 pr-2 flex flex-col gap-5 px-4'>
      <Loader />
    </div>
  )

  if (!loading) return (
    <div className='py-3 pr-2 flex flex-col gap-5 px-4 max-h-[450px] overflow-auto '>
      {
        showCategorys.map((category) => (
          <FindItem setDropSort={setDropSort} setSelectCategory={setSelectCategory} key={category?.key} name={category.key} category={category?.value} />
        ))
      }
    </div>
  )
}

const FindItem = ({ setDropSort, setSelectCategory, category, name }) => {
  const [drop, setDrop] = useState(true);
  const [subCategory, setSubCategory] = useState([])

  useEffect(() => {

    let newGroupe = _.groupBy(category, "sub_category")
    const categoryOptions = [];
    for (const [key, value] of Object.entries(newGroupe)) {
      categoryOptions.push({ value, key });
    }
    setSubCategory(categoryOptions)
  }, [])

  return (
    <div>
      <div onClick={() => setDrop(prev => !prev)} className="flex justify-between items-center cursor-pointer font-medium">
        <span>{name}</span>
        <icons.arrowDown className="" />
      </div>
      <div className={`${drop ? 'h-fit' : 'h-0'} duration-150 overflow-hidden`}>
        <div>
          {
            subCategory.map(itm => (
              <SubCategory setDropSort={setDropSort} setSelectCategory={setSelectCategory} key={itm?.key} name={itm?.key} item={itm?.value} />
            ))
          }
        </div>
      </div>
    </div>
  )
}


const SubCategory = ({ setDropSort, setSelectCategory, item, name }) => {
  const [makers, setMakers] = useState([])
  useEffect(() => {

    let newGroupe = _.groupBy(item, "maker")
    const categoryOptions = [];
    for (const [key, value] of Object.entries(newGroupe)) {
      categoryOptions.push({ value, key });
    }
    setMakers(categoryOptions)
  }, [])
  return (<>
    <p className="text-sm text-[#212121] mt-5 mb-2">{name}</p>
    {
      makers.map(itm => (
        <Maker setDropSort={setDropSort} setSelectCategory={setSelectCategory} key={itm?.key} name={itm?.key} item={itm?.value} />
      ))
    }
    <hr />
  </>
  )
}
const Maker = ({ setDropSort, setSelectCategory, item, name }) => {
  const selectProduct = (itm) => {
    setSelectCategory(itm)
    setDropSort(false)
  }
  return (<>
    <p className="text-sm text-[#212121] mt-5 mb-2">{name}</p>
    <ul className="max-h-[250px]  overflow-auto mb-3 py-5">
      {
        item.map((itm, ind) => (
          <li onClick={() => selectProduct(itm)} className="border cursor-pointer hover:bg-gray-50 rounded-lg p-3 mb-2" key={ind}>{itm?.model}</li>
        ))
      }
    </ul>
  </>
  )
}