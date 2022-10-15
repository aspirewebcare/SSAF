import React from "react";
import { useNavigate } from "react-router-dom";
import usflag from "../../assets/images/usa.svg";
import CustomButton from "../shared/Buttons/CustomButton";
import icons from "../shared/icons";

const CustomerDetails = ({ customerInfos}) => {
  const  navigate = useNavigate();

  const customerDelete = () => {
    console.log("delete customer");
  };
  const updateCustomer = () => {
    console.log("updateCustomer customer");
  };
  return (
    <>
      <div
        onClick={() => navigate('/customers')}
        className="flex gap-2 items-center cursor-pointer py-5 mt-3"
      >
        <icons.arrowLeft className="text-2xl font-semibold" />
        <h1 className="text-2xl font-semibold">Back</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-10">
        <div className="flex flex-col lg:flex-row justify-between  lg:items-center items-start gap-5">
          <h1 className="text-2xl font-semibold">Customer Details</h1>
          <div className="flex flex-wrap gap-3">
            <CustomButton
              hadleClick={() => updateCustomer(2, 1)}
              block={false}
              btnClass="h-[40px] w-[150px]"
              text="Edit"
            />
            <CustomButton
              hadleClick={() => customerDelete(2, 1)}
              block={true}
              btnClass="h-[40px] w-[150px] !bg-red-200 bg-opacity-10  !text-[#FE0000]"
              text="Delete"
            />
          </div>
        </div>

        <div className="">
          <div className="flex flex-wrap gap-5 items-center justify-between py-9 w-9/12">
            <div>
              <p className="text-sm text-[#818181]">First Name</p>
              <p className="font-semibold">{customerInfos?.first_name}</p>
            </div>
            <div>
              <p className="text-sm text-[#818181]">Last Name </p>
              <p className="font-semibold">{customerInfos?.last_name}</p>
            </div>
            <div>
              <p className="text-sm text-[#818181]">Email</p>
              <p className="font-semibold">{customerInfos?.email}</p>
            </div>
            <div>
              <p className="text-sm text-[#818181]">Phone Number</p>
              <p className="font-semibold flex items-center gap-1">
                <img src={usflag} alt="" />
                {customerInfos?.phone}
              </p>
            </div>
          </div>
          <hr />
          <p className="font-semibold text-xl mt-6">Address</p>
          <div className="flex flex-wrap gap-5 items-center justify-between py-6 w-9/12">
            <div>
              <p className="text-sm text-[#818181]">Street</p>
              <p className="font-semibold">{customerInfos?.address?.street}</p>
            </div>
            <div>
              <p className="text-sm text-[#818181]">City </p>
              <p className="font-semibold">{customerInfos?.address?.city}</p>
            </div>
            <div>
              <p className="text-sm text-[#818181]">State</p>
              <p className="font-semibold">{customerInfos?.address?.state}</p>
            </div>
            <div>
              <p className="text-sm text-[#818181]">Postcode/Zip</p>
              <p className="font-semibold">
                {customerInfos?.address?.postalcode_zip}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#818181]">Country</p>
              <p className="font-semibold">{customerInfos?.address?.country}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
