import { Tooltip } from "@mui/material";
import React from "react";
import UploadModal from "./FileUploadModal";
import { useState } from "react";

const TacticsAds = ({ selectChannel }) => {
  // UPLOAD MODAL
  let [isOpenUploadModal, setIsOpenUploadModal] = useState(false);
  function closeUploadModal() {
    setIsOpenUploadModal(false);
  }
  function openUploadModal() {
    setIsOpenUploadModal(true);
  }
  return (
    <>
      <div className="mb-9 bg-[#F7F9FB] w-full p-5 rounded-lg">
        <div className="flex items-center">
          <svg
            className="mr-2 w-5"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
          >
            <mask
              id="mask0_46_3490"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={24}
              height={24}
            >
              <rect width={24} height={24} fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_46_3490)">
              <path
                d="M11.7 18C10.1 17.9167 8.75 17.3 7.65 16.15C6.55 15 6 13.6167 6 12C6 10.3333 6.58333 8.91667 7.75 7.75C8.91667 6.58333 10.3333 6 12 6C13.6167 6 15 6.55 16.15 7.65C17.3 8.75 17.9167 10.1 18 11.7L15.9 11.075C15.6833 10.175 15.2167 9.4375 14.5 8.8625C13.7833 8.2875 12.95 8 12 8C10.9 8 9.95833 8.39167 9.175 9.175C8.39167 9.95833 8 10.9 8 12C8 12.95 8.2875 13.7833 8.8625 14.5C9.4375 15.2167 10.175 15.6833 11.075 15.9L11.7 18ZM12.9 21.95C12.75 21.9833 12.6 22 12.45 22H12C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12V12.45C22 12.6 21.9833 12.75 21.95 12.9L20 12.3V12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20H12.3L12.9 21.95ZM20.525 22.5L16.25 18.225L15 22L12 12L22 15L18.225 16.25L22.5 20.525L20.525 22.5Z"
                fill="#1C1B1F"
              />
            </g>
          </svg>
          <h2 className="mx-2 text-[#1C1C1C] font-semibold">Ads</h2>
          <Tooltip
            title="
              A campaign can include one set of targets and creative, or several, separated into different strategies.
              "
            arrow
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-gray-400"
              aria-hidden="true"
            >
              <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
            </svg>
          </Tooltip>
          <span className="ml-2 text-[#708090] text-sm font-medium">
            No Ads selected
          </span>
        </div>
        <div className="flex flex-wrap justify-between mt-5 gap-3">
          <div className="w-full flex flex-col items-stretch rounded bg-gray-50  mb-6">
            <div
              style={{
                borderBottom: "1px solid rgba(47, 43, 67, 0.10)",
                background:
                  "radial-gradient(137.05% 100.00% at 50.00% -0.00%, #FCD6FF 5.59%, #FFFDD7 62.66%, #FFF 100%)",
              }}
              className="h-40 overflow-y-auto"
            >
              <div className="flex flex-col w-full" />
            </div>
          </div>
          <div
            className="w-full clear-uploader flex flex-col items-stretch"
            onClick={openUploadModal}
          >
            <label className=" upload focus:border-[#4338ca] border-solid border-2 border-[#708090] px-3 py-5 rounded-lg upload--text">
              <div className="upload-dragger">
                <div className="flex h-full flex-col gap-2">
                  <div className="flex flex-col items-center my-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={21}
                        height={21}
                        viewBox="0 0 21 21"
                        fill="none"
                      >
                        <path
                          d="M16.8828 9.964C16.9991 10.0835 17.0636 10.2441 17.0621 10.4109C17.0606 10.5777 16.9934 10.7372 16.875 10.8546L10.4687 17.2531C9.64822 18.0736 8.53536 18.5345 7.37498 18.5345C6.2146 18.5345 5.10174 18.0736 4.28123 17.2531C3.46072 16.4325 2.99976 15.3197 2.99976 14.1593C2.99976 12.9989 3.46072 11.8861 4.28123 11.0656L12.039 3.20619C12.3261 2.90354 12.6708 2.66142 13.0529 2.49409C13.4349 2.32677 13.8467 2.23763 14.2637 2.23192C14.6808 2.22622 15.0948 2.30406 15.4813 2.46087C15.8678 2.61768 16.219 2.85029 16.5142 3.14497C16.8094 3.43965 17.0426 3.79044 17.2001 4.17668C17.3576 4.56291 17.4362 4.97677 17.4312 5.39385C17.4263 5.81093 17.3379 6.2228 17.1712 6.60517C17.0046 6.98754 16.7631 7.33268 16.4609 7.62025L8.7031 15.4796C8.5297 15.6557 8.32293 15.7954 8.09489 15.8907C7.86685 15.9859 7.62211 16.0348 7.37498 16.0343C7.00347 16.0352 6.64006 15.9258 6.33087 15.7198C6.02168 15.5138 5.78065 15.2206 5.63835 14.8775C5.49606 14.5343 5.45892 14.1566 5.53165 13.7923C5.60438 13.4279 5.7837 13.0934 6.04685 12.8312L12.5547 6.22181C12.611 6.15865 12.6795 6.10757 12.7562 6.07169C12.8328 6.03581 12.9159 6.01587 13.0005 6.01307C13.0851 6.01027 13.1694 6.02468 13.2482 6.05542C13.3271 6.08616 13.3988 6.13259 13.4592 6.19189C13.5196 6.2512 13.5673 6.32215 13.5994 6.40043C13.6315 6.47872 13.6474 6.56272 13.6461 6.64733C13.6448 6.73195 13.6263 6.81541 13.5918 6.89268C13.5573 6.96994 13.5075 7.03939 13.4453 7.09681L6.93748 13.714C6.87824 13.7721 6.83115 13.8413 6.79896 13.9178C6.76676 13.9943 6.75012 14.0764 6.74998 14.1593C6.75227 14.2823 6.79034 14.4019 6.85954 14.5036C6.92873 14.6052 7.02605 14.6845 7.1396 14.7318C7.25314 14.779 7.37799 14.7921 7.49888 14.7696C7.61977 14.747 7.73146 14.6897 7.82029 14.6046L15.5703 6.73744C15.7464 6.56403 15.8861 6.35726 15.9814 6.12922C16.0766 5.90118 16.1254 5.65644 16.125 5.40931C16.1259 5.0378 16.0164 4.6744 15.8105 4.36521C15.6045 4.05602 15.3113 3.81498 14.9681 3.67269C14.625 3.53039 14.2472 3.49325 13.8829 3.56598C13.5186 3.63871 13.1841 3.81803 12.9219 4.08119L5.17185 11.9484C4.86921 12.2354 4.62709 12.5801 4.45976 12.9622C4.29244 13.3443 4.20329 13.756 4.19759 14.1731C4.19188 14.5901 4.26973 15.0041 4.42654 15.3906C4.58335 15.7771 4.81595 16.1284 5.11063 16.4236C5.40532 16.7188 5.75611 16.952 6.14235 17.1095C6.52858 17.267 6.94244 17.3455 7.35952 17.3406C7.7766 17.3356 8.18846 17.2472 8.57084 17.0805C8.95321 16.9139 9.29835 16.6724 9.58592 16.3702L15.9922 9.964C16.1107 9.84664 16.2707 9.7808 16.4375 9.7808C16.6043 9.7808 16.7643 9.84664 16.8828 9.964Z"
                          fill="#1C1C1C"
                        />
                      </svg>

                      <span className="text-[#1C1C1C] font-medium text-sm">
                        Upload Ad
                      </span>
                    </div>

                    {selectChannel == "streamingTv" ||
                      selectChannel == "onlineVideo" ? (
                      <>
                        <div className="text-sm font-medium text-gray-600">
                          <span className="text-indigo-600">
                            Upload a video File
                          </span>
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Resolution recommended: 1920x1080
                        </div>

                        <div className="text-xs text-center text-gray-500">
                          Resolution minimum possible: 1280x720
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Video bitrate recommended: 3000 Kbps
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Video bitrate minimum possible: 1500 Kbps
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Video container format: mp4
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Duration recommended: 15, 30, 60 seconds
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Audio bitrate: 44 kbps, 2-channel stereo
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Maximum file sizes: 100Mb
                        </div>
                      </>
                    ) : selectChannel == "display" ? (
                      <>
                        <div className="text-sm font-medium text-gray-600">
                          <span className="text-indigo-600">
                            Upload Display File
                          </span>
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Banner resolution : 320×50
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Medium Rectangle resolution: 300×250
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Interstitial vertical resolution: 320×480
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Interstitial horizontal resolution: 480×320
                        </div>
                      </>
                    ) : selectChannel == "audio" ? (
                      <>
                        <div className="text-sm font-medium text-gray-600">
                          <span className="text-indigo-600">
                            Upload Audio file
                          </span>
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Recomended file type: mp3
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Maximum audio file size: 50Mb
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Audio bitrate recommended: 196 Kbps
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Audio bitrate minimum possible: 128 Kbps
                        </div>
                      </>
                    ) : selectChannel == "dooh" ? (
                      <>
                        <div className="text-sm font-medium text-gray-600">
                          <span className="text-indigo-600">
                            Upload Digital Out of Home file
                          </span>
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Only .mp4 formats up to 250Mb with resolutions:
                          1920x1080, 1080x1920, 384x128, 1366x768, 768x1364,
                          300x250, 320x50, 1920x960, 560x160, 160x600, 1280x720,
                          768x1366, 1366x780, 1360x768.
                        </div>
                      </>
                    ) : selectChannel == "mobileAppsAndGames" ? (
                      <>
                        <div className="text-xs text-center text-gray-500">
                          Aspect ratio: 9x16
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Resolution recommended: 1080x1920
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Resolution minimum possible: 720x1280
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Video bitrate recommended: 1500 Kbps
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Video bitrate minimum possible: 500 Kbps
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Video container format: mp4
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Duration recommended: 6, 15, 30 seconds
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Audio bitrate: 44 kbps, 2-channel stereo
                        </div>
                        <div className="text-xs text-center text-gray-500">
                          Maximum file sizes: 50Mb
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {isOpenUploadModal && (
        <UploadModal
          selectChannel={selectChannel}
          closeUploadModal={closeUploadModal}
          openUploadModal={openUploadModal}
          isOpenUploadModal={isOpenUploadModal}
        />
      )}
    </>
  );
};

export default TacticsAds;
