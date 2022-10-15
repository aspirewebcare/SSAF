import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiArrowLeft } from "react-icons/hi";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import fogetBg from "../../../assets/images/forget_ps.png";
import { InputWithText } from "../../../components/shared/InputWithText/InputWithText";
import LoginSignupBox from "../../../components/shared/LoginSignupBox/LoginSignupBox";

const ForgetPassword = () => {
  const { handleSubmit, register } = useForm();
  const [tokenForm, setTokenForm] = useState(false);
  const [codeSend, setCodeSend] = useState(false);
  const navigate = useNavigate();

  const formSubmit = (data) => {
    if (data.email) {
      setTokenForm(true);
    }
  };

  const tokenSubmit = () => {
    navigate("/reset-password")
  };
  return (
    <section className="flex  flex-col lg:flex-row items-center justify-center gap-10  bg-white min-h-screen">
      <form
        className="xl:px-20 pt-10 pb-0 lg:py-10 w-full lg:w-1/2"
        onSubmit={handleSubmit(formSubmit)}
      >
        {tokenForm ? (
          <TokenForm setTokenForm={setTokenForm} tokenSubmit={tokenSubmit} />
        ) : (
          <ForgetPassForm register={register} formSubmit={formSubmit} />
        )}
        {tokenForm && (
          <div className="text-center mt-8 mb-6">
            <p className="flex justify-center gap-1">
              Your code will expire in{" "}
              <Timer initialMinute={1} initialSeconds={30} />
            </p>
            <p className=" cursor-pointer font-medium mt-3 uppercase ">
              {!codeSend ? (
                <span>
                  Resend code in{" "}
                  <Timer
                    funcCall={() => setCodeSend(true)}
                    initialMinute={0}
                    initialSeconds={60}
                  />
                </span>
              ) : (
                <span className="text-[#FE0000]"> Resend code</span>
              )}
            </p>
          </div>
        )}
      </form>
      <div className="pb-10 lg:pb-0">
        <div className="w-8/12  mx-auto">
          <div className="w-full  lg:py-0"> 
          <img className="w-full" src={fogetBg} alt="login_bg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;

const TokenForm = ({ setTokenForm, tokenSubmit }) => {
  return (
    <LoginSignupBox
      formSubmit={tokenSubmit}
      title={
        <span className="flex items-center gap-2">
          <HiArrowLeft
            onClick={() => setTokenForm(false)}
            className="text-2xl md:text-3xl cursor-pointer"
          />
          <span>Enter OTP</span>
        </span>
      }
      titleDes={
        <span>
          We have sent OTPs to <strong>johndoa@ssaflogistics.com </strong> and{" "}
          <br />
          to +1 9XX-X3X-XX42
        </span>
      }
      btnType="submit"
      btnText="Submit"
    >
      <div className="w-full">
        <p className="mb-2">Enter Email OTP</p>
        <OptBox />
      </div>
      <div className="mt-5 w-full">
        <p className="mb-2">Enter Phone OTP</p>
        <OptBox />
      </div>
    </LoginSignupBox>
  );
};

const OptBox = () => {
  const [state, setState] = useState({ otp: "" });
  const handleChange = (otp) => setState({ otp });

  return (
    <OtpInput
      value={state.otp}
      onChange={handleChange}
      numInputs={6}
      containerStyle="w-full flex flex-nowrap  gap-3"
      inputStyle="outline-none border !w-[45px] sm:!w-[78.33px] lg:!w-[65.33px] xl:!w-[78.33px] !h-[55px] !h-[60px] rounded-md  text-2xl font-medium"
    />
  );
};

const ForgetPassForm = ({ formSubmit, register }) => {
  const navigate = useNavigate();
  const inputFeilds = [
    {
      id: 1,
      name: "email",
      text: "Email Address",
      type: "email",
      placeholder: "Enter Email Address",
    },
  ];

  return (
    <LoginSignupBox
      formSubmit={formSubmit}
      title={
        <span className="flex items-center gap-3">
          <HiArrowLeft
            onClick={() => navigate(-1)}
            className="text-4xl md:text-3xl cursor-pointer"
          />
          <span>Forget Password</span>
        </span>
      }
      titleDes="Please enter your company email, we will send an OTP to both
      email and your cell phone."
      btnText="Submit"
    >
      {inputFeilds.map((item) => (
        <div key={item.id} className="mt-5">
          <InputWithText
            demo="@ssaflogistics.com"
            register={register}
            item={item}
          />
        </div>
      ))}
    </LoginSignupBox>
  );
};

const Timer = ({
  initialMinute = 0,
  initialSeconds = 0,
  funcCall = () => {},
}) => {
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          funcCall();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <span>
      {minutes === 0 && seconds === 0 ? null : (
        <span>
          {" "}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
      )}
    </span>
  );
};
