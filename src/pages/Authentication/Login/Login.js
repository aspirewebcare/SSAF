import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LoginBg from "../../../assets/images/loginBg.png";
import { InputWithText } from "../../../components/shared/InputWithText/InputWithText";
import LoginSignupBox from "../../../components/shared/LoginSignupBox/LoginSignupBox";

const Login = () => {
  const { handleSubmit, register } = useForm();
  const [tokenForm, setTokenForm] = useState(false);
  const navigate = useNavigate();

  const formSubmit = (data) => {
    setTokenForm(true);
    navigate("/dashboard");
    console.log(tokenForm)
  };

  return (
    <section className="flex  flex-col lg:flex-row items-center justify-center gap-10  bg-white min-h-screen">
      <form
        className="xl:px-20 pt-10 pb-0 lg:py-10 w-full lg:w-1/2"
        onSubmit={handleSubmit(formSubmit)}
      >
        <LoginForm register={register} />
      </form>
      <div className="pb-10 lg:pb-0">
      <div className="w-8/12  mx-auto">
        <div className="w-full  lg:py-0">
          <img className="w-full" src={LoginBg} alt="login_bg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

const LoginForm = ({ register }) => {
  const navigate = useNavigate();
  const inputFeilds = [
    {
      id: 1,
      name: "email",
      text: "Email Address ",
      type: "email",
      placeholder: "Enter Email Address",
    },
    {
      id: 2,
      name: "pass",
      text: "Password",
      type: "password",
      placeholder: "Password",
    },
  ];
  return (
    <LoginSignupBox
      title="Login"
      titleDes="Login to your account with the credentials"
      forgetPass={true}
    >
      {inputFeilds.map((item) => (
        <div key={item.id} className="my-5">
          <InputWithText register={register} item={item} />
        </div>
      ))}
      <div className="flex flex-col sm:flex-row gap-5 justify-between">
        <div className="round flex ">
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox" className="relative select-none cursor-pointer text-ellipsis whitespace-nowrap">
            <span className="pl-8 ">Keep me signed in</span>
          </label>
        </div>
        <p
          onClick={() => navigate("/forget-password")}
          className="select-none cursor-pointer text-[#212121] font-medium ml-10 sm:ml-0 pt-[2px]"
        >
          Forgot password?
        </p>
      </div>
    </LoginSignupBox>
  );
};
