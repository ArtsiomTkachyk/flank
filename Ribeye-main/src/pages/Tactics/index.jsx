import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import { Disclosure } from "@headlessui/react";
import Tooltip from "@mui/material/Tooltip";
import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows";
import "./style.css";
import arrow_forward from "../../assets/icons/arrow_forward.svg";

// Import custom components
import {
  DeliveryEstimate,
  TacticsChannels,
  TacticsName,
  TacticsDate,
  TacticsBudget,
  TacticsAudience,
  TacticsLocation,
  TacticsPackageSelection,
  TacticsAds,
  TacticsTimeSlot,
} from "./components";

// Import Redux-related functions and hooks

import {
  createPlacement,
  emptyPlacement,
  getSinglePlacement
} from "../../store/slices/placementSlice";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCampaign } from "../../store/slices/campaignSlice";
import isEmpty from "../../helpers/is-empty";
import { toast } from "react-toastify";

// Import data
import countriesData from "../../store/data/countries.json"
import citiesData from "../../store/data/cities.json"
import dmaData from "../../store/data/dma.json"
import regionData from "../../store/data/region.json"
import zipCodeData from "../../store/data/zipcode.json"

// Import utility component
import Loader from "../../utils/Loader";

// default placement value
const defaultPlacementValue = {
  name: "Some name",
  start_date: "",
  end_date: "",
  status: "active",
  bid_type_id: "5302e400-5d22-0137-d982-48d705cd3063",
  bid: 5,
  placement_optimization_goal_id: "90d357a8-0f86-442e-838a-f703c2f89816",
  placement_optimization_goal_value: 2,
  max_bid_amount: 2,
  budget_period: "total",
  budget: "",
  pacing_type: "evenly",
  impressions_limit: 0,
  countries: [

  ],
  day_hour_targets: {
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
  },
  day_hour_targets_tz: -12,
  dmas: [
  ],
  languages: [
  ],
  languages_target_mode: "",
  regions: [
  ],
  cities: [
  ],
  postal_codes: [
  ],
  location_radius_target: 5,
  reward_tagret: "non-rewarded",
  carriers: [
  ],
  creative_type: "",
  connection_types: [
  ],
  device_types: [
  ],
  device_makes: [
  ],
  device_models: [
  ],
  os_versions: [
    8
  ],
  os: [
    2
  ],
  traffic_types_target_mode: "",
  countries_target_mode: "",
  dmas_target_mode: "",
  regions_target_mode: "",
  cities_target_mode: "",
  postal_codes_target_mode: "",
  carriers_target_mode: "",
  connection_types_target_mode: "",
  device_types_target_mode: "",
  device_makes_target_mode: "",
  device_models_target_mode: "",
  os_versions_target_mode: "",
  os_target_mode: "",
  location_target_mode: "",
  traffic_types: [
    "3e3cdac6-b04d-1e0c-7d9b-d0d73be50fe0"
  ],
  exchanges: [

  ],
  deals: [

  ],
  content_tags: [

  ],
  content_tags_target_mode: "",
  categories: [

  ],
  categories_target_mode: "",
  publisher_lists_whitelisted: [

  ],
  publisher_lists_blacklisted: [

  ],
  audience_whitelisted: [
  ],
  audience_blacklisted: [

  ],
  third_party_audiences: [

  ],
  inventory_package: [],
  impression_cap_monthly: 0,
  impression_cap_hourly: 0,
  impression_cap_daily: 0,
  impression_cap_weekly: 0,
  click_cap_monthly: 0,
  click_cap_daily: 0,
  location_targets: [
    [
      23.3454,
      12.34554
    ]
  ],
  pixel_urls: [

  ],
  campaign_public_identifier: "",
  creatives: [
  ]

}

