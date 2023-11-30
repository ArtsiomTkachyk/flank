import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/Loader";
import { getCampaigns } from "../../store/slices/campaignSlice";
import CampaignCard from "./CampaignCard";
import CampaignTopBar from "../../layout/TopBar/CampaignTopBar";

import totalCampaign from "../../assets/icons/totalCampaign.svg";
import track_changes from "../../assets/icons/track_changes.svg";
import ads_click from "../../assets/icons/ads_click.svg";
import local_atm from "../../assets/icons/local_atm.svg";

const Campaigns = () => {
  const dispatch = useDispatch();
  const { campaignsList, loading } = useSelector((state) => state.campaign);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCampaigns, setFilteredCampaigns] = useState(campaignsList);
  const [dropdownState, setDropdownState] = useState(null);

  // Function to handle dropdown toggle
  const handleDropdownToggle = (key) => {
    if (dropdownState === key) {
      setDropdownState(null);
    } else {
      setDropdownState(key);
    }
  };

  useEffect(() => {
    dispatch(getCampaigns());
  }, []);

  useEffect(() => {
    const filtered = campaignsList.filter((campaign) =>
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCampaigns(filtered);
  }, [campaignsList, searchQuery]);

  return (
    <>
      <CampaignTopBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="flex flex-wrap gap-x-3 gap-y-5 mx-2 mt-4 justify-between">
        <div className=" flex w-full sm:w-[47%] md:w-[24%] min-w-[250px] min-h-[100px] justify-center rounded-lg bg-[#E3F5FF] shadow-shadowInset10 flex-col px-4 py-2 border border-solid border-[rgba(112, 128, 144, 0.10)]">
          <h2 className="text-base font-semibold">Total Campaigns</h2>
          <div className="w-full text-[#000] flex justify-between ">
            <span className="text-2xl font-semibold">16</span>
            <img src={totalCampaign} alt="campaign" />
          </div>
        </div>

        <div className="flex w-full sm:w-[47%] md:w-[24%] min-w-[250px] min-h-[100px] justify-center rounded-lg bg-[#E5ECF6] shadow-shadowInset10 flex-col px-4 py-2 border border-solid border-[rgba(112, 128, 144, 0.10)]">
          <h2 className="text-base font-semibold">Impressions</h2>
          <div className="w-full text-[#000] flex justify-between ">
            <span className="text-2xl font-semibold">12</span>
            <img src={track_changes} alt="track changes" />
          </div>
        </div>

        <div className="flex w-full sm:w-[47%] md:w-[24%] min-w-[250px] min-h-[100px] justify-center rounded-lg bg-[#E3F5FF] shadow-shadowInset10 flex-col px-4 py-2 border border-solid border-[rgba(112, 128, 144, 0.10)]">
          <h2 className="text-base font-semibold">Completed Views</h2>
          <div className="w-full text-[#000] flex justify-between ">
            <span className="text-2xl font-semibold">145.43K</span>
            <img src={ads_click} alt="ads" />
          </div>
        </div>

        <div className="flex w-full sm:w-[47%] md:w-[24%] min-w-[250px] min-h-[100px] justify-center rounded-lg bg-[#E5ECF6] shadow-shadowInset10 flex-col px-4 py-2 border border-solid border-[rgba(112, 128, 144, 0.10)]">
          <h2 className="text-base font-semibold">Advertiser CPV</h2>
          <div className="w-full text-[#000] flex justify-between ">
            <span className="text-2xl font-semibold">$0.03</span>
            <img src={local_atm} alt="local atm" />
          </div>
        </div>
      </div>
      {/* CAMPAIGN SECTION */}
      <div className="campaigns_wrapper max-w-[1400px] ml-0 md:ml-2 w-[98%] mt-9">
        <div className="flex mb-4 flex-col md:flex-row justify-between items-center">
          <h2 className="text-3xl text-slate-900 font-[600]">Campaigns</h2>

          <div className="flex flex-col sm:flex-row w-full gap-4 mt-5 md:mt-0 max-w-[510px] justify-between">
            <button className=" h-[40px] sm:mt-0 mt-5 gap-2 flex justify-center items-center px-5 rounded-[1000px] bg-white text-black shadow-shadow600">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <mask
                    id="mask0_47_1586"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                  >
                    <rect width={20} height={20} fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_47_1586)">
                    <path
                      d="M14.5833 17.0833C13.7778 17.0833 13.0903 16.7986 12.5208 16.2291C11.9514 15.6597 11.6667 14.9722 11.6667 14.1666C11.6667 13.3611 11.9514 12.6736 12.5208 12.1041C13.0903 11.5347 13.7778 11.25 14.5833 11.25C15.3889 11.25 16.0764 11.5347 16.6458 12.1041C17.2153 12.6736 17.5 13.3611 17.5 14.1666C17.5 14.9722 17.2153 15.6597 16.6458 16.2291C16.0764 16.7986 15.3889 17.0833 14.5833 17.0833ZM14.5833 15.4166C14.9306 15.4166 15.2257 15.2951 15.4688 15.052C15.7118 14.809 15.8333 14.5138 15.8333 14.1666C15.8333 13.8194 15.7118 13.5243 15.4688 13.2812C15.2257 13.0382 14.9306 12.9166 14.5833 12.9166C14.2361 12.9166 13.941 13.0382 13.6979 13.2812C13.4549 13.5243 13.3333 13.8194 13.3333 14.1666C13.3333 14.5138 13.4549 14.809 13.6979 15.052C13.941 15.2951 14.2361 15.4166 14.5833 15.4166ZM9.16667 15H3.33333C3.09722 15 2.89931 14.9201 2.73958 14.7604C2.57986 14.6007 2.5 14.4027 2.5 14.1666C2.5 13.9305 2.57986 13.7326 2.73958 13.5729C2.89931 13.4132 3.09722 13.3333 3.33333 13.3333H9.16667C9.40278 13.3333 9.60069 13.4132 9.76042 13.5729C9.92014 13.7326 10 13.9305 10 14.1666C10 14.4027 9.92014 14.6007 9.76042 14.7604C9.60069 14.9201 9.40278 15 9.16667 15ZM5.41667 8.74996C4.61111 8.74996 3.92361 8.46524 3.35417 7.89579C2.78472 7.32635 2.5 6.63885 2.5 5.83329C2.5 5.02774 2.78472 4.34024 3.35417 3.77079C3.92361 3.20135 4.61111 2.91663 5.41667 2.91663C6.22222 2.91663 6.90972 3.20135 7.47917 3.77079C8.04861 4.34024 8.33333 5.02774 8.33333 5.83329C8.33333 6.63885 8.04861 7.32635 7.47917 7.89579C6.90972 8.46524 6.22222 8.74996 5.41667 8.74996ZM5.41667 7.08329C5.76389 7.08329 6.05903 6.96177 6.30208 6.71871C6.54514 6.47565 6.66667 6.18052 6.66667 5.83329C6.66667 5.48607 6.54514 5.19093 6.30208 4.94788C6.05903 4.70482 5.76389 4.58329 5.41667 4.58329C5.06944 4.58329 4.77431 4.70482 4.53125 4.94788C4.28819 5.19093 4.16667 5.48607 4.16667 5.83329C4.16667 6.18052 4.28819 6.47565 4.53125 6.71871C4.77431 6.96177 5.06944 7.08329 5.41667 7.08329ZM16.6667 6.66663H10.8333C10.5972 6.66663 10.3993 6.58677 10.2396 6.42704C10.0799 6.26732 10 6.0694 10 5.83329C10 5.59718 10.0799 5.39927 10.2396 5.23954C10.3993 5.07982 10.5972 4.99996 10.8333 4.99996H16.6667C16.9028 4.99996 17.1007 5.07982 17.2604 5.23954C17.4201 5.39927 17.5 5.59718 17.5 5.83329C17.5 6.0694 17.4201 6.26732 17.2604 6.42704C17.1007 6.58677 16.9028 6.66663 16.6667 6.66663Z"
                      fill="black"
                    />
                  </g>
                </svg>
                <h2 className="ml-2 text-[14px] font-semibold">Filters</h2>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
              >
                <mask
                  id="mask0_47_1590"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={24}
                  height={24}
                >
                  <rect width={24} height={24} fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_47_1590)">
                  <path
                    d="M11.9999 14.95C11.8666 14.95 11.7416 14.9292 11.6249 14.8875C11.5082 14.8458 11.3999 14.775 11.2999 14.675L6.67491 10.05C6.49158 9.86667 6.40408 9.63751 6.41241 9.36251C6.42074 9.08751 6.51658 8.85834 6.69991 8.67501C6.88324 8.49167 7.11658 8.40001 7.39991 8.40001C7.68324 8.40001 7.91658 8.49167 8.09991 8.67501L11.9999 12.575L15.9249 8.65001C16.1082 8.46667 16.3374 8.37917 16.6124 8.38751C16.8874 8.39584 17.1166 8.49167 17.2999 8.67501C17.4832 8.85834 17.5749 9.09167 17.5749 9.37501C17.5749 9.65834 17.4832 9.89167 17.2999 10.075L12.6999 14.675C12.5999 14.775 12.4916 14.8458 12.3749 14.8875C12.2582 14.9292 12.1332 14.95 11.9999 14.95Z"
                    fill="black"
                  />
                </g>
              </svg>
            </button>
            <Link
              to="/campaigns/new"
              className=" h-[40px] sm:mt-0 mt-5 flex justify-center items-center px-5 rounded-[1000px] bg-white text-black shadow-shadow600"
            >
              <h5 className="text-2xl mr-2 mt-[-4px]">+</h5>
              <h2 className="ml-2 text-[14px] font-semibold">
                Create campaign
              </h2>
            </Link>
            <button className=" h-[40px] sm:mt-0 mt-5 flex justify-center items-center px-5 rounded-[1000px] bg-black text-white shadow-shadow600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
              >
                <mask
                  id="mask0_47_1601"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                >
                  <rect width={20} height={20} fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_47_1601)">
                  <path
                    d="M4.16667 17.5C3.70833 17.5 3.31597 17.3368 2.98958 17.0104C2.66319 16.684 2.5 16.2917 2.5 15.8333V4.16667C2.5 3.70833 2.66319 3.31597 2.98958 2.98958C3.31597 2.66319 3.70833 2.5 4.16667 2.5H13.4792C13.7014 2.5 13.9132 2.54167 14.1146 2.625C14.316 2.70833 14.4931 2.82639 14.6458 2.97917L17.0208 5.35417C17.1736 5.50694 17.2917 5.68403 17.375 5.88542C17.4583 6.08681 17.5 6.29861 17.5 6.52083V15.8333C17.5 16.2917 17.3368 16.684 17.0104 17.0104C16.684 17.3368 16.2917 17.5 15.8333 17.5H4.16667ZM15.8333 6.54167L13.4583 4.16667H4.16667V15.8333H15.8333V6.54167ZM10 15C10.6944 15 11.2847 14.7569 11.7708 14.2708C12.2569 13.7847 12.5 13.1944 12.5 12.5C12.5 11.8056 12.2569 11.2153 11.7708 10.7292C11.2847 10.2431 10.6944 10 10 10C9.30556 10 8.71528 10.2431 8.22917 10.7292C7.74306 11.2153 7.5 11.8056 7.5 12.5C7.5 13.1944 7.74306 13.7847 8.22917 14.2708C8.71528 14.7569 9.30556 15 10 15ZM5.83333 8.33333H11.6667C11.9028 8.33333 12.1007 8.25347 12.2604 8.09375C12.4201 7.93403 12.5 7.73611 12.5 7.5V5.83333C12.5 5.59722 12.4201 5.39931 12.2604 5.23958C12.1007 5.07986 11.9028 5 11.6667 5H5.83333C5.59722 5 5.39931 5.07986 5.23958 5.23958C5.07986 5.39931 5 5.59722 5 5.83333V7.5C5 7.73611 5.07986 7.93403 5.23958 8.09375C5.39931 8.25347 5.59722 8.33333 5.83333 8.33333Z"
                    fill="white"
                  />
                </g>
              </svg>
              <h2 className="ml-2 text-[14px] font-semibold">Save Changes</h2>
            </button>
          </div>
        </div>
        {!loading ? (
          filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign, index) => (
              <Fragment key={index}>
                <CampaignCard
                  dropdownState={dropdownState}
                  onDropdownToggle={handleDropdownToggle}
                  id={index}
                  index={index}
                  campaign={campaign}
                />
              </Fragment>
            ))
          ) : (
            <div className="w-full flex justify-center items-center">
              <p>Search not found</p>
            </div>
          )
        ) : (
          <div className="w-full flex justify-center items-center">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default Campaigns;
