import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CgArrowsExpandLeft } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import usflag from '../../assets/images/usa.svg';
import { CustomersInfo } from "../../DummyData/DummyData";
import ApiRequest from "../../hooks/ApiRequest";
import { checkAuthorized } from "../../hooks/commonFunc";
import CustomButton from "../shared/Buttons/CustomButton";
import CustomDropDown, {
  SenderDropDown
} from "../shared/Dropdown/CustomDropDown";
import icons from "../shared/icons";
import Loader from "../shared/Loader";
import LoadingForFetch from "../shared/LoadingForFetch";
import AddNewShippingHeader from "./AddNewShippingHeader";

const AddShippingDetails = ({ selectSender, setSelectSender, shippingAddressSubmit, loading = false, shippingDetails = {}, nextBtnType = 'button', nextBtn = 'Next', currentStep, setFilterComInfo, setRightSidebarOpen }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    clearErrors,
    resetField
  } = useForm();

  const [closeDrop, setCloseDrop] = useState(false)
  const [selectConsignee, setSelectConsignee] = useState({});
  const [isCustomerHere, setIsCustomerHere] = useState({ status: false, info: { customer_uid: shippingDetails?.customer_uid || '' } })
  const [isConsigneeHere, setIsConsigneeHere] = useState({ status: false, info: { consignee_uid: shippingDetails?.consignee_uid || '' } })


  const addNewSender = (type = "sender") => {
    setRightSidebarOpen(true);
    if (type === "sender") {
      setFilterComInfo({
        title: "Add New Sender",
        cancelBtn: "CANCEL",
        applyBtn: "Add",
      });
    } else {
      setFilterComInfo({
        title: "Add New Consignee",
        cancelBtn: "CANCEL",
        applyBtn: "Add",
      });
    }
  };

  useEffect(() => {
    register('customer_uid', { required: true })
    if (JSON.stringify(selectSender) !== '{}') {
      setValue('customer_uid', selectSender?.customer_uid || isCustomerHere?.info?.customer_uid)
      clearErrors('customer_uid')
    } else {
      setValue('customer_uid', isCustomerHere?.info?.customer_uid)
      clearErrors('customer_uid')
    }
  }, [selectSender, isCustomerHere.status])

  useEffect(() => {
    register('consignee_uid', { required: true })
    if (JSON.stringify(selectConsignee) !== '{}') {
      setValue('consignee_uid', selectConsignee?.consignee_uid)
      clearErrors('consignee_uid')
    } else {
      setValue('consignee_uid', shippingDetails?.consignee_uid)
      clearErrors('consignee_uid')
    }
  }, [selectConsignee, isConsigneeHere.status])

  return (
    <form onSubmit={handleSubmit(shippingAddressSubmit)} className={`${currentStep === 1 ? 'block' : "hidden"}`}>
      <div className="flex justify-between items-end">
        <AddNewShippingHeader step={currentStep} />
      </div>
      <div className="flex flex-col gap-8 w-full">
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Source office *</p>
            <Office clearErrors={clearErrors} errors={errors} defaultValue={shippingDetails?.source_office_uid} setValue={setValue} placeholder='Enter current office' name='source_office_uid' register={register} />
          </div>
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Destination office *</p>
            <Office clearErrors={clearErrors} errors={errors} defaultValue={shippingDetails?.destination_office_uid} setValue={setValue} placeholder='Enter destination office' name='destination_office_uid' register={register} />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Sender *</p>
            <SenderDropDown
              errors={errors}
              name='customer_uid'
              closeDrop={closeDrop}
              bodyCss="!w-[648px] left-0 !px-3"
              buttonCss="!w-full "
              buttons={
                <button type="button" className="flex justify-between text-left items-center  rounded-lg outline-none w-full ">
                  {
                    (JSON.stringify(selectSender) !== '{}' && selectSender) || isCustomerHere.status ?
                      <>
                        <span className="text-gray-900">{selectSender?.first_name || isCustomerHere?.info?.first_name}</span>
                        <icons.arrowDown />
                      </>
                      :
                      <>
                        <span>Enter sender</span>
                        <icons.arrowDown />
                      </>
                  }
                </button>
              }
            >
              <SenderInfos
                customer_uid={isCustomerHere?.info?.customer_uid}
                setIsCustomerHere={setIsCustomerHere}
                selectSender={selectSender}
                placeholder="Search Sender"
                setSelectData={setSelectSender}
                setCloseDrop={setCloseDrop}
                type="sender"
                addNewSender={addNewSender}
              />
            </SenderDropDown>
            {errors['customer_uid'] && <span className='text-red-500 text-xs pl-1'>This field is required</span>}
          </div>
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Consignee *</p>
            <SenderDropDown
              errors={errors}
              name='consignee_uid'
              defaultValue={shippingDetails?.consignee?.first_name || ''}
              closeDrop={closeDrop}
              bodyCss="!w-[648px] right-0 !px-3"
              buttonCss="!w-full "
              buttons={
                <button type="button" className="flex justify-between text-left items-center  rounded-lg outline-none w-full ">
                  {
                    JSON.stringify(selectConsignee) !== '{}' || isConsigneeHere.status ?
                      <>
                        <span className="text-gray-900">{selectConsignee?.first_name || isConsigneeHere?.info?.first_name}</span>
                        <icons.arrowDown />
                      </>
                      :
                      <>
                        <span>Enter Consignee</span>
                        <icons.arrowDown />
                      </>
                  }
                </button>
              }
            >
              <SenderInfos
                customer_uid={isConsigneeHere?.info?.consignee_uid}
                setIsCustomerHere={setIsConsigneeHere}
                selectSender={selectSender}
                placeholder="Search Consignee"
                setSelectData={setSelectConsignee}
                setCloseDrop={setCloseDrop}
                type="consignee"
                addNewSender={addNewSender}
              />
            </SenderDropDown>
            {errors['consignee_uid'] && <span className='text-red-500 text-xs pl-1'>This field is required</span>}
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">System of measure *</p>
            <CustomDropDown
              clearErrors={clearErrors}
              errors={errors}
              register={register}
              defaultValue={shippingDetails?.shipment_system_of_measure || ''}
              bodyCss="!w-full !p-0 overflow-auto"
              buttonCss="!w-full "
              placeholder='Choose system of measure'
              setValue={setValue}
              name='shipment_system_of_measure'
              items={[
                {
                  id: 1,
                  text: "International",
                  value: "INTERNATIONAL",
                },
                // {
                //   id: 2,
                //   text: "NonInternational",
                //   value: "NONINTERNATIONAL",
                // },
              ]}
            />
          </div>
          <div className=" w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Shipping weight *</p>
            <div className={`flex items-center  justify-between border rounded-lg  pr-3  ${errors['shipment_weight'] ? 'border-red-500' : ''}`}>
              <input
                {...register('shipment_weight', { required: true })}
                defaultValue={Number(shippingDetails?.shipment_weight) || ''}
                placeholder="Enter shipping weight"
                className="rounded-lg outline-none w-full py-[14px] pl-3"
                type="number"
                name="shipment_weight"
                id="shipment_weight"
              />
              <span>KG</span>
            </div>
            {errors['shipment_weight'] && <span className='text-red-500 text-xs pl-1'>This field is required</span>}

          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm">
              Shipping dimensions (L,W,H) *
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className={`border flex items-center  pr-3   rounded-lg p-0 w-full sm:w-1/3 mt-3  ${errors['length'] ? 'border-red-500' : ''}`}>
                <input
                  defaultValue={shippingDetails?.shipment_dimension?.length || ''}
                  className="w-full  py-3 pl-3 rounded-lg outline-none"
                  type="number"
                  name="length"
                  placeholder="Length"
                  {...register('length', { required: true })}
                />
                <span>CM</span>
              </div>
              <div className={`border flex items-center pr-3   rounded-lg p-0 w-full sm:w-1/3 mt-3  ${errors['width'] ? 'border-red-500' : ''}`}>
                <input
                  defaultValue={shippingDetails?.shipment_dimension?.width || ''}
                  className="w-full  py-3 pl-3 rounded-lg outline-none"
                  type="number"
                  name="width"
                  placeholder="Width"
                  {...register('width', { required: true })}
                />
                <span>CM</span>
              </div>
              <div className={`border flex items-center pr-3   rounded-lg p-0 w-full sm:w-1/3 mt-3  ${errors['height'] ? 'border-red-500' : ''}`}>
                <input
                  defaultValue={shippingDetails?.shipment_dimension?.height || ''}
                  className="w-full  py-3 pl-3 rounded-lg outline-none"
                  type="number"
                  name="height"

                  placeholder="Height"
                  {...register('height', { required: true })}

                />
                <span>CM</span>
              </div>
            </div>
            {(errors['height'] || errors['width'] || errors['length']) && <span className='text-red-500 text-xs pl-1'>This field is required</span>}
          </div>
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Delivery option *</p>
            <CustomDropDown
              errors={errors}
              clearErrors={clearErrors}

              register={register}
              defaultValue={shippingDetails?.delivery_option || ''}
              name='delivery_option'
              bodyCss="!w-full !p-0 overflow-auto"
              buttonCss="!w-full "
              placeholder='Choose delivery option'
              setValue={setValue}
              items={[
                { id: 1, text: "Office Pickup", value: "OFFICE_PICKUP" },
                { id: 2, text: "Door Step Delivery ", value: "DOOR_STEP_DELIVERY" },
              ]}
            />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Need insurance</p>
            <CustomDropDown
              errors={errors}
              clearErrors={clearErrors}

              register={register}
              defaultValue={shippingDetails?.is_insured ? 'Yes' : 'No' || ''}
              name='is_insured'
              bodyCss="!w-full !h-fit !p-0 overflow-auto"
              buttonCss="!w-full "
              placeholder='Need insurance'
              setValue={setValue}
              items={[
                { id: 2, text: "Yes", value: true },
                { id: 3, text: "No", value: false },
              ]}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Need packaging</p>
            <CustomDropDown
              errors={errors}
              clearErrors={clearErrors}

              register={register}
              defaultValue={shippingDetails?.is_packaging ? 'Yes' : 'No' || ''}
              bodyCss="!w-full !h-fit !p-0 overflow-auto"
              buttonCss="!w-full "
              placeholder='Need packaging'
              name='is_packaging'
              setValue={setValue}
              items={[
                { id: 2, text: "Yes", value: true },
                { id: 3, text: "No", value: false },
              ]}
            />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Service type *</p>
            <CustomDropDown
              errors={errors}
              clearErrors={clearErrors}

              register={register}
              defaultValue={shippingDetails?.shipment_service_type || ''}
              name='shipment_service_type'
              bodyCss="!w-full !h-fit !p-0 overflow-auto"
              buttonCss="!w-full "
              setValue={setValue}
              placeholder='Choose service type'
              items={[
                { id: 1, text: "Regular", value: "REGULAR" },
                { id: 2, text: "Express", value: "EXPRESS" },
              ]}
            />
          </div>
        </div>

        <div>
          {
            nextBtn &&
            <CustomButton
              block={true}
              btnClass="h-[56px] w-[150px]"
              text={nextBtn}
              type={nextBtnType}
              loading={loading}
            />
          }
        </div>
      </div>
    </form>
  );
};

