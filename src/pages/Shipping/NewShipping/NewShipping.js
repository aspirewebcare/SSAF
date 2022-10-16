import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import NewShippingStepper from "./NewShippingStepper";

const NewShipping = () => {
  const {
    handleSubmit,
  } = useForm();

  const [filterComInfo, setFilterComInfo] = useState({
    title: "",
    cancelBtn: "",
    applyBtn: "",
  });
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  
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

  const cancelAddItem =()=>{
    setRightSidebarOpen(false)
  }
  const btnHandleClick = (data) => {
    // if (filterComInfo.title === "Filter") filterData(data)
    // if (filterComInfo.title === "Add new customer") addNewCusomter(data)
  };
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
      >
        {filterComInfo.title === "Add New Item" && <AddNewItem />}
        {filterComInfo.title === "Add New Sender" && <AddNewSender />}
        {filterComInfo.title === "Add New Consignee" && <AddNewSender />}
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
          <div className=" lg:px-5">
            <NewShippingStepper
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
            />
          </div>
        </aside>
        <section className="w-full lg:w-9/12 lg:pl-10 relative z-[5]">
          <div className="w-full relative">

            {currentStep === 1 && (
              <AddShippingDetails
                setFilterComInfo={setFilterComInfo}
                setRightSidebarOpen={setRightSidebarOpen}
                currentStep={currentStep}
                nextStepClick={nextStepClick}
              />
            )}
            {currentStep === 2 && (
              <AddItems
                openAddItemRightSidebar={openAddItemRightSidebar}
                currentStep={currentStep}
                nextStepClick={nextStepClick}
              />
            )}
            {currentStep === 3 && (
              <TearmsServices
                currentStep={currentStep}
                nextStepClick={nextStepClick}
              />
            )}
            {currentStep === 4 && (
              <Invoice
                currentStep={currentStep}
                nextStepClick={nextStepClick}
              />
            )}
            {currentStep === 5 && (
              <Payment
                currentStep={currentStep}
                nextStepClick={nextStepClick}
              />
            )}
            {currentStep === 6 && (
              <LabelShipping
                currentStep={currentStep}
                nextStepClick={nextStepClick}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewShipping;
