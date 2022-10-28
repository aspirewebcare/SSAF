import React, { useState } from "react";
import paymentInformation from "../../assets/images/payment_information.png";
import CustomButton from "../shared/Buttons/CustomButton";
import AddNewShippingHeader from "./AddNewShippingHeader";

const Payment = ({ currentStep, nextStepClick }) => {
  const [paymenetRec, setPaymentRec] = useState(false);
  const paymentReceived = () => {
    setPaymentRec(prev => !prev);
  };
  return (
    <div className="h-full relative mt-6">
      <div className="flex justify-between items-center">
        <AddNewShippingHeader step={currentStep} />
      </div>
      <div className="border py-28 rounded-lg">
        <div className="flex  flex-col items-center">
          <div className="w-[250px] mb-10">
            <img
              className="w-full"
              src={paymentInformation}
              alt="payment_information"
            />
          </div>
          <h1 className="text-center text-2xl font-semibold mb-3">
            Payment Confirmation
          </h1>
          <p className="mx-auto text-center text-lg leading-[25px] w-[427px]">
            Please confirm that payment has been received from the customer
          </p>
          <CustomButton
            hadleClick={paymentReceived}
            block={!paymenetRec}
            btnClass={`h-[60px] w-[350px] mt-10 ${paymenetRec ? "border-[#FE0000] text-[#FE0000]" : ""
              }`}
            text={
              paymenetRec
                ? "No, PAYment Didn’t Received"
                : "Yes, Payment Received"
            }
          />
        </div>
      </div>
      <div className="mt-20 w-full flex  justify-between">
        <CustomButton
          hadleClick={() => nextStepClick(5, 4)}
          block={false}
          btnClass="h-[56px] w-[150px]"
          text="Back"
        />
        <CustomButton
          disable={!paymenetRec}
          hadleClick={() => nextStepClick(5, 6)}
          block={true}
          btnClass="h-[56px] w-[150px]"
          text="Next"
        />
      </div>
    </div>
  );
};

export default Payment;
