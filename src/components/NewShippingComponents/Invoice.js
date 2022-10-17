import React from "react";
import invoice from "../../assets/images/invoice.png";
import CustomButton from "../shared/Buttons/CustomButton";
import AddNewShippingHeader from "./AddNewShippingHeader";

const Invoice = ({ currentStep, nextStepClick }) => {
  const printDocument = () => {
    var popup;
    function closePrint() {
      if (popup) {
        popup.close();
      }
    }
    popup = window.open(invoice);
    popup.onbeforeunload = closePrint;
    popup.onafterprint = closePrint;
    popup.focus(); // Required for IE
    popup.print();
  };
  const downloadDoc = () => {
    const link = document.createElement("a");
    link.href = invoice;
    link.setAttribute("download", "invoice.png");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };
  return (
    <div className="h-full relative mt-6">
      <div className="flex flex-wrap justify-between items-center">
        <AddNewShippingHeader step={currentStep} />
        <div className="flex gap-3">
          <CustomButton
            hadleClick={downloadDoc}
            block={false}
            btnClass="h-[40px] w-[146px] capitalize border-[#FE0000] text-[#FE0000]"
            text="Download Invoice"
          />
          <CustomButton
            hadleClick={printDocument}
            block={true}
            btnClass="h-[40px] w-[146px] capitalize"
            text="Print Invoice"
          />
        </div>
      </div>
      <div className="border pt-8 pb-16 rounded-lg mt-5">
        <div className="w-full">
          <img className="w-full" src={invoice} alt="invoice" />
        </div>
      </div>
      <div className="mt-20 w-full flex  justify-between">
        <CustomButton
          hadleClick={() => nextStepClick(4, 3)}
          block={false}
          btnClass="h-[56px] w-[150px]"
          text="Back"
        />
        <CustomButton
          hadleClick={() => nextStepClick(4, 5)}
          block={true}
          btnClass="h-[56px] w-[150px]"
          text="Next"
        />
      </div>
    </div>
  );
};

export default Invoice;
