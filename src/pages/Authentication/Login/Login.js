import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";
import LoginBg from "../../../assets/images/loginBg.png";
import { InputWithText } from "../../../components/shared/InputWithText/InputWithText";
import LoginSignupBox from "../../../components/shared/LoginSignupBox/LoginSignupBox";
import ApiRequest, { BASE_URL_AUTH } from "../../../hooks/ApiRequest";
import { checkAuthorized } from "../../../hooks/commonFunc";

const Login = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [loginErr, setLoginErr] = useState({ status: false, msg: '' })
  const { state } = useLocation()

  const formSubmit = (data) => {
    if (loginErr.status) {
      setLoginErr({ status: false, msg: '' })
    }
  
    setLoading(true)
    ApiRequest('POST', '/v1/login/staff', '', data, true)
      .then((data) => {
        if (data) {
          if (data.hasOwnProperty('errors')) {
    
            setLoginErr({ status: true, msg: data.errors[0].message })
          }
          else {
            localStorage.setItem("userData", JSON.stringify(data));
            setLoggedUser(data)
            if (state?.prevPath) {
              navigate(state?.prevPath)
            } else {
              navigate("/")
            }

          }
        }
      })
      .catch((err) => {
        setLoginErr({ status: true, msg: `${err.message}` })
        if (!checkAuthorized(err)) {
          localStorage.clear();
          navigate('/login')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  };

  return (
    <section className="flex  flex-col lg:flex-row items-center justify-center bg-white min-h-screen 2xl:gap-x-20">
      <form
        className="xl:h-[666px] w-full lg:w-1/2 "
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="self-start flex lg:block w-full mx-auto login_form">
          <LoginForm loginErr={loginErr} loading={loading} errors={errors} register={register} />
        </div>
      </form>

      <div className="pb-10 lg:pb-0 w-full lg:w-1/2  mt-10 lg:mt-0">
        <div className="w-[95%] mx-auto lg:mx-px login_image">
          <div className="w-full lg:w-[500px] 2xl:w-[560px] login_image">
            <img className="w-full" src={LoginBg} alt="login_bg" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default Login;

const LoginForm = ({ loginErr = {}, loading, register, errors }) => {
  const navigate = useNavigate();
  const inputFeilds = [
    {
      id: 1,
      name: "email",
      text: "Email Address ",
      type: "email",
      placeholder: "Enter Email Address",
      errMsg: 'Enter your email'
    },
    {
      id: 2,
      name: "password",
      text: "Password",
      type: "password",
      placeholder: "Password",
      errMsg: 'Enter your password'
    },
  ];
  return (
    <LoginSignupBox
      title="Login"
      titleDes="Login to your account with the credentials"
      forgetPass={true}
      loading={loading}
      loginErr={loginErr}
    >
      {inputFeilds.map((item) => (
        <div key={item.id} className="my-5">
          <InputWithText errMsg={item.errMsg} required={true} errors={errors} register={register} item={item} />
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