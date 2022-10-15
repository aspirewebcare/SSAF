import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import labelImg from "../../assets/images/shipping_level.png";
import CustomButton from "../shared/Buttons/CustomButton";
import Modal from "../shared/Modal/Modal";
import AddNewShippingHeader from "./AddNewShippingHeader";

const LabelShipping = ({ currentStep, nextStepClick }) => {
  const [paymenetRec, setPaymentRec] = useState([]);
  const [genImgCount, setGenImgCount] = useState(0);
  const [err, setErr] = useState({ status: false, message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const genarateLabel = () => {
    if (genImgCount) {
      if (genImgCount <= 3) {
        let imgs = [];
        for (let i = 0; i < genImgCount; i++) {
          imgs.push(labelImg);
        }
        setPaymentRec(imgs);
        setGenImgCount(0);
      } else {
        setErr({ status: true, message: "Under 3 Items !" });
      }
    } else {
      setErr({ status: true, message: "Enter Number !" });
    }
  };


  return (
    <div className="h-full relative mt-6">
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="mt-2 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-center mt-5 mb-3">Submited</h1>
          <p className="text-sm text-gray-500 text-center">
            Your Form  was Submited
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-5">
          <CustomButton
            hadleClick={() => {
              setIsModalOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/shipping");
            }}
            btnClass="h-[45px]"
            text="Done"
          />
        </div>
      </Modal>
      <div className="flex justify-between items-center">
        <AddNewShippingHeader step={currentStep} />
      </div>
      <div className="border min-h-[500px]  p-10 rounded-lg">
        {paymenetRec.length ? (
          paymenetRec.map((img, ind) => <img key={ind} src={img} alt="label" />)
        ) : (
          <div className="flex  flex-col items-center">
            <h1 className="text-center text-2xl font-semibold mb-8">
              How many boxes/pieces does this shipment have?
            </h1>
            <div>
              <input
                className="border  rounded-lg p-3 w-[400px]"
                placeholder="Number of boxes/pieces"
                type="number"
                name="label"
                id="label"
                onChange={(e) => {
                  setGenImgCount(e.target.value);
                  err.status && setErr({ status: false, message: "" });
                }}
              />
              <p className="pt-1 pl-2 text-[#FE0000] text-sm font-medium">
                {err.message}
              </p>
            </div>
            <CustomButton
              hadleClick={genarateLabel}
              block={true}
              btnClass="h-[56px] !w-fit  px-7 mt-4"
              text="Generate Label"
            />
          </div>
        )}
      </div>
      <div className="mt-20 w-full flex  justify-between">
        <CustomButton
          hadleClick={() => nextStepClick(5, 5)}
          block={false}
          btnClass="h-[56px] w-[150px]"
          text="Back"
        />
        <CustomButton
          disable={!paymenetRec.length}
          hadleClick={() => setIsModalOpen(true)}
          block={true}
          btnClass="h-[56px] w-[150px]"
          text="Done"
        />
      </div>
    </div>
  );
};

export default LabelShipping;
