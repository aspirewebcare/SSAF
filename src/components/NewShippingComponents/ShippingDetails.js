import React from "react";
import CustomButton from "../shared/Buttons/CustomButton";
import AddNewShippingHeader from "./AddNewShippingHeader";

const ShippingDetails = ({ currentStep, nextStepClick }) => {
  let offices = [
    {
      id: 1,
      value: "office",
      data: "office",
    },
    {
      id: 2,
      value: "office2",
      data: "office2",
    },
    {
      id: 3,
      value: "office3",
      data: "office3",
    },
    {
      id: 4,
      value: "offic4",
      data: "offic4",
    },
    {
      id: 5,
      value: "office5",
      data: "office5",
    },
  ];

  const nextClick = () => {
    nextStepClick(1, 2, { name: "242" });
  };
  return (
    <>
      <div className="flex justify-between items-end">
        <AddNewShippingHeader step={currentStep} />
      </div>
      <div className="flex flex-col gap-8 w-full">
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <CustomSelect
            label="Source office *"
            placeholder="Enter current office"
            name=""
            selectItmes={offices}
          />
          <CustomSelect
            label="Destination office *"
            placeholder="Enter closest office to destination"
            name=""
            selectItmes={offices}
          />
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <CustomSelect
            label="Sender *"
            placeholder="Enter sender"
            name=""
            selectItmes={offices}
          />
          <CustomSelect
            label="Consignee *"
            placeholder="Enter Consignee"
            name=""
            selectItmes={offices}
          />
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <CustomSelect
            label="System of measure *"
            placeholder="Choose system of measure"
            name=""
            selectItmes={offices}
          />
          <CustomSelect
            label="Shipping weight *"
            placeholder="Enter shipping weight"
            name=""
            selectItmes={offices}
          />
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <div className="w-1/2">
            <p className="font-semibold text-sm">
              Shipping dimensions (L,W,H) *
            </p>
            <div className="flex flex-col lg:flex-row gap-3">
              <input
                className="border  w-full rounded-lg mt-3  py-3 px-3"
                type="number"
                name=""
                id=""
                placeholder="Length"
              />
              <input
                className="border  w-full rounded-lg mt-3  py-3 px-3"
                type="number"
                name=""
                id=""
                placeholder="Width"
              />
              <input
                className="border  w-full rounded-lg mt-3  py-3 px-3"
                type="number"
                name=""
                id=""
                placeholder="Height"
              />
            </div>
          </div>
          <CustomSelect
            label="Delivery option *"
            placeholder="Choose delivery option"
            name=""
            selectItmes={offices}
          />
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <CustomSelect
            label="Need insurance"
            placeholder="Need insurance"
            name=""
            selectItmes={offices}
          />
          <CustomSelect
            label="Need packaging "
            placeholder="Need packaging"
            name=""
            selectItmes={offices}
          />
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <CustomSelect
            label="Service type *"
            placeholder="Choose service type"
            name=""
            selectItmes={offices}
          />
        </div>

        <div>
          <CustomButton
            hadleClick={nextClick}
            block={true}
            btnClass="h-[56px] w-[150px]"
            text="Next"
          />
        </div>
      </div>
    </>
  );
};

export default ShippingDetails;

const CustomSelect = ({
  changeFunc,
  label = "",
  selectItmes = [],
  customClass = "",
  name = "",
  placeholder = "",
}) => {
  const selectChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
  };
  return (
    <div className="w-full lg:w-1/2">
      <div className={customClass}>
        <p className="font-semibold text-sm">{label}</p>
        <select
          defaultValue={placeholder}
          placeholder="egoeogn"
          className="border  w-full rounded-lg mt-3  py-3 px-3"
          onChange={(e) => selectChange(e)}
          name={name}
          id={name}
        >
          <option value={placeholder} disabled hidden>
            {placeholder}
          </option>
          {selectItmes.map((item, ind) => (
            <option key={ind} value={item.value}>
              {item.data}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