export default AddShippingDetails;

export const SenderInfos = ({ showOnAddItem = false, selectSender, customer_uid, setIsCustomerHere = () => { }, isLastName = true, isEmail = true, placeholder = '', setSelectData, setCloseDrop, addNewSender, type = "" }) => {
  const [loggedUser] = useContext(AuthContext)
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [fetchStatus, setFetchStatus] = useState('no_fetch')
  const [fetchAgain, setFetchAgain] = useState(true);
  const [maxDataLoad, setMaxDataLoad] = useState(0)
  const navigate = useNavigate();

  //Get All Customers 
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (loggedUser?.jwt_token && fetchAgain && maxDataLoad >= customers.length) {

        if (type === 'sender') {
          setFetchStatus('no_fetch')
          ApiRequest('GET', `/customers?limit=50&offset=${customers.length}`, loggedUser.jwt_token,)
            .then(result => {
              if (result.hasOwnProperty('errors')) {
              } else {
                setCustomers(prev => [...prev, ...result.data])
                setMaxDataLoad(result?.match_size)
              }
            })
            .catch(error => {
              if (!checkAuthorized(error)) {
                localStorage.clear();
                navigate('/login')
              }
            })
            .finally(() => {
              setFetchAgain(false)
              setFetchStatus('fetched')
            })
        } else {
          if (selectSender.hasOwnProperty('customer_uid')) {
            setFetchStatus('no_fetch')
            ApiRequest('GET', `/consignees?limit=50&offset=${customers.length}&customer_uid=${selectSender?.customer_uid}`, loggedUser.jwt_token,)
              .then(result => {
     
                if (result.hasOwnProperty('errors')) {
                } else {
                  setCustomers(prev => [...prev, ...result.data])
                  setMaxDataLoad(result?.match_size)
                }
              })
              .catch(error => {
                if (!checkAuthorized(error)) {
                  localStorage.clear();
                  navigate('/login')
                }
              })
              .finally(() => {
                setFetchAgain(false)
                setFetchStatus('fetched')
              })
          } else {
            setFetchStatus('fethched')
          }
        }
      }

    }, 0)
    return () => clearTimeout(delayDebounceFn)
  }, [loggedUser.jwt_token, selectSender?.customer_uid, fetchAgain])

  useEffect(() => {
    let filter = customers.filter((singleData) => {
      if (search === "") {
        return singleData;
      } else {
        return `${singleData.email} ${singleData.first_name} ${singleData.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase());
      }
    });
    setFilterData([...filter]);
  }, [search, customers]);


  //Get All Sender Details
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (loggedUser?.jwt_token && customer_uid) {
        ApiRequest('GET', `/customers?${type === 'sender' ? 'customer_uid' : 'consignee_uid'}=${customer_uid}`, loggedUser.jwt_token,)
          .then(result => {
            if (result.hasOwnProperty('errors')) {
            } else {
              if (result?.size > 0) {
                setIsCustomerHere({ status: true, info: result.data[0] })
              }
            }
          })
          .catch(error => {
            if (!checkAuthorized(error)) {
              localStorage.clear();
              navigate('/login')
            }
          })
      }
    }, 0)
    return () => clearTimeout(delayDebounceFn)
  }, [customers])

  return (
    <>
      <div className="w-full flex flex-wrap lg:flex-nowrap items-center gap-3">
        <div className="flex gap-2 items-center w-full lg:w-[70%] xl:w-[80%]  border   rounded-lg pl-3">
          <icons.search />
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-lg outline-none py-2 pr-3"
            type="search"
            name=""
            id=""
          />
        </div>
        <CustomButton
          type="button"
          hadleClick={() => addNewSender(type)}
          block={true}
          btnClass="h-[40px] !w-[220px] "
          text={
            type === "sender" ? "+ Add New Sender" : "+  Add  New Consignee"
          }
        />
      </div>
      <div className="py-4">
        <div className="w-full">
          <div >
            <ul className="border-b flex justify-between px-3">
              <li className="text-sm  pb-2 text-left text-gray-500 font-normal max-w-[6rem] w-full">
                First Name
              </li>
              {
                isLastName &&
                <li className="text-sm  pb-2 text-left text-gray-500 font-normal max-w-[6rem] w-full">
                  Last Name
                </li>
              }
              {
                isEmail &&
                <li className="text-sm  pb-2 text-left text-gray-500 font-normal min-w-[4rem] w-full">
                  Email
                </li>
              }
              <li className={`text-sm  pb-2 text-left text-gray-500 font-normal  ${showOnAddItem ? 'w-1/2' : 'max-w-[8rem] w-full'}  `}>
                Phone Number
              </li>
            </ul>
          </div>
          <div className="w-full flex  flex-col gap-x-2 !h-[210px] px-3  overflow-auto">
            <LoadingForFetch maxDataLoad={maxDataLoad} totalLength={customers?.length} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchStatus={fetchStatus}>
              {Array.isArray(filterData) && filterData.length ? (
                filterData.map((item) => (
                  <ul onClick={() => { setCloseDrop(prev => !prev); setFetchAgain(true); setSelectData(item); }} className="cursor-pointer  hover:bg-gray-100 flex  justify-between mt-3" key={type === 'sender' ? item?.customer_uid : item?.consignee_uid}>
                    <li className="py-[9px] text-sm max-w-[6rem] w-full">{item.first_name}</li>
                    {
                      isLastName &&
                      <li className="py-[9px] text-sm max-w-[6rem] w-full">{item.last_name}</li>
                    }
                    {
                      isEmail &&
                      <li className="py-[9px] text-sm min-w-[4rem] w-full">{item.email}</li>
                    }
                    <li className={`py-[9px] text-sm  ${showOnAddItem ? 'w-1/2' : 'max-w-[8rem] w-full'} `}>
                      <div className="flex items-center gap-1">
                        <img src={usflag} alt="usflag" />
                        <span> {item.phone_number}</span>
                      </div>
                    </li>
                  </ul>
                ))
              ) :
                <ul className="pt-4">
                  <li className="py-[9px] text-sm w-full  text-center">No Data Found!</li>
                </ul>

              }
            </LoadingForFetch>
          </div>
        </div>
      </div>
    </>
  );
};



const Office = ({ errors, clearErrors, defaultValue = '', setValue, shippingDetails, register, placeholder = '', name = '' }) => {
  const [loggedUser] = useContext(AuthContext)
  const [offices, setOffices] = useState([])
  const [fetchStatus, setFetchStatus] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (loggedUser?.jwt_token) {
        ApiRequest('GET', '/offices', loggedUser.jwt_token,)
          .then(result => {
            if (result.hasOwnProperty('errors')) {
            } else {
              setOffices([...result.data])
            }
          })
          .catch(error => {
            if (!checkAuthorized(error)) {
              localStorage.clear();
              navigate('/login')
            }
          })
          .finally(() => {
            setFetchStatus('fetched')
          })
      }
    }, 0)
    return () => clearTimeout(delayDebounceFn)
  }, [loggedUser])

  return (
    <CustomDropDown
      clearErrors={clearErrors}
      errors={errors}
      defaultValue={defaultValue}
      register={register}
      bodyCss="!w-full !p-0 overflow-auto"
      buttonCss="!w-full "
      placeholder={placeholder}
      name={name}
      setValue={setValue}
      items={
        offices.map((office, ind) => { return { id: ind, text: office?.address?.state_or_region + ', ' + office?.address?.country, value: office?.office_uid } })
      }
    />
  )
}