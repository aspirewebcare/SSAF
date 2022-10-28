import React, { useEffect, useState } from "react";
import { SenderInfos } from "../NewShippingComponents/AddShippingDetails";
import { SenderDropDown } from "../shared/Dropdown/CustomDropDown";
import icons from "../shared/icons";
import InputLabel from "../shared/InputLabel/InputLabel";

const AddNewCustomer = ({ isSender = true, clearErrors = () => { }, record = {}, setFilterComInfo, setRightSidebarOpen, register = () => { }, setValue, errors }) => {
  const [closeDrop, setCloseDrop] = useState(false)
  const [selectSender, setSelectSender] = useState({})
  const [isCustomerHere, setIsCustomerHere] = useState({ status: false, info: { customer_uid: record?.customer_uid || '' } })

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

  return (
    <div>
      <div className={`w-full mb-5 ${!isSender ? 'hidden' : 'block'}`}>
        <p className="font-semibold text-sm mb-3">Sender *</p>
        <SenderDropDown
          // defaultValue={shippingDetails?.sender?.first_name || ''}
          errors={errors}
          name='customer_uid'
          closeDrop={closeDrop}
          bodyCss="!w-full left-0 !px-3"
          buttonCss="!w-full "
          buttons={
            <button type="button" className="flex justify-between text-left items-center  rounded-lg outline-none w-full ">
              {
                JSON.stringify(selectSender) !== '{}' || isCustomerHere.status ?
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
            isLastName={false}
            isEmail={false}
            showOnAddItem={true}
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
      <InputLabel
        defaultValue={record?.source}
        label="Source (optional)"
        placeholder="Source"
        name="source"
        register={register}
        required={false}
      />
      <br />
      <InputLabel
        defaultValue={record?.order_number}
        label="Order Number (optional)"
        placeholder="Order Number"
        name="order_number"
        register={register}
        required={false}

      />
      <br />

      <InputLabel
        defaultValue={record?.tracking_number}
        label="Tracking Number"
        placeholder="Tracking Number"
        name="tracking_number"
        register={register}
        errors={errors}
      />
      <br />

      <p className="font-bold text-sm text-gray-800 ">
        Carrier
      </p>
      <select
        value={record?.carrier}
        className={`border rounded-md px-3 py-[15px] w-full mt-2  ${errors.carrier ? 'border-red-500' : 'mb-4'}`}
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
      {
        errors.carrier && <p className="text-red-500 text-xs mt-1">carrier required</p>
      }

    </div>
  );
};

export default AddNewCustomer;
