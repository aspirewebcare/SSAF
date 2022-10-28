import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import usflag from "../../assets/images/usa.svg";
import ApiRequest from "../../hooks/ApiRequest";
import { checkAuthorized } from "../../hooks/commonFunc";
import CustomButton from "../shared/Buttons/CustomButton";
import icons from "../shared/icons";
import { SimpleLoading } from "../shared/LoadingForFetch";

const CustomerDetails = ({ reload, editCustomerBtnClick, customerInfos, fetchStatus }) => {
  const navigate = useNavigate();
  const [loggedUser] = useContext(AuthContext)
  const [loading, setLoading] = useState(false);

  const customerDelete = () => {
    setLoading(true)
    ApiRequest('DELETE', `/customers/${customerInfos.customer_uid}`, loggedUser.jwt_token, '', false)
      .then(result => {
        if (result.hasOwnProperty('errors')) {

        } else {
          toast.success('Customer is deleted');
          navigate(-1)
        }
      })
      .catch(err => {
        if (!checkAuthorized(err)) {
          localStorage.clear();
          navigate('/login')
        }
      })
      .finally(() => { setLoading(false) })
  };

  return (
    <>
      <div
        onClick={() => navigate('/customers')}
        className="w-fit flex gap-2 items-center cursor-pointer py-5 mt-3"
      >
        <icons.arrowLeft className="text-2xl font-semibold" />
        <h1 className="text-2xl font-semibold">Back</h1>
      </div>


      <div className="bg-white rounded-lg shadow p-10 min-h-[650px] lg:min-h-[400px] h-fit">
        <SimpleLoading fetchStatus={fetchStatus}>
          <div className="flex flex-col lg:flex-row justify-between  lg:items-center items-start gap-5">
            <h1 className="text-2xl font-semibold">Customer Details</h1>
            <div className="flex flex-wrap gap-3">
              <CustomButton
                hadleClick={editCustomerBtnClick}
                block={false}
                btnClass="h-[40px] w-[150px]"
                text="Edit"
              />
              <CustomButton
                hadleClick={customerDelete}
                block={true}
                btnClass="h-[40px] w-[150px] !bg-red-200 bg-opacity-10  !text-[#FE0000]"
                text="Delete"
                loading={loading}
                simpleRed={true}
              />
            </div>
          </div>

          <div className="">
            <div className="flex flex-wrap gap-5 items-center justify-between py-9 w-9/12">
              <div>
                <p className="text-sm text-[#818181]">First Name</p>
                <p className="font-semibold">{customerInfos?.first_name || '--'}</p>
              </div>
              <div>
                <p className="text-sm text-[#818181]">Last Name </p>
                <p className="font-semibold">{customerInfos?.last_name || '--'}</p>
              </div>
              <div>
                <p className="text-sm text-[#818181]">Email</p>
                <p className="font-semibold">{customerInfos?.email || '--'}</p>
              </div>
              <div>
                <p className="text-sm text-[#818181]">Phone Number</p>
                <p className="font-semibold flex items-center gap-1">
                  {
                    customerInfos?.phone_number ?
                      <>
                        <img src={usflag} alt="" />
                        {customerInfos?.phone_number}
                      </>
                      :
                      '--'
                  }
                </p>
              </div>
            </div>
            <hr />
            <p className="font-semibold text-xl mt-6">Address</p>
            <div className="flex flex-wrap md:gap-5 gap-y-5 items-center justify-between py-6 w-full lg:w-9/12">
              <div className="w-full sm:w-1/2 lg:w-fit">
                <p className="text-sm text-[#818181]">Street</p>
                <p className="font-semibold">{customerInfos?.address?.street || '--'}</p>
              </div>
              <div className="w-full sm:w-1/2 lg:w-fit">
                <p className="text-sm text-[#818181]">City </p>
                <p className="font-semibold">{customerInfos?.address?.city || '--'}</p>
              </div>
              <div className="w-full sm:w-1/2 lg:w-fit">
                <p className="text-sm text-[#818181]">State</p>
                <p className="font-semibold">{customerInfos?.address?.state_or_region || '--'}</p>
              </div>
              <div className="w-full sm:w-1/2 lg:w-fit">
                <p className="text-sm text-[#818181]">Postcode/Zip</p>
                <p className="font-semibold">
                  {customerInfos?.address?.zip_or_postcode || '--'}
                </p>
              </div>
              <div className="w-full sm:w-1/2 lg:w-fit">
                <p className="text-sm text-[#818181]">Country</p>
                <p className="font-semibold">{customerInfos?.address?.country || '--'}</p>
              </div>
            </div>
          </div>
        </SimpleLoading>
      </div>
    </>
  );
};

export default CustomerDetails;
