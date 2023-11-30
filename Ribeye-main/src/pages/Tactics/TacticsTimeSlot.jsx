import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Tooltip } from "@mui/material";
import { Switch } from "@headlessui/react";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import TimeZoneSelect from "../../components/Select/TimeZoneSelect/TimeZoneSelect"

const defaultValues = [0, 1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

const TacticsTimeSlot = ({ setPlacementFormValues, placementFormValues, enabled, setEnabled, changeEvent, inputValue }) => {

  return (
    <>
      <div className="w-full mb-9 mt-9 rounded-lg bg-[#F7F9FB] py-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex px-4 w-full justify-between rounded-lg py-4 text-left text-md text-[#1C1C1C] font-semibold">
                <div className="flex items-center">
                  <ScheduleIcon style={{ color: "#000" }} />
                  <h2 className="mx-2 text-[#1C1C1C] font-semibold">
                    Delivery Time Slots
                  </h2>
                  <Tooltip
                    title="
                          Enabling will prevent ads from serving between 2-6a
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
                </div>
                <ChevronUpIcon
                  className={`${open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-[#708090]`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2 text-sm ">
                <div className=" px-4 gap-2 cursor-pointer items-center flex w-full">
                  <div className=" bg-[#F7F9FB] w-full rounded-lg">
                    <div className="flex flex-col">
                      <div className="flex gap-6 items-start relative rounded-lg h-[max-content] w-full">
                        {/* <input
                          id="deliveryTimeSlot"
                          type="number"
                          name="day_hour_targets_tz"
                          value={inputValue}
                          onChange={changeEvent}
                          placeholder="Delivery Time Slot"
                          className="max-w-[100%] sm:max-w-[80%] w-full pl-3 pr-3 rounded-lg outline-0 border-solid focus:border-[#708090] border"
                        /> */}
                        <div className="flex gap-2 items-center">
                          <div className="flex flex-col">
                            <h2 className=" text-[#1C1C1C] font-semibold">
                              Block Overnight
                            </h2>
                            <Switch
                              checked={enabled}
                              onChange={(value) => {
                                if (value) {
                                  const newTargets = { ...placementFormValues.day_hour_targets }
                                  for (let day in newTargets) {
                                    newTargets[day] = defaultValues;
                                  }
                                  setPlacementFormValues(prevState => ({ ...prevState, day_hour_targets: newTargets }))
                                }
                                else {
                                  setPlacementFormValues(prevState => ({
                                    ...prevState, day_hour_targets:
                                    {
                                      1: [
                                      ],
                                      2: [

                                      ],
                                      3: [

                                      ],
                                      4: [

                                      ],
                                      5: [

                                      ],
                                      6: [

                                      ],
                                      7: []
                                    }
                                  }))
                                }
                                setEnabled(value)
                              }}
                              className={`mt-2 ${enabled ? "bg-[#000]" : "bg-gray-400"
                                }
          relative inline-flex h-[18px] w-[34px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                              <span className="sr-only">Use setting</span>
                              <span
                                aria-hidden="true"
                                className={`${enabled ? "translate-x-4" : "translate-x-0"
                                  }
            pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                              />
                            </Switch>
                          </div>

                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <h2 className="mb-2 text-[#1C1C1C] font-semibold">
                              UTC offset
                            </h2>
                          </div>
                          <TimeZoneSelect placementFormValues={placementFormValues} changeEvent={changeEvent} />
                        </div>
                      </div>
                    </div>
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

export default TacticsTimeSlot;
