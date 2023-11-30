import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import rectangle from "../../assets/images/rectangle.svg";
import { useDispatch, useSelector } from "react-redux";
import { getDetailedPlacements } from "../../store/slices/placementSlice";
import Loader from "../../utils/Loader";
import TotalPlacements from "./TotalPlacements";
import { getCampaigns } from "../../store/slices/campaignSlice";
import axios from "axios";

const CampaignCard = ({ campaign, dropdownState, onDropdownToggle, id }) => {
  const dispatch = useDispatch();
  const { placements, loading, singlePlacement } = useSelector(
    (state) => state.placement
  );

  const navigate = useNavigate();

  const isOpen = dropdownState === id;

  const handleDropdownClick = () => {
    onDropdownToggle(id);
    dispatch(
      getDetailedPlacements({
        public_identifier: campaign.public_identifier,
      })
    );
  };

  return (
    <div
      key={id}
      className="flex bg-[#fff] shadow-sm border-gray-100 border-solid border flex-col rounded-3xl w-full my-5 px-2 py-5"
    >
      <div className=" items-end sm:items-center w-full flex-col-reverse sm:flex-row flex justify-between">
        <div className="lg:w-[90%] items-center gap-3 flex-wrap flex c_row">
          {/* ... campaign card content ... */}
          <div className="flex flex-wrap gap-3 items-center">
            <button className="mr-4 rounded-lg ">
              <img src={rectangle} alt="" />
            </button>
            <div className="flex flex-col items-start mr-4">
              <div className="flex flex-col">
                <h2 className="overflow-hidden w-[140px] whitespace-nowrap text-ellipsis text-black text-xl font-semibold">
                  {campaign.name}
                </h2>
                <p className="mt-2 text-gray400 font-normal">
                  {campaign.start_date}
                </p>
              </div>
              <div className="px-4 text-sm py-2 h-[max-content] rounded-[1000px] flex items-center justify-center bg-[#E3F5FF99]">
                <span className="text-black">
                  {campaign.status !== "active" ? "Draft" : campaign.status}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-black capitalize font-bold text-sm">
              Start Date
            </h2>
            <strong className="rounded-[1000px] flex justify-between items-center mt-1  px-3 min-w-[80px] py-1 text-black text-xs font-normal">
              {campaign.start_date}
            </strong>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-black capitalize font-bold text-sm">
              End Date
            </h2>
            <strong className="rounded-[1000px] flex justify-between items-center mt-1 px-3 min-w-[80px] py-1 text-black text-xs font-normal">
              {campaign.end_date}
            </strong>
          </div>
          <div className="flex flex-col">
            <h2 className="text-black font-bold text-center text-sm">Budget</h2>
            <strong className="rounded-[1000px] flex justify-center items-center mt-1 px-3 min-w-[80px] py-1 text-black text-xs font-normal">
              ${campaign.budget}
            </strong>
          </div>
          <div className="flex flex-col">
            <h2 className="text-black font-bold text-center text-sm">Status</h2>
            <div className="">
              <strong className="rounded-[1000px] flex justify-center items-center mt-1 px-3 min-w-[80px] py-1 text-black text-xs font-normal">
                {campaign.status}
              </strong>
            </div>
          </div>

          <TotalPlacements placements={campaign.placements_number_total} />

          <div className="flex gap-2 items-center">
            <button
              onClick={() =>
                navigate(`/campaigns/edit/${campaign.public_identifier}`)
              }
              className="w-[40px] h-[40px] flex justify-center items-center rounded-[100%]  border border-black border-solid shadow-shadow600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
              >
                <mask
                  id="mask0_47_1562"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                >
                  <rect width={20} height={20} fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_47_1562)">
                  <path
                    d="M4.25 15.75H5.47917L12.4792 8.75004L11.25 7.52087L4.25 14.5209V15.75ZM16.1875 7.54171L12.4583 3.81254L13.4792 2.79171C13.8264 2.44449 14.2396 2.27087 14.7188 2.27087C15.1979 2.27087 15.6111 2.44449 15.9583 2.79171L17.2083 4.04171C17.5417 4.37504 17.7083 4.78824 17.7083 5.28129C17.7083 5.77435 17.5417 6.18754 17.2083 6.52087L16.1875 7.54171ZM3.375 17.5C3.13889 17.5 2.93403 17.4132 2.76042 17.2396C2.58681 17.066 2.5 16.8612 2.5 16.625V14.125C2.5 14.0139 2.52083 13.9063 2.5625 13.8021C2.60417 13.698 2.66667 13.6042 2.75 13.5209L11.2292 5.04171L14.9583 8.77087L6.47917 17.25C6.39583 17.3334 6.30208 17.3959 6.19792 17.4375C6.09375 17.4792 5.98611 17.5 5.875 17.5H3.375Z"
                    fill="black"
                  />
                </g>
              </svg>
            </button>
            <button className="w-[40px] h-[40px] flex justify-center items-center rounded-[100%]  border border-black border-solid shadow-shadow600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
              >
                <mask
                  id="mask0_47_1568"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                >
                  <rect width={20} height={20} fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_47_1568)">
                  <path
                    d="M7.74917 15H12.2441C12.4564 15 12.6354 14.9285 12.7812 14.7856C12.9271 14.6427 13 14.4656 13 14.2544C13 14.0431 12.9282 13.8646 12.7846 13.7188C12.641 13.5729 12.4631 13.5 12.2508 13.5H7.7559C7.54363 13.5 7.36458 13.5715 7.21875 13.7144C7.07292 13.8573 7 14.0344 7 14.2456C7 14.4569 7.07179 14.6354 7.21538 14.7812C7.35897 14.9271 7.5369 15 7.74917 15ZM7.74917 12H12.2441C12.4564 12 12.6354 11.9285 12.7812 11.7856C12.9271 11.6427 13 11.4656 13 11.2544C13 11.0431 12.9282 10.8646 12.7846 10.7188C12.641 10.5729 12.4631 10.5 12.2508 10.5H7.7559C7.54363 10.5 7.36458 10.5715 7.21875 10.7144C7.07292 10.8573 7 11.0344 7 11.2456C7 11.4569 7.07179 11.6354 7.21538 11.7812C7.35897 11.9271 7.5369 12 7.74917 12ZM5.4941 18C5.08137 18 4.72917 17.8531 4.4375 17.5594C4.14583 17.2656 4 16.9125 4 16.5V3.5C4 3.0875 4.14687 2.73438 4.44062 2.44063C4.73437 2.14688 5.0875 2 5.5 2H11.375C11.5725 2 11.7608 2.03472 11.9398 2.10417C12.1188 2.17361 12.2847 2.28472 12.4375 2.4375L15.5625 5.5625C15.7153 5.71528 15.8264 5.88117 15.8958 6.06019C15.9653 6.2392 16 6.42747 16 6.625V16.5C16 16.9125 15.853 17.2656 15.5591 17.5594C15.2652 17.8531 14.9119 18 14.4992 18H5.4941ZM11 6.25V3.5H5.5V16.5H14.5V7H11.75C11.5375 7 11.3594 6.92813 11.2156 6.78438C11.0719 6.64063 11 6.4625 11 6.25Z"
                    fill="black"
                  />
                </g>
              </svg>
            </button>
            <button className="w-[40px] h-[40px] flex justify-center items-center rounded-[100%]  border border-black border-solid shadow-shadow600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={20}
                viewBox="0 0 18 20"
                fill="none"
              >
                <path
                  d="M2.4001 19.6C1.9051 19.6 1.48135 19.4238 1.12885 19.0713C0.776347 18.7188 0.600098 18.295 0.600098 17.8V4.90002C0.600098 4.64502 0.685839 4.43127 0.857323 4.25877C1.02882 4.08627 1.24132 4.00002 1.49482 4.00002C1.74834 4.00002 1.9626 4.08627 2.1376 4.25877C2.3126 4.43127 2.4001 4.64502 2.4001 4.90002V17.8H12.9001C13.1551 17.8 13.3688 17.8858 13.5413 18.0573C13.7138 18.2288 13.8001 18.4412 13.8001 18.6947C13.8001 18.9483 13.7138 19.1625 13.5413 19.3375C13.3688 19.5125 13.1551 19.6 12.9001 19.6H2.4001ZM6.0001 16C5.5051 16 5.08135 15.8238 4.72885 15.4713C4.37635 15.1188 4.2001 14.695 4.2001 14.2V2.20002C4.2001 1.70502 4.37635 1.28128 4.72885 0.928775C5.08135 0.576275 5.5051 0.400024 6.0001 0.400024H15.6001C16.0951 0.400024 16.5188 0.576275 16.8713 0.928775C17.2238 1.28128 17.4001 1.70502 17.4001 2.20002V14.2C17.4001 14.695 17.2238 15.1188 16.8713 15.4713C16.5188 15.8238 16.0951 16 15.6001 16H6.0001ZM6.0001 14.2H15.6001V2.20002H6.0001V14.2Z"
                  fill="#1C1B1F"
                />
              </svg>
            </button>
            <button className="w-[40px] h-[40px] flex justify-center items-center rounded-[100%]  border border-black border-solid shadow-shadow600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M4.0875 18C3.51 18 3.01563 17.7944 2.60438 17.3831C2.19313 16.9719 1.9875 16.4775 1.9875 15.9V3.15C1.70417 3.15 1.45833 3.04583 1.25 2.8375C1.04167 2.62917 0.9375 2.38333 0.9375 2.1C0.9375 1.81667 1.04167 1.57083 1.25 1.3625C1.45833 1.15417 1.70577 1.05 1.9923 1.05H6.0375C6.0375 0.766667 6.14167 0.520833 6.35 0.3125C6.55833 0.104167 6.80417 0 7.0875 0H10.9125C11.1958 0 11.4417 0.104167 11.65 0.3125C11.8583 0.520833 11.9625 0.766667 11.9625 1.05H16.0077C16.2942 1.05 16.5417 1.15417 16.75 1.3625C16.9583 1.57083 17.0625 1.81667 17.0625 2.1C17.0625 2.38333 16.9583 2.62917 16.75 2.8375C16.5417 3.04583 16.2958 3.15 16.0125 3.15V15.9C16.0125 16.4775 15.8069 16.9719 15.3956 17.3831C14.9844 17.7944 14.49 18 13.9125 18H4.0875ZM4.0875 3.15V15.9H13.9125V3.15H4.0875ZM5.9625 12.75C5.9625 13.0333 6.06667 13.2792 6.275 13.4875C6.48333 13.6958 6.72917 13.8 7.0125 13.8C7.29583 13.8 7.54167 13.6958 7.75 13.4875C7.95833 13.2792 8.0625 13.0333 8.0625 12.75V6.3C8.0625 6.01667 7.95833 5.77083 7.75 5.5625C7.54167 5.35417 7.29583 5.25 7.0125 5.25C6.72917 5.25 6.48333 5.35417 6.275 5.5625C6.06667 5.77083 5.9625 6.01667 5.9625 6.3V12.75ZM9.9375 12.75C9.9375 13.0333 10.0417 13.2792 10.25 13.4875C10.4583 13.6958 10.7042 13.8 10.9875 13.8C11.2708 13.8 11.5167 13.6958 11.725 13.4875C11.9333 13.2792 12.0375 13.0333 12.0375 12.75V6.3C12.0375 6.01667 11.9333 5.77083 11.725 5.5625C11.5167 5.35417 11.2708 5.25 10.9875 5.25C10.7042 5.25 10.4583 5.35417 10.25 5.5625C10.0417 5.77083 9.9375 6.01667 9.9375 6.3V12.75Z"
                  fill="#C71B1B"
                  fillOpacity="0.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <button
          style={{ transform: isOpen ? "rotate(180deg)" : "" }}
          onClick={handleDropdownClick}
          className="min-w-[35px] ml-3 mb-5 sm:mb-0 min-h-[35px] flex justify-center items-center rounded-[100%]  border border-grayLight border-solid shadow-shadow600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.5303 15.5105C18.2374 15.8298 17.7626 15.8298 17.4697 15.5105L12.5303 10.125C12.2374 9.80565 11.7626 9.80565 11.4697 10.125L6.53033 15.5105C6.23744 15.8298 5.76256 15.8298 5.46967 15.5105C5.17678 15.1911 5.17678 14.6734 5.46967 14.354L10.409 8.96853C11.2877 8.01049 12.7123 8.01049 13.591 8.96853L18.5303 14.354C18.8232 14.6734 18.8232 15.1911 18.5303 15.5105Z"
              fill="#1C1C1C"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="w-full  border-solid border-gray700 rounded-[16px] flex flex-col px-2 md:px-0 py-5 mt-4">
          <h2 className="text-center text-black font-semibold text-xl mb-5">
            Tactics Details
          </h2>

          {loading ? (
            <div className="w-full flex justify-center">
              <Loader />
            </div>
          ) : placements.length > 0 ? (
            placements.map((d, i) => {
              return (
                <div
                  key={i}
                  className=" rounded-[8px] border-solid bg-gray-50 shadow-shadowInset10 border-gray-300 flex w-full flex-col-reverse sm:flex-row justify-between gap-3 mb-3 items-end md:items-center"
                >
                  <div className="w-[93%] flex _cwrap gap-3 c_row p-2 md:p-4">
                    <div className="flex flex-col items-start md:items-start">
                      <h2 className="text-black font-bold text-sm">Name</h2>
                      <strong className="text-sm rounded-[1000px] min-h-[25px] flex justify-start md:justify-start items-center h-full max-h-[28px] text-left md:text-center min-w-[60px] mt-1 border-black  border-solid  font-normal">
                        <span className="overflow-hidden text-left w-[220px] whitespace-nowrap text-ellipsis">
                          {d.name}
                        </span>{" "}
                      </strong>
                    </div>
                    <div className="flex w-full max-w-[90px] flex-col items-start md:items-center">
                      <h2 className="text-black font-bold capitalize text-sm">
                        Start Date
                      </h2>
                      <strong className="rounded-[1000px] text-left md:text-center flex justify-start md:justify-center items-center mt-1 min-w-[80px] py-1 text-black text-xs font-normal">
                        {d.start_date}
                      </strong>
                    </div>

                    <div className="flex w-full max-w-[90px] flex-col items-start md:items-center">
                      <h2 className="text-black font-bold capitalize text-sm">
                        End Date
                      </h2>
                      <strong className="rounded-[1000px] flex justify-start md:justify-center text-left md:text-center items-center mt-1 min-w-[80px] py-1 text-black text-xs font-normal">
                        {d.end_date}
                      </strong>
                    </div>
                    <div className="flex flex-col items-start md:items-center">
                      <h2 className="text-black font-bold capitalize text-sm">
                        budget
                      </h2>
                      <strong className="rounded-[1000px] flex justify-start md:justify-center items-center mt-1  min-w-[80px] py-1 text-black text-xs font-normal">
                        ${d.budget}
                      </strong>
                    </div>
                    <div className="flex flex-col items-start md:items-center">
                      <h2 className="text-black font-bold text-sm">Channels</h2>
                      <strong className="text-sm rounded-[1000px] min-h-[25px] flex justify-start md:justify-center items-center h-full max-h-[28px] text-center min-w-[60px] mt-1 border-black  border-solid  font-normal">
                        <span className="overflow-hidden w-[90px] whitespace-nowrap text-ellipsis">
                          {d.creative_type === "video_ctv" &&
                          d.digital_channel === "ctv"
                            ? "Streaming Tv"
                            : ""
                            ? d.creative_type === "video_mobile" &&
                              d.digital_channel === "web"
                            : ""}
                        </span>{" "}
                      </strong>
                    </div>
                    <div className="flex flex-col items-start md:items-center">
                      <h2 className="text-black font-bold text-sm">Devices</h2>
                      <strong className="text-sm rounded-[1000px] min-h-[25px] flex justify-start md:justify-center items-center h-full max-h-[28px] text-left md:text-center min-w-[60px] mt-1  border-black  border-solid  font-normal">
                        <span className="overflow-hidden w-[90px] whitespace-nowrap text-ellipsis">
                          {d.creative_type === "video_ctv" &&
                          d.digital_channel === "ctv"
                            ? "TV"
                            : ""}
                        </span>{" "}
                      </strong>
                    </div>
                    <div className="flex flex-col items-start md:items-center">
                      <h2 className="text-black font-bold text-sm">Package</h2>
                      <strong className="text-sm rounded-[1000px] min-h-[25px] flex justify-start md:justify-center items-center h-full max-h-[28px] text-left md:text-center min-w-[60px] mt-1  border-black  border-solid  font-normal">
                        <span className="overflow-hidden w-[90px] whitespace-nowrap text-ellipsis"></span>{" "}
                      </strong>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        "/tactics/" +
                          campaign.public_identifier +
                          "/" +
                          d.public_identifier
                      )
                    }
                    className="min-w-[35px] rotate-[90deg] mt-3 lg:mt-0 mb-4 md:mb-0 mr-3 ml-3 min-h-[35px] flex justify-center items-center rounded-[100%]  border border-grayLight border-solid shadow-shadow600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.5303 15.5105C18.2374 15.8298 17.7626 15.8298 17.4697 15.5105L12.5303 10.125C12.2374 9.80565 11.7626 9.80565 11.4697 10.125L6.53033 15.5105C6.23744 15.8298 5.76256 15.8298 5.46967 15.5105C5.17678 15.1911 5.17678 14.6734 5.46967 14.354L10.409 8.96853C11.2877 8.01049 12.7123 8.01049 13.591 8.96853L18.5303 14.354C18.8232 14.6734 18.8232 15.1911 18.5303 15.5105Z"
                        fill="#1C1C1C"
                      />
                    </svg>
                  </button>
                </div>
              );
            })
          ) : (
            <div className="w-full text-center my-3">No placements created</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CampaignCard;
