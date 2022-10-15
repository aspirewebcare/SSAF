import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logout_png from "../../assets/images/log_out.svg";
import profile from "../../assets/images/profile.png";
import icons from "../shared/icons";
import Modal from "../shared/Modal/Modal";
import CustomButton from "./Buttons/CustomButton";
import MyDropdown from "./Dropdown/Dropdown";

const ProfileOnHeader = ({ setOpenSideBarMobile, textCss }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const items = [
    {
      id: 1,
      name: <span>Profile</span>,
      icon: <CgProfile className="text-xl" />,
      handleChange: () => {
        navigate("/profile");
        setOpenSideBarMobile(false);
      },
    },
    {
      id: 2,
      name: <span>Log out</span>,
      icon: <MdOutlineLogout className="text-xl" />,
      handleChange: () => {
        setIsModalOpen(true);
        setOpenSideBarMobile(false);
      },
    },
  ];

  return (
    <div className="flex gap-4 items-center">
      <MyDropdown
        btnText={
          <div className=" flex items-center gap-3">
            <div className="w-12">
              <img className="w-full" src={profile} alt="profile" />
            </div>
            <p
              className={`${textCss} flex items-center whitespace-nowrap font-semibold leading-tight`}
            >
              <span className="text-xl lg:text-base">John Parker</span>
              <icons.arrowDown className="text-2xl" />
            </p>
          </div>
        }
        items={items}
      />

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="mt-2 flex flex-col items-center justify-center">
          <img src={logout_png} alt="log_out_icon" />
          <h1 className="text-2xl font-bold text-center mt-5 mb-3">Logout</h1>
          <p className="text-sm text-gray-500 text-center">
            Are you sure you want to logout from <br />
            <span className="pt-1 block">the portal?</span>
          </p>
        </div>

        <div className="mt-8 flex justify-between gap-5">
          <CustomButton
            hadleClick={() => setIsModalOpen(false)}
            block={false}
            btnClass="h-[45px]"
            text="Cancel"
          />
          <CustomButton
            hadleClick={() => {
              setIsModalOpen(false);
              navigate("/");
            }}
            btnClass="h-[45px]"
            text="Logout"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProfileOnHeader;

export const Bell = ({ setRightSidebarOpen, isNotifiy = false }) => {
  return (
    <div
      onClick={() => setRightSidebarOpen(true)}
      className="relative w-6 cursor-pointer"
    >
      <img src={icons.notification} alt="notification" />
      {isNotifiy && (
        <span className="w-[10px] h-[10px] absolute top-0 right-0  bg-orange-500 rounded-full"></span>
      )}
    </div>
  );
};
