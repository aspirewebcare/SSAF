import React from "react";
import CustomButton from "../shared/Buttons/CustomButton";
import AddNewShippingHeader from "./AddNewShippingHeader";

const AddItems = ({
  currentStep,
  nextStepClick,
  openAddItemRightSidebar,
}) => {
  let obj = {
    name: "DeMarini 2022 USA youth Baseball bat",
    quantity: "40",
    item_worth: "1200",
    currency: "USD",
    item_weight: "100KG",
    item_dimension: {
      length: "12",
      width: "12",
      height: "18",
    },
    source: "Tesco Market",
    order_umber: "#2954",
    tracking_number: "TR01AB9547628761M",
    carrier: "Amazon",
    status: "",
    descripiton:
      "Two-Piece Composite Construction: Designed for improved weight distribution that allows for great balance, bat speed and barrel control",
  };
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
      <div className="border py-8 rounded-lg mt-5">
        <div className="px-8 mb-3">
          <p className="text-sm">Name</p>
          <p className="font-medium">{obj.name}</p>
        </div>
        <div className="flex justify-between">
          <div className="w-1/2 border-r-2 px-8 flex  flex-col  gap-4">
            <div className="flex flex-wrap gap-3 justify-between">
              <div>
                <p className="text-sm">Quantity</p>
                <p className="font-medium">{obj.quantity}</p>
              </div>
              <div>
                <p className="text-sm">Item worth</p>
                <p className="font-medium">{obj.item_worth}</p>
              </div>
            </div>
            <div>
              <p className="text-sm">Item weight</p>
              <p className="font-medium">{obj.item_weight}</p>
            </div>
            <div>
              <p className="text-sm">Item dimension</p>
              <p className="font-medium flex flex-wrap gap-2">
                <p className="flex  items-center gap-2">
                  <span className="text-gray-500">L:</span>
                  <span>{obj?.item_dimension?.length} CM</span>
                </p>
                <p className="flex  items-center gap-2">
                  <span className="text-gray-500">W:</span>
                  <span>{obj?.item_dimension?.width} CM</span>
                </p>
                <p className="flex  items-center gap-2">
                  <span className="text-gray-500">H:</span>
                  <span>{obj?.item_dimension?.height} CM</span>
                </p>
              </p>
            </div>
          </div>
          <div className="w-1/2 px-8 flex  flex-col  gap-4">
            <div className="flex flex-wrap gap-3 justify-between">
              <div>
                <p className="text-sm">Source</p>
                <p className="font-medium">{obj.source}</p>
              </div>
              <div>
                <p className="text-sm">Order number</p>
                <p className="font-medium">{obj.order_umber}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-between">
              <div>
                <p className="text-sm">Tracking number</p>
                <p className="font-medium break-all">{obj.tracking_number}</p>
              </div>
              <div>
                <p className="text-sm">Carrier</p>
                <p className="font-medium">{obj.carrier}</p>
              </div>
            </div>
            <div>
              <p className="text-sm">
                How the item was received in the office?
              </p>
              <p className="font-medium">{obj.status}</p>
            </div>
          </div>
        </div>
        <div className="px-8 mt-3 ">
          <p className="text-sm">Description</p>
          <p className="font-medium  leading-5">{obj.descripiton}</p>
        </div>
      </div>

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
        />
      </div>
    </div>
  );
};

export default AddItems;
