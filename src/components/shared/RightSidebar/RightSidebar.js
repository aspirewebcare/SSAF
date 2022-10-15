import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../Buttons/CustomButton";
import icons from "../icons";

const RightSidebar = ({
  isBtn = true,
  childClass = "",
  children,
  title,
  rightSidebarOpen,
  setRightSidebarOpen,
  applyBtn = "",
  cancelBtn = "",
  btnHandleClick,
  cancelClick = () => {
    setRightSidebarOpen(false);
  },
  handleSubmit = () => { },
  simpleRed=false,
}) => {
  const [forChromeMobile, setForChromeMobile] = useState(false);

  const ref = useRef(null);
  useEffect(() => {
    if (rightSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    const handleClickOutside = (event) => {
      if (
        rightSidebarOpen &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setRightSidebarOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
    // eslint-disable-next-line
  }, [ref, rightSidebarOpen]);

  const handleClick = () => {
    if (cancelClick === undefined) {
      setRightSidebarOpen(false);
    } else {
      cancelClick();
    }
  };

  useEffect(() => {
    var ua = navigator.userAgent;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        ua
      )
    ) {
      if (
        /Chrome/.test(navigator.userAgent) &&
        /Google Inc/.test(navigator.vendor)
      ) {
        setForChromeMobile(true);
      }
    }
  }, []);
  return (
    <form onSubmit={handleSubmit(btnHandleClick)}>
      <div
        className={`fixed w-full h-screen  left-0 top-0 bg-gray-900/50 !z-[220] ${rightSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } duration-500`}
      ></div>
      <div
        ref={ref}
        className={`fixed top-20 lg:top-0 right-0 w-full  lg:w-[500px] pb-7 pt-4 md:pt-7 bg-white text-black shadow-md h-screen !z-[220] duration-300 rounded-2xl lg:rounded-none ${rightSidebarOpen
            ? "lg:translate-x-0 translate-y-0"
            : "lg:translate-x-[200%] translate-y-full lg:translate-y-0"
          }`}
      >
        <div className="flex justify-between items-center px-7">
          <p className="md:text-2xl text-lg font-bold">{title}</p>
          <div
            className="cursor-pointer"
            onClick={() => setRightSidebarOpen(false)}
          >
            <icons.grClose className="text-3xl" />
          </div>
        </div>
        <div
          className={`w-full h-[62vh] overflow-y-auto overflow-x-hidden lg:h-[76vh] my-5 pl-7  pr-5 ${childClass}`}
        >
          {children}
        </div>
            <div
              className={`bg-white pt-3  absolute  w-full left-0   lg:bottom-5 px-10  flex gap-3 ${forChromeMobile ? "bottom-36" : "bottom-24"
                }`}
            >
              <CustomButton
                type="button"
                btnClass="h-[56px]"
                hadleClick={handleClick}
                block={false}
                text={cancelBtn}
              />
              <CustomButton simpleRed={simpleRed} type="submit" btnClass="h-[56px]" text={applyBtn} />
            </div>
      </div>
    </form>
  );
};

export default RightSidebar;
