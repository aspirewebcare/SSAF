import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../App";
import invoice from "../../assets/images/invoice.png";
import CustomButton from "../shared/Buttons/CustomButton";
import AddNewShippingHeader from "./AddNewShippingHeader";

const Invoice = ({ shipmentDetails, currentStep, nextStepClick }) => {
  const [loading, setLoading] = useState(false);
  const [loggedUser] = useContext(AuthContext)
  const [file, setFile] = useState(null);

  const printDocument = () => {
    var popup;
    function closePrint() {
      if (popup) {
        popup.close();
      }
    }
    popup = window.open(file);
    popup.onbeforeunload = closePrint;
    popup.onafterprint = closePrint;
    popup.focus(); // Required for IE
    popup.print();
  };
  const downloadDoc = () => {
    downloadPDF()
  };


  const downloadPDF = () => {
    let anchor = document.createElement("a");
    document.body.appendChild(anchor);
    anchor.href = file;
    anchor.download = `shipment_information_pdf.pdf`;
    anchor.click();
    window.URL.revokeObjectURL(file);
  }


  useEffect(() => {
    if (loggedUser.jwt_token) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${loggedUser.jwt_token}`);
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://development.ssaflogistics.com/cms/v1/shipments/1ae65c68-0e3e-4c85-bbaf-fe9aae213f6d/invoice/pdf`, requestOptions)
        .then((res) => res.blob())
        .then(data => {
          let objectUrl = window.URL.createObjectURL(data);
          setFile(objectUrl)
        })
        .catch(err => {
          toast.error(`${err}`)
        })
        .finally(() => { setLoading(false) })
    }
  }, [loggedUser.jwt_token])
  return (
    <div className="h-full relative mt-6">
      <div className="flex flex-wrap justify-between items-center">
        <AddNewShippingHeader step={currentStep} />
        <div className="flex gap-3">
          <CustomButton
            loading={loading}
            hadleClick={downloadDoc}
            block={false}
            btnClass="h-[40px] w-[146px] capitalize border-[#FE0000] text-[#FE0000]"
            text="Download Invoice"
            simpleRed={true}
            disable={file ? false : true}

          />
          <CustomButton
            hadleClick={printDocument}
            block={true}
            btnClass="h-[40px] w-[146px] capitalize"
            text="Print Invoice"
            disable={file ? false : true}
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
