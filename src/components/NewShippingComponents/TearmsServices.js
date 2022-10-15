import React from "react";
import document from "../../assets/images/document.png";
import CustomButton from "../shared/Buttons/CustomButton";
import AddNewShippingHeader from "./AddNewShippingHeader";

const TearmsServices = ({  currentStep, nextStepClick }) => {
  const printDocument = () => {
  
      var popup;
      function closePrint() {
        if (popup) {
          popup.close();
        }
      }
      popup = window.open(document);
      popup.onbeforeunload = closePrint;
      popup.onafterprint = closePrint;
      popup.focus(); // Required for IE
      popup.print();
    
  };
  return (
    <div className="h-full relative mt-6">
      <div className="flex justify-between items-center">
        <AddNewShippingHeader
          step={currentStep}
        />
        <CustomButton
          hadleClick={printDocument}
          block={true}
          btnClass="h-[40px] w-[146px] capitalize"
          text="Print Document"
        />
      </div>
      <div className="border pt-8 pb-16 rounded-lg">
        <div className="w-full">
          <img className="w-full" src={document} alt="document" />
        </div>
      </div>
      <div className="mt-20 w-full flex  justify-between">
        <CustomButton
          hadleClick={() => nextStepClick(3, 2)}
          block={false}
          btnClass="h-[56px] w-[150px]"
          text="Back"
        />
        <CustomButton
          hadleClick={() => nextStepClick(3, 4)}
          block={true}
          btnClass="h-[56px] w-[150px]"
          text="Next"
        />
      </div>
    </div>
  );
};

export default TearmsServices;
