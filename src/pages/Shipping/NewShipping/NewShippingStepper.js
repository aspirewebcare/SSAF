import React, { useEffect, useState } from "react";

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
              className={`flex items-center justify-center border w-12 h-12  rounded-full text-2xl  ${step.isActive
                ? `border-[#FE0000]  font-semibold ${step.id >= currentStep
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
              className={` ${step.isActive ? "text-[#FE0000] font-medium" : ""
                }`}
            >
              {step.name}
            </p>
          </li>
          {stepper.length !== step.id && (
            <span
              className={`hidden lg:block  w-[1px]  ml-6 h-10  ${step.isActive && step.id !== currentStep
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

export default NewShippingStepper