// Data for Block Overnight
const defaultValues = [0, 1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

const Tactics = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { singleCampaign } = useSelector(state => state.campaign)
  const { singlePlacement,
    placementLoading,
    loading
  } = useSelector(state => state.placement)
  const [selectedChannel, setSelectedChannel] = useState("");
  const csvUploaderRef = useRef()
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [matchingZipCodes, setMatchingZipCodes] = useState([]);
  const [startDateValidation, setStartDateValidation] = useState(false);
  const [endDateValidation, setEndDateValidation] = useState(false);
  const [placementFormValues, setPlacementFormValues] = useState({
    ...defaultPlacementValue
  })
  const [activePlacement, setActivePlacement] = useState(params.tactic_public_identifier)
  const [enabled, setEnabled] = useState(false);
  const [selectAudienceListItem, setSelectAudienceListItem] = useState([])
  const [editingPlacementId, setEditingPlacementId] = useState("");
  const [editingPlacementIdx, setEditingPlacementIdx] = useState(-1);

  useEffect(() => {
    setPlacementFormValues((prev) => ({ ...prev, campaign_public_identifier: params.public_identifier }))
  }, [params]);

  useEffect(() => {
    if (params.tactic_public_identifier) {
      dispatch(getSinglePlacement({ public_identifier: params.tactic_public_identifier }));
      setEditingPlacementId(params.tactic_public_identifier);
    }
  }, [params]);

  useEffect(() => {
    setPlacementFormValues(defaultPlacementValue)
  }, [])

  useEffect(() => {
    dispatch(emptyPlacement())
  }, [])



  // can be use in future

  // if (placementFormValues.day_hour_targets_tz !== '' && !enabled) {
  //   const newTargets = { ...placementFormValues.day_hour_targets }

  //   for (let day in newTargets) {
  //     newTargets[day] = [parseInt(placementFormValues.day_hour_targets_tz)];
  //   }
  //   setPlacementFormValues(prevState => ({ ...prevState, day_hour_targets: newTargets }))
  // }
  // else if (
  //   enabled
  // ) {
  // const newTargets = { ...placementFormValues.day_hour_targets }
  // for (let day in newTargets) {
  //   newTargets[day] = defaultValues;
  // }
  // setPlacementFormValues(prevState => ({ ...prevState, day_hour_targets: newTargets }))

  // }
  // console.log("enabled", enabled)
  // }, [enabled]);



  useEffect(() => {
    if (params.public_identifier) {
      dispatch(getSingleCampaign({
        campaignId: params.public_identifier
      }))
    }
  }, [params])


  useEffect(() => {
    if (!isEmpty(singlePlacement)) {
      setPlacementFormValues(singlePlacement)
      if (csvUploaderRef.current) {
        csvUploaderRef.current.value = ''
      }
      if (!isEmpty(singlePlacement.day_hour_targets[1])) {
        const newTargets = { ...placementFormValues.day_hour_targets }
        setEnabled(true)
        for (let day in newTargets) {
          newTargets[day] = defaultValues;
        }
        setPlacementFormValues(prevState => ({ ...prevState, day_hour_targets: newTargets }))
      }
      else {
        setEnabled(false)
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
      setMatchingZipCodes([])

      if (singlePlacement.creative_type === 'video_ctv' && singlePlacement.digital_channel === "ctv") {
        setSelectChannel('streamingTv');
        setCheckedScreens(['TV'])
      } else if (singlePlacement.creative_type === 'video_mobile' && singlePlacement.digital_channel === "web") {
        setSelectChannel('onlineVideo');
        // setCheckedScreens(['TV'])
      } else if (singlePlacement.creative_type === 'video_ctv' && singlePlacement.digital_channel === "ctv") {
        setSelectChannel("streamingTv")
      }

      let data = [];

      singlePlacement.cities.forEach(el => {
        const foundElement = citiesData.find(el2 => el2.year === el);
        data.push(foundElement)
      })

      singlePlacement.countries.forEach(el => {
        const foundElement = countriesData.find(el2 => el2.id === el);
        data.push(foundElement)
      })

      singlePlacement.regions.forEach(el => {
        const foundElement = regionData.find(el2 => el2.id === el);
        data.push(foundElement)
      });

      singlePlacement.dmas.forEach(el => {
        const foundElement = dmaData.find(el2 => el2.id === el);
        data.push(foundElement)
      });

      singlePlacement.postal_codes.forEach(el => {
        const foundElement = zipCodeData.find(el2 => el2.id === el);
        data.push(foundElement)
      });

      setSelectedLocations(data)
    } else {
      setPlacementFormValues(defaultPlacementValue);
      // setSelectedLocations([])
      setCheckedScreens([]);
      setSelectChannel("");
      if (csvUploaderRef.current) {
        csvUploaderRef.current.value = ''
      }
      setMatchingZipCodes([])
      // setSelectedChannel("")
    }
  }, [singlePlacement])

  const inputChangeHandler = (e) => {
    let { name, value } = e.target;

    setPlacementFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };

    });
  }

  const handleStartDateChange = (value) => {

    if (new Date(value).getTime() < new Date(singleCampaign.start_date).getTime()) {
      setStartDateValidation(true)
    }
    setPlacementFormValues((prevState) => ({ ...prevState, start_date: value }));
  };

  const handleEndDateChange = (value) => {
    if (new Date(value).getTime() <= new Date(placementFormValues.start_date).getTime()) {
      setEndDateValidation(true)
    }
    else (
      setEndDateValidation(false)
    )
    setPlacementFormValues((prevState) => ({ ...prevState, end_date: value }));
  };


  const handleCreatePlacement = (e) => {
    e.preventDefault()

    let hasErrors = false;
    if (isEmpty(placementFormValues.name)) {
    }

    if (isEmpty(placementFormValues.start_date)) {
      // hasErrors = true; d
    }
    // if (isEmpty(checkedScreens)) {
    //   hasErrors = true;
    // }
    if (isEmpty(placementFormValues.end_date)) {
      // hasErrors = true; d
    }
    if (isEmpty(placementFormValues.budget)) {
      // hasErrors = true; d
    }
    if (isEmpty(selectedLocations)) {
      // hasErrors = true; d
    }

    if (hasErrors) {
      toast.error("All fields are required")
      return
    }

    let creative_type;
    let digital_channel;
    let creative_type2;
    let digital_channel2;
    let budget1 = Number(placementFormValues.budget);
    let budget2 = Number(placementFormValues.budget);
    let secondCall = false;
    let postal_codes = [];

    matchingZipCodes.forEach(zipCode => {
      postal_codes.push(zipCode.id);
    });

    if (selectChannel === "streamingTv" && checkedScreens.includes("TV") && checkedScreens.length === 1) {
      creative_type = "video_ctv";
      digital_channel = "ctv";
    }
    else if (selectChannel === "onlineVideo" && checkedScreens.length > 0) {
      creative_type = "video_mobile";
      digital_channel = "web";
    }
    else if (
      selectChannel === "streamingTv" && checkedScreens.length > 0
    ) {
      budget1 = .9 * budget1;
      budget2 = .1 * budget2;
      creative_type = "video_ctv";
      digital_channel = "ctv";
      creative_type2 = "video_mobile";
      digital_channel2 = "web";
      secondCall = true;
    }

    let formValues = { ...placementFormValues, creative_type, digital_channel, day_hour_targets_tz: Number(placementFormValues.day_hour_targets_tz), budget: budget1, postal_codes: [...placementFormValues.postal_codes, ...postal_codes] };

    formValues.start_date = formValues?.start_date?.$d
      ? new Date(formValues.start_date?.$d).toISOString().replace(/T.*/, "")
      : typeof formValues.start_date !== "object" && !!formValues.start_date
        ? formValues.start_date
        : "";

    formValues.end_date = formValues?.end_date?.$d
      ? new Date(formValues.end_date?.$d).toISOString().replace(/T.*/, "")
      : typeof formValues.end_date !== "object" && !!formValues.end_date
        ? formValues.end_date
        : "";


    let formValues2 = { ...placementFormValues, name: placementFormValues.name + "copy", creative_type: creative_type2, digital_channel: digital_channel2, day_hour_targets_tz: Number(placementFormValues.day_hour_targets_tz), budget: budget2, postal_codes: [...placementFormValues.postal_codes, ...postal_codes] };

    formValues2.start_date = formValues2?.start_date?.$d
      ? new Date(formValues2.start_date?.$d).toISOString().replace(/T.*/, "")
      : typeof formValues2.start_date !== "object" && !!formValues2.start_date
        ? formValues2.start_date
        : "";

    formValues2.end_date = formValues2?.end_date?.$d
      ? new Date(formValues2.end_date?.$d).toISOString().replace(/T.*/, "")
      : typeof formValues2.end_date !== "object" && !!formValues2.end_date
        ? formValues2.end_date
        : "";

    if (editingPlacementId) {
      dispatch(createPlacement({
        placementFormValues: {
          ...defaultPlacementValue, ...formValues, campaign_public_identifier: params.public_identifier, creatives: []
        }, editingPlacementId, editingPlacementIdx
      }))

      // can do this in future

      // setPlacementFormValues(defaultPlacementValue);
      // setSelectedLocations([])
      // setCheckedScreens([]);
      // setSelectedChannel("")

    }

    else {

      dispatch(createPlacement({
        placementFormValues: {
          ...defaultPlacementValue, ...formValues, campaign_public_identifier: params.public_identifier,
        },
        onSuccess: (placement) => {
          setActivePlacement(placement.public_identifier)
          dispatch(getSinglePlacement({ public_identifier: placement.public_identifier, statePlacement: placement, placement: placement }));
          setEditingPlacementId(placement.public_identifier);
          setEditingPlacementIdx((placement.length - 1))
          setSelectChannel("")

          // can do this in future

          // setPlacementFormValues(defaultPlacementValue);
          // setSelectedLocations([])
          // setCheckedScreens([]);
          // setSelectChannel("")
          // setSelectedChannel("")
          // setMatchingZipCodes([])
          // if (csvUploaderRef.current) {
          //   csvUploaderRef.current.value = ''
          // }
          // setMatchingZipCodes([])
        }
      }))
    }

    // This is for 2nd placement
    if (secondCall && !editingPlacementId) dispatch(createPlacement({
      placementFormValues: { ...formValues2, campaign_public_identifier: params.public_identifier, },
      second: true,
    }))
  }

  const [selectChannel, setSelectChannel] = React.useState("");
  const [checkedScreens, setCheckedScreens] = useState([]);

  const handleOnCheckScreen = (e) => {
    if (checkedScreens.includes(e.target.value)) {
      const ind = checkedScreens.indexOf(e.target.value);
      checkedScreens.splice(ind, 1);
      setCheckedScreens([...checkedScreens]);
    } else {
      setCheckedScreens([...checkedScreens, e.target.value]);
    }
  };

  const eachChannelDevices = {
    streamingTv: [
      {
        name: "TV",
        svgIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className={`h-5 w-5 mr-2 fill-current ${checkedScreens.includes("TV") ? "text-white " : "text-[#708090]"
              }`}
          >
            <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" />
          </svg>
        ),
      },
      {
        name: "Mobile",
        svgIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className={`h-5 w-5 mr-2 fill-current ${checkedScreens.includes("Mobile") ? "text-white " : "text-[#708090]"
              }`}
          >
            <path d="M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
          </svg>
        ),
      },
      {
        name: "Tablet",
        svgIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className={`h-5 w-5 mr-2 fill-current ${checkedScreens.includes("Tablet") ? "text-white " : "text-[#708090]"
              }`}
          >
            <path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 1.99-.9 1.99-2L23 6c0-1.1-.9-2-2-2zm-2 14H5V6h14v12z" />
          </svg>
        ),
      },

      {
        name: "Desktop",
        svgIcon: (
          <DesktopMacOutlinedIcon
            className={`mr-2 text-[13px] font-light ${checkedScreens.includes("Desktop") ? "text-white " : "text-[#708090]"
              }`}
          />
        ),
      },
    ],
    onlineVideo: [
      {
        name: "Mobile",
        svgIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className={`h-5 w-5 mr-2 fill-current ${checkedScreens.includes("Mobile") ? "text-white " : "text-[#708090]"
              }`}
          >
            <path d="M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
          </svg>
        ),
      },
      {
        name: "Tablet",
        svgIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className={`h-5 w-5 mr-2 fill-current ${checkedScreens.includes("Tablet") ? "text-white " : "text-[#708090]"
              }`}
          >
            <path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 1.99-.9 1.99-2L23 6c0-1.1-.9-2-2-2zm-2 14H5V6h14v12z" />
          </svg>
        ),
      },

      {
        name: "Desktop",
        svgIcon: (
          <DesktopMacOutlinedIcon
            className={`mr-2 text-[13px] font-light ${checkedScreens.includes("Desktop") ? "text-white " : "text-[#708090]"
              }`}
          />
        ),
      },
    ],
    mobileAppsAndGames: [
      {
        name: "Mobile",
        svgIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className={`h-5 w-5 mr-2 fill-current ${checkedScreens.includes("Mobile") ? "text-white " : "text-[#708090]"
              }`}
          >
            <path d="M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
          </svg>
        ),
      },
      {
        name: "Tablet",
        svgIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className={`h-5 w-5 mr-2 fill-current ${checkedScreens.includes("Tablet") ? "text-white " : "text-[#708090]"
              }`}
          >
            <path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 1.99-.9 1.99-2L23 6c0-1.1-.9-2-2-2zm-2 14H5V6h14v12z" />
          </svg>
        ),
      },
    ],
    display: [
      {
        name: "Mobile",
        svgIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className={`h-5 w-5 mr-2 fill-current ${checkedScreens.includes("Mobile") ? "text-white " : "text-[#708090]"
              }`}
          >
            <path d="M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
          </svg>
        ),
      },
      {
        name: "Tablet",
        svgIcon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className={`h-5 w-5 mr-2 fill-current ${checkedScreens.includes("Tablet") ? "text-white " : "text-[#708090]"
              }`}
          >
            <path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 1.99-.9 1.99-2L23 6c0-1.1-.9-2-2-2zm-2 14H5V6h14v12z" />
          </svg>
        ),
      },
      {
        name: "Desktop",
        svgIcon: (
          <DesktopMacOutlinedIcon
            className={`mr-2 text-[13px] font-light ${checkedScreens.includes("Desktop") ? "text-white " : "text-[#708090]"
              }`}
          />
        ),
      },
    ],
  };

  return (
    <div className={`${placementLoading ? "opacity-50 pointer-events-none" : ""} overflow-x-hidden bg-white h-[100%]`}>
      <div className="flex w-full max-w-[1523px] mx-auto">
        <div className="flex flex-1 pr-4 flex-col  lg:flex-row max-w-[100%] formAndRB ">
          <form className="sm:p-8 p-5 pr-0 max-w-full lg:max-w-[75%] leftFormPart w-full">

            {/* TACTICS CHANNELS */}

            <TacticsChannels
              selectChannel={selectChannel}
              setSelectChannel={setSelectChannel}
              setCheckedScreens={setCheckedScreens}
            />

            {/* TACTICS SCREENS */}

            {!(selectChannel === "dooh") &&
              !(selectChannel === "audio") &&
              !(selectChannel === "") && (
                <div className="w-full mb-9 pb-2 rounded-lg bg-[#F7F9FB] py-2">
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
                              Devices
                            </h2>
                            <Tooltip
                              title="Each tactic can include a single channel, but
                              multiple device selections."
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
                          <div className="screens  px-4 cursor-pointer text-center flex items-center border-solid w-full flex-wrap ">
                            {eachChannelDevices[selectChannel]?.map(
                              (d, dIndex) => (
                                <div
                                  className={`rounded-lg mr-4 mt-4 py-0 flex items-center bg-gray-50 text-gray-500 cursor-pointer`}
                                  key={dIndex}
                                >
                                  <div className="flex">
                                    <label
                                      className={`rounded-xl border border-[#708090] px-2 py-3 w-[130px] h-[70px] flex items-center justify-center shadow-md cursor-pointer ${checkedScreens.includes(d.name)
                                        ? "bg-[#708090]"
                                        : ""
                                        }`}
                                    >
                                      <input
                                        type="checkbox"
                                        name={d.name}
                                        className="h-4 w-4 mr-2 cursor-pointer appearance-none form-checkbox text-[#708090] transition rounded border bg-white border-gray-200 focus:outline-none focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed ring-offset-0"
                                        // defaultValue={d.name}
                                        value={d.name}
                                        checked={
                                          checkedScreens.includes(d.name)
                                            ? true
                                            : false
                                        }
                                        onChange={handleOnCheckScreen}
                                      />
                                      {d.svgIcon}
                                      <span
                                        className={`text-sm ${checkedScreens.includes(d.name)
                                          ? "text-white "
                                          : "text-[#708090]"
                                          }`}
                                      >
                                        {d.name}
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              )
                            )}

                            <div className="w-full flex justify-start self-end">
                              <button
                                onClick={() => setCheckedScreens("")}
                                type="button"
                                className="base-button mt-3 bg-[#708090] flex items-center hover-tertiary text-white [&>svg]:enabled:fill-[#fff] disabled:cursor-default disabled:text-white [&>svg]:disabled:fill-[#fff] py-2 rounded-[1000px] px-4 text-sm [&>svg]:-ml-1 [&>svg]:mr-3"
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
                                    <rect
                                      width={20}
                                      height={20}
                                      fill="#D9D9D9"
                                    />
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
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              )}

            {/* TACTICS NAME */}

            <TacticsName changeEvent={inputChangeHandler} inputValue={placementFormValues.name} />

            {/* TACTICS DATE */}

            <TacticsDate singleCampaign={singleCampaign} startDateValidation={startDateValidation} endDateValidation={endDateValidation} placementFormValues={placementFormValues} handleStartDateChange={handleStartDateChange} handleEndDateChange={handleEndDateChange} />

            {/* TACTICS BUDGET */}

            <TacticsBudget changeEvent={inputChangeHandler} inputValue={placementFormValues.budget} />

            {/* APPS & CHANNELS */}
            <TacticsPackageSelection
              selectedChannel={selectedChannel}
              setSelectedChannel={setSelectedChannel}
              changeEvent={inputChangeHandler}
            />

            {/* TACTICS AUDIENCE */}

            <TacticsAudience placementFormValues={placementFormValues} setSelectAudienceListItem={setSelectAudienceListItem} selectAudienceListItem={selectAudienceListItem}
              setPlacementFormValues={setPlacementFormValues} />

            {/* TACTICS LOCATION */}

            <TacticsLocation
              matchingZipCodes={matchingZipCodes}
              setMatchingZipCodes={setMatchingZipCodes}
              selectedLocations={selectedLocations} setSelectedLocations={setSelectedLocations} setPlacementFormValues={setPlacementFormValues} csvUploaderRef={csvUploaderRef} />

            {/* TACTICS TIME SLOTS */}

            <TacticsTimeSlot setPlacementFormValues={setPlacementFormValues} placementFormValues={placementFormValues} enabled={enabled} setEnabled={setEnabled} changeEvent={inputChangeHandler} inputValue={placementFormValues.day_hour_targets_tz} />

            {/* TACTICS ADS */}

            <TacticsAds selectChannel={selectChannel} />


            <div className=" mb-4 bottom-8 z-10 right-8 mr-3">
              <span>
                <button
                  onClick={handleCreatePlacement}
                  type="submit"
                  className="max-w-[400px] gap-3 w-full text-center justify-center base-button hover-[#1C1C1C] items-center flex rounded-[80000px] enabled:bg-[#1C1C1C] text-white [&>svg]:enabled:fill-white disabled:cursor-default disabled:bg-gray-300 [&>svg]:disabled:fill-white py-3 px-5 text-lg [&>svg]:-mr-1 [&>svg]:ml-3"
                >
                  {
                    loading ? <Loader color={"#fff"} /> :
                      <>
                        <span className="font-semibold">Submit</span>
                        <img src={arrow_forward} alt="" />
                      </>
                  }
                </button>
              </span>
            </div>
          </form>

          {/* DELIVERY ESTIMATE */}

          <DeliveryEstimate
            activePlacement={activePlacement}
            setActivePlacement={setActivePlacement}
            singleCampaign={singleCampaign}
            setSelectChannel={setSelectChannel}
            selectedPlacement={params.tactic_public_identifier} setEditingPlacementIdx={setEditingPlacementIdx}
            setEditingPlacementId={setEditingPlacementId} campaign_public_identifier={params.public_identifier}
            setPlacementFormValues={setPlacementFormValues}
            defaultPlacementValue={defaultPlacementValue} onNewTacticAdd={() => {
              setPlacementFormValues({ ...defaultPlacementValue, statePlacement: true, });
              if (csvUploaderRef.current) {
                csvUploaderRef.current.value = ''
              }
              setMatchingZipCodes([])
              setSelectedLocations([])
              setCheckedScreens([]);
              setSelectChannel("")
              setSelectedChannel("")
            }} />
        </div>

      </div>

    </div>

  );
};

export default Tactics;
