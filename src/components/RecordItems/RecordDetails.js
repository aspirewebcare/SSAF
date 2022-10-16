import React, { useEffect, useState } from "react";
import { isChromeOnMobile } from "../../hooks/commonFunc";
import { Status } from "../../pages/RecordItems/RecordItems";
import CustomButton from "../shared/Buttons/CustomButton";
import icons from "../shared/icons";
import Tooltrip from "../shared/Tooltip/Tooltrip";

const trackings = [
  {
    id: 1,
    date: "16 Nov 2021",
    time: "06:33 PM",
    title: "Processed at facility",
    area: "Lagos, NG",
  },
  {
    id: 2,
    date: "16 Nov 2021",
    time: "03:11 PM",
    title: "Departed from Transit facility",
    area: "Lagos, NG",
  },
  {
    id: 3,
    date: "16 Nov 2021",
    time: "06:33 PM",
    title: "Arrived at origin facility",
    area: "Lagos, NG",
  },
  {
    id: 4,
    date: "15 Nov 2021",
    time: "06:33 PM",
    title: "Enroute to facility",
    area: "New york, USA",
  },
  {
    id: 5,
    date: "15 Nov 2021",
    time: "06:33 PM",
    title: "Shipment data received",
    area: "New york, USA",
  },
];
const RecordDetails = ({  recordDetails }) => {
  const [itemInOffice, setItemInOffice] = useState(false);
  const [forChromeMobile, setForChromeMobile] = useState(false);

  const itemOffice = () => {
    setItemInOffice((prev) => !prev);
  };

  useEffect(() => {
    setForChromeMobile(isChromeOnMobile());
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center py-6">
        <div className="w-1/2">
          <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
            Source
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {recordDetails.source}
          </p>
        </div>
        <div className="w-1/2">
          <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
            Order Number
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {recordDetails.order_number}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="w-1/2">
          <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
            Tracking Number
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {recordDetails.tracking_number}
          </p>
        </div>
        <div className="w-1/2">
          <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
            Carrier
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            {recordDetails.carrier}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center py-6">
        <div className="w-1/2">
          <p className="hidden lg:block uppercase text-gray-500 mb-1 text-sm">
            Status
          </p>
          <p className="font-medium capitalize w-fit whitespace-nowrap">
            <Status status={recordDetails.status} />
          </p>
        </div>
      </div>
      <hr />
      <div className="flex justify-between items-center py-6">
        <h1 className="text-2xl font-semibold">Tracking </h1>
        <div className="flex items-center gap-1">
          <CustomButton
            hadleClick={itemOffice}
            block={true}
            btnClass={`h-[40px] w-[150px] ${itemInOffice
                ? "!bg-[#2DA400] text-white"
                : "!bg-white border border-[#818181] !text-[#818181]"
              } `}
            text="Item in office"
          />
          <Tooltrip tooltip="show  Tooltip">
            <img src={icons.tooltip} alt="tool-tip" />
          </Tooltrip>
        </div>
      </div>
      <ul>
        {trackings.map((item) => (
          <li
            key={item.id}
            className="py-4 flex justify-between items-center border-b"
          >
            <div>
              <p className="text-sm">
                <span>{item.date}</span> <span>{item.time}</span>
              </p>
              <p className="font-semibold">{item.title}</p>
            </div>
            <p>{item.area}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordDetails;
