import React from "react";
import { BsStarFill } from "react-icons/bs";

const Rate = ({ ratePoint = 0 }) => {

  return (
    <div className="flex items-center text-[14px]  lg:text-[17px] gap-[2px]">
      {[1, 2, 3, 4, 5].map((item, index) => (
        <label key={item}>
          <input
            className="hidden"
            type="radio"
            value={index + 1}
          />
          <div className="cursor-pointer">
            <BsStarFill
              color={
                index + 1 < ratePoint || index + 1 === ratePoint
                  ? "#FFB822"
                  : "rgb(192,192,192)"
              }
            />
          </div>
        </label>
      ))}
    </div>
  );
};

export default Rate;