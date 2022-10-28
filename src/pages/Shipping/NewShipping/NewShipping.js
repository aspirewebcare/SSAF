import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";
import AddItems from "../../../components/NewShippingComponents/AddItems";
import AddNewItem from "../../../components/NewShippingComponents/AddNewItem";
import AddNewSender from "../../../components/NewShippingComponents/AddNewSender";
import AddShippingDetails from "../../../components/NewShippingComponents/AddShippingDetails";
import Invoice from "../../../components/NewShippingComponents/Invoice";
import LabelShipping from "../../../components/NewShippingComponents/LabelShipping";
import Payment from "../../../components/NewShippingComponents/Payment";
import TearmsServices from "../../../components/NewShippingComponents/TearmsServices";
import Header from "../../../components/shared/Header";
import icons from "../../../components/shared/icons";
import RightSidebar from "../../../components/shared/RightSidebar/RightSidebar";
import ApiRequest from "../../../hooks/ApiRequest";
import { checkAuthorized } from "../../../hooks/commonFunc";
import NewShippingStepper from "./NewShippingStepper";

const NewShipping = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const [filterComInfo, setFilterComInfo] = useState({
    title: "",
    cancelBtn: "",
    applyBtn: "",
  });
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [loggedUser] = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [shipmentDetails, setShipmentDetails] = useState([]);
  const [shipItmes, setShipItems] = useState([]);
  const [selectSender, setSelectSender] = useState({});


  const nextStepClick = (currentStep, nextStep, formData) => {
    setCurrentStep(nextStep);
  };

  const openAddItemRightSidebar = () => {
    setFilterComInfo({
      title: "Add New Item",
      cancelBtn: "Cancel",
      applyBtn: "Add",
    });
    setRightSidebarOpen(true);
  };

  const cancelAddItem = () => {
    setRightSidebarOpen(false)
  }
  const btnHandleClick = (data) => {

    if (filterComInfo.title === "Add New Item") addNewItem(data)
    if (filterComInfo.title === "Add New Sender") createSender(data, 'customer')
    if (filterComInfo.title === "Add New Consignee") createSender(data, 'consignee')
  };


  const createSender = (data, type) => {
    createCustomerndConsignee(data, type)
  }

  const createCustomerndConsignee = (data, type = '') => {
    setLoading(true)

    let { email, first_name, last_name, phone_number, zip_or_postcode, state_or_region, street, city, country } = data;
    let body = { phone_number: `+${phone_number}`, first_name, last_name, email, address: { street, city, state_or_region, country, zip_or_postcode }, company_name: "Elliott, Hoffman and Nash" }

    let path = type === 'customer' ? '/customers' : `/customers/${selectSender?.customer_uid}/consignees`

    ApiRequest('POST', path, loggedUser.jwt_token, body)
      .then(result => {

        if (result.hasOwnProperty('errors')) {
          toast.error(result.errors[0].message)
        } else {
          if (result.hasOwnProperty('customer_uid')) {
            toast.success(`New ${type === 'customer' ? 'Sender' : 'Consignee'} Added.`)

            setRightSidebarOpen(false)
          } else {
            toast.error(result?.detail[0]?.msg)
          }
        }
      })
      .catch(error => {

        toast.error(error)
        if (!checkAuthorized(error)) {
          localStorage.clear();
          navigate('/login')
        }
      })
      .finally(() => setLoading(false))
  }


  const addNewItem = (data) => {
    let cloneData = { ...data };
    delete cloneData.length;
    delete cloneData.width;
    delete cloneData.height;

    delete cloneData.order_number;
    delete cloneData.carrier;
    delete cloneData.tracking_number;
    delete cloneData.source;

    cloneData.item_dimension = { length: data.length, width: data.width, height: data.height }
    cloneData.item_worth = { value: data?.item_worth, currency: 'USD' }
    cloneData.order_info = { order_number: data?.order_number, carrier: data?.carrier, tracking_number: data?.tracking_number, source: data?.source }
    cloneData = { ...cloneData, item_condition: "NEW" }

    createShipmentItem(cloneData)
  }


  const createShipmentItem = (body) => {

    setLoading(true)
    ApiRequest('POST', `/shipments/${shipmentDetails?.shipment_uid}/items`, loggedUser.jwt_token, body)
      .then(result => {

        if (result.hasOwnProperty('errors')) {
          toast.error(result.errors[0].message)
        } else {
          setShipItems(prev => [...prev, result])
          setRightSidebarOpen(false)
        }
      })
      .catch(error => {

        toast.error(error)
        if (!checkAuthorized(error)) {
          localStorage.clear();
          navigate('/login')
        }

      })
      .finally(() => setLoading(false))
  }



  const shippingAddressSubmit = (data) => {

    let cloneData = { ...data };
    delete cloneData.length;
    delete cloneData.width;
    delete cloneData.height;
    delete cloneData.customer_uid;

    cloneData.shipment_dimension = { length: data.length, width: data.width, height: data.height }

    createShipment(cloneData, data.customer_uid)
  }


  const createShipment = (body, customer_uid) => {

    setLoading(true)
    ApiRequest('POST', `/customers/${customer_uid}/shipments`, loggedUser.jwt_token, body)
      .then(result => {

        if (result.hasOwnProperty('errors')) {
          toast.error(result.errors[0].message)
        } else {

          if (result.hasOwnProperty('customer_uid')) {
            setShipmentDetails({ ...result })
            toast.success('New Shipment Added.')
            nextStepClick(1, 2, { name: "242" });
          } else {
            toast.error(result?.detail[0]?.msg)
          }
        }
      })
      .catch(error => {

        toast.error(error)
        if (!checkAuthorized(error)) {
          localStorage.clear();
          navigate('/login')
        }
      })
      .finally(() => setLoading(false))

  }

  return (
    <div className="container  mx-auto  pt-12 lg:pt-0 relative  overflow-hidden">
      <RightSidebar
        childClass={
          filterComInfo.cancelBtn ? "h-[79vh] lg:h-[89vh]" : "h-[78vh]"
        }
        title={filterComInfo.title}
        rightSidebarOpen={rightSidebarOpen}
        setRightSidebarOpen={setRightSidebarOpen}
        applyBtn={filterComInfo.applyBtn}
        cancelBtn={filterComInfo.cancelBtn}
        btnHandleClick={btnHandleClick}
        cancelClick={cancelAddItem}
        handleSubmit={handleSubmit}
        simpleRed={false}
        loading={loading}
      >
        {filterComInfo.title === "Add New Item" && <AddNewItem setValue={setValue} register={register} errors={errors} />}
        {filterComInfo.title === "Add New Sender" && <AddNewSender setValue={setValue} register={register} errors={errors} />}
        {filterComInfo.title === "Add New Consignee" && <AddNewSender setValue={setValue} register={register} errors={errors} />}
      </RightSidebar>

      <Header
        name={
          <span className="flex gap-2 items-center">
            <icons.arrowLeft
              onClick={() => navigate(-1)}
              className="cursor-pointer hover:shadow rounded-full w-12  h-12 p-2"
            />{" "}
            Add New Shipping
          </span>
        }
      />

      <div className="bg-white flex flex-col lg:flex-row justify-between lg:px-10 py-10 relative">
        <div className="lg:hidden fixed left-0 top-0  bg-white w-full  h-full"></div>
        <aside className="w-full lg:w-3/12  lg:border-r pb-10 relative z-[5]">
          <div className="px-0 lg:px-5">
            <NewShippingStepper
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
            />
          </div>
        </aside>
        <section className="w-full lg:w-9/12 lg:pl-10 relative z-[5]">
          <div className="w-full relative">
            {currentStep === 1 &&
              <AddShippingDetails
                selectSender={selectSender}
                setSelectSender={setSelectSender}
                loading={loading}
                setFilterComInfo={setFilterComInfo}
                setRightSidebarOpen={setRightSidebarOpen}
                currentStep={currentStep}
                nextBtnType='submit'
                shippingAddressSubmit={shippingAddressSubmit}
              />
            }
            {currentStep === 2 &&
              <div className={`${currentStep === 2 ? 'block' : "hidden"}`}>
                <AddItems
                  shipItmes={shipItmes}
                  openAddItemRightSidebar={openAddItemRightSidebar}
                  currentStep={currentStep}
                  nextStepClick={nextStepClick}
                />
              </div>
            }

            <div className={`${currentStep === 3 ? 'block' : "hidden"}`}>
              <TearmsServices
                currentStep={currentStep}
                nextStepClick={nextStepClick}
              />
            </div>

            {currentStep === 4 && (
              <div className={`${currentStep === 4 ? 'block' : "hidden"}`}>
                <Invoice
                  currentStep={currentStep}
                  nextStepClick={nextStepClick}
                  shipmentDetails={shipmentDetails}
                />
              </div>
            )}

            <div className={`${currentStep === 5 ? 'block' : "hidden"}`}>
              <Payment
                currentStep={currentStep}
                nextStepClick={nextStepClick}
              />
            </div>

            <div className={`${currentStep === 6 ? 'block' : "hidden"}`}>
              <LabelShipping
                currentStep={currentStep}
                nextStepClick={nextStepClick}
                shipmentDetails={shipmentDetails}
              />
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default NewShipping;
