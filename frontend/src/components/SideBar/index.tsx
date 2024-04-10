import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { CiMoneyCheck1, CiSettings } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";
import { PiBusLight } from "react-icons/pi";
import { MdOutlineContactSupport } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { NavContext } from "../../context/nav/NavContext";
import { cn, userInitials } from "../../utils/helpers";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Modal from "../Modal/Modal";
import Prompt from "../Prompt/Prompt";
import AttentionIcon from "../../utils/Icons/AttentionIcon";
import Avatar from "../Avatar/Avatar";

export default function SideBar() {
  const navigate = useNavigate();
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Menus = [
    { title: "Dashboard", icon: <GoHome />, link: "/" },
    { title: "Clients ", icon: <IoPeopleOutline />, link: "/clients" },
    {
      title: "Products",
      icon: <MdProductionQuantityLimits />,
      link: "/products",
    },
    { title: "Orders", icon: <PiBusLight />, link: "/orders" },
    { title: "Billing", icon: <CiMoneyCheck1 />, link: "/billing" },

    {
      title: "Settings",
      icon: <CiSettings />,
      submenu: true,
      submenuItems: [
        { title: "Account Settings", link: "/account-settings" },
        {
          title: "Notifications",
          link: "/notifications",
        },
      ],
    },
    {
      title: "Contact support",
      icon: <MdOutlineContactSupport />,
      link: "/support",
    },
  ];

  const navState = React.useContext(NavContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  let isSmallerScreen = false;

  if (window) {
    isSmallerScreen =
      window && window.matchMedia("(max-width: 1000px)").matches;
  }

  return (
    <>
      {isModalOpen && (
        <Modal
          header="Logout"
          onOkClick={handleLogout}
          onCloseButton={() => setIsModalOpen(false)}
          onCancelClick={() => setIsModalOpen(false)}
          showFooter
          okText="Logout"
          cancelText="Cancel"
        >
          <Prompt
            description={<div>Are you sure you want to logout?</div>}
            title="Attention"
            icon={
              <div>
                <AttentionIcon />
              </div>
            }
          />
        </Modal>
      )}
      {navState?.showNav && (
        <div
          className="block md:hidden fixed w-full h-full bg-[#000000b3] z-[10] overflow-hidden"
          onClick={navState?.handleShowNav}
          role="button"
          tabIndex={0}
          onKeyPress={navState?.handleShowNav}
          aria-label="close sidebar"
        />
      )}
      <aside
        className={cn(
          "bg-white border-r border-r-[#eceef2] h-full fixed left-0 top-0 w-[27rem] z-[10] flex flex-col",
          {
            hidden: !navState?.showNav,
          }
        )}
      >
        <div className="pl-24 flex justify-between items-center h-[7.2rem] border-b border-b-[#eceef2]">
          <span
            className={`text-primary font-medium text-base origin-left duration-300  `}
          >
            CC FUSION
          </span>
          <div
            onClick={navState?.handleShowNav}
            className={`text-3xl rounded-full top-6 border border-[#E7E7E7] h-[3rem] w-[3rem] p-4 cursor-pointer transition duration-500`}
          >
            <AiOutlineArrowLeft size={20} />
          </div>
        </div>

        <div className="flex-2 overflow-auto pb-40 mt-20">
          <ul className={cn("pt-2 pl-20 max-[900px]:pl-10 pr-20")}>
            {Menus.map((menu, index) => (
              <>
                <NavLink
                  to={menu.link as string}
                  key={index}
                  onClick={() => {
                    if (menu.submenuItems) {
                      setOpenSubMenu(!openSubMenu);
                    }
                    if (!menu.submenuItems && isSmallerScreen) {
                      navState?.handleShowNav();
                    }
                  }}
                  className="text-[#748AA9] mb-[2.4rem] font-medium text-sm gap-x-4 flex items-center cursor-pointer h-[3.5rem] px-8 transition duration-200 hover:bg-primary hover:text-white rounded-md"
                >
                  <span className="text-2xl block float-left">{menu.icon}</span>
                  <span
                    className={`flex-1 duration-200 ${
                      !navState?.showNav && "hidden"
                    }`}
                  >
                    {menu.title}
                  </span>
                  {menu.submenu && navState?.showNav && (
                    <IoChevronDown
                      className={`${openSubMenu && "rotate-180"}`}
                    />
                  )}
                </NavLink>
                {menu.submenu && openSubMenu && navState?.showNav && (
                  <div className="flex flex-col">
                    {menu.submenuItems.map((item) => (
                      <NavLink
                        to={item.link}
                        onClick={() =>
                          isSmallerScreen && navState?.handleShowNav()
                        }
                        className="text-[#748AA9] text-sm leading-none gap-x-4 flex-items-center cursor-pointer p-8 px-5  hover:bg-primary hover:text-white rounded-md -mt-[5px] mb-7"
                      >
                        {item.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ))}
          </ul>
        </div>
        <div className="min-[900px]:hidden border-t border-t-[#E7E7E7] flex pt-[15px] gap-x-[8px] items-center">
          <div>
            <div className="flex items-center gap-[0.8rem] p-8">
              <Avatar label={userInitials("Alegbe", "Yemisi")} />
              <div className="flex flex-col ">
                <span className="text-xs leading-none font-medium capitalize">
                  Alegbe Yemisi
                </span>
                <span className="capitalize text-[12px] text-gray leading-[20px]">
                  Biller
                </span>
              </div>
            </div>
            <div
              onClick={handleLogout}
              className="text-smm font-normal mx-8 justify-start text-primary"
            >
              Logout
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
