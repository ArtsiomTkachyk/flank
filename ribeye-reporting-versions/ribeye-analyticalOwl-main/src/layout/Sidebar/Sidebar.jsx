import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/analyticowl-nav-logo.png";
import reporting from "../../assets/icons/reporting.svg";
import campaign from "../../assets/icons/campaign.svg";
import Analytics from "../../assets/icons/Analytics.svg";
import Pacing from "../../assets/icons/Pacing.svg";
import strategy from "../../assets/icons/strategy.svg";
import storm from "../../assets/icons/storm.svg";
import contact_support from "../../assets/icons/contact_support.svg";
import avatarOutline from "../../assets/icons/avatarOutline.svg";
import settings from "../../assets/icons/settings.svg";

const Sidebar = ({ showMenu, setShowMenu }) => {
  return (
    <>
      {/* Sidebar container */}
      <div
        className={`py-4 sidebar flex flex-col justify-between z-30 shadow fixed lg:sticky left-0 top-[0] w-[300px] bg-[#0AB9E5] h-[100vh] mt-[1px] px-4
          ${showMenu ? "show_menu" : "hide_menu"}
          `}
      >
        <div className="flex flex-col w-full">
          <div className="w-full">
            <img className="mx-auto" src={logo} alt="" />
          </div>
          <div className="sidebar_scroll flex flex-col gap-y-3 mt-12 max-h-[70vh] overflow-auto">
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/reporting"
              className={({ isActive }) =>
                `flex items-center px-5 py-3 rounded-[8000px] ${isActive ? "active_link" : "inactive"
                }`
              }
            >
              <img className="mr-4" src={reporting} alt="reporting" />
              <h5 className="text-sm font-semibold text-[#000] opacity-[0.75]">
                Reporting
              </h5>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="campaigns"
              className={({ isActive }) =>
                `flex items-center px-5 py-3 rounded-[8000px] ${isActive ? "active_link" : "inactive"
                }`
              }
            >
              <img className="mr-4" src={campaign} alt="campaign" />
              <h5 className="text-sm font-semibold text-[#000] opacity-[0.75]">
                Campaigns
              </h5>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/analytics"
              className={({ isActive }) =>
                `flex items-center px-5 py-3 rounded-[8000px] ${isActive ? "active_link" : "inactive"
                }`
              }
            >
              <img className="mr-4" src={Analytics} alt="Analytics" />
              <h5 className="text-sm font-semibold text-[#000] opacity-[0.75]">
                Analytics
              </h5>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/pacing"
              className={({ isActive }) =>
                `flex items-center px-5 py-3 rounded-[8000px] ${isActive ? "active_link" : "inactive"
                }`
              }
            >
              <img className="mr-4" src={Pacing} alt="Pacing" />
              <h5 className="text-sm font-semibold text-[#000] opacity-[0.75]">
                Pacing
              </h5>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/tactics"
              className={({ isActive }) =>
                `flex items-center px-5 py-3 rounded-[8000px] ${isActive ? "active_link" : "inactive"
                }`
              }
            >
              <img className="mr-4" src={strategy} alt="strategy" />
              <h5 className="text-sm font-semibold text-[#000] opacity-[0.75]">
                Tactics
              </h5>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/forecasting"
              className={({ isActive }) =>
                `flex items-center px-5 py-3 rounded-[8000px] ${isActive ? "active_link" : "inactive"
                }`
              }
            >
              <img className="mr-4" src={storm} alt="storm" />
              <h5 className="text-sm font-semibold text-[#000] opacity-[0.75]">
                Forecasting
              </h5>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/support"
              className={({ isActive }) =>
                `flex items-center px-5 py-3 rounded-[8000px] ${isActive ? "active_link" : "inactive"
                }`
              }
            >
              <img
                className="mr-4"
                src={contact_support}
                alt="contact_support"
              />
              <h5 className="text-sm font-semibold text-[#000] opacity-[0.75]">
                Support
              </h5>
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/settings"
              className={({ isActive }) =>
                `flex items-center px-5 py-3 rounded-[8000px] ${isActive ? "active_link" : "inactive"
                }`
              }
            >
              <img className="mr-4" src={settings} alt="settings" />
              <h5 className="text-sm font-semibold text-[#000] opacity-[0.75]">
                Settings
              </h5>
            </NavLink>
          </div>
        </div>
        {/* <div className=" w-max gap-x-4 flex items-center px-3 py-5 shadow-shadow500 bg-[#232627] rounded-[12px]">
          <img src={avatarOutline} alt="avatar" />
          <div className="flex gap-y-2 flex-col">
            <h2 className="text-sm font-semibold text-white">
              Creatify Designs
            </h2>
            <p className="text-[#000] text-xs font-medium">
              creatify.uidesigns@gmail.com
            </p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Sidebar;
