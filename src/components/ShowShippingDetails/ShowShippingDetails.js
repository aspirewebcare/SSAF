import React from "react";
import icons from "../shared/icons";

const ShowShippingDetails = ({ itemDetails = {} }) => {
  const deleteShipping = () => {
    console.log("click delete ");
  };
  const editShipping = () => {
    console.log("click edit");
  };
  return (
    <div>
      <div className="flex justify-between items-center mt-5 mb-5">
        <div className="w-1/2">
          <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
            Source Office
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {itemDetails.source}
          </p>
        </div>
        <div className="w-1/2">
          <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
            Destination Office
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {itemDetails.destination}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-5">
        <div className="w-1/2">
          <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
            Tracking Number
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {itemDetails.tracking_number}
          </p>
        </div>
        <div className="w-1/2">
          <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
            Date
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {itemDetails.date}
          </p>
        </div>
      </div>
      <div className="w-full mb-5">
        <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
          Consignee
        </p>
        <p className="font-medium capitalize w-fit whitespace-nowrap">
          {itemDetails.consignee}
        </p>
      </div>
      <div className="w-full mb-5">
        <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
          Shipping Weight
        </p>
        <p className="font-medium capitalize w-fit whitespace-nowrap">
          {itemDetails.shipping_weight}
        </p>
      </div>
      <div className="w-full mb-5">
        <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
          Shipping Dimensions
        </p>
        <p className="font-medium capitalize w-fit whitespace-nowrap">
          L: 80.0 in W: 48.0 in H: 125.0 in
        </p>
      </div>
      <div className="flex justify-between items-center mb-5">
        <div className="w-1/2">
          <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
            Delivery option
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {itemDetails.delivery_option}
          </p>
        </div>
        <div className="w-1/2">
          <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
            Service Type
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {itemDetails.service_type}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-5">
        <div className="w-1/2">
          <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
            Need Insurance
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {itemDetails.insurance}
          </p>
        </div>
        <div className="w-1/2">
          <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
            Need Packaging
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {itemDetails.packaging}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-5">
        <div className="w-1/2">
          <p className="hidden lg:block uppercase text-gray-500 mb-2 text-sm">
            Invoice
          </p>
          <a
            href={itemDetails.invoice}
            download
            className="font-medium capitalize w-fit whitespace-nowrap flex  items-center gap-1 text-red-500  mt-1"
          >
            <icons.fileDownload className="text-2xl" /> Download
          </a>
        </div>
        <div className="w-1/2">
          <p className="hidden lg:block uppercase text-gray-500 mb-2 text-sm">
            Label
          </p>
          <a
            href={itemDetails.label}
            download
            className="font-medium capitalize w-fit whitespace-nowrap flex  items-center gap-1 text-red-500 mt-1"
          >
            <icons.fileDownload className="text-2xl" /> Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShowShippingDetails;
