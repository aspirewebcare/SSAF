import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillInfoCircle } from "react-icons/ai";
import { HiArrowLeft } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import logout_png from "../../../assets/images/log_out.svg";
import LoginBg from "../../../assets/images/resetBg.png";
import CustomButton from "../../../components/shared/Buttons/CustomButton";
import icons from "../../../components/shared/icons";
import { InputWithText } from "../../../components/shared/InputWithText/InputWithText";
import LoginSignupBox from "../../../components/shared/LoginSignupBox/LoginSignupBox";
import Modal from "../../../components/shared/Modal/Modal";
import ApiRequest from "../../../hooks/ApiRequest";
import { checkAuthorized } from "../../../hooks/commonFunc";

const ResetPassword = () => {
  const { handleSubmit, register, watch } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isPassMatch, setIsPassMatch] = useState(true);
  const [passStrength, setPassStrength] = useState({
    twelveCharacter: false,
    upparcase_lowercase: false,
    letter_number: false,
    special_character: false,
  });
  const location = useLocation();
  const [loading, setLoading] = useState(false)
  const [loginErr, setLoginErr] = useState({ status: false, msg: '' })

  const formSubmit = (data) => {
    const { password, con_pass } = data;

    let isPasswrodAllCurrent =
      passStrength.twelveCharacter &&
        passStrength.upparcase_lowercase &&
        passStrength.letter_number &&
        passStrength.special_character
        ? true
        : false;

    if (isPasswrodAllCurrent) {
      if (password === con_pass) {
        setIsPassMatch(true);
        resetPass({ password: password })
      } else {
        setIsPassMatch(false);
      }
    }
  };

  useEffect(() => {
    checkpassword(watch("password"));
    // eslint-disable-next-line
  }, [watch("password")]);

  function checkpassword(password) {
    if (password.match(/[a-z]+/) && password.match(/[A-Z]+/)) {
      setPassStrength((prev) => {
        return { ...prev, upparcase_lowercase: true };
      });
    } else {
      setPassStrength((prev) => {
        return { ...prev, upparcase_lowercase: false };
      });
    }
    if (
      (password.match(/[0-9]+/) && password.match(/[a-z]+/)) ||
      password.match(/[A-Z]+/)
    ) {
      setPassStrength((prev) => {
        return { ...prev, letter_number: true };
      });
    } else {
      setPassStrength((prev) => {
        return { ...prev, letter_number: false };
      });
    }
    if (password.match(/[!@#$&*_+%-=]+/)) {
      setPassStrength((prev) => {
        return { ...prev, special_character: true };
      });
    } else {
      setPassStrength((prev) => {
        return { ...prev, special_character: false };
      });
    }
    if (password.length > 11) {
      setPassStrength((prev) => {
        return { ...prev, twelveCharacter: true };
      });
    } else {
      setPassStrength((prev) => {
        return { ...prev, twelveCharacter: false };
      });
    }
  }

  useEffect(() => {

    if (location.state !== null) {
      navigate('/login')
    } else {
      location.state = null
    }
  }, [])



  const resetPass = (data) => {
    ApiRequest('POST', '/v1/staff/password', '', data, true)
      .then((res) => {
        if (res) {
       
          if (res.hasOwnProperty('errors')) {
    
            setLoginErr({ status: true, msg: res.errors[0].message })
          }
          else {
            if (res.hasOwnProperty('detail')) {
              setLoginErr({ status: true, msg: res?.detail[0]?.msg })
            } else {
              setIsModalOpen(true);
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
    <section className="flex  flex-col lg:flex-row items-center justify-center bg-white min-h-screen 2xl:gap-x-20">
      <form
        className="xl:h-[666px] w-full lg:w-1/2 "
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className="self-start flex lg:block w-full ml-auto login_form " id='reset_form'>
          <ResetForm
            watch={watch}
            isPassMatch={isPassMatch}
            passStrength={passStrength}
            register={register}
          />
        </div>
      </form>
      <div className="pb-10 lg:pb-0 w-full lg:w-1/2  mt-10 lg:mt-0">
        <div className="w-[95%] mx-auto lg:mx-px login_image">
          <div className="w-full lg:w-[500px] 2xl:w-[560px] login_image">
            <img className="w-full" src={LoginBg} alt="login_bg" />
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="mt-4  flex flex-col items-center justify-center">
          <img src={logout_png} alt="log_out_icon" />
          <h1 className="text-2xl font-bold text-center mt-5 mb-3">
            Password Changed
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Your password has been changed
            <br />
            <span className="pt-1 block">successfully.</span>
          </p>
        </div>

        <div className="mt-8 px-7 flex justify-between gap-5">
          <CustomButton
            hadleClick={() => {
              setIsModalOpen(false);
              navigate("/");
            }}
            btnClass="font-semibold h-[45px]"
            text="Back to login"
          />
        </div>
      </Modal>
    </section>
  );
};

export default ResetPassword;

const ResetForm = ({ watch, isPassMatch, passStrength, register }) => {
  const navigate = useNavigate();
  const newPass = {
    id: 1,
    name: "password",
    text: "New Password",
    type: "password",
    placeholder: "New Password",
  };
  const confirmPass = {
    id: 2,
    name: "con_pass",
    text: "Confirm Password",
    type: "password",
    placeholder: "Confirm Password",
  };

  return (
    <LoginSignupBox
      title={
        <span className="flex items-center gap-3">
          <HiArrowLeft
            onClick={() => navigate(-1)}
            className="text-4xl md:text-3xl cursor-pointer"
          />
          <span>Reset Password</span>
        </span>
      }


      titleDes="Enter your new password"
      btnText="Submit"
      isExpireTime="00:50"
    >
      <div className="my-5">
        <InputWithText register={register} item={newPass} />
      </div>
      <div>
        <p className="flex  justify-between items-center mb-3">
          <span> Password must:</span>
          {watch("password")?.length > 5 && (
            <>
              {passStrength.twelveCharacter &&
                passStrength.upparcase_lowercase &&
                passStrength.letter_number &&
                passStrength.special_character ? (
                <span className="text-green-500 font-medium flex items-center  gap-1 duration-300">
                  Parfect!
                </span>
              ) : (
                <span className="text-[#FE0000] font-medium flex items-center  gap-1 duration-300">
                  Weak! <AiFillInfoCircle className="text-[#FE0000]" />
                </span>
              )}
            </>
          )}
        </p>
        <div>
          <div className="flex  gap-2 text-sm mb-2 font-light">
            {passStrength.twelveCharacter ? (
              <img src={icons.right} alt="right_icon" />
            ) : (
              <img src={icons.wrong} alt="wrong_icon" />
            )}
            <span>At least 12 characters</span>
          </div>{" "}
          <div className="flex  gap-2 text-sm mb-2 font-light">
            {passStrength.upparcase_lowercase ? (
              <img src={icons.right} alt="right_icon" />
            ) : (
              <img src={icons.wrong} alt="wrong_icon" />
            )}
            <span>A mixture of both uppercase and lowercase letters</span>
          </div>{" "}
          <div className="flex  gap-2 text-sm mb-2 font-light">
            {passStrength.letter_number ? (
              <img src={icons.right} alt="right_icon" />
            ) : (
              <img src={icons.wrong} alt="wrong_icon" />
            )}
            <span>A mixture of letters and numbers </span>
          </div>{" "}
          <div className="flex  gap-2 text-sm mb-2 font-light">
            {passStrength.special_character ? (
              <img src={icons.right} alt="right_icon" />
            ) : (
              <img src={icons.wrong} alt="wrong_icon" />
            )}
            <span>
              Inclusion of at least one special character like "!@#$&*_+%-="
            </span>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <InputWithText register={register} item={confirmPass} />
        <p
          className={`text-red-600 font-medium text-sm my-1 text-right duration-150 ${!isPassMatch ? "" : "hidden"
            }`}
        >
          Password doesn???t match!
        </p>
      </div>
    </LoginSignupBox>
  );
};
