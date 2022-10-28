import React from "react";
import Loader from "../Loader";

const CustomButton = ({
  disable = false,
  hadleClick = () => { },
  type = "button",
  text = "",
  btnClass = "h-[56px]  border-gray-300 ",
  block = true,
  simpleRed = false,
  loading = false
}) => {
  return (
    <button
      onClick={hadleClick}
      type={type}
      className={` hover:shadow-md w-full font-semibold ${block ? `${disable ? 'bg-gray-300' : `bg-[#FE0000] ${simpleRed ? "bg-opacity-10 !text-[#FE0000]" : ''}`} text-white border-[#FE0000]` : "border"
        } text-sm  rounded-lg text-center outline-none uppercase ${btnClass}`}
      disabled={disable || loading}
    >
      {loading ? <Loader bgColor={simpleRed ? 'red' : 'white'} color='transparent' /> : text}
    </button>
  );
};

export default CustomButton;
