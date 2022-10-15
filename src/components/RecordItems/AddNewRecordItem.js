import React from "react";
import InputLabel from "../shared/InputLabel/InputLabel";

const AddNewCustomer = () => {
  return (
    <div>
      <InputLabel
        label="Source (optional)"
        placeholder="Source"
        name="source"
      />
      <br />
      <InputLabel
        label="Order Number (optional)"
        placeholder="Order Number"
        name="order_number"
      />
      <br />

      <InputLabel
        label="Tracking Number"
        placeholder="Tracking Number"
        name="tracking_number"
      />
      <br />

      <p className="font-bold text-sm text-gray-800 ">
        Carrier
      </p>
      <select
        className="border rounded-md px-3 py-[15px] w-full mt-2 mb-4 "
        name="carrier"
        id="carrier"
      >
             <option value="" hidden>Carrier</option>
          <option value="Fedex">Fedex</option>
          <option value="Usps">Usps</option>
          <option value="Amazon">Amazon</option>
      </select>
    </div>
  );
};

export default AddNewCustomer;
