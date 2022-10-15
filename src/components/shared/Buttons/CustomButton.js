import React from "react";

const CustomButton = ({
  disable = false,
  hadleClick = () => { },
  type = "button",
  text = "",
  btnClass = "h-[56px]  border-gray-300 ",
  block = true,
  simpleRed=false,
}) => {
  return (
    <button
      onClick={hadleClick}
      type={type}
      className={` hover:shadow-md w-full font-semibold ${block ? `${disable ? 'bg-gray-300' : `bg-[#FE0000] ${simpleRed?"bg-opacity-20 !text-[#FE0000]":''}`} text-white border-[#FE0000]` : "border"
        } text-sm  rounded-lg text-center outline-none uppercase ${btnClass}`}
      disabled={disable}
    >
      {text}
    </button>
  );
};

export default CustomButton;
