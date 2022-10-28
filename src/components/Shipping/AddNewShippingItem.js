import React from "react";
import InputLabel from "../shared/InputLabel/InputLabel";

const AddNewCustomer = () => {
  return (
    <div>
      <InputLabel
        defaultValue=""
        label="Source (optional)"
        placeholder="Source"
        name="source"
      />
      <InputLabel
        defaultValue=""
        label="Order Number (optional)"
        placeholder="Order Number"
        name="order_number"
      />
      <InputLabel
        defaultValue=""
        label="Tracking Number"
        placeholder="Tracking Number"
        name="tracking_number"
      />
      <p className="font-bold text-sm text-gray-800 ">
        Carrier
      </p>
      <select
        className="border rounded-md text-gray-400 px-3 py-[15px] w-full mt-2 mb-4"
        name="carrier"
        id="carrier"
      >
        <option value="carrier1">Carrier1</option>
        <option value="carrier2">Carrier2</option>
        <option value="carrier3">Carrier3</option>
        <option value="carrier4">Carrier4</option>
        <option value="carrier5">Carrier5</option>
      </select>
    </div>
  );
};

export default AddNewCustomer;
