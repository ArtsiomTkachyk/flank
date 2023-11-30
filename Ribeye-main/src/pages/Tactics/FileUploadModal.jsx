import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "@mui/icons-material/Close";
import TvIcon from "@mui/icons-material/Tv";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import StayCurrentLandscapeIcon from "@mui/icons-material/StayCurrentLandscape";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import "./style.css";

export default function MyModal({
  closeUploadModal,
  openUploadModal,
  isOpenUploadModal,
  selectChannel,
}) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openUploadModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpenUploadModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeUploadModal}
          style={{ width: "100vw", height: "100vh" }}
        >
          <div className="flex items-center justify-center min-h-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="min-w-[85%] min-h-[91vh] max-h-[91vh] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all shadow-2xl modalMain overflow-y-scroll overflow-x-auto ">
                <div className="flex flex-row justify-between">
                  <h3 className="font-bold text-[#374151] text-[19px]">
                    New Ad
                  </h3>
                  <div
                    className="w-50px py-1 hover:bg-indigo-50 px-1 rounded-[6px] cursor-pointer"
                    onClick={closeUploadModal}
                  >
                    <CloseIcon style={{ color: "lightgray" }} />
                  </div>
                </div>

                <div className="flex mt-8 flex-col">
                  <span className="block text-gray-500">Ad name</span>
                  <div className="input-error border-red-default focus-within:border-red-default hover:border-red-default bg-white hover:border-gray-300 kx-input border flex w-full text-sm text-gray-900 rounded-lg px-3 py-2">
                    <input
                      className="flex w-full text-sm placeholder-gray-400 p-0 bg-transparent border-none focus:shadow-none active:shadow-none focus-visible:outline-transparent disabled:cursor-not-allowed"
                      type="text"
                    />
                  </div>
                </div>

                {/* FILE UPLOAD DIV */}
                <div className="clear-uploader flex flex-col items-stretch mt-8">
                  <label
                    htmlFor="fileUploadMod"
                    className="upload focus:border-[#708090] border-dashed border-2 px-3 py-5 rounded-lg upload--text"
                    tabIndex={0}
                  >
                    <div className="upload-dragger">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col items-center my-2 space-y-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            className="h-8 w-8 fill-indigo-600 mb-4"
                          >
                            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
                          </svg>
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
                                1920x1080, 1080x1920, 384x128, 1366x768,
                                768x1364, 300x250, 320x50, 1920x960, 560x160,
                                160x600, 1280x720, 768x1366, 1366x780, 1360x768.
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
                          {/* <div className="text-sm font-medium text-gray-600">
                            <span className="text-indigo-600">
                              Upload a video file
                            </span>
                          </div>
                          <div className="text-xs text-center text-gray-500">
                            MP4 up to 500MB <br /> 1280px minimum width - 16:9
                            ratio only - 30 sec max{" "}
                          </div> */}
                        </div>
                      </div>
                    </div>

                    <input
                      className="upload__input"
                      type="file"
                      id="fileUploadMod"
                      name="file"
                      accept="video/mp4"
                    />
                  </label>
                </div>
                {/* UPLOAD END */}
                <div className="flex rounded-lg w-full mt-4 min-h-[600px]">
                  <div className="min-h-full min-w-[300px] max-w-[300px] border rounded-tl-2xl rounded-bl-2xl">
                    <div className="text-[#a0a3ac] flex flex-row px-6 py-5 gap-x-3 font-semibold text-[17px]">
                      <TvIcon />
                      Television
                    </div>
                    <div className="text-[#a0a3ac] flex flex-row px-6 py-5 gap-x-3 font-semibold text-[17px]">
                      <SmartphoneIcon />
                      Mobile
                    </div>
                    <div className="text-[#a0a3ac] flex flex-row px-6 py-5 gap-x-3 font-semibold text-[17px]">
                      <StayCurrentLandscapeIcon />
                      Tablet
                    </div>
                  </div>
                  <div>
                    <img
                      className="default-state-poster bg-no-repeat w-full min-w-[800px]"
                      src="https://app.vibe.co/img/1d82eab4.jpg"
                      alt=""
                      style={{
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-end mt-12 gap-x-5 items-center">
                  <div
                    className="px-4 py-1 rounded-xl bg-indigo-50 cursor-pointer text-indigo-800 font-semibold hover:shadow-md"
                    onClick={closeUploadModal}
                  >
                    <CloseIcon style={{ fontSize: "17px" }} />
                    <span className="ml-2">Cancel</span>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-[#d1d5db] cursor-pointer text-white font-semibold">
                    <ChromeReaderModeIcon style={{ fontSize: "17px" }} />
                    <span className="ml-2">Create ad</span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
