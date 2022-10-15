import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddItems from "../../../components/NewShippingComponents/AddItems";
import AddNewItem from "../../../components/NewShippingComponents/AddNewItem";
import AddShippingDetails from "../../../components/NewShippingComponents/AddShippingDetails";
import Invoice from "../../../components/NewShippingComponents/Invoice";
import LabelShipping from "../../../components/NewShippingComponents/LabelShipping";
import Payment from "../../../components/NewShippingComponents/Payment";
import TearmsServices from "../../../components/NewShippingComponents/TearmsServices";
import Header from "../../../components/shared/Header";
import icons from "../../../components/shared/icons";
import RightSidebar from "../../../components/shared/RightSidebar/RightSidebar";

const NewShipping = () => {
  const [sidebarTitle, setSidebarTitle] = useState("title");
  const [sidebarCancelBtn, setSidebarCancelBtn] = useState("");
  const [sidebarApplyBtn, setSidebarApplyBtn] = useState("");
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const navigate = useNavigate();
  const rightSidebarBtnClick = () => {};

  const nextStepClick = (currentStep, nextStep, formData) => {
    setCurrentStep(nextStep);
  };

  const openAddItemRightSidebar = () => {
    setSidebarTitle("Add New Item");
    setSidebarCancelBtn("Cancel");
    setSidebarApplyBtn("Add");
    setRightSidebarOpen(true);
  };

  return (
    <div className="container  mx-auto  pt-12 lg:pt-0 relative overflow-hidden">
      <RightSidebar
        childClass={sidebarCancelBtn ? "h-[79vh] lg:h-[89vh]" : "h-[78vh]"}
        title={sidebarTitle}
        rightSidebarOpen={rightSidebarOpen}
        setRightSidebarOpen={setRightSidebarOpen}
        applyBtn={sidebarApplyBtn}
        cancelBtn={sidebarCancelBtn}
        btnHandleClick={rightSidebarBtnClick}
      >
        {sidebarTitle === "Add New Item" && <AddNewItem />}
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

const stepper = [
  {
    id: 1,
    name: "Shipping details",
    isActive: false,
  },
  {
    id: 2,
    name: "Add  Items",
    isActive: false,
  },
  {
    id: 3,
    name: "Terms of services",
    isActive: false,
  },
  {
    id: 4,
    name: "Invoice",
    isActive: false,
  },
  {
    id: 5,
    name: "Payment",
    isActive: false,
  },
  {
    id: 6,
    name: "Label",
    isActive: false,
  },
];
const NewShippingStepper = ({ setCurrentStep, currentStep = 1 }) => {
  const [allStepper, setAllStepper] = useState(stepper || []);

  useEffect(() => {
    let cloneStepper = [...allStepper];
    cloneStepper.forEach((element) => {
      if (currentStep >= element.id) {
        element.isActive = true;
      } else {
        element.isActive = false;
      }
    });

    setAllStepper(cloneStepper);

    // eslint-disable-next-line
  }, [currentStep]);

  const clickStep = (stepId) => {
    if (currentStep >= stepId) {
      setCurrentStep(stepId);
    }
  };
  return (
    <ul className="flex  flex-wrap gap-y-2">
      {allStepper.map((step) => (
        <React.Fragment key={step.id}>
          <li
            onClick={() => clickStep(step.id)}
            className="flex gap-3 items-center cursor-pointer w-full sm:w-1/2 lg:w-full"
          >
            <span
              className={`flex items-center justify-center border w-12 h-12  rounded-full text-2xl  ${
                step.isActive
                  ? `border-[#FE0000]  font-semibold ${
                      step.id >= currentStep
                        ? "text-[#FE0000]"
                        : "text-white bg-[#FE0000]"
                    } `
                  : ""
              }`}
            >
              {" "}
              {step.id}
            </span>
            <p
              className={` ${
                step.isActive ? "text-[#FE0000] font-medium" : ""
              }`}
            >
              {step.name}
            </p>
          </li>
          {stepper.length !== step.id && (
            <span
              className={`hidden lg:block  w-[1px]  ml-6 h-10  ${
                step.isActive && step.id !== currentStep
                  ? "bg-[#FE0000]"
                  : "bg-[#D9D9D9]"
              }`}
            ></span>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};
