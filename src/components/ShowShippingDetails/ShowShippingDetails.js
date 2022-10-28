import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import ApiRequest from "../../hooks/ApiRequest";
import { checkAuthorized } from "../../hooks/commonFunc";
import icons from "../shared/icons";
import Loader from "../shared/Loader";

const ShowShippingDetails = ({ itemDetails = {} }) => {
  const [loggedUser] = useContext(AuthContext)
  const [surce, setSource] = useState({})
  const [destination, setDestination] = useState({})
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      requestApi(itemDetails?.source_office_uid, setSource)
    }, 0)
    return () => clearTimeout(delayDebounceFn)
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {

      requestApi(itemDetails?.destination_office_uid, setDestination)
    }, 0)
    return () => clearTimeout(delayDebounceFn)
  }, [])


  const requestApi = (uId, setProperty) => {
    ApiRequest('GET', `/offices?office_uid=${uId}`, loggedUser.jwt_token,)
      .then(result => {
        if (result.hasOwnProperty('errors')) {
        } else {
          if (result.hasOwnProperty('data')) {
            setProperty(result?.data[0])
          }
        }
      })
      .catch(error => {
        if (!checkAuthorized(error)) {
          localStorage.clear();
          navigate('/login')
        }
      })
  }


  const downloadPDF = () => {
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${loggedUser.jwt_token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://development.ssaflogistics.com/cms/v1/shipments/${itemDetails?.shipment_uid}/invoice/pdf`, requestOptions)
      .then((res) => res.blob())
      .then(data => {
        if (data.size > 69) {
          let anchor = document.createElement("a");
          document.body.appendChild(anchor);
          let objectUrl = window.URL.createObjectURL(data);
          anchor.href = objectUrl;
          anchor.download = `shipment_information_pdf.pdf`;
          anchor.click();
          window.URL.revokeObjectURL(objectUrl);
        } else {
          toast.error('Customer cannot be priced')
        }
      })
      .catch(err => {
        if (!checkAuthorized(err)) {
          localStorage.clear();
          navigate('/login')
        }
      })
      .finally(() => { setLoading(false) })
  }

  return (
    <div>
      <div className="flex justify-between items-center mt-5 mb-5">
        <div className="w-1/2">
          <p className="block uppercase text-gray-500 mb-1 text-sm">
            Source Office
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {surce?.title || '-'}
          </p>
        </div>
        <div className="w-1/2">
          <p className="block uppercase text-gray-500 mb-1 text-sm">
            Destination Office
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {destination?.title || '-'}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-5">
        <div className="w-1/2">
          <p className="block uppercase text-gray-500 mb-1 text-sm">
            Tracking Number
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {itemDetails?.tracking_number || '-'}
          </p>
        </div>
        <div className="w-1/2">
          <p className="block uppercase text-gray-500 mb-1 text-sm">
            Date
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {itemDetails?.shipment_delivery_status || '-'}
          </p>
        </div>
      </div>
      <div className="w-full mb-5">
        <p className="block uppercase text-gray-500 mb-1 text-sm">
          Consignee
        </p>
        <p className="font-medium capitalize w-fit whitespace-nowrap">
          {itemDetails?.consignee_uid}
        </p>
      </div>
      <div className="w-full mb-5">
        <p className="block uppercase text-gray-500 mb-1 text-sm">
          Shipping Weight
        </p>
        <p className="font-medium capitalize w-fit whitespace-nowrap">
          {itemDetails?.shipment_weight || '-'}
        </p>
      </div>
      <div className="w-full mb-5">
        <p className="block uppercase text-gray-500 mb-1 text-sm">
          Shipping Dimensions
        </p>
        <p className="font-medium capitalize w-fit whitespace-nowrap">
          L: {itemDetails?.shipment_dimension?.length || '-'} in &nbsp; W: {itemDetails?.shipment_dimension?.width || '-'} in &nbsp; H: {itemDetails?.shipment_dimension?.height || '-'} in
        </p>
      </div>
      <div className="flex justify-between items-center mb-5">
        <div className="w-1/2">
          <p className="block uppercase text-gray-500 mb-1 text-sm">
            Delivery option
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {itemDetails?.delivery_option}
          </p>
        </div>
        <div className="w-1/2">
          <p className="block uppercase text-gray-500 mb-1 text-sm">
            Service Type
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {itemDetails?.shipment_service_type}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-5">
        <div className="w-1/2">
          <p className="block uppercase text-gray-500 mb-1 text-sm">
            Need Insurance
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {itemDetails?.is_insured ? 'yes' : 'No'}
          </p>
        </div>
        <div className="w-1/2">
          <p className="block uppercase text-gray-500 mb-1 text-sm">
            Need Packaging
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {itemDetails?.is_packaging ? 'yes' : 'No'}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-5">
        <div className="w-1/2">
          <p className="block uppercase text-gray-500 mb-2 text-sm">
            Invoice
          </p>
          {
            loading ?
              <div className=" mt-1">
                <Loader />
              </div>
              :
              <p
                onClick={downloadPDF}
                className="font-medium cursor-pointer capitalize w-fit whitespace-nowrap flex  items-center gap-1 text-red-500  mt-1"
              >
                <icons.fileDownload className="text-2xl" /> Download
              </p>
          }
        </div>
        <div className="w-1/2">
          <p className="block uppercase text-gray-500 mb-2 text-sm">
            Label
          </p>
          <a
            href={itemDetails?.label}
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
