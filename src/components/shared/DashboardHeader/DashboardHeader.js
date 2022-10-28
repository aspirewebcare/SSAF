import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../../../assets/images/logo.png';
import icons from "../icons";
import ProfileOnHeader from "../ProfileOnHeader";

const DashboardHeader = () => {
  const [openSideBarMobile, setOpenSideBarMobile] = useState(false);
  const navigate = useNavigate();

  let sidebarCssOnMobile = openSideBarMobile
    ? "-translate-x-0"
    : "-translate-x-[110%] lg:-translate-x-0";

  return (
    <section className="">
      <div className="fixed flex  z-10 left-0 top-0 w-full h-[80px] bg-white border-b shadow px-5">
        <div className="flex justify-between items-center container mx-auto px-0 lg:px-10 relative z-20">
          <div onClick={() => navigate('/')} className="w-[66.56px] h-[45px] cursor-pointer">
            <img src={logo} alt="logo" className="w-full h-full" />
          </div>
          <div className='relative z-30'>
            <Navbars
              sidebarCssOnMobile={sidebarCssOnMobile}
              setOpenSideBarMobile={setOpenSideBarMobile}
            />
            <div
              onClick={() => setOpenSideBarMobile((prev) => !prev)}
              className={`lg:hidden flex items-center gap-4 px-3 h-full rounded-md cursor-pointer font-medium w-fit `}
            >
              <img src={icons.threeBar} alt="three_bar" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHeader;

const Navbars = ({ sidebarCssOnMobile, setOpenSideBarMobile }) => {
  let location = useLocation();
  const navigate = useNavigate();

  const navbars = [
    {
      id: 1,
      name: "Dashboard",
      path: "/",
    },
    {
      id: 2,
      name: "Customers",
      path: "/customers",
    },
    {
      id: 3,
      name: "Record Items",
      path: "/record-items",
    },
    {
      id: 4,
      name: "Shipping",
      path: "/shipping",
    },
    {
      id: 5,
      name: "Invoices",
      path: "/invoices",
    },
  ];

  let activePageUrl = location?.pathname;
  const changeRoute = (path) => {
    navigate(path);
    setOpenSideBarMobile(false);
  };
  return (
    <ul
      className={`fixed lg:static top-0 w-full left-0 h-screen flex flex-col lg:flex-row lg:h-full bg-black lg:bg-transparent text-white lg:text-black duration-300  items-center justify-center ${sidebarCssOnMobile}`}
    >
      {navbars.map((item) => (
        <li
          key={item.id}
          onClick={() => changeRoute(item.path)}
          className={`flex items-center gap-4 px-3 py-7 cursor-pointer text-2xl lg:text-base ${activePageUrl.toLowerCase() ===  item.path.toLowerCase()
              ?  " lg:border-b-[3px] text-[#FE0000] font-medium border-red-400"
              :  "hover:bg-blue-900/10"
            }`}
        >
          <span>{item.name}</span>
        </li>
      ))}
      <li className="flex items-center gap-4 px-3 py-4 cursor-pointer">
        <ProfileOnHeader setOpenSideBarMobile={setOpenSideBarMobile} />
      </li>
      <icons.grClose onClick={() => setOpenSideBarMobile(false)} className=" lg:hidden  absolute top-10 right-10 text-3xl" />
    </ul>
  );
};
