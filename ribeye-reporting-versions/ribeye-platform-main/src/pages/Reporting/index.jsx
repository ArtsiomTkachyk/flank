import { useEffect, useMemo, useRef } from "react";
import ads_click from "../../assets/icons/ads_click.svg";
import local_atm from "../../assets/icons/local_atm.svg";
import totalCampaign from "../../assets/icons/totalCampaign.svg";
import track_changes from "../../assets/icons/track_changes.svg";
import ImpressionLineChart from "../../components/Charts/ImpressionLineChart";
//Date Component
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

//Select Box
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import dData from "../../../dummyMINI.json";
import Table from "./Table";
import moment from "moment/moment";
import HeatMap from "../../components/HeatMap/HeatMap";
import { listBoxItems } from "./constants";
import Card from "../../components/shared/Card";
import autoAnimate from "@formkit/auto-animate";

const Reporting = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState({ ["Campaign Name"]: "Select..." });
  const [showFilter, setShowFilter] = useState(false);
  const [listboxSelected, setListboxSelected] = useState({
    label: "State",
    value: "Region",
  });
  const [firstDate, setFirstDate] = useState("");
  const [secondDate, setSecondDate] = useState("");
  const [selectedAdvertisments, setSelectAdvertiser] = useState({
    Advertiser: "Select...",
  });
  const [advertiserdata, setAdvertiserData] = useState([]);

  const [totalImpressions, setTotalImpressions] = useState(0);
  const [totalReach, setTotalReach] = useState(0);
  const [totalFrequency, setTotalFrequency] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [message, setMessage] = useState("");

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const fDate = new Date(firstDate);
  const sDate = new Date(secondDate);

  const momentFDate = moment(fDate).format("MM.DD.YYYY").toString();
  const momentSDate = moment(sDate).format("MM.DD.YYYY").toString();

  const dateFiltered = dData.filter((val) => {
    // console.log(val['Report Date'], 'REport Date');
    return (
      momentFDate <= val["Report Date"] && momentSDate >= val["Report Date"]
    );
  });
  const checkIfDatePresentArray = useMemo(
    () =>
      dateFiltered.length === 0 &&
      momentFDate === "Invalid date" &&
      momentSDate === "Invalid date"
        ? dData
        : dateFiltered.length === 0 &&
          momentFDate !== "Invalid date" &&
          momentSDate !== "Invalid date"
        ? []
        : dateFiltered,
    [dateFiltered, momentFDate, momentSDate]
  );

  useEffect(() => {
    const tImpressions = checkIfDatePresentArray.reduce(
      (a, c) => a + c.Impressions,
      0
    );
    setTotalImpressions(tImpressions);
    const tReach = checkIfDatePresentArray.reduce((a, c) => a + c.Reach, 0);
    setTotalReach(tReach);

    const tFrequency = checkIfDatePresentArray.reduce((a, c) => {
      return a + c.Frequency;
    }, 0);
    setTotalFrequency(tFrequency);

    const tRevenue = checkIfDatePresentArray.reduce((a, c) => a + c.Revenue, 0);
    setTotalRevenue(tRevenue);
  }, [
    checkIfDatePresentArray,
    selectedAdvertisments,
    selected,
    totalImpressions,
    totalFrequency,
    totalReach,
    totalRevenue,
  ]);

  const [impressionsByDate, setImpressionsByDate] = useState({});
  const [sameAdvertisers, setSameAdvertisers] = useState({});
  const [sameAdvertisersReach, setSameAdvertisersReach] = useState({});
  const [sameAdvertisersRevenue, setSameAdvertisersRevenue] = useState({});
  const [sameAdvertisersFrequency, setSameAdvertisersFrequency] = useState({});
  const [sameCampaign, setSameCampaign] = useState({});
  const [sameCampaignReach, setSameCampaignReach] = useState({});
  const [sameCampaignRevenue, setSameCampaignRevenue] = useState({});
  const [sameCampaignFrequency, setSameCampaignFrequency] = useState({});

  const filterdCampaigns = checkIfDatePresentArray.filter((val) => {
    return val.Advertiser?.includes(selectedAdvertisments.Advertiser);
  });

  const [show, setShow] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShow(!show);

  useEffect(() => {
    // Calculate the total impressions for each date
    const impressions = checkIfDatePresentArray.reduce((acc, item) => {
      const { "Report Date": Date, Impressions } = item;
      acc[Date] = (acc[Date] || 0) + Impressions;
      return acc;
    }, {});

    setImpressionsByDate(impressions);

    // Same Advertisers and their Impressions

    const sAdvertisers = checkIfDatePresentArray.reduce((acc, item) => {
      const { Advertiser, Impressions } = item;
      acc[Advertiser] = (acc[Advertiser] || 0) + Impressions;
      return acc;
    }, {});
    setSameAdvertisers(sAdvertisers);

    // Same Advertisers Reach

    const sAdvertisersReach = checkIfDatePresentArray.reduce((acc, item) => {
      const { Advertiser, Reach } = item;
      acc[Advertiser] = (acc[Advertiser] || 0) + Reach;
      return acc;
    }, {});

    setSameAdvertisersReach(sAdvertisersReach);

    // Same Advertisers Revenue

    const sAdvertisersRevenue = checkIfDatePresentArray.reduce((acc, item) => {
      const { Advertiser, Revenue } = item;
      acc[Advertiser] = (acc[Advertiser] || 0) + Revenue;
      return acc;
    }, {});

    setSameAdvertisersRevenue(sAdvertisersRevenue);

    // Same Advertisers Frequency

    const sAdvertisersFrequency = checkIfDatePresentArray.reduce(
      (acc, item) => {
        const { Advertiser, Frequency } = item;
        acc[Advertiser] = (acc[Advertiser] || 0) + Number(Frequency);
        return acc;
      },
      {}
    );

    setSameAdvertisersFrequency(sAdvertisersFrequency);
  }, [
    selectedAdvertisments,
    selected,
    totalImpressions,
    totalFrequency,
    totalReach,
    totalRevenue,
  ]);

  useEffect(() => {
    // */ Campaign==================================================

    // Same Campaign and their impressions
    const sCampaign = filterdCampaigns.reduce((acc, item) => {
      const { ["Campaign Name"]: Campaign, Impressions } = item;
      acc[Campaign] = (acc[Campaign] || 0) + Impressions;
      return acc;
    }, {});
    setSameCampaign(sCampaign);

    // Same Campaign Reach

    const sCampaignReach = filterdCampaigns.reduce((acc, item) => {
      const { ["Campaign Name"]: Campaign, Reach } = item;
      acc[Campaign] = (acc[Campaign] || 0) + Reach;
      return acc;
    }, {});

    setSameCampaignReach(sCampaignReach);

    // Same Campaign Revenue

    const sCampaignRevenue = filterdCampaigns.reduce((acc, item) => {
      const { ["Campaign Name"]: Campaign, Revenue } = item;
      acc[Campaign] = (acc[Campaign] || 0) + Revenue;
      return acc;
    }, {});

    setSameCampaignRevenue(sCampaignRevenue);

    // Same Campaign Frequency

    const sCampaignFrequency = filterdCampaigns.reduce((acc, item) => {
      const { ["Campaign Name"]: Campaign, Frequency } = item;
      acc[Campaign] = (acc[Campaign] || 0) + Number(Frequency);
      return acc;
    }, {});

    setSameCampaignFrequency(sCampaignFrequency);
  }, [
    selectedAdvertisments,
    selected,
    totalImpressions,
    totalFrequency,
    totalReach,
    totalRevenue,
  ]);

  // Chart Data
  const chartDataInArray = Object.entries(impressionsByDate).map(
    ([key, value]) => ({
      Date: key,
      Impressions: value,
    })
  );

  // Same Impression Array
  const sameAdvertiserArray = Object.entries(sameAdvertisers).map(
    ([key, value]) => ({
      Advertiser: key,
      Impressions: value,
    })
  );

  // Same Reach Array
  const sameAdvertiserReachArray = Object.entries(sameAdvertisersReach).map(
    ([key, value]) => ({
      Advertiser: key,
      Reach: value,
    })
  );

  // Same Frequency Array
  const sameAdvertiserFrequencyArray = Object.entries(
    sameAdvertisersFrequency
  ).map(([key, value]) => ({
    Advertiser: key,
    Frequency: value,
  }));

  // Same Revenue Array
  const sameAdvertiserRevenueArray = Object.entries(sameAdvertisersRevenue).map(
    ([key, value]) => ({
      Advertiser: key,
      Revenue: value,
    })
  );

  // * Campaign ======================================================

  // Same Campaign and Impressions Array
  const sameCampaignArray = Object.entries(sameCampaign).map(
    ([key, value]) => ({
      ["Campaign Name"]: key,
      Impressions: value,
    })
  );

  // Same Reach Array
  const sameCampaignReachArray = Object.entries(sameCampaignReach).map(
    ([key, value]) => ({
      ["Campaign Name"]: key,
      Reach: value,
    })
  );

  // Same Frequency Array
  const sameCampaignFrequencyArray = Object.entries(sameCampaignFrequency).map(
    ([key, value]) => ({
      ["Campaign Name"]: key,
      Frequency: value,
    })
  );

  // Same Revenue Array
  const sameCampaignRevenueArray = Object.entries(sameCampaignRevenue).map(
    ([key, value]) => ({
      ["Campaign Name"]: key,
      Revenue: value,
    })
  );

  const dateObjects = chartDataInArray.map((val) => {
    const [month, day, year] = val.Date.split(".").map(Number);
    return new Date(year, month - 1, day); // Month is 0-indexed in Date constructor (0 for January)
  });

  // Sort the Date objects in descending order
  dateObjects.sort((a, b) => a - b);

  // Convert the sorted Date objects back to the desired format 'MM.DD.YYYY'
  const sortedDates = dateObjects.map((date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month.toString().padStart(2, "0")}.${day
      .toString()
      .padStart(2, "0")}.${year}`;
  });

  const chartData = {
    labels: sortedDates,
    datasets: [
      {
        label: "By Day",
        data: chartDataInArray.map((val) => val.Impressions),
        backgroundColor: ["#708090"],
      },
    ],
  };

  return (
    <>
      <div className="w-full space-y-10 px-4 py-6">
        <div ref={parent}>
          <div className="flex items-center justify-between">
            <button
              className={`normal-case ${
                showFilter ? "hidden" : "inline-block"
              } px-2 py-2 rounded-md  gap-1 bg-slate-400 hover:bg-slate-500 active:bg-slate-700 self-end transition-colors text-white`}
              onClick={() => {
                setShow(true);
                setShowFilter(true);
              }}
            >
              <span className="flex items-center gap-2">
                <FunnelIcon className="h-4 w-4" /> Filter
              </span>
            </button>
            <button
              onClick={() => {
                setShow(false);
                setShowFilter(false);
              }}
              className={`${
                showFilter ? "inline-block" : "hidden"
              } ml-auto mb-3  text-white rounded-full bg-slate-400 hover:bg-slate-500 active:bg-slate-700 h-8 w-8 `}
            >
              <XMarkIcon />
            </button>
          </div>

          {showFilter && show && (
            <div className="h-max pb-8 space-y-5  bg-[#F7F9FB]  px-4   flex-wrap mb-7 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5">
                <div className="pt-4 col-span-1">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <h2 className="text-[#1C1C1C] font-semibold ">
                      Select Start Date
                      {/* <label htmlFor="endDate" className=" font-semibold  block"> Select Date</label> */}
                    </h2>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        id="startDate"
                        // label="Select Start Date"
                        format="MM.DD.YYYY"
                        sx={{
                          // width: '45%',
                          background: "#fff",
                          borderRadius: "8px",
                          // height: "50px",
                          // overflow: 'hidden',
                          border: "0px 1px 1px 1px solid black",
                        }}
                        size="small"
                        minDate={""}
                        maxDate={""}
                        value={firstDate}
                        className="sm:w-[288px] w-full"
                        onChange={(newValue) => {
                          setSelectAdvertiser({ Advertiser: "Select..." });
                          setFirstDate(newValue);
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {moment(fDate).format("MM.DD.YYYY").toString() >
                    moment(sDate).format("MM.DD.YYYY").toString() &&
                    firstDate !== "" && (
                      <p className="text-red-500">Select a valid Start Date</p>
                    )}
                </div>
                <div className="pt-4 col-span-1">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <h2 className="text-[#1C1C1C] font-semibold ">
                      Select End Date
                    </h2>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        id="endDate"
                        // label="Select End Date"
                        format="MM.DD.YYYY"
                        sx={{
                          // width: '45%',
                          background: "#fff",
                          borderRadius: "8px",
                        }}
                        size="small"
                        minDate={""}
                        maxDate={""}
                        value={secondDate}
                        className="sm:w-[288px] w-full border-2 rounded-lg "
                        onChange={(newValue) => {
                          setSelectAdvertiser({ Advertiser: "Select..." });
                          setSecondDate(newValue);
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {moment(fDate).format("MM.DD.YYYY").toString() >
                    moment(sDate).format("MM.DD.YYYY").toString() &&
                    secondDate !== "" && (
                      <p className="text-red-500">Select a valid End Date</p>
                    )}
                </div>

                <div className="pt-4 col-span-1">
                  {/* <Advertiser /> */}
                  <h2 className="text-[#1c1c1c] font-semibold mb-2">
                    Select Advertisers
                  </h2>
                  <div className=" ">
                    <Listbox
                      disabled={checkIfDatePresentArray.length === 0}
                      value={selectedAdvertisments}
                      onClick={() =>
                        setSelected({ ["Campaign Name"]: "Select..." })
                      }
                      onChange={setSelectAdvertiser}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button
                          className={`${
                            checkIfDatePresentArray.length === 0
                              ? "cursor-not-allowed text-slate-400"
                              : "cursor-pointer"
                          } w-full rounded-lg border-2 bg-white py-[10px] h-[42px] pl-3 pr-10 text-left focus:outline-none focus-visible:border-[#708090] focus-visible:ring-2 hover:border-slate-400 transition-colors focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm  border-gray-300`}
                        >
                          <span className="block truncate">
                            {selectedAdvertisments.Advertiser}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                              className="-mr-1 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm">
                            <>
                              {sameAdvertiserArray.map((item, itemIndex) => (
                                <Listbox.Option
                                  key={itemIndex}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-gray-200
                            }`
                                  }
                                  value={item}
                                >
                                  {({ selectedAdvertisments }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selectedAdvertisments
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {item.Advertiser}
                                      </span>
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </>
                            {/* )} */}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>
                <div className="pt-4 col-span-1">
                  <h2 className="text-[#1c1c1c] font-semibold mb-2">
                    Select Campaigns
                  </h2>
                  <div className="">
                    <Listbox
                      disabled={
                        selectedAdvertisments.Advertiser === "Select..." ||
                        checkIfDatePresentArray.length === 0
                      }
                      value={selected}
                      onChange={setSelected}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button
                          className={`${
                            selectedAdvertisments.Advertiser === "Select..." ||
                            checkIfDatePresentArray.length === 0
                              ? "text-slate-400 cursor-not-allowed"
                              : "text-black cursor-pointer"
                          } w-full rounded-lg border-2 bg-white py-[10px] h-[42px] pl-3 pr-10 text-left hover:border-slate-400 transition-colors focus:outline-none focus-visible:border-[#708090] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm  border-gray-300`}
                        >
                          <span className="block truncate">
                            {selectedAdvertisments.Advertiser === "Select..."
                              ? "Select Advertise First"
                              : selected["Campaign Name"]}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                              className="-mr-1 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm">
                            <>
                              {sameCampaignArray.map((item, itemIndex) => (
                                <Listbox.Option
                                  key={itemIndex}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-gray-200
                            }`
                                  }
                                  value={item}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {item["Campaign Name"]}
                                      </span>
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </>
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>
              </div>
              {/* Date */}
              {(momentFDate !== "Invalid date" ||
                momentSDate !== "Invalid date" ||
                selectedAdvertisments.Advertiser !== "Select..." ||
                selected["Campaign Name"] !== "Select...") && (
                <div className="text-left text-slate-800">
                  <div className="flex items-center justify-start gap-3">
                    {momentFDate === momentSDate ? (
                      momentFDate !== "Invalid date" && (
                        <div className="px-2 space-x-2 border border-slate-400 hover:border-slate-600 transition-colors  flex items-center  rounded-md ">
                          <p>{momentFDate}</p>
                          <button
                            onClick={() => {
                              setFirstDate("");
                              setSecondDate("");
                            }}
                            className="h-4 w-4"
                          >
                            <XMarkIcon />
                          </button>
                        </div>
                      )
                    ) : (
                      <div className="flex items-center justify-start gap-3">
                        {momentFDate !== "Invalid date" && (
                          <div className="px-2 space-x-2 border border-slate-400 hover:border-slate-600 transition-colors  flex items-center  rounded-md ">
                            <p>{momentFDate}</p>
                            <button
                              onClick={() => setFirstDate("")}
                              className="h-4 w-4"
                            >
                              <XMarkIcon />
                            </button>
                          </div>
                        )}
                        {momentSDate !== "Invalid date" && (
                          <div className="px-2 space-x-2 border border-slate-400 hover:border-slate-600 transition-colors  flex items-center  rounded-md ">
                            <p>{momentSDate}</p>
                            <button
                              onClick={() => setSecondDate("")}
                              className="h-4 w-4"
                            >
                              <XMarkIcon />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    {selectedAdvertisments.Advertiser !== "Select..." &&
                      checkIfDatePresentArray.length !== 0 && (
                        <div className="px-2 space-x-2 border border-slate-400 hover:border-slate-600 transition-colors  flex items-center  rounded-md ">
                          <p>
                            {selectedAdvertisments.Advertiser.length > 17
                              ? selectedAdvertisments.Advertiser.slice(0, 18) +
                                "..."
                              : selectedAdvertisments.Advertiser}
                          </p>
                          <button
                            onClick={() =>
                              setSelectAdvertiser({ Advertiser: "Select..." })
                            }
                            className="h-4 w-4"
                          >
                            <XMarkIcon />
                          </button>
                        </div>
                      )}
                    {selected["Campaign Name"] !== "Select..." &&
                      selectedAdvertisments.Advertiser !== "Select..." &&
                      checkIfDatePresentArray.length !== 0 && (
                        <div className="px-2 space-x-2 border border-slate-400 hover:border-slate-600 transition-colors  flex items-center  rounded-md ">
                          <p>
                            {selected["Campaign Name"].length > 17
                              ? selected["Campaign Name"].slice(0, 18) + "..."
                              : selected["Campaign Name"]}
                          </p>
                          <button
                            onClick={() =>
                              setSelected({ "Campaign Name": "Select..." })
                            }
                            className="h-4  w-4"
                          >
                            <XMarkIcon />
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          {/* <h1 className="font-bold text-4xl text-center mb-4">Statistics</h1> */}
          <div className="flex flex-wrap gap-x-3 gap-y-5 justify-between">
            <div className="flex w-full sm:w-[47%] md:w-[24%] min-w-[250px] min-h-[100px] justify-center rounded-lg bg-[#E3F5FF] shadow-shadowInset10 flex-col px-4 py-2 border border-solid border-[rgba(112, 128, 144, 0.10)]">
              <h2 className="text-base font-semibold">Impressions</h2>
              <div className="w-full text-[#000] flex justify-between ">
                <span className="text-2xl font-semibold">
                  {selectedAdvertisments.Advertiser === "Select..."
                    ? totalImpressions
                    : selectedAdvertisments.Advertiser !== "Select..." &&
                      selected["Campaign Name"] === "Select..."
                    ? selectedAdvertisments.Impressions
                    : sameCampaignArray
                        .filter(
                          (val) =>
                            val["Campaign Name"] === selected["Campaign Name"]
                        )
                        .map((val) => val.Impressions)}
                </span>
                <img src={totalCampaign} alt="campaign" />
              </div>
            </div>

            <div className="flex w-full sm:w-[47%] md:w-[24%] min-w-[250px] min-h-[100px] justify-center rounded-lg bg-[#E5ECF6] shadow-shadowInset10 flex-col px-4 py-2 border border-solid border-[rgba(112, 128, 144, 0.10)]">
              <h2 className="text-base font-semibold">Reach</h2>
              <div className="w-full text-[#000] flex justify-between ">
                <span className="text-2xl font-semibold">
                  {selectedAdvertisments.Advertiser === "Select..."
                    ? totalReach
                    : selectedAdvertisments.Advertiser !== "Select..." &&
                      selected["Campaign Name"] === "Select..."
                    ? sameAdvertiserReachArray
                        .filter(
                          (val) =>
                            val.Advertiser === selectedAdvertisments.Advertiser
                        )
                        .map((val) => val.Reach)
                    : sameCampaignReachArray
                        .filter(
                          (val) =>
                            val["Campaign Name"] === selected["Campaign Name"]
                        )
                        .map((val) => val.Reach)}
                </span>
                <img src={track_changes} alt="track changes" />
              </div>
            </div>

            <div className="flex w-full sm:w-[47%] md:w-[24%] min-w-[250px] min-h-[100px] justify-center rounded-lg bg-[#E3F5FF] shadow-shadowInset10 flex-col px-4 py-2 border border-solid border-[rgba(112, 128, 144, 0.10)]">
              <h2 className="text-base font-semibold">Frequency</h2>
              <div className="w-full text-[#000] flex justify-between ">
                <span className="text-2xl font-semibold">
                  {selectedAdvertisments.Advertiser === "Select..."
                    ? totalFrequency.toFixed(1)
                    : selectedAdvertisments.Advertiser !== "Select..." &&
                      selected["Campaign Name"] === "Select..."
                    ? sameAdvertiserFrequencyArray
                        .filter(
                          (val) =>
                            val.Advertiser === selectedAdvertisments.Advertiser
                        )
                        .map((val) => val.Frequency.toFixed(1))
                    : sameCampaignFrequencyArray
                        .filter(
                          (val) =>
                            val["Campaign Name"] === selected["Campaign Name"]
                        )
                        .map((val) => val.Frequency.toFixed(1))}
                </span>
                <img src={ads_click} alt="ads" />
              </div>
            </div>

            <div className="flex w-full sm:w-[47%] md:w-[24%] min-w-[250px] min-h-[100px] justify-center rounded-lg bg-[#E5ECF6] shadow-shadowInset10 flex-col px-4 py-2 border border-solid border-[rgba(112, 128, 144, 0.10)]">
              <h2 className="text-base font-semibold">Budget Spent</h2>
              <div className="w-full text-[#000] flex justify-between ">
                <span className="text-2xl font-semibold">
                  {selectedAdvertisments.Advertiser === "Select..."
                    ? totalRevenue.toFixed(3)
                    : selectedAdvertisments.Advertiser !== "Select..." &&
                      selected["Campaign Name"] === "Select..."
                    ? sameAdvertiserRevenueArray
                        .filter(
                          (val) =>
                            val.Advertiser === selectedAdvertisments.Advertiser
                        )
                        .map((val) => val.Revenue.toFixed(3))
                    : sameCampaignRevenueArray
                        .filter(
                          (val) =>
                            val["Campaign Name"] === selected["Campaign Name"]
                        )
                        .map((val) => val.Revenue.toFixed(3))}
                </span>
                <img src={local_atm} alt="local atm" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full my-5 flex  flex-col overflow-x-hidden mt-9">
          <div className="flex justify-between gap-x-[10px] items-center mb-6"></div>
          <Card>
            <div className="p-7 pt-4 ">
              <h2 className="text-[#171725] text-4xl mb-5 text-center font-bold">
                Impressions
              </h2>
              <ImpressionLineChart chartData={chartData} />
            </div>
          </Card>
        </div>
        <div className="my-20 ">
          {selectedAdvertisments.Advertiser !== "Select..." && (
            <>
              <div className="max-w-[12rem]">
                <Listbox value={listboxSelected} onChange={setListboxSelected}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                        Selection type
                      </Listbox.Label>
                      <div className="relative mt-2">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                          <span className="flex items-center">
                            <span className="ml-3 h-5 block truncate">
                              {listboxSelected.label}
                            </span>
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {listBoxItems.map((val) => (
                              <Listbox.Option
                                key={val.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-indigo-600 text-white"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                  )
                                }
                                value={val}
                              >
                                {({ listboxSelected, active }) => (
                                  <>
                                    <div className="flex items-center">
                                      <span
                                        className={classNames(
                                          listboxSelected
                                            ? "font-semibold"
                                            : "font-normal",
                                          "ml-3 block truncate"
                                        )}
                                      >
                                        {val.label}
                                      </span>
                                    </div>

                                    {listboxSelected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-indigo-600",
                                          "absolute inset-y-0 right-0 flex items-center pr-4"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
              <div className="mb-20">
                {listboxSelected.label !== "Select..." && (
                  <HeatMap
                    value={listboxSelected.value}
                    data={checkIfDatePresentArray}
                    selectedAdvertiser={selectedAdvertisments}
                  />
                )}
              </div>
            </>
          )}
        </div>
        <div>
          {/* Table related Data */}
          <Table
            date={dateFiltered}
            data={checkIfDatePresentArray}
            selectedAdvertiser={selectedAdvertisments}
          />
        </div>
      </div>
    </>
  );
};

export default Reporting;
