import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import CustomButton from "../shared/Buttons/CustomButton";
import LoadingForFetch from "../shared/LoadingForFetch";
import AddNewShippingHeader from "./AddNewShippingHeader";

const AddItems = ({
  currentStep,
  nextStepClick,
  openAddItemRightSidebar,
  shipItmes = []
}) => {
  const [fetchStatus, setFetchStatus] = useState('no_fetch')
  const [loggedUser] = useContext(AuthContext)

  useEffect(() => {
    setTimeout(() => {
      setFetchStatus('fetch')
    }, 500)
  }, [loggedUser.jwt_token])
  return (
    <div className="h-full relative mt-6">
      <div className="flex flex-wrap justify-between items-center w-full">
        <AddNewShippingHeader
          step={currentStep}
        />
        <CustomButton
          hadleClick={openAddItemRightSidebar}
          block={true}
          btnClass="h-[40px] w-[146px] capitalize"
          text="+ Add New Item"
        />
      </div>

      <LoadingForFetch maxDataLoad={0} totalLength={0} fetchAgain={false} fetchStatus={fetchStatus}>
        {
          shipItmes?.length ?
            shipItmes.map((shipItem, ind) => (
              <Item itemInfo={shipItem} key={ind} />
            ))
            :
            <p className="border py-12 px-3 rounded-lg text-center">Please Add Item.</p>
        }
      </LoadingForFetch>


      <div className="mt-20 w-full flex  justify-between">
        <CustomButton
          hadleClick={() => nextStepClick(2, 1)}
          block={false}
          btnClass="h-[56px] w-[150px]"
          text="Back"
        />
        <CustomButton
          hadleClick={() => nextStepClick(2, 3)}
          block={true}
          btnClass="h-[56px] w-[150px]"
          text="Next"
          disable={shipItmes?.length ? false : true}
        />
      </div>
    </div>
  );
};

export default AddItems;




const Item = ({ itemInfo = {} }) => {

  return (
    <div className="border py-8 rounded-lg mt-5">
      <div className="px-8 mb-3">
        <p className="text-sm">Name</p>
        <p className="font-medium">{itemInfo?.name || '-'}</p>
      </div>
      <div className="flex justify-between">
        <div className="w-1/2 border-r-2 px-8 flex  flex-col  gap-4">
          <div className="flex flex-wrap gap-3 justify-between">
            <div>
              <p className="text-sm">Quantity</p>
              <p className="font-medium">{itemInfo?.quantity || '-'}</p>
            </div>
            <div>
              <p className="text-sm">Item worth</p>
              <p className="font-medium">{itemInfo?.item_worth?.value + ' ' + itemInfo?.item_worth?.currency || '-'}</p>
            </div>
          </div>
          <div>
            <p className="text-sm">Item weight</p>
            <p className="font-medium">{itemInfo?.item_weight || '-'}</p>
          </div>
          <div>
            <p className="text-sm">Item dimension</p>
            <div className="font-medium flex flex-wrap gap-2">
              <p className="flex  items-center gap-2">
                <span className="text-gray-500">L:</span>
                <span>{itemInfo?.item_dimension?.length || '-'} CM</span>
              </p>
              <p className="flex  items-center gap-2">
                <span className="text-gray-500">W:</span>
                <span>{itemInfo?.item_dimension?.width || '-'} CM</span>
              </p>
              <p className="flex  items-center gap-2">
                <span className="text-gray-500">H:</span>
                <span>{itemInfo?.item_dimension?.height || '-'} CM</span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 px-8 flex  flex-col  gap-4">
          <div className="flex flex-wrap gap-3 justify-between">
            <div>
              <p className="text-sm">Source</p>
              <p className="font-medium">{itemInfo?.order_info?.source || '-'}</p>
            </div>
            <div>
              <p className="text-sm">Order number</p>
              <p className="font-medium">{itemInfo?.order_info?.order_number || '-'}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-between">
            <div>
              <p className="text-sm">Tracking number</p>
              <p className="font-medium break-all">{itemInfo?.order_info?.tracking_number || '-'}</p>
            </div>
            <div>
              <p className="text-sm">Carrier</p>
              <p className="font-medium">{itemInfo?.order_info?.carrier || '-'}</p>
            </div>
          </div>
          <div>
            <p className="text-sm">
              How the item was received in the office?
            </p>
            <p className="font-medium">{itemInfo?.drop_off_options || '-'}</p>
          </div>
        </div>
      </div>
      <div className="px-8 mt-3 ">
        <p className="text-sm">Description</p>
        <p className="font-medium  leading-5">{itemInfo?.description || '-'}</p>
      </div>
    </div>
  )
}