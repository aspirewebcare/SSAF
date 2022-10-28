import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";
import fogetBg from "../../../assets/images/forget_ps.png";
import { InputWithText } from "../../../components/shared/InputWithText/InputWithText";
import LoginSignupBox from "../../../components/shared/LoginSignupBox/LoginSignupBox";
import ApiRequest from "../../../hooks/ApiRequest";
import { checkAuthorized } from "../../../hooks/commonFunc";

const ForgetPassword = () => {
  const [tokenForm, setTokenForm] = useState(false);
  const [loading, setLoading] = useState(false)
  const [loginErr, setLoginErr] = useState({ status: false, msg: '' })
  const [codeExpire, setCodeExpire] = useState(0)
  const [sentMail, setSentMail] = useState('');


  return (
    <section className="flex  flex-col lg:flex-row items-center justify-center bg-white min-h-screen 2xl:gap-x-20">
      <div className="xl:h-[666px] w-full lg:w-1/2 ">

        {tokenForm ? (
          <TokenForm sentMail={sentMail} codeExpire={codeExpire} setLoading={setLoading} loading={loading} loginErr={loginErr} setLoginErr={setLoginErr} setTokenForm={setTokenForm} />
        ) : (
          <ForgetPassForm setSentMail={setSentMail} setCodeExpire={setCodeExpire} setLoading={setLoading} loading={loading} loginErr={loginErr} setLoginErr={setLoginErr} setTokenForm={setTokenForm} />
        )}

      </div>

      <div className="pb-10 lg:pb-0 w-full lg:w-1/2  mt-10 lg:mt-0">
        <div className="w-[95%] mx-auto lg:mx-px login_image">
          <div className="w-full lg:w-[500px] 2xl:w-[560px] login_image">
            <img className="w-full" src={fogetBg} alt="login_bg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;




const ForgetPassForm = ({ setSentMail, setCodeExpire, setTokenForm, loading, setLoading, setLoginErr, loginErr }) => {
  const { handleSubmit, register } = useForm();


  const formSubmit = (data) => {
    if (data.email) {
      setLoading(true)
      ApiRequest('POST', '/v1/staff/password/reset', '', data, true)
        .then((res) => {
          if (res) {
            if (res.hasOwnProperty('errors')) {
              setLoginErr({ status: true, msg: res.errors[0].message })
            }
            else {
       
              if (res.hasOwnProperty('detail')) {
                setLoginErr({ status: true, msg: res?.detail[0]?.msg })
              } else {
                setLoginErr({ status: false, msg: '' })
                setSentMail(data?.email)
                setTokenForm(true);
                toast.success(res.message, { duration: 3000 })
                setCodeExpire(res.validity_seconds / 60)
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
    }
  };


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
    <form
      className="w-full"
      onSubmit={handleSubmit(formSubmit)}
    >
      <div className={`self-start block w-full ml-auto forget_form `}>
        <LoginSignupBox
          title={
            <span className="flex items-center gap-3">
              <HiArrowLeft
                onClick={() => { setLoginErr({ status: false, msg: '' }); navigate(-1) }}
                className="text-4xl md:text-3xl cursor-pointer"
              />
              <span>Forget Password</span>
            </span>
          }
          titleDes="Please enter your company email, we will send an OTP to both
      email and your cell phone."
          btnText="Submit"
          loginErr={loginErr}
          loading={loading}
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
      </div>
    </form>
  );
};
















const TokenForm = ({ sentMail = '', codeExpire, setTokenForm, loading, setLoading, setLoginErr, loginErr }) => {
  const { handleSubmit, register } = useForm();
  const [codeSend, setCodeSend] = useState(false);
  const [data, setData] = useState({ email_token: '', phone_token: '' })
  const navigate = useNavigate();

  const tokenSubmit = () => {
    const { email_token, phone_token } = data;
    if (email_token && phone_token) {
      if (loginErr.status === true) setLoginErr({ status: false, msg: '' })
      verrifyOTP(data)
    } else {
      setLoginErr({ status: true, msg: 'Fill  the OTP first' })
    }

  };



  const verrifyOTP = (data) => {
              navigate("/reset-password", { state: 'coming_from_token_page' });

    setLoading(true)

    let dataForResetValidate = { ...data, email: sentMail };

    ApiRequest('POST', '/v1/staff/password/reset/validate', '', dataForResetValidate, true)
      .then((res) => {
        if (res) {

          if (res.hasOwnProperty('errors')) {
            setLoginErr({ status: true, msg: res.errors[0].message })
          }
          else {
            if (res.hasOwnProperty('detail')) {
              setLoginErr({ status: true, msg: res?.detail[0]?.msg })
            } else {
              navigate("/reset-password", { state: 'coming_from_token_page' });
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

  }
  return (
    <form
      className="w-full"
      onSubmit={handleSubmit(tokenSubmit)}
    >
      <div className={`self-start block w-full ml-auto token_form `}>
        <LoginSignupBox
          title={
            <span className="flex items-center gap-2">
              <HiArrowLeft
                onClick={() => { setTokenForm(false); setLoginErr({ status: false, msg: '' }) }}
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
          loading={loading}
          loginErr={loginErr}
        >
          <div className="w-full">
            <p className="mb-2">Enter Email OTP</p>
            <OptBox setData={setData} name='email_token' register={register} />
          </div>
          <div className="mt-5 w-full">
            <p className="mb-2">Enter Phone OTP</p>
            <OptBox setData={setData} name='phone_token' register={register} />
          </div>
        </LoginSignupBox>
      </div>

      <div className="text-center mt-8 mb-6">
        <p className="flex justify-center gap-1">
          Your code will expire in
          {
            codeExpire &&
            <Timer initialMinute={codeExpire} initialSeconds={0} />
          }
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
            <span onClick={() => setCodeSend(false)} className="text-[#FE0000]"> Resend code</span>
          )}
        </p>
      </div>

    </form>
  );
};

const OptBox = ({ setData, name = '' }) => {
  const [state, setState] = useState({ otp: "" });
  const handleChange = (otp) => {
    setData(prev => { return { ...prev, [name]: otp } })
    setState({ otp })
  };


  return (
    <OtpInput
      value={state.otp}
      onChange={handleChange}
      shouldAutoFocus={true}
      numInputs={6}
      containerStyle="w-full flex flex-nowrap  gap-3"
      inputStyle="outline-none border !w-[45px] sm:!w-[78.33px] lg:!w-[65.33px] xl:!w-[78.33px] !h-[55px] !h-[60px] rounded-md  text-2xl font-medium"
    />
  );
};


const Timer = ({
  initialMinute = 0,
  initialSeconds = 0,
  funcCall = () => { },
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
