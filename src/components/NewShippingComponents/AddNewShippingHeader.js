import { useEffect, useState } from "react";

const AddNewShippingHeader = ({ step = 1 }) => {
  const [headerDetails, setHeaderDetails] = useState({ title: "", desc: "" });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    switch (step) {
      case 1:
        setHeaderDetails({
          title: "Shipping details",
          desc: "Add shipping details here.",
        });
        break;
      case 2:
        setHeaderDetails({ title: "Add items", desc: "Add items here." });
        break;
      case 3:
        setHeaderDetails({
          title: "Terms of services",
          desc: "Agreenent for the shipping.",
        });
        break;
      case 4:
        setHeaderDetails({ title: "Invoice", desc: "Invoice of the shipment" });
        break;
      case 5:
        setHeaderDetails({ title: "Payment", desc: "Payment Confirmation" });
        break;
      case 6:
        setHeaderDetails({ title: "Label", desc: "Package Labels" });
        break;
      default:
        setHeaderDetails({
          title: "Shipping details",
          desc: "Add shipping details here.",
        });
        break;
    }
  }, [step]);
  return (
    <div className="mb-10">
      <p className="text-gray-600  text-sm mb-5">Step {step}/6</p>
      <h1 className="font-semibold text-2xl">{headerDetails.title}</h1>
      <p className="mt-2 text-sm">{headerDetails.desc}</p>
    </div>
  );
};

export default AddNewShippingHeader;
