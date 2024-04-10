import { useLocation, useNavigate } from "react-router-dom";
import routes from "../../utils/routes";
import { NavContext } from "../../context/nav/NavContext";
import React from "react";
import { cn, userInitials } from "../../utils/helpers";
import { AiOutlineMenu } from "react-icons/ai";
import { CiBellOn } from "react-icons/ci";
import { Popover, PopoverContent, PopoverTrigger } from "../PopOver/PopOver";
import ArrowDownIcon from "../../utils/Icons/ArrowDownIcon";
import Avatar from "../Avatar/Avatar";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentRoute = routes.find((route) => route.path === location.pathname);
  const title = currentRoute ? currentRoute.title : "";

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
    <div className="w-full bg-white flex items-center h-[7.2rem] border-b border-b-[#eceef2] shadow-sm py-0 px-48 max-[900px]:px-10 mb-3 shadow-[0px 1px 5px rgba(0, 0, 0, 0.03)]">
      {!navState?.showNav && (
        <div className="flex items-center gap-x-12 mr-auto ">
          <span
            className={`text-primary font-medium text-sm origin-left duration-300  `}
          >
            CC FUSION
          </span>
          <div
            onClick={navState?.handleShowNav}
            className={`text-3xl top-6  cursor-pointer transition duration-500 ml-10 ${
              navState?.showNav && "rotate-180"
            }`}
          >
            <AiOutlineMenu size={20} />
          </div>
        </div>
      )}
      <h1
        className={cn("mr-auto text-base font-medium", {
          hidden: !navState?.showNav || isSmallerScreen,
        })}
      >
        {title}
      </h1>
      <div className="flex items-center gap-x-10 ">
        <div className="cursor-pointer max-[900px]:ml-[80px] ">
          <CiBellOn size={24} />
        </div>
        <div className="h-20 w-[1.5px] bg-[#E7E7E7]  md:block  max-[900px]:hidden" />
        <div className="max-[900px]:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-[0.8rem]">
                <Avatar label={userInitials("Alegbe", "Yemisi")} />
                <span className="flex items-center cursor-pointer gap-[1.6rem]">
                  <span className="text-sm font-medium capitalize">Yemisi</span>
                  <ArrowDownIcon />
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[29.4rem] h-[14rem]" align="end">
              <div>
                <div className="flex items-center gap-[0.8rem] p-16 border-b border-b-[#eceef2]">
                  <Avatar label={userInitials("Alegbe", "Yemisi")} />
                  <div className="flex flex-col ">
                    <span className="text-sm leading-none font-medium capitalize">
                      Alegbe Yemisi
                    </span>
                    <span className="capitalize text-smm text-gray leading-[20px]">
                      Biller
                    </span>
                  </div>
                </div>
                <div
                  onClick={handleLogout}
                  className="text-sm font-normal my-8 mx-16 justify-start text-primary"
                >
                  Logout
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
