import React from "react";
import { Disclosure } from "@headlessui/react";
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const TacticsChannels = ({
  selectChannel,
  setSelectChannel,
  setCheckedScreens,
}) => {
  const handleOnSelectChannel = (channelName) => {
    setSelectChannel(channelName);
    setCheckedScreens([]);
  };
  return (
    <>
      <div className="w-full mb-9 rounded-lg bg-[#F7F9FB] py-2">
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex px-4 w-full justify-between rounded-lg py-4 text-left text-md text-[#1C1C1C] font-semibold">
                <div className="flex items-center">
                  <LaptopWindowsIcon
                    sx={{ fontSize: "18px" }}
                    style={{ color: "#000" }}
                  />
                  <h2 className="mx-2 text-[#1C1C1C] font-semibold">
                    Channels
                  </h2>
                </div>
                <ChevronUpIcon
                  className={`${open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-[#708090]`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-6 text-sm ">
                <div className=" px-4 cursor-pointer text-center flex flex-row flex-wrap gap-x-2 sm:justify-between justify-around items-center border-solid w-full">
                  <div
                    onClick={() => handleOnSelectChannel("streamingTv")}
                    className={`max-w-[15%] w-full min-w-[45%] sm:min-w-[100px] py-1 px-2 border flex-col-reverse border-[#708090] font-semibold sm:text-sm text-[13px] rounded-xl mt-4 h-[120px] flex justify-center items-center shadow-md ${selectChannel == "streamingTv"
                      ? "bg-[#708090] text-[#fff]"
                      : "text-[#708090]"
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={25}
                      height={25}
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <mask
                        id="mask0_46_1789"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x={0}
                        y={0}
                        width={25}
                        height={25}
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width={24}
                          height={24}
                          fill="#D9D9D9"
                        />
                      </mask>
                      <g mask="url(#mask0_46_1789)">
                        <path
                          d="M20.5 20.5H15.5C15.5 20.1667 15.4875 19.8333 15.4625 19.5C15.4375 19.1667 15.4 18.8333 15.35 18.5H20.5V6.5H4.5V7.65C4.16667 7.6 3.83333 7.5625 3.5 7.5375C3.16667 7.5125 2.83333 7.5 2.5 7.5V6.5C2.5 5.95 2.69583 5.47917 3.0875 5.0875C3.47917 4.69583 3.95 4.5 4.5 4.5H20.5C21.05 4.5 21.5208 4.69583 21.9125 5.0875C22.3042 5.47917 22.5 5.95 22.5 6.5V18.5C22.5 19.05 22.3042 19.5208 21.9125 19.9125C21.5208 20.3042 21.05 20.5 20.5 20.5ZM8.5 20.5C8.23333 20.5 8 20.4208 7.8 20.2625C7.6 20.1042 7.475 19.8917 7.425 19.625C7.24167 18.575 6.77083 17.6833 6.0125 16.95C5.25417 16.2167 4.35 15.7583 3.3 15.575C3.05 15.5417 2.85417 15.4208 2.7125 15.2125C2.57083 15.0042 2.5 14.7667 2.5 14.5C2.5 14.2167 2.59167 13.9792 2.775 13.7875C2.95833 13.5958 3.175 13.5167 3.425 13.55C4.99167 13.75 6.32917 14.4083 7.4375 15.525C8.54583 16.6417 9.20833 17.9833 9.425 19.55C9.45833 19.8167 9.38333 20.0417 9.2 20.225C9.01667 20.4083 8.78333 20.5 8.5 20.5ZM12.5 20.5C12.2167 20.5 11.9792 20.4083 11.7875 20.225C11.5958 20.0417 11.4833 19.8083 11.45 19.525C11.2167 17.3917 10.3458 15.5833 8.8375 14.1C7.32917 12.6167 5.50833 11.7667 3.375 11.55C3.10833 11.5167 2.89583 11.4 2.7375 11.2C2.57917 11 2.5 10.7667 2.5 10.5C2.5 10.2167 2.5875 9.975 2.7625 9.775C2.9375 9.575 3.15 9.49167 3.4 9.525C6.08333 9.74167 8.36667 10.7875 10.25 12.6625C12.1333 14.5375 13.2 16.8083 13.45 19.475C13.4833 19.7583 13.4042 20 13.2125 20.2C13.0208 20.4 12.7833 20.5 12.5 20.5ZM3.75 20.5C3.4 20.5 3.10417 20.3792 2.8625 20.1375C2.62083 19.8958 2.5 19.6 2.5 19.25C2.5 18.9 2.62083 18.6042 2.8625 18.3625C3.10417 18.1208 3.4 18 3.75 18C4.1 18 4.39583 18.1208 4.6375 18.3625C4.87917 18.6042 5 18.9 5 19.25C5 19.6 4.87917 19.8958 4.6375 20.1375C4.39583 20.3792 4.1 20.5 3.75 20.5Z"
                          fill={
                            selectChannel == "streamingTv" ? "#fff" : "#708090"
                          }
                        />
                      </g>
                    </svg>

                    <h2 className="mb-3">Streaming TV</h2>
                  </div>
                  <div
                    onClick={() => handleOnSelectChannel("onlineVideo")}
                    className={`max-w-[15%] flex-col-reverse w-full min-w-[45%] sm:min-w-[100px] py-1 px-3 border border-[#708090] font-semibold sm:text-sm text-[13px] rounded-xl mt-4 h-[120px] flex justify-center items-center shadow-md ${selectChannel == "onlineVideo"
                      ? "bg-[#708090] text-[#fff]"
                      : "text-[#708090]"
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={25}
                      height={25}
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <mask
                        id="mask0_46_1794"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x={0}
                        y={0}
                        width={25}
                        height={25}
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width={24}
                          height={24}
                          fill="#D9D9D9"
                        />
                      </mask>
                      <g mask="url(#mask0_46_1794)">
                        <path
                          d="M12.4999 22.5C11.1165 22.5 9.81654 22.2375 8.59988 21.7125C7.38321 21.1875 6.32488 20.475 5.42488 19.575C4.52488 18.675 3.81238 17.6167 3.28738 16.4C2.76238 15.1833 2.49988 13.8833 2.49988 12.5C2.49988 11.1167 2.76238 9.81667 3.28738 8.6C3.81238 7.38333 4.52488 6.325 5.42488 5.425C6.32488 4.525 7.38321 3.8125 8.59988 3.2875C9.81654 2.7625 11.1165 2.5 12.4999 2.5H20.4999C21.0499 2.5 21.5207 2.69583 21.9124 3.0875C22.304 3.47917 22.4999 3.95 22.4999 4.5V12.5C22.4999 13.8833 22.2374 15.1833 21.7124 16.4C21.1874 17.6167 20.4749 18.675 19.5749 19.575C18.6749 20.475 17.6165 21.1875 16.3999 21.7125C15.1832 22.2375 13.8832 22.5 12.4999 22.5ZM12.4999 20.5C14.7332 20.5 16.6249 19.725 18.1749 18.175C19.7249 16.625 20.4999 14.7333 20.4999 12.5V4.5H12.4999C10.2665 4.5 8.37488 5.275 6.82488 6.825C5.27488 8.375 4.49988 10.2667 4.49988 12.5C4.49988 14.7333 5.27488 16.625 6.82488 18.175C8.37488 19.725 10.2665 20.5 12.4999 20.5ZM7.49988 15.5H14.4999V13.5L17.4999 15.5V9.5L14.4999 11.5V9.5H7.49988V15.5Z"
                          fill={
                            selectChannel == "onlineVideo" ? "#fff" : "#708090"
                          }
                        />
                      </g>
                    </svg>
                    <h2 className="mb-3">Online Video</h2>
                  </div>
                  <div
                    onClick={() => handleOnSelectChannel("mobileAppsAndGames")}
                    className={`flex-col-reverse max-w-[15%] w-full min-w-[45%] sm:min-w-[100px] py-1 px-2 border border-[#708090] font-semibold sm:text-sm text-[13px] rounded-xl mt-4 h-[120px] flex justify-center items-center shadow-md ${selectChannel == "mobileAppsAndGames"
                      ? "bg-[#708090] text-[#fff]"
                      : "text-[#708090]"
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={25}
                      height={25}
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <mask
                        id="mask0_46_1799"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x={0}
                        y={0}
                        width={25}
                        height={25}
                      >
                        <rect
                          x="0.5"
                          y="0.178833"
                          width={24}
                          height={24}
                          fill="#D9D9D9"
                        />
                      </mask>
                      <g mask="url(#mask0_46_1799)">
                        <path
                          d="M5.5 21.1788C5.21667 21.1788 4.97917 21.083 4.7875 20.8913C4.59583 20.6997 4.5 20.4622 4.5 20.1788V16.1788C4.5 15.6288 4.69583 15.158 5.0875 14.7663C5.47917 14.3747 5.95 14.1788 6.5 14.1788H18.5C19.05 14.1788 19.5208 14.3747 19.9125 14.7663C20.3042 15.158 20.5 15.6288 20.5 16.1788V20.1788C20.5 20.4622 20.4042 20.6997 20.2125 20.8913C20.0208 21.083 19.7833 21.1788 19.5 21.1788H5.5ZM9.5 13.1788C8.11667 13.1788 6.9375 12.6913 5.9625 11.7163C4.9875 10.7413 4.5 9.56217 4.5 8.17883C4.5 6.7955 4.9875 5.61633 5.9625 4.64133C6.9375 3.66633 8.11667 3.17883 9.5 3.17883H15.5C16.8833 3.17883 18.0625 3.66633 19.0375 4.64133C20.0125 5.61633 20.5 6.7955 20.5 8.17883C20.5 9.56217 20.0125 10.7413 19.0375 11.7163C18.0625 12.6913 16.8833 13.1788 15.5 13.1788H9.5ZM6.5 19.1788H18.5V16.1788H6.5V19.1788ZM9.5 11.1788H15.5C16.3333 11.1788 17.0417 10.8872 17.625 10.3038C18.2083 9.7205 18.5 9.01217 18.5 8.17883C18.5 7.3455 18.2083 6.63717 17.625 6.05383C17.0417 5.4705 16.3333 5.17883 15.5 5.17883H9.5C8.66667 5.17883 7.95833 5.4705 7.375 6.05383C6.79167 6.63717 6.5 7.3455 6.5 8.17883C6.5 9.01217 6.79167 9.7205 7.375 10.3038C7.95833 10.8872 8.66667 11.1788 9.5 11.1788ZM9.5 9.17883C9.78333 9.17883 10.0208 9.083 10.2125 8.89133C10.4042 8.69967 10.5 8.46217 10.5 8.17883C10.5 7.8955 10.4042 7.658 10.2125 7.46633C10.0208 7.27467 9.78333 7.17883 9.5 7.17883C9.21667 7.17883 8.97917 7.27467 8.7875 7.46633C8.59583 7.658 8.5 7.8955 8.5 8.17883C8.5 8.46217 8.59583 8.69967 8.7875 8.89133C8.97917 9.083 9.21667 9.17883 9.5 9.17883ZM15.5 9.17883C15.7833 9.17883 16.0208 9.083 16.2125 8.89133C16.4042 8.69967 16.5 8.46217 16.5 8.17883C16.5 7.8955 16.4042 7.658 16.2125 7.46633C16.0208 7.27467 15.7833 7.17883 15.5 7.17883C15.2167 7.17883 14.9792 7.27467 14.7875 7.46633C14.5958 7.658 14.5 7.8955 14.5 8.17883C14.5 8.46217 14.5958 8.69967 14.7875 8.89133C14.9792 9.083 15.2167 9.17883 15.5 9.17883Z"
                          fill={
                            selectChannel == "mobileAppsAndGames"
                              ? "#fff"
                              : "#708090"
                          }
                        />
                      </g>
                    </svg>
                    <h2 className="mb-3">Mobile Apps & Games</h2>
                  </div>
                  <div
                    onClick={() => handleOnSelectChannel("display")}
                    className={`flex-col-reverse max-w-[15%] w-full min-w-[45%] sm:min-w-[100px] py-1 px-2 border border-[#708090] font-semibold sm:text-sm text-[13px] rounded-xl mt-4 h-[120px] flex justify-center items-center shadow-md ${selectChannel == "display"
                      ? "bg-[#708090] text-[#fff]"
                      : "text-[#708090]"
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={25}
                      height={25}
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <mask
                        id="mask0_46_1804"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x={0}
                        y={0}
                        width={25}
                        height={25}
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width={24}
                          height={24}
                          fill="#D9D9D9"
                        />
                      </mask>
                      <g mask="url(#mask0_46_1804)">
                        <path
                          d="M2.5 17.5V5.5C2.5 4.95 2.69583 4.47917 3.0875 4.0875C3.47917 3.69583 3.95 3.5 4.5 3.5H20.5C21.05 3.5 21.5208 3.69583 21.9125 4.0875C22.3042 4.47917 22.5 4.95 22.5 5.5V17.5C22.5 18.05 22.3042 18.5208 21.9125 18.9125C21.5208 19.3042 21.05 19.5 20.5 19.5H17.5V17.5H20.5V5.5H4.5V17.5H7.5V19.5H4.5C3.95 19.5 3.47917 19.3042 3.0875 18.9125C2.69583 18.5208 2.5 18.05 2.5 17.5ZM7.775 20.225L11.8 16.2C12 16 12.2333 15.9 12.5 15.9C12.7667 15.9 13 16 13.2 16.2L17.225 20.225C17.4583 20.4583 17.5125 20.7292 17.3875 21.0375C17.2625 21.3458 17.0333 21.5 16.7 21.5H8.3C7.96667 21.5 7.7375 21.3458 7.6125 21.0375C7.4875 20.7292 7.54167 20.4583 7.775 20.225Z"
                          fill={selectChannel == "display" ? "#fff" : "#708090"}
                        />
                      </g>
                    </svg>
                    <h2 className="mb-3">Display</h2>
                  </div>
                  <div
                    onClick={() => handleOnSelectChannel("audio")}
                    className={`flex-col-reverse max-w-[15%] w-full min-w-[45%] sm:min-w-[100px] py-1 px-2 border border-[#708090] font-semibold sm:text-sm text-[13px] rounded-xl mt-4 h-[120px] flex justify-center items-center shadow-md ${selectChannel == "audio"
                      ? "bg-[#708090] text-[#fff]"
                      : "text-[#708090]"
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={25}
                      height={25}
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <mask
                        id="mask0_46_1809"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x={0}
                        y={0}
                        width={25}
                        height={25}
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width={24}
                          height={24}
                          fill="#D9D9D9"
                        />
                      </mask>
                      <g mask="url(#mask0_46_1809)">
                        <path
                          d="M6.5 20.5C5.95 20.5 5.47917 20.3042 5.0875 19.9125C4.69583 19.5208 4.5 19.05 4.5 18.5V14.5C4.5 13.95 4.69583 13.4792 5.0875 13.0875C5.47917 12.6958 5.95 12.5 6.5 12.5C7.05 12.5 7.52083 12.6958 7.9125 13.0875C8.30417 13.4792 8.5 13.95 8.5 14.5V18.5C8.5 19.05 8.30417 19.5208 7.9125 19.9125C7.52083 20.3042 7.05 20.5 6.5 20.5ZM12.5 20.5C11.95 20.5 11.4792 20.3042 11.0875 19.9125C10.6958 19.5208 10.5 19.05 10.5 18.5V6.5C10.5 5.95 10.6958 5.47917 11.0875 5.0875C11.4792 4.69583 11.95 4.5 12.5 4.5C13.05 4.5 13.5208 4.69583 13.9125 5.0875C14.3042 5.47917 14.5 5.95 14.5 6.5V18.5C14.5 19.05 14.3042 19.5208 13.9125 19.9125C13.5208 20.3042 13.05 20.5 12.5 20.5ZM18.5 20.5C17.95 20.5 17.4792 20.3042 17.0875 19.9125C16.6958 19.5208 16.5 19.05 16.5 18.5V11.5C16.5 10.95 16.6958 10.4792 17.0875 10.0875C17.4792 9.69583 17.95 9.5 18.5 9.5C19.05 9.5 19.5208 9.69583 19.9125 10.0875C20.3042 10.4792 20.5 10.95 20.5 11.5V18.5C20.5 19.05 20.3042 19.5208 19.9125 19.9125C19.5208 20.3042 19.05 20.5 18.5 20.5Z"
                          fill={selectChannel == "audio" ? "#fff" : "#708090"}
                        />
                      </g>
                    </svg>
                    <h2 className="mb-3">Audio</h2>
                  </div>
                  <div
                    onClick={() => handleOnSelectChannel("dooh")}
                    className={`flex-col-reverse max-w-[15%] w-full min-w-[45%] sm:min-w-[100px] border py-1 px-2 border-[#708090] font-semibold sm:text-sm text-[13px] rounded-xl mt-4 h-[120px] flex justify-center items-center shadow-md ${selectChannel == "dooh"
                      ? "bg-[#708090] text-[#fff]"
                      : "text-[#708090]"
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={25}
                      height={25}
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <mask
                        id="mask0_46_1814"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x={0}
                        y={0}
                        width={25}
                        height={25}
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width={24}
                          height={24}
                          fill="#D9D9D9"
                        />
                      </mask>
                      <g mask="url(#mask0_46_1814)">
                        <path
                          d="M6.49995 20.5C6.21662 20.5 5.97912 20.4041 5.78745 20.2125C5.59578 20.0208 5.49995 19.7833 5.49995 19.5V17.5H4.49995C4.21662 17.5 3.97912 17.4041 3.78745 17.2125C3.59578 17.0208 3.49995 16.7833 3.49995 16.5C3.49995 16.2166 3.59578 15.9791 3.78745 15.7875C3.97912 15.5958 4.21662 15.5 4.49995 15.5H5.49995V12.5H3.79995C3.56662 12.5 3.40828 12.3916 3.32495 12.175C3.24162 11.9583 3.29162 11.775 3.47495 11.625L11.825 4.09995C12.0083 3.91662 12.2333 3.82495 12.5 3.82495C12.7666 3.82495 12.9916 3.91662 13.175 4.09995L21.525 11.625C21.7083 11.775 21.7583 11.9583 21.675 12.175C21.5916 12.3916 21.4333 12.5 21.2 12.5H19.5V15.5H20.5C20.7833 15.5 21.0208 15.5958 21.2125 15.7875C21.4041 15.9791 21.5 16.2166 21.5 16.5C21.5 16.7833 21.4041 17.0208 21.2125 17.2125C21.0208 17.4041 20.7833 17.5 20.5 17.5H19.5V19.5C19.5 19.7833 19.4041 20.0208 19.2125 20.2125C19.0208 20.4041 18.7833 20.5 18.5 20.5C18.2166 20.5 17.9791 20.4041 17.7875 20.2125C17.5958 20.0208 17.5 19.7833 17.5 19.5V17.5H13.5V19.5C13.5 19.7833 13.4041 20.0208 13.2125 20.2125C13.0208 20.4041 12.7833 20.5 12.5 20.5C12.2166 20.5 11.9791 20.4041 11.7875 20.2125C11.5958 20.0208 11.5 19.7833 11.5 19.5V17.5H7.49995V19.5C7.49995 19.7833 7.40412 20.0208 7.21245 20.2125C7.02078 20.4041 6.78328 20.5 6.49995 20.5ZM7.49995 15.5H11.5V7.09995L7.49995 10.7V15.5ZM13.5 15.5H17.5V10.7L13.5 7.09995V15.5Z"
                          fill={selectChannel == "dooh" ? "#fff" : "#708090"}
                        />
                      </g>
                    </svg>
                    <h2 className="mb-3">
                      Digital Out of Home
                      <br />
                      (DOOH)
                    </h2>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export default TacticsChannels;
