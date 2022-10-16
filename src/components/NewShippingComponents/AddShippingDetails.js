import React, { useEffect, useState } from "react";
import usflag from '../../assets/images/usa.svg';
import { CustomersInfo } from "../../DummyData/DummyData";
import CustomButton from "../shared/Buttons/CustomButton";
import CustomDropDown, {
  SenderDropDown
} from "../shared/Dropdown/CustomDropDown";
import icons from "../shared/icons";
import AddNewShippingHeader from "./AddNewShippingHeader";

const AddShippingDetails = ({ shippingDetails, register, errors, nextBtnType = 'button', nextBtn = 'Next', currentStep, nextStepClick = () => { }, setFilterComInfo, setRightSidebarOpen }) => {
  const [closeDrop, setCloseDrop] = useState(false)
  const [selectSender, setSelectSender] = useState({});
  const [selectConsignee, setSelectConsignee] = useState({});

  console.log({ shippingDetails })

  const nextClick = () => {
    nextStepClick(1, 2, { name: "242" });
  };

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
  return (
    <>
      <div className="flex justify-between items-end">
        <AddNewShippingHeader step={currentStep} />
      </div>
      <div className="flex flex-col gap-8 w-full">
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Source office *</p>
            <CustomDropDown
              defaultValue={shippingDetails?.destination || ''}
              register={register}
              bodyCss="!w-full !p-0 overflow-auto"
              buttonCss="!w-full "
              buttons={
                <button className="flex justify-between items-center text-left  rounded-lg outline-none w-full ">
                  <span>Enter current office</span>
                  <icons.arrowDown />
                </button>
              }
              items={[
                { id: 1, text: "San Antonio, US", value: "New  york DS" },
                { id: 2, text: "Lagos, NG", value: "Lagos, NG" },
                { id: 3, text: "New york, US", value: "New york, US" },
                { id: 4, text: "Moscow, RU", value: "Moscow, RU" },
              ]}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Destination office *</p>
            <CustomDropDown
              defaultValue={shippingDetails?.destination || ''}
              bodyCss="!w-full !p-0 overflow-auto"
              buttonCss="!w-full "
              buttons={
                <button className="flex justify-between text-left items-center  rounded-lg outline-none w-full ">
                  <span>Enter closest office to destination</span>
                  <icons.arrowDown />
                </button>
              }
              items={[
                { id: 1, text: "New  york DS", value: "San Antonio, US" },
                { id: 2, text: "Lagos, NG", value: "Lagos, NG" },
                { id: 3, text: "Moscow, RU", value: "Moscow, RU" },
                { id: 4, text: "San Antonio, US", value: "San Antonio, US" },
              ]}
            />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Sender *</p>
            <SenderDropDown
              defaultValue={shippingDetails?.sender?.first_name || ''}
              closeDrop={closeDrop}
              bodyCss="!w-[648px] left-0 !px-3"
              buttonCss="!w-full "
              buttons={
                <button className="flex justify-between text-left items-center  rounded-lg outline-none w-full ">
                  {
                    JSON.stringify(selectSender) !== '{}' ?
                      <>
                        <span className="text-gray-900">{selectSender?.first_name}</span>
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
              <SenderInfos placeholder="Search Sender" setSelectData={setSelectSender} setCloseDrop={setCloseDrop} type="sender" addNewSender={addNewSender} />
            </SenderDropDown>
          </div>
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Consignee *</p>
            <SenderDropDown
              defaultValue={shippingDetails?.consignee?.first_name || ''}
              closeDrop={closeDrop}
              bodyCss="!w-[648px] right-0 !px-3"
              buttonCss="!w-full "
              buttons={
                <button className="flex justify-between text-left items-center  rounded-lg outline-none w-full ">
                  {
                    JSON.stringify(selectConsignee) !== '{}' ?
                      <>
                        <span className="text-gray-900"> {selectConsignee?.first_name}</span>
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
              <SenderInfos placeholder="Search Consignee" setSelectData={setSelectConsignee} setCloseDrop={setCloseDrop} type="consignee" addNewSender={addNewSender} />
            </SenderDropDown>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">System of measure *</p>
            <CustomDropDown
              defaultValue={shippingDetails?.system_of_measure || ''}
              bodyCss="!w-full !p-0 overflow-auto"
              buttonCss="!w-full "
              buttons={
                <button className="flex justify-between text-left items-center  rounded-lg outline-none w-full ">
                  <span>Choose system of measure</span>
                  <icons.arrowDown />
                </button>
              }
              items={[
                {
                  id: 1,
                  text: "System of measure",
                  value: "System of measure",
                },
                {
                  id: 2,
                  text: "System of measure 2",
                  value: "System of measure 2",
                },
                {
                  id: 3,
                  text: "System of measure 3",
                  value: "System of measure 3",
                },
                {
                  id: 4,
                  text: "System of measure 4",
                  value: "System of measure 4",
                },
              ]}
            />
          </div>
          <div className=" w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Shipping weight *</p>
            <div className="flex items-center  justify-between border rounded-lg  pr-3">
              <input
                defaultValue={Number(shippingDetails?.shipping_weight) || ''}
                placeholder="Enter shipping weight"
                className="rounded-lg outline-none w-full py-[14px] pl-3"
                type="number"
                name="shipping_weight"
                id="shipping_weight"
              />
              <span>KG</span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm">
              Shipping dimensions (L,W,H) *
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="border flex items-center  pr-3   rounded-lg p-0 w-full sm:w-1/3 mt-3">
                <input
                  defaultValue={shippingDetails?.area?.length || ''}
                  className="w-full  py-3 pl-3 rounded-lg outline-none"
                  type="number"
                  name=""
                  id=""
                  placeholder="Length"
                />
                <span>CM</span>
              </div>
              <div className="border flex items-center pr-3   rounded-lg p-0 w-full sm:w-1/3 mt-3">
                <input
                  defaultValue={shippingDetails?.area?.width || ''}
                  className="w-full  py-3 pl-3 rounded-lg outline-none"
                  type="number"
                  name=""
                  id=""
                  placeholder="Width"
                />
                <span>CM</span>
              </div>
              <div className="border flex items-center pr-3   rounded-lg p-0 w-full sm:w-1/3 mt-3">
                <input
                  defaultValue={shippingDetails?.area?.height || ''}
                  className="w-full  py-3 pl-3 rounded-lg outline-none"
                  type="number"
                  name=""
                  id=""
                  placeholder="Height"
                />
                <span>CM</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Delivery option *</p>
            <CustomDropDown
              defaultValue={shippingDetails?.delivery_option || ''}

              bodyCss="!w-full !p-0 overflow-auto"
              buttonCss="!w-full "
              buttons={
                <button className="flex justify-between text-left items-center  rounded-lg outline-none w-full ">
                  <span>Choose delivery option</span>
                  <icons.arrowDown />
                </button>
              }
              items={[
                { id: 1, text: "Delivery", value: "Delivery" },
                { id: 2, text: "Delivery 2", value: "Delivery 2" },
                { id: 3, text: "Delivery 3", value: "Delivery 3" },
                { id: 4, text: "Delivery 4", value: "Delivery 4" },
              ]}
            />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Need insurance</p>
            <CustomDropDown
              defaultValue={shippingDetails?.insurance || ''}

              bodyCss="!w-full !h-fit !p-0 overflow-auto"
              buttonCss="!w-full "
              buttons={
                <button className="flex justify-between text-left items-center  rounded-lg outline-none w-full ">
                  <span>Need insurance</span>
                  <icons.arrowDown />
                </button>
              }
              items={[
                { id: 2, text: "Yes", value: "yes" },
                { id: 3, text: "No", value: "no" },
              ]}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Need packaging</p>
            <CustomDropDown
              defaultValue={shippingDetails?.packaging || ''}

              bodyCss="!w-full !h-fit !p-0 overflow-auto"
              buttonCss="!w-full "
              buttons={
                <button className="flex justify-between text-left items-center  rounded-lg outline-none w-full ">
                  <span>Need packaging</span>
                  <icons.arrowDown />
                </button>
              }
              items={[
                { id: 2, text: "Yes", value: "yes" },
                { id: 3, text: "No", value: "no" },
              ]}
            />
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/2">
            <p className="font-semibold text-sm mb-3">Service type *</p>
            <CustomDropDown
              defaultValue={shippingDetails?.service_type || ''}

              bodyCss="!w-full !h-fit !p-0 overflow-auto"
              buttonCss="!w-full "
              buttons={
                <button className="flex justify-between text-left items-center  rounded-lg outline-none w-full ">
                  <span>Choose service type</span>
                  <icons.arrowDown />
                </button>
              }
              items={[
                { id: 1, text: "Regular", value: "Regular" },
                { id: 2, text: "Express", value: "Express" },
              ]}
            />
          </div>
        </div>

        <div>
          {
            nextBtn &&
            <CustomButton
              hadleClick={nextClick}
              block={true}
              btnClass="h-[56px] w-[150px]"
              text={nextBtn}
              type={nextBtnType}
            />
          }
        </div>
      </div>
    </>
  );
};

export default AddShippingDetails;

const SenderInfos = ({ placeholder = '', setSelectData, setCloseDrop, addNewSender, type = "" }) => {
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);


  useEffect(() => {
    let filter = CustomersInfo.filter((singleData) => {
      if (search === "") {
        return singleData;
      } else {
        return `${singleData.email} ${singleData.first_name} ${singleData.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase());
      }
    });
    setFilterData([...filter]);
  }, [search]);
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
              <li className="text-sm  pb-2 text-left text-gray-500 font-normal w-[6em]">
                First Name
              </li>
              <li className="text-sm  pb-2 text-left text-gray-500 font-normal w-[6em]">
                Last Name
              </li>
              <li className="text-sm  pb-2 text-left text-gray-500 font-normal w-3/12">
                Email
              </li>
              <li className="text-sm  pb-2 text-left text-gray-500 font-normal w-3/12">
                Phone Number
              </li>
            </ul>
          </div>
          <div className="w-full flex  flex-col !h-[210px] px-3  overflow-auto">
            {Array.isArray(filterData) && filterData.length ? (
              filterData.map((item) => (
                <ul onClick={() => { setSelectData(item); setCloseDrop(prev => !prev) }} className="cursor-pointer  hover:bg-gray-100 flex  justify-between mt-3" key={item.id}>
                  <li className="py-[9px] text-sm w-[6em]">{item.first_name}</li>
                  <li className="py-[9px] text-sm w-[6em]">{item.last_name}</li>
                  <li className="py-[9px] text-sm w-3/12">{item.email}</li>
                  <li className="py-[9px] text-sm w-3/12 ">
                    <div className="flex items-center gap-1">
                      <img src={usflag} alt="usflag" />
                      <span> {item.phone}</span>
                    </div>
                  </li>
                </ul>
              ))
            ) : (
              <ul className="pt-4">
                <li className="py-[9px] text-sm w-full  text-center">No Data Found!</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
