import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { cn } from "../../utils/helpers";
import { NavContext } from "../../context/nav/NavContext";
import React from "react";
import Header from "../../components/Header/Header";

export default function AppContainer() {
  const navState = React.useContext(NavContext);

  let isSmallerScreen = false;

  if (window) {
    isSmallerScreen =
      window && window.matchMedia("(max-width: 1000px)").matches;
  }

  return (
    <div className="bg-[#fbfbfb]">
      <div className="flex">
        <SideBar />
        <div
          className={cn("h-[100vh] ml-[27rem] flex-1", {
            "ml-0": !navState?.showNav || isSmallerScreen,
          })}
          id="main"
        >
          <Header />
          <main id="main">
            <div className="pl-48 pr-32 max-[900px]:pl-[10px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
