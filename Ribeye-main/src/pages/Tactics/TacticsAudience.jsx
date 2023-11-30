import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Tooltip } from "@mui/material";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

//Import MUI


import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const TacticsAudience = ({ setPlacementFormValues, placementFormValues }) => {
  const isAudienceDataSet = useRef(false)
  const [audienceData, setAudienceData] = useState([])
  const [selectedAudiences, setSelectedAudiences] = useState([]);
  const [audienceVisitors, setAudienceVisitors] = useState([])
  const [filteredAudienceData, setFilteredAudienceData] = useState([]);

  //Handling the Price Slider Filter
  const values = audienceData.map(obj => obj.client_price_cpm);

  //  minimum and maximum values
  const minValue = Math.min(...values);   //0.3
  const maxValue = Math.max(...values);   //18
  const [sliderValue, setSliderValue] = useState([minValue, maxValue]);

  const [searchQuery, setSearchQuery] = useState("");

  const [deviceType, setDeviceType] = useState('');

  //Handling the Value by Device Type
  const handleChange = (event) => {
    let dropDownValue = event.target.value;
    setDeviceType(dropDownValue.toLowerCase());
    // if (event.target.value === "" && sliderValue === 0.3) {
    //   setFilteredAudienceData(audienceData)
    //   return
    // }
    // const filteredResults = audienceData.filter((item) => item.audience_device_type === dropDownValue);
    // console.log(filteredResults)
    // setFilteredAudienceData(filteredResults);

  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);


    // if (newValue === 18) {
    //   setFilteredAudienceData(audienceData)
    //   return
    // }
    // if (newValue === 0.3 && deviceType === "") {
    //   setFilteredAudienceData(audienceData)
    //   return
    // }

    // const filteredResults = audienceData.filter((item) => item.client_price_cpm <= newValue);
    // console.log("filteredResults", filteredResults)

    // setFilteredAudienceData(filteredResults);

  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // const filteredResults = audienceData.filter((item) =>
    //   item.audience_name.toLowerCase().includes(query.toLowerCase())
    // );
    // setFilteredAudienceData(filteredResults);
  };

  useEffect(() => {
    let filteredData1;
    let filteredData2;
    let filteredData3;

    if (sliderValue[0] === 0.3 && sliderValue[1] === 18) {
      filteredData1 = audienceData;
    } else {
      filteredData1 = audienceData.filter((item) => {
        return item.client_price_cpm >= sliderValue[0] && item.client_price_cpm <= sliderValue[1]
      });
      // filteredData1 = audienceData.filter((item) => item.client_price_cpm <= sliderValue);
    }
    if (deviceType !== "" && deviceType !== "all") {
      filteredData2 = filteredData1.filter((item) => item.audience_device_type.toLowerCase() === deviceType);
    } else {
      filteredData2 = filteredData1;
    }

    filteredData3 = filteredData2.filter((item) =>
      item.audience_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredAudienceData(filteredData3)
  }, [sliderValue, searchQuery, deviceType])


  //  unique values
  const uniqueValues = [...new Set(values)];  //67 values



  // console.log("uniqueValues", uniqueValues)


  useEffect(() => {
    const checkedItems = [];
    if (placementFormValues.third_party_audiences.length > 0 && audienceData.length > 0 && !isAudienceDataSet.current) {
      isAudienceDataSet.current = true;

      audienceData.forEach((el) => {
        const isVisitorsChecked = placementFormValues.third_party_audiences?.includes(el.public_identifier);
        if (isVisitorsChecked) {
          checkedItems.push(el);
        }
      });

      setSelectedAudiences(checkedItems)

    }
  }, [audienceData, placementFormValues])


  useEffect(() => {
    axios
      .get(
        `https://ribeye-one.vercel.app/api/v1/third-party-audiences?client_api_ref=WMZKSZES&audience_type=android`,
      )
      .then((res) => {
        setFilteredAudienceData(res.data.data)
        setAudienceData(res.data.data);
      });
  }, [])

  useEffect(() => {
    axios
      .get(
        `https://ribeye-one.vercel.app/api/v1/audiences/7e745961-158c-48ef-b61c-af3143a38d98`,

      )
      .then((res) => {
        setAudienceVisitors(res.data.data);
      });
  }, [])

  // console.log(audienceData)

  return (
    <>
      <div className="w-full rounded-lg bg-[#F7F9FB] py-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex px-4 w-full justify-between rounded-lg py-4 text-left text-md text-[#1C1C1C] font-semibold">
                <div className="flex items-center">
                  <div className="flex items-center">
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
                        d="M12 8.62501C12 8.62501 13.864 8.62501 15.182 9.94303C15.182 9.94303 16.5 11.261 16.5 13.125C16.5 13.125 16.5 14.989 15.182 16.307C15.182 16.307 13.864 17.625 12 17.625C12 17.625 10.136 17.625 8.81802 16.307C8.81802 16.307 7.5 14.989 7.5 13.125C7.5 13.125 7.5 11.261 8.81802 9.94303C8.81802 9.94303 10.136 8.62501 12 8.62501ZM12 10.125C12 10.125 10.7574 10.125 9.87868 11.0037C9.87868 11.0037 9 11.8824 9 13.125C9 13.125 9 14.3676 9.87868 15.2463C9.87868 15.2463 10.7574 16.125 12 16.125C12 16.125 13.2426 16.125 14.1213 15.2463C14.1213 15.2463 15 14.3676 15 13.125C15 13.125 15 11.8824 14.1213 11.0037C14.1213 11.0037 13.2426 10.125 12 10.125Z"
                        fill="#1C1C1C"
                      />
                      <path
                        d="M22.274 13.5737C22.3931 13.733 22.5708 13.8388 22.7677 13.8673C22.8032 13.8724 22.8391 13.875 22.875 13.875L22.8763 13.875C23.0377 13.8747 23.1947 13.8224 23.324 13.7258C23.5135 13.5842 23.625 13.3615 23.625 13.125L23.625 13.1164C23.6231 12.9575 23.5709 12.8033 23.4758 12.676L23.4751 12.6752C22.5736 11.4694 21.227 10.7961 21.227 10.7961C19.8799 10.1225 18.3738 10.125 18.3738 10.125L18.375 10.125C18.7892 10.125 19.125 10.4608 19.125 10.875C19.125 11.2886 18.7902 11.6241 18.3767 11.625L22.274 13.5737Z"
                        fill="#1C1C1C"
                      />
                      <path
                        d="M3.44384 12.1377C4.47305 11.6231 5.62375 11.625 5.62375 11.625L5.6248 11.625C5.63639 11.625 5.64819 11.6247 5.65977 11.6242C5.84603 11.6156 6.02238 11.5379 6.15444 11.4062C6.29533 11.2658 6.37467 11.0752 6.375 10.8763L6.375 10.8752C6.375 10.8299 6.37088 10.7844 6.36271 10.7398C6.29751 10.3841 5.98783 10.1256 5.62625 10.125L5.625 10.125C4.11958 10.1228 2.77302 10.7961 2.77302 10.7961C1.42638 11.4694 0.524888 12.6752 0.524888 12.6752L0.524345 12.6759C0.427356 12.8057 0.375 12.9632 0.375 13.125L0.375041 13.1329C0.37539 13.1662 0.377954 13.1994 0.382716 13.2323C0.411176 13.4292 0.516675 13.6067 0.676004 13.7258C0.805645 13.8227 0.963152 13.875 1.125 13.875C1.13503 13.875 1.14505 13.8748 1.15507 13.8744C1.38084 13.8654 1.59049 13.755 1.72575 13.574C2.41463 12.6523 3.44384 12.1377 3.44384 12.1377Z"
                        fill="#1C1C1C"
                      />
                      <path
                        d="M14.786 18.4259C16.064 19.2241 16.7254 20.5777 16.7254 20.5777L16.7258 20.5786C16.8516 20.8362 17.1134 21 17.4 21L17.4205 20.9997C17.5276 20.9968 17.6328 20.9709 17.7291 20.9239C17.9866 20.7982 18.15 20.5366 18.15 20.25L18.1497 20.2295C18.1468 20.1224 18.1209 20.0172 18.0739 19.9209C17.2239 18.1804 15.5806 17.1537 15.5806 17.1537C13.9374 16.1274 12 16.1274 12 16.1274C10.0626 16.1274 8.41936 17.1537 8.41936 17.1537C6.77641 18.1798 5.92633 19.9203 5.92633 19.9203C5.87626 20.0229 5.84999 20.1359 5.84999 20.25L5.85005 20.2598C5.85109 20.3394 5.86483 20.4185 5.89074 20.4938C5.95542 20.6819 6.09217 20.8367 6.27091 20.9239C6.37339 20.974 6.48594 21 6.59999 21L6.61721 20.9998C6.89756 20.9934 7.1509 20.8311 7.27394 20.5791C7.93538 19.2245 9.21395 18.4259 9.21395 18.4259C10.4925 17.6274 12 17.6274 12 17.6274C13.5074 17.6274 14.786 18.4259 14.786 18.4259Z"
                        fill="#1C1C1C"
                      />
                      <path
                        d="M7.26176 6.33438C7.70944 6.81089 7.83204 7.45312 7.83204 7.45312C7.86933 7.6485 7.98272 7.82107 8.14725 7.93285C8.27158 8.01732 8.41842 8.06249 8.56873 8.06249L8.5736 8.06247C8.61916 8.06218 8.6646 8.05773 8.70936 8.04919C9.06296 7.98169 9.31874 7.67248 9.31874 7.31249L9.31872 7.30826C9.31846 7.26249 9.31402 7.21683 9.30543 7.17187C9.10111 6.10149 8.35497 5.3073 8.35497 5.3073C7.60884 4.51312 6.55328 4.24248 6.55328 4.24248C5.49772 3.97185 4.4615 4.30906 4.4615 4.30906C3.42528 4.64627 2.73116 5.48629 2.73116 5.48629C2.03703 6.32632 1.90119 7.40752 1.90119 7.40752C1.76535 8.48872 2.2301 9.47435 2.2301 9.47435C2.69486 10.46 3.61545 11.043 3.61545 11.043C4.53572 11.6259 5.6248 11.625 5.6248 11.625L5.62575 11.625C5.82466 11.6248 6.01534 11.5456 6.15585 11.4048C6.29618 11.2642 6.375 11.0739 6.375 10.8752L6.37498 10.8742C6.37456 10.4603 6.03892 10.125 5.625 10.125L5.62422 10.125C4.9704 10.1257 4.41805 9.77582 4.41805 9.77582C3.86569 9.42598 3.58684 8.83461 3.58684 8.83461C3.30799 8.24323 3.38949 7.59451 3.38949 7.59451C3.471 6.94579 3.88747 6.44177 3.88747 6.44177C4.30395 5.93776 4.92568 5.73543 4.92568 5.73543C5.54741 5.53311 6.18074 5.69549 6.18074 5.69549C6.81408 5.85787 7.26176 6.33438 7.26176 6.33438Z"
                        fill="#1C1C1C"
                      />
                      <path
                        d="M19.5819 9.77582C19.0296 10.1257 18.3758 10.125 18.3758 10.125L18.375 10.125C18.3633 10.125 18.3515 10.1253 18.3397 10.1258L17.6258 10.9103C17.6346 11.0965 17.7124 11.2728 17.8441 11.4048C17.9846 11.5456 18.1753 11.6248 18.3742 11.625L18.375 11.625C19.4643 11.6259 20.3845 11.043 20.3845 11.043C21.3051 10.46 21.7699 9.47435 21.7699 9.47435C22.2346 8.48872 22.0988 7.40752 22.0988 7.40752C21.963 6.32632 21.2688 5.48629 21.2688 5.48629C20.5747 4.64627 19.5385 4.30906 19.5385 4.30906C18.5023 3.97185 17.4467 4.24248 17.4467 4.24248C16.3912 4.51312 15.645 5.3073 15.645 5.3073C14.8989 6.10149 14.6946 7.17186 14.6946 7.17186C14.6857 7.21822 14.6813 7.2653 14.6813 7.31249C14.6813 7.33503 14.6823 7.35755 14.6843 7.38C14.7144 7.71338 14.9618 7.98643 15.2906 8.04919C15.337 8.05804 15.3841 8.06249 15.4313 8.06249C15.4538 8.06249 15.4763 8.06147 15.4988 8.05945C15.8321 8.02931 16.1052 7.78191 16.168 7.45312C16.2906 6.81089 16.7382 6.33438 16.7382 6.33438C17.1859 5.85787 17.8193 5.69549 17.8193 5.69549C18.4526 5.53311 19.0743 5.73543 19.0743 5.73543C19.696 5.93776 20.1125 6.44177 20.1125 6.44177C20.529 6.94579 20.6105 7.59451 20.6105 7.59451C20.692 8.24323 20.4132 8.83461 20.4132 8.83461C20.1343 9.42598 19.5819 9.77582 19.5819 9.77582Z"
                        fill="#1C1C1C"
                      />
                    </svg>
                    <h2 className="text-[#1C1C1C] ml-2 font-semibold text-[17px]">
                      Audiences
                    </h2>
                    <Tooltip
                      title="
                          Select the audience that you would like to target
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
                  <span className="text-gray-400 text-sm font-normal ml-3 hideOn425">
                    No audience segment selected
                  </span>
                </div>
                <ChevronUpIcon
                  className={`${open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-[#708090]`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="pt-4 pb-3 text-sm ">
                <div className="flex-col px-4 cursor-pointer  flex  w-full">

                  <h2 className="font-medium mt-0 text-sm text-black ">Selected Audiences</h2>

                  <div className="mb-4 max-h-[300px] overflow-auto w-full flex flex-col">
                    {
                      // selectedAudiences.map((elem, i) => {
                      audienceData.length && audienceData.map((elem, i) => {
                        const isVisitorsChecked = placementFormValues.third_party_audiences?.includes(elem.public_identifier);

                        if (!isVisitorsChecked) return null;

                        return (
                          <label
                            key={i}
                            htmlFor={i}
                            className="w-full mt-3 flex cursor-pointer select-none justify-between gap-y-2 items-center border-[#708090] border h-max rounded-lg  py-3 px-4 flex-wrap"
                          >
                            <div className="flex items-center">
                              <input
                                checked={isVisitorsChecked}
                                type="checkbox"
                                id={i}


                                onChange={(e) => {
                                  const newValueWhiteListed = e.target.checked
                                    ? [...(placementFormValues.third_party_audiences || []), elem.public_identifier]
                                    : (placementFormValues.third_party_audiences || []).filter(id => id !== elem.public_identifier);

                                  const newValueWhiteListed2 = e.target.checked
                                    ? [...(selectedAudiences || []), elem]
                                    : (selectedAudiences || []).filter(el => el.public_identifier !== elem.public_identifier);

                                  setPlacementFormValues(prev => ({
                                    ...prev,
                                    third_party_audiences: newValueWhiteListed,
                                  }));

                                  setSelectedAudiences(newValueWhiteListed2)
                                }}

                                className="h-4 w-4 mr-3 ml-2 appearance-none border border-gray-200 focus:ring-0 focus:ring-offset-0 rounded bg-gray-100 form-checkbox"
                              />
                              <span className="text-style text-sm text-black relative ">
                                {elem.audience_name}
                              </span>
                            </div>

                          </label>
                        )
                      })
                    }
                  </div>
                  <h5 className="font-medium mt-3 text-sm text-black mb-4 ">
                    Predefined audiences
                  </h5>
                  <div className="flex items-center gap-x-5 flex-wrap pb-2 pt-2">

                    <div className="flex justify-center items-center gap-x-2">
                      <span className="-mt-1 mr-3">{minValue}</span>
                      <Box sx={{ width: 300 }}>
                        <Slider value={sliderValue}
                          onChange={handleSliderChange}
                          valueLabelDisplay="auto"
                          min={minValue}
                          max={maxValue}
                          step={0.01} />
                        {/* <Slider min={1} max={9} step={8} /> */}
                      </Box>

                      <span className="-mt-1 ml-3">{maxValue}</span>


                    </div>
                    <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                      <InputLabel id="demo-select-small-label">Device</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={deviceType}
                        label="Device"
                        onChange={handleChange}
                      >
                        {/* <MenuItem value="">
                          <em>All</em>
                        </MenuItem> */}
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="android">Andriod</MenuItem>
                        <MenuItem value="ipv4">Ipv4</MenuItem>
                      </Select>
                    </FormControl>
                  </div>


                  <input type="text"
                    className="w-full px-4 py-2 border border-[#1C1C1C] text-[#1C1C1C] rounded-lg focus:outline-none focus:border-[#1C1C1C]"
                    value={searchQuery}
                    placeholder="Search..."
                    onChange={handleSearch}
                    name="" id="" />
                  <div className="mt-[10px] max-h-[300px] overflow-auto w-full flex flex-col">

                    {
                      filteredAudienceData.length ?
                        filteredAudienceData.map((elem, i) => {
                          const isVisitorsChecked = placementFormValues.third_party_audiences?.includes(elem.public_identifier);

                          if (isVisitorsChecked) return null

                          return (
                            <label
                              key={i}
                              htmlFor={i}
                              className="w-full mt-3 flex cursor-pointer select-none justify-between gap-y-2 items-center border-[#708090] border h-max rounded-lg  py-3 px-4 flex-wrap"
                            >
                              <div className="w-full flex items-center">
                                <input
                                  checked={isVisitorsChecked}
                                  type="checkbox"
                                  id={i}


                                  onChange={(e) => {
                                    const newValueWhiteListed = e.target.checked
                                      ? [...(placementFormValues.third_party_audiences || []), elem.public_identifier]
                                      : (placementFormValues.third_party_audiences || []).filter(id => id !== elem.public_identifier);

                                    const newValueWhiteListed2 = e.target.checked
                                      ? [...(selectedAudiences || []), elem]
                                      : (selectedAudiences || []).filter(el => el.public_identifier !== elem.public_identifier);

                                    setPlacementFormValues(prev => ({
                                      ...prev,
                                      third_party_audiences: newValueWhiteListed,
                                    }));
                                    setSelectedAudiences(newValueWhiteListed2)
                                  }}

                                  className="h-4 w-4 mr-3 ml-2 appearance-none border border-gray-200 focus:ring-0 focus:ring-offset-0 rounded bg-gray-100 form-checkbox"
                                />
                                <div className="flex items-start justify-between w-full gap-x-3">

                                  <span className="text-style text-sm text-black relative ">
                                    {elem.audience_name}
                                    &gt;
                                  </span>
                                  <span className="w-10">
                                    $ {elem.client_price_cpm}

                                  </span>
                                </div>
                              </div>

                            </label>
                          )
                        })
                        :
                        <p>Search not found</p>
                    }
                  </div>


                  <h5 className="font-medium mt-9 text-sm text-black">
                    Custom audiences
                  </h5>
                  <div className="mt-[10px] h-[300px] overflow-auto w-full flex flex-col">

                    {
                      audienceVisitors.map((elem, i) => {
                        const isVisitorsChecked = placementFormValues.audience_whitelisted?.includes(elem.public_identifier);

                        return (
                          <label
                            key={i}
                            // htmlFor={i}
                            className="w-full mt-3 flex cursor-pointer select-none justify-between gap-y-2 items-center border-[#708090] border rounded-lg overflow-hidden py-3 px-4 min-h-[44px] flex-wrap"
                          >
                            <div className="flex items-center">
                              <input
                                checked={isVisitorsChecked}
                                type="checkbox"
                                id={i}


                                onChange={(e) => {
                                  const newValueWhiteListed = e.target.checked
                                    ? [...(placementFormValues.audience_whitelisted || []), elem.public_identifier]
                                    : (placementFormValues.audience_whitelisted || []).filter(id => id !== elem.public_identifier);

                                  setPlacementFormValues(prev => ({
                                    ...prev,
                                    audience_whitelisted: newValueWhiteListed,
                                  }));
                                }}

                                className="h-4 w-4 mr-3 ml-2 appearance-none border border-gray-200 focus:ring-0 focus:ring-offset-0 rounded bg-gray-100 form-checkbox"
                              />
                              <span className="text-style text-sm text-black relative ">
                                {elem.name}
                              </span>
                            </div>
                            <div className=" flex items-center p-1 rounded-md h-6">

                            </div>
                          </label>
                        )
                      })
                    }
                  </div>

                </div>
                <div className="w-full flex justify-start self-end p-4">
                  <button
                    onClick={() => {
                      setPlacementFormValues(prev => ({
                        ...prev,
                        third_party_audiences: [],
                        audience_whitelisted: []
                      }));
                    }}
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
                    <span className="font-normal">Reset Audiences</span>
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

export default TacticsAudience;