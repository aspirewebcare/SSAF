import React, { useEffect, useRef, useState } from "react";
import icons from "../icons";

const SortButton = ({ sort, arr, data, sortChange }) => {
  const [dropSort, setDropSort] = useState(false);
  const ref = useRef(null);
  const button = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropSort &&ref.current &&!ref.current.contains(event.target) &&button.current &&!button.current.contains(event.target)
      ) {
        setDropSort(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [dropSort]);

  return (
    <div className=" relative mr-1">
      <div
        ref={button}
        className={`w-fit bg-white border rounded-lg cursor-pointer flex items-center pl-3 mt-[2px] ${JSON.stringify(sort) === "{}"?'!pr-2':''}`}
        onClick={() => setDropSort((prev) => !prev)}
      >
        <span className="text-[13px] w-full outline-none text-gray-600 py-[14px] whitespace-nowrap text-ellipsis overflow-hidden block w-9rem">
          Sort by: {JSON.stringify(sort) !== "{}" && Object.values(sort)[0]}
        </span>
        <icons.arrowDown className="text-gray-400 text-3xl" />
      </div>
      <div
        ref={ref}
        className={`${dropSort
            ? "visible opacity-100 translate-y-0"
            : "invisible opacity-0 -translate-y-3"
          } duration-200 absolute  shadow  rounded-lg   p-2 top-12 right-0 w-[310px] h-[137px] bg-white`}
      >
        <div className="flex  gap-3 justify-between py-3 pr-2">
          {arr.map((singleArr) => (
            <div key={singleArr.id} className="flex  flex-col gap-5 w-1/2">
              <h1 className="font-medium ml-3">{singleArr.name}</h1>
              {singleArr.arr.map((item) => (
                <div key={item.id}>
                  <div className="round green_checkbox flex ">
                    <input
                      checked={
                        sort[singleArr.name] === item.name ? true : false
                      }
                      onChange={(e) =>
                        sortChange(e.target.checked, item.name, singleArr.name)
                      }
                      type="checkbox"
                      id={item.name}
                    />
                    <label
                      htmlFor={item.name}
                      className="cursor-pointer text-ellipsis whitespace-nowrap"
                    >
                      <span className="pl-8">{item.name}</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortButton;
