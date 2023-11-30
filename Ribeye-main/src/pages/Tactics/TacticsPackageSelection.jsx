import { useState, useEffect, useRef } from "react";
import { Disclosure } from "@headlessui/react";
import { Tooltip } from "@mui/material";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import axios from "axios";

const TacticsPackageSelection = ({ changeEvent, selectedChannel, setSelectedChannel }) => {
  const [isOpenNone, setIsOpenNone] = useState(false);
  const [channelList, setChannelList] = useState([])
  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenNone(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const [activeChannel, setActiveChannel] = useState("");
  const handleSelectChannel = (imageSrc, name, qty) => {
    setSelectedChannel({ imageSrc, name, qty });
    setActiveChannel(name);
  };

  const handleUnSelectAll = () => {
    setSelectedChannel(null);
    setActiveChannel("");
  };

  useEffect(() => {
    axios
      .get(
        `https://ribeye-one.vercel.app/api/v1/inventory-packages/JLP4NAH7?creative_type=`,
      )
      .then((res) => {
        setChannelList(res.data.data);
      });
  }, [])

  return (
    <>
      <div className="w-full mb-9 rounded-lg bg-[#F7F9FB] py-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex px-4 w-full justify-between rounded-lg py-2 text-left text-md text-[#1C1C1C] font-semibold">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <mask
                      id="mask0_46_3479"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x={0}
                      y={0}
                      width={24}
                      height={24}
                    >
                      <rect width={24} height={24} fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_46_3479)">
                      <path
                        d="M11 19.425V12.575L5 9.1V15.95L11 19.425ZM13 19.425L19 15.95V9.1L13 12.575V19.425ZM12 10.85L17.925 7.425L12 4L6.075 7.425L12 10.85ZM4 17.7C3.68333 17.5167 3.4375 17.275 3.2625 16.975C3.0875 16.675 3 16.3417 3 15.975V8.025C3 7.65833 3.0875 7.325 3.2625 7.025C3.4375 6.725 3.68333 6.48333 4 6.3L11 2.275C11.3167 2.09167 11.65 2 12 2C12.35 2 12.6833 2.09167 13 2.275L20 6.3C20.3167 6.48333 20.5625 6.725 20.7375 7.025C20.9125 7.325 21 7.65833 21 8.025V15.975C21 16.3417 20.9125 16.675 20.7375 16.975C20.5625 17.275 20.3167 17.5167 20 17.7L13 21.725C12.6833 21.9083 12.35 22 12 22C11.65 22 11.3167 21.9083 11 21.725L4 17.7Z"
                        fill="#1C1B1F"
                      />
                    </g>
                  </svg>

                  <h2 className="mx-2 text-[#1C1C1C] font-semibold text-md">
                    Package Selection
                  </h2>
                  <Tooltip
                    title="
                          Select the package that best fits this tactic
              "
                    arrow
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="h-4 ml-2 w-4 fill-gray-400"
                      aria-hidden="true"
                    >
                      <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                    </svg>
                  </Tooltip>
                  <span className="text-gray-400 text-sm font-normal ml-3 hideOn425"></span>
                </div>
                <ChevronUpIcon
                  className={`${open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-[#708090]`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="text-sm">
                <div className="screens px-4 cursor-pointer text-center flex items-center border-solid w-full flex-col">
                  <div
                    className="pt-2 pl-0 w-full pb-1 percy-unset-display !h-full"
                    style={{ height: "833" }}
                  >
                    <div className="w-full pr-0">
                      <div className="rounded-lg flex w-full justify-between pb-2 channelSR">
                        <div className="flex relative w-full mb-0 mr-3">
                          <div className="flex-1 flex flex-col">
                            {/* <div className="flex">
                              <svg
                                className="absolute mt-3 ml-2.5"
                                xmlns="http://www.w3.org/2000/svg"
                                width={17}
                                height={17}
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M17.9375 17.9453C17.8208 18.0602 17.6637 18.1247 17.5 18.125C17.334 18.1243 17.1747 18.06 17.0547 17.9453L13.6797 14.5625C12.2583 15.7564 10.4308 16.3555 8.57844 16.2348C6.72607 16.114 4.99182 15.2828 3.73738 13.9146C2.48294 12.5463 1.80518 10.7465 1.84545 8.89063C1.88571 7.03477 2.6409 5.2661 3.9535 3.9535C5.2661 2.6409 7.03477 1.88571 8.89063 1.84545C10.7465 1.80518 12.5463 2.48294 13.9146 3.73738C15.2828 4.99182 16.114 6.72607 16.2348 8.57844C16.3555 10.4308 15.7564 12.2583 14.5625 13.6797L17.9375 17.0547C17.9966 17.1128 18.0434 17.1822 18.0755 17.2586C18.1075 17.3351 18.124 17.4171 18.124 17.5C18.124 17.5829 18.1075 17.6649 18.0755 17.7414C18.0434 17.8178 17.9966 17.8872 17.9375 17.9453ZM9.0625 15C10.2368 15 11.3848 14.6518 12.3612 13.9993C13.3376 13.3469 14.0986 12.4196 14.548 11.3347C14.9974 10.2497 15.115 9.05591 14.8859 7.90415C14.6568 6.75239 14.0913 5.69443 13.2609 4.86405C12.4306 4.03368 11.3726 3.46819 10.2208 3.23909C9.06909 3.00999 7.87525 3.12757 6.79032 3.57696C5.70538 4.02636 4.77807 4.78738 4.12565 5.7638C3.47323 6.74022 3.125 7.88817 3.125 9.0625C3.12707 10.6366 3.75329 12.1456 4.86634 13.2587C5.97938 14.3717 7.48841 14.9979 9.0625 15Z"
                                  fill="#708090"
                                />
                              </svg>
                              <div
                                style={{
                                  border: "1px solid rgba(112, 128, 144, 0.40)",
                                }}
                                className=" focus-within:border-[#708090] bg-[#F7F9FB] hover:border-[#708090] kx-input  flex text-sm text-gray-900 rounded-lg px-3 py-2 pl-5 w-full"
                              >
                                <input
                                  className="flex-1 text-sm placeholder-gray-400 p-0 bg-transparent border-none focus:border-none active:border-none focus:shadow-none active:shadow-none focus-visible:outline-transparent disabled:cursor-not-allowed pl-5 w-full"
                                  type="text"
                                  name=""
                                  id=""
                                  placeholder="search by state, metros, cities and ZIP codes."
                                  autoComplete="off"
                                />
                              </div>
                            </div> */}
                          </div>
                        </div>
                        <div className="relative" ref={dropdownRef}>
                          <div
                            disabled={false}
                            id="headlessui-menu-button-52"
                            aria-haspopup="true"
                            aria-expanded="false"
                            className="cursor-pointer"
                          >
                            {/* <div>
                              <button
                                onClick={() => setIsOpenNone(!isOpenNone)}
                                type="button"
                                style={{
                                  border: "1px solid rgba(112, 128, 144, 0.4)",
                                }}
                                className="shadow-none h-9 flex items-center rounded-lg p-2  border dropDownNone button-category hover:border-[#708090]"
                              >
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center">
                                    <span className="text-sm font-normal truncate max-w-25 mr-3">
                                      None
                                    </span>
                                  </div>
                                  <span className="text-[#000]">
                                    <svg
                                      data-v-7309cd22=""
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={24}
                                      height={24}
                                      viewBox="0 0 24 24"
                                      className={`h-4 w-4 fill-[#000] mr-2 ${isOpenNone && "rotate-180"
                                        }`}
                                    >
                                      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
                                    </svg>
                                  </span>
                                </div>
                              </button>
                            </div> */}
                          </div>
                          {isOpenNone && (
                            <div className="max-h-62 absolute overflow-y-auto right-0 mt-1 rounded-lg shadow-sm bg-white border border-[#708090] focus:outline-none">
                              <div className="w-48">
                                <div className="text-gray-600 text-sm rounded-lg m-2 cursor-pointer hover:text-gray-900">
                                  <button
                                    type="button"
                                    className="flex w-full py-1.5 px-2 rounded-lg hover:bg-gray-100 dropdown-item"
                                    onClick={() => setIsOpenNone(false)}
                                  >
                                    <span className="text-sm text-gray-500 font-normal text-left">
                                      None
                                    </span>
                                  </button>
                                </div>
                              </div>
                              <div className="w-48">
                                <div className="text-gray-600 text-sm rounded-lg m-2 cursor-pointer hover:text-gray-900">
                                  <button
                                    type="button"
                                    className="flex w-full py-1.5 px-2 rounded-lg hover:bg-gray-100 dropdown-item"
                                    onClick={() => setIsOpenNone(false)}
                                  >
                                    <span className="text-sm text-gray-500 font-normal text-left">
                                      African American Focus
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Apps and channels content */}
                  <div className="appsAndChannelsCont flex sm:flex-row flex-col w-full ">
                    <div className="appsAndChannelsCont-left sm:w-[50%]  w-[100%] ">
                      <div className="topBar flex flex-row justify-between pr-4">
                        <span className="text-[#708090] text-sm">
                          Available Packages
                        </span>
                      </div>
                      <div className="box mt-3 border bg-white border-gray-400 min-h-[260px] max-h-[560px] channelItemsDiv overflow-y-auto sm:border-r-0 rounded-tl-lg rounded-bl-lg h-[90%] sm:rounded-tr-none rounded-tr-lg sm:rounded-br-none rounded-br-lg">
                        <div className="rounded-tl-lg flex justify-end px-3 py-2 w-full">
                          <span className="text-gray-500 text-xs">Pricing</span>
                        </div>
                        {/* ----------------------items */}

                        {
                          channelList.map((d, i) => {
                            return (
                              <div
                                key={i}
                                className={`flex justify-between w-full items-center px-3 py-2 hover:bg-slate-100 ${activeChannel == "Tubi TV" ? "bg-slate-100" : ""
                                  }`}
                                onClick={(val) => {
                                  changeEvent({ target: { name: 'inventory_package', value: [d.name] } })
                                  handleSelectChannel(
                                    "https://res.cloudinary.com/dwoutcpgd/image/fetch/r_45,c_lpad,h_200,w_200/f_png/https://images-na.ssl-images-amazon.com/images/I/51IadOuCxCL.png",
                                    d.name,
                                    "$20"
                                  )
                                }
                                }
                              >
                                <div className="flex flex-row items-center">
                                  <img
                                    src="https://res.cloudinary.com/dwoutcpgd/image/fetch/r_45,c_lpad,h_200,w_200/f_png/https://images-na.ssl-images-amazon.com/images/I/51IadOuCxCL.png"
                                    className="h-10 w-10 mr-3 rounded-lg border border-[#708090]"
                                  />
                                  <span className="w-[100px] text-left md:w-[200px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-sm text-gray-700">
                                    {d.name}
                                  </span>
                                  <span>
                                    {/* <span>
                                      <Tooltip title="Enjoy the largest library of popular movies and TV shows, all for free!">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width={24}
                                          height={24}
                                          viewBox="0 0 24 24"
                                          className="h-3.5 w-3.5 fill-gray-400 ml-1"
                                          aria-hidden="true"
                                        >
                                          <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                        </svg>
                                      </Tooltip>
                                    </span> */}
                                  </span>
                                </div>
                                <span className="text-gray-600 font-bold text-[17px]">
                                  $20
                                </span>
                              </div>
                            )
                          })
                        }


                        {/* <div
                          className={`flex justify-between w-full items-center px-3 py-2 hover:bg-slate-100 ${activeChannel == "View TV" ? "bg-slate-100" : ""
                            }`}
                          onClick={() =>
                            handleSelectChannel(
                              "https://res.cloudinary.com/dwoutcpgd/image/fetch/b_auto,r_45,c_pad,h_200,w_200/f_png/https://res.cloudinary.com/dwoutcpgd/image/upload/c_crop,h_280,w_280/v1663156422/Channels/tvplus-logo2_cpydbg.jpg",
                              "View TV",
                              "$20"
                            )
                          }
                        >
                          <div className="flex flex-row items-center">
                            <img
                              src="https://res.cloudinary.com/dwoutcpgd/image/fetch/r_45,c_lpad,h_200,w_200/f_png/https://images-na.ssl-images-amazon.com/images/I/41R1LU4PUKL.png"
                              className="h-10 w-10 mr-3 rounded-lg border border-[#708090]"
                            />
                            <span className="font-semibold text-sm text-gray-700">
                              Tubi TV
                            </span>
                            <span>
                              <Tooltip title="Enjoy the largest library of popular movies and TV shows, all for free!">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    className="h-3.5 w-3.5 fill-gray-400 ml-1"
                                    aria-hidden="true"
                                  >
                                    <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                  </svg>
                                </span>
                              </Tooltip>
                            </span>
                          </div>
                          <span className="text-gray-600 font-bold text-[17px]">
                            $20
                          </span>
                        </div>
                        <div
                          className={`flex justify-between w-full items-center px-3 py-2 hover:bg-slate-100 ${activeChannel == "Fox TV" ? "bg-slate-100" : ""
                            }`}
                          onClick={() =>
                            handleSelectChannel(
                              "https://res.cloudinary.com/dwoutcpgd/image/fetch/r_45,c_lpad,h_200,w_200/f_png/https://images-na.ssl-images-amazon.com/images/I/61tBZd25UIL.png",
                              "Fox TV",
                              "$20"
                            )
                          }
                        >
                          <div className="flex flex-row items-center">
                            <img
                              src="https://res.cloudinary.com/dwoutcpgd/image/fetch/r_45,c_lpad,h_200,w_200/f_png/https://images-na.ssl-images-amazon.com/images/I/61tBZd25UIL.png"
                              className="h-10 w-10 mr-3 rounded-lg border border-[#708090]"
                            />
                            <span className="font-semibold text-sm text-gray-700">
                              Tubi TV
                            </span>
                            <span>
                              <Tooltip title="Enjoy the largest library of popular movies and TV shows, all for free!">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    className="h-3.5 w-3.5 fill-gray-400 ml-1"
                                    aria-hidden="true"
                                  >
                                    <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                  </svg>
                                </span>
                              </Tooltip>
                            </span>
                          </div>
                          <span className="text-gray-600 font-bold text-[17px]">
                            3.2M
                          </span>
                        </div> */}
                        {/* ---------------- */}
                      </div>
                    </div>

                    <div className="appsAndChannelsCont-right sm:w-[50%] w-[100%]">
                      <div className="flex flex-row justify-between w-full items-center sm:mt-0 mt-3">
                        <span className="text-[#708090] text-sm">
                          Publishers{" "}
                        </span>
                        <span
                          className="text-black border-solid border-b border-[#000]"
                          onClick={handleUnSelectAll}
                        >
                          Unselect
                        </span>
                      </div>
                      <div className="overflow-y-auto mt-[11.5px] bg-white border-[#708090] border rounded-tr-lg rounded-br-lg h-[90%] sm:rounded-tl-none rounded-tl-lg sm:rounded-bl-none rounded-bl-lg">
                        {selectedChannel && (
                          <div className="flex justify-between w-full items-center px-3 py-2 hover:bg-slate-100">
                            <div className="flex flex-row items-center">
                              <img
                                src={selectedChannel?.imageSrc}
                                className="h-10 w-10 mr-3 rounded-lg border border-[#708090]"
                              />
                              <span className="w-[100px] sm:2-[200px] md:w-[90%] overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-sm text-gray-700">
                                {selectedChannel?.name}
                              </span>
                              <span>
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    className="h-3.5 w-3.5 fill-gray-400 ml-1"
                                    aria-hidden="true"
                                  >
                                    <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                  </svg>
                                </span>
                              </span>
                            </div>
                            <span className="text-gray-600 font-bold text-[17px]">
                              {selectedChannel.qty}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                <div className="w-full flex justify-start self-end p-4 py-5">
                  <button
                    onClick={() => setSelectedChannel("")}
                    type="button"
                    className="base-button bg-[#708090] flex items-center hover-tertiary text-white [&>svg]:enabled:fill-[#fff] disabled:cursor-default disabled:text-white [&>svg]:disabled:fill-[#fff] py-2 rounded-[1000px] px-4 text-sm [&>svg]:-ml-1 [&>svg]:mr-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <mask
                        id="mask0_46_2147"
                        style={{ maskType: "alpha" }}
                        maskUnits="userSpaceOnUse"
                        x={0}
                        y={0}
                        width={20}
                        height={20}
                      >
                        <rect width={20} height={20} fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_46_2147)">
                        <path
                          d="M10.0415 16.6666C8.18043 16.6666 6.5971 16.0208 5.29154 14.7291C3.98599 13.4375 3.33321 11.8611 3.33321 9.99998V9.85415L2.58321 10.6041C2.43043 10.7569 2.23599 10.8333 1.99988 10.8333C1.76377 10.8333 1.56932 10.7569 1.41654 10.6041C1.26377 10.4514 1.18738 10.2569 1.18738 10.0208C1.18738 9.7847 1.26377 9.59026 1.41654 9.43748L3.58321 7.27081C3.74988 7.10415 3.94432 7.02081 4.16654 7.02081C4.38877 7.02081 4.58321 7.10415 4.74988 7.27081L6.91654 9.43748C7.06932 9.59026 7.14571 9.7847 7.14571 10.0208C7.14571 10.2569 7.06932 10.4514 6.91654 10.6041C6.76377 10.7569 6.56932 10.8333 6.33321 10.8333C6.0971 10.8333 5.90266 10.7569 5.74988 10.6041L4.99988 9.85415V9.99998C4.99988 11.3889 5.48946 12.5694 6.46863 13.5416C7.44779 14.5139 8.63877 15 10.0415 15C10.2638 15 10.4825 14.9861 10.6978 14.9583C10.9131 14.9305 11.1249 14.8819 11.3332 14.8125C11.5693 14.743 11.7915 14.75 11.9999 14.8333C12.2082 14.9166 12.3679 15.0625 12.479 15.2708C12.5902 15.493 12.6006 15.7118 12.5103 15.9271C12.42 16.1423 12.2568 16.2847 12.0207 16.3541C11.7013 16.4653 11.3749 16.5451 11.0415 16.5937C10.7082 16.6423 10.3749 16.6666 10.0415 16.6666ZM9.95821 4.99998C9.73599 4.99998 9.51724 5.01387 9.30196 5.04165C9.08668 5.06942 8.87488 5.11804 8.66655 5.18748C8.43043 5.25692 8.20474 5.24998 7.98946 5.16665C7.77418 5.08331 7.61099 4.93748 7.49988 4.72915C7.38877 4.52081 7.37835 4.30901 7.46863 4.09373C7.55891 3.87845 7.71516 3.73609 7.93738 3.66665C8.27071 3.55554 8.60404 3.4722 8.93738 3.41665C9.27071 3.36109 9.61099 3.33331 9.95821 3.33331C11.8193 3.33331 13.4027 3.97915 14.7082 5.27081C16.0138 6.56248 16.6665 8.13887 16.6665 9.99998V10.1458L17.4165 9.39581C17.5693 9.24304 17.7638 9.16665 17.9999 9.16665C18.236 9.16665 18.4304 9.24304 18.5832 9.39581C18.736 9.54859 18.8124 9.74303 18.8124 9.97915C18.8124 10.2153 18.736 10.4097 18.5832 10.5625L16.4165 12.7291C16.2499 12.8958 16.0554 12.9791 15.8332 12.9791C15.611 12.9791 15.4165 12.8958 15.2499 12.7291L13.0832 10.5625C12.9304 10.4097 12.854 10.2153 12.854 9.97915C12.854 9.74303 12.9304 9.54859 13.0832 9.39581C13.236 9.24304 13.4304 9.16665 13.6665 9.16665C13.9027 9.16665 14.0971 9.24304 14.2499 9.39581L14.9999 10.1458V9.99998C14.9999 8.61109 14.5103 7.43054 13.5311 6.45831C12.552 5.48609 11.361 4.99998 9.95821 4.99998Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                    <span className="font-normal">Reset</span>
                  </button>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export default TacticsPackageSelection;
