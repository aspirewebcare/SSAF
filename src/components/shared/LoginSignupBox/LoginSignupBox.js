import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import CustomButton from "../Buttons/CustomButton";

const LoginSignupBox = ({
  title = "",
  titleDes = "",
  children,
  btnType = "submit",
  btnText = "Login",
  btnClass = "",
  isExpireTime = "",
  loading,
  loginErr
}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white !w-full pt-10 lg:pt-0">
      <div onClick={() => navigate("/")} className="h-[80px]  w-[118.63px] cursor-pointer">
        <img className="w-full h-full" src={logo} alt="logo" />
      </div>
      <h1 className="text-3xl lg:text-4xl font-semibold mt-10 mb-4">{title}</h1>
      <p className="text-[#212121] text-lg mb-7 leading-7">{titleDes}</p>
      {children}
      <CustomButton
        type='submit'
        text={btnText}
        btnClass={`mt-5 h-[50px] ${btnClass}`}
        loading={loading}
      />
      {
        loginErr?.status && <p className="text-sm  text-red-500 mt-2">{loginErr?.msg}</p>
      }
    </div>
  );
};
export default LoginSignupBox;
