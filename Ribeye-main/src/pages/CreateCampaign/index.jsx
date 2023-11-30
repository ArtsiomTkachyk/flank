import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import Radio from "@mui/material/Radio";
import Tooltip from "@mui/material/Tooltip";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaymentsIcon from "@mui/icons-material/Payments";
import dayjs from "dayjs";
import isEmpty from "../../helpers/is-empty";
// CONTEXT
import budgetContext from "../../context/selectBudgetContext";
// COMPONENTS
import StartDatePicker from "../../components/DatePicker/StartDatePicker";
import EndDatePicker from "../../components/DatePicker/EndDatePicker";
import Advertiser from "./Advertiser";
// ASSET
import arrow_forward from "../../assets/icons/arrow_forward.svg";
import Loader from "../../utils/Loader";
import { toast } from "react-toastify";
import {
  createCampaign,
  updateCampaign,
} from "../../store/slices/campaignSlice";
import { getPlacement } from "../../store/slices/placementSlice";

const CreateCampaign = ({ editForm }) => {
  const { public_identifier } = useParams();
  const dispatch = useDispatch();
  const { placements } = useSelector((state) => state.placement);
  const { handleBudgetName } = useContext(budgetContext);
  const [selectedValue, setSelectedValue] = useState(
    localStorage.getItem("selectedValue") || ""
  );
  const [singleAdvertiser, setSingleAdvertiser] = useState("");
  const [selectAdvertiser, setSelectAdvertiser] = useState("");

  const [campaigns, setCampaigns] = useState([]);
  const [campaignSingle, setSingleCampaign] = useState("");
  const [nameError, setNameError] = useState(false);

  const navigate = useNavigate();
  const [campaignformValues, setCampaignFormValues] = useState({
    name: "",
    start_date: "",
    end_date: "",
    budget: "",
    advertiser_public_identifier: "",
    status: "active",
    impression_cap_monthly: 0,
    impression_cap_hourly: 0,
    impression_cap_daily: 0,
    impression_cap_weekly: 0,
    click_cap_monthly: 0,
    click_cap_daily: 0,
    budget_period: "total",
    pacing_type: "evenly",
    impressions_limit: 0,
    publisher_lists_whitelisted: [],
    publisher_lists_blacklisted: [],
    audiences_whitelisted: [],
    audiences_blacklisted: [],
  });

  useEffect(() => {
    editForm ? dispatch(getPlacement({ public_identifier })) : null;
  }, []);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    handleBudgetName(newValue);
    localStorage.setItem("selectedValue", newValue);
  };

  useEffect(() => {
    handleBudgetName(selectedValue);
  }, [selectedValue]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      if (value.trim().length > 0) {
        const foundElement = campaigns.find(
          (el) => el.name.toUpperCase() === value.toUpperCase()
        );
        if (foundElement) {
          setNameError(true);
        } else {
          setNameError(false);
        }
      } else {
        setNameError(false);
      }
    }
    setCampaignFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const isNumberKey = (event) => {
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Tab",
    ];

    if (!allowedKeys.includes(event.key) && !/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleStartDateChange = (value) => {
    setCampaignFormValues((prevState) => ({ ...prevState, start_date: value }));
  };

  const handleEndDateChange = (value) => {
    setCampaignFormValues((prevState) => ({ ...prevState, end_date: value }));
  };

  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.campaign);

  const handleCreateCampaign = () => {
    const formValues = { ...campaignformValues };

    formValues.start_date = formValues?.start_date?.$d
      ? new Date(
          new Date(formValues.start_date?.$d).getTime() -
            new Date(formValues.start_date?.$d).getTimezoneOffset() * 60000
        )
          .toISOString()
          .replace(/T.*/, "")
      : typeof formValues.start_date !== "object" && !!formValues.start_date
      ? formValues.start_date
      : "";

    formValues.end_date = formValues?.end_date?.$d
      ? new Date(
          new Date(formValues.end_date?.$d).getTime() -
            new Date(formValues.end_date?.$d).getTimezoneOffset() * 60000
        )
          .toISOString()
          .replace(/T.*/, "")
      : typeof formValues.end_date !== "object" && !!formValues.end_date
      ? formValues.end_date
      : "";

    let hasErrors = false;
    if (isEmpty(selectAdvertiser)) {
      hasErrors = true;
    }
    if (isEmpty(campaignformValues.advertiser_public_identifier)) {
      hasErrors = true;
    }
    if (isEmpty(formValues.name)) {
      hasErrors = true;
      // toast.error("Name is required")
    }
    if (isEmpty(formValues.start_date)) {
      hasErrors = true;
      // toast.error("Start date is required")
    }
    if (isEmpty(formValues.end_date)) {
      hasErrors = true;
      // toast.error("End date is required")
    }
    if (isEmpty(formValues.budget)) {
      hasErrors = true;
      // toast.error("Budget is required")
    }

    if (hasErrors) {
      toast.error("All fields are required");
      return;
    }

    if (editForm) {
      dispatch(
        updateCampaign({
          public_identifier: public_identifier,
          pacing_type: "evenly",
          formValues: formValues,
          onSuccess: (public_identifier) => {
            navigate("/tactics/" + public_identifier);
          },
        })
      );
    } else {
      dispatch(
        createCampaign({
          formValues,
          onSuccess: (public_identifier) => {
            navigate("/tactics/" + public_identifier);
          },
        })
      );
    }
  };

  useEffect(() => {
    if (editForm && public_identifier) {
      axios
        .get(
          `https://ribeye-one.vercel.app/api/v1/campaigns/${public_identifier}`
        )
        .then((response) => {
          setCampaignFormValues({
            ...response.data.data,
            start_date: dayjs(response.data.data.start_date),
            end_date: dayjs(response.data.data.end_date),
          });

          setSelectedValue(response?.data?.data.budget_period);
          setSingleAdvertiser(response.data.data.advertiser_public_identifier);
          setSingleCampaign(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [public_identifier, editForm]);

  useEffect(() => {
    axios
      .get(
        `https://ribeye-one.vercel.app/api/v1/campaigns?advertiser_public_identifier=e18d415a-7755-4360-812e-5bb5759a847f`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(({ data }) => {
        setCampaigns(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="w-full flex flex-col lg:flex-row justify-between mt-[20px] bg-white">
          <div className="w-[full] lg:w-[73%] mx-auto">
            <h2 className="text-[#1C1C1C] font-semibold min-h-[30px] text-2xl mb-3">
              {editForm ? campaignSingle.name : "New Campaign"}
            </h2>
            {/* Advertiser */}
            <Advertiser
              editForm={editForm}
              singleAdvertiser={singleAdvertiser}
              selectAdvertiser={selectAdvertiser}
              setSelectAdvertiser={setSelectAdvertiser}
              campaignformValues={campaignformValues}
              setCampaignFormValues={setCampaignFormValues}
            />

            {/* campaign name */}
            <div className="mb-5 bg-[#F7F9FB] w-full p-5 pb-12 rounded-lg">
              <div className="flex items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mr-2 w-5 fill-[#1C1C1C]"
                  aria-hidden="true"
                >
                  <path d="M4 9h16v2H4V9zm0 4h10v2H4v-2z"></path>
                </svg>
                <h2 className="text-[#1C1C1C] text-[17px] font-semibold">
                  Campaign Name
                </h2>
              </div>
              <input
                type="text"
                className={`mt-6 rounded-lg h-[35px] outline-0 border border-solid px-3 w-full ${
                  nameError
                    ? "border-red-600 focus:border-red-700"
                    : "focus:border-[#708090]"
                }`}
                placeholder="Name your campaign"
                name="name"
                required
                value={campaignformValues.name}
                onChange={inputChangeHandler}
              />

              {nameError && (
                <div className="text-red-700 my-1">
                  This name has already been taken
                </div>
              )}
            </div>

            {/* campaign date */}
            <div className="campaign_date mb-5 bg-[#F7F9FB] w-full p-5 rounded-lg">
              <div className="flex items-center mb-8">
                <CalendarMonthIcon style={{ color: "#1C1C1C" }} />
                <h2 className="mx-2 text-[#1C1C1C] font-semibold">
                  Campaign Date
                </h2>
                <Tooltip
                  title="
                Select start and end dates for your campaign
              "
                  arrow
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-[#1C1C1C]"
                    aria-hidden="true"
                  >
                    <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                  </svg>
                </Tooltip>
              </div>
              <div className="flex gap-3 flex-wrap items-center">
                <div className="w-full sm:w-[45%]">
                  <StartDatePicker
                    name="start_date"
                    startDate={campaignformValues.start_date}
                    changeEvent={handleStartDateChange}
                  />
                </div>
                <div className="w-full sm:w-[45%]">
                  <EndDatePicker
                    name="end_date"
                    endDate={campaignformValues.end_date}
                    changeEvent={handleEndDateChange}
                  />
                </div>
              </div>
            </div>

            {/* campaign budget */}
            <div className="mb-5 bg-[#F7F9FB] w-full p-5 rounded-lg">
              <div className="flex items-center">
                <PaymentsIcon style={{ color: "#1C1C1C" }} />
                <h2 className="mx-2 text-[#1C1C1C] font-semibold">
                  Campaign Budget
                </h2>
                <Tooltip
                  title="
                A Lifetime Budget will spend optimally throughout the course of a campaign, while a Daily Budget will spend a specific amount every day.
              "
                  arrow
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-[#1C1C1C]"
                    aria-hidden="true"
                  >
                    <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                  </svg>
                </Tooltip>
              </div>
              <div className="flex mb-4 flex-wrap justify-between w-full mt-8">
                <div
                  onClick={() => {
                    handleChange({ target: { value: "total" } });

                    // handleBudgetName("total");
                    // setSelectedValue("total");
                    inputChangeHandler({
                      target: { name: "status", value: "active" },
                    });
                    inputChangeHandler({
                      target: { name: "budget_period", value: "total" },
                    });
                  }}
                  className={`w-full sm:my-0 my-2 sm:w-[49%] flex cursor-pointer justify-between items-start border rounded-lg px-4  py-4 ${
                    selectedValue == "total"
                      ? "border-[#708090] bg-[#708090]"
                      : "border-[rgba(112, 128, 144, 0.40)] bg-white"
                  }`}
                >
                  <div className="flex flex-col mt-2">
                    <h2
                      className={`font-semibold ${
                        selectedValue == "total" ? "text-white" : "text-gray500"
                      }`}
                    >
                      Lifetime budget
                    </h2>
                    <p
                      className={`font-normal text-[12px] sm:text-sm ${
                        selectedValue == "total" ? "text-white" : "text-gray500"
                      }`}
                    >
                      Set a maximum amount of budget you are willing to spend
                      over the lifetime of the campaign.
                    </p>
                  </div>
                  <div>
                    <Radio
                      checked={selectedValue === "total"}
                      onChange={handleChange}
                      value="total"
                      name="radio-buttons"
                      inputProps={{ "aria-label": "A" }}
                    />
                  </div>
                </div>

                <div
                  onClick={() => {
                    handleChange({ target: { value: "daily" } });
                    inputChangeHandler({
                      target: { name: "status", value: "inactive" },
                    });
                    inputChangeHandler({
                      target: { name: "budget_period", value: "daily" },
                    });
                  }}
                  className={`w-full sm:my-0 my-2 sm:w-[49%] cursor-pointer flex items-start justify-between border rounded-lg px-4  py-4 ${
                    selectedValue == "daily"
                      ? "border-[#708090] bg-[#708090]"
                      : "border-[rgba(112, 128, 144, 0.40)] bg-white"
                  }`}
                >
                  <div className="flex flex-col mt-2">
                    <h2
                      className={`font-semibold ${
                        selectedValue == "daily" ? "text-white" : "text-gray500"
                      }`}
                    >
                      {/* Daily budget */}
                      Daily budget
                    </h2>
                    <p
                      className={`font-normal text-[12px] sm:text-sm ${
                        selectedValue == "daily" ? "text-white" : "text-gray500"
                      }`}
                    >
                      Set a maximum amount of budget you are willing to spend
                      per day.
                    </p>
                  </div>
                  <div>
                    <Radio
                      checked={selectedValue === "daily"}
                      onChange={handleChange}
                      value="daily"
                      name="radio-buttons"
                      inputProps={{ "aria-label": "B" }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                {/* <label
                  className="block text-sm text-gray-500 font-normal mb-1"
                  htmlFor="amount"
                >
                  Amount
                </label> */}

                <div className="flex relative rounded-lg h-[45px] w-full">
                  <span className="absolute left-4 top-2">$</span>

                  <input
                    id="amount"
                    type="text"
                    pattern="[0-9]"
                    required
                    name="budget"
                    value={campaignformValues.budget}
                    onChange={inputChangeHandler}
                    onKeyDown={isNumberKey}
                    className="w-[50%] pl-9 pr-4 pr-43 rounded-lg outline-0 border-solid focus:border-[#708090] border"
                  />
                </div>
              </div>
            </div>
            {editForm ? null : (
              <div className=" mb-4 bottom-8 z-10 right-8 mr-3">
                <span>
                  <button
                    disabled={loading}
                    onClick={handleCreateCampaign}
                    type="submit"
                    className="max-w-[400px] w-full text-center justify-center base-button hover-[#1C1C1C] items-center flex rounded-[80000px] enabled:bg-[#1C1C1C] text-white [&>svg]:enabled:fill-white disabled:cursor-default disabled:bg-gray-300 [&>svg]:disabled:fill-white py-3 px-5 text-sm [&>svg]:-mr-1 [&>svg]:ml-3"
                  >
                    {loading ? (
                      <Loader color={"#fff"} />
                    ) : (
                      <>
                        <span className="font-semibold">Next</span>
                        <img src={arrow_forward} alt="" />
                      </>
                    )}
                  </button>
                </span>
              </div>
            )}
          </div>
          {editForm ? (
            <div className="mb-4 w-full max-w-full lg:max-w-[25%] rounded-lg bg-gray-50 h-max px-3 py-3 mt-11 rightbox lg:pr-0 max-h-[550px] overflow-y-auto">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <mask
                      id="mask0_46_3566"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x={0}
                      y={0}
                      width={24}
                      height={24}
                    >
                      <rect width={24} height={24} fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_46_3566)">
                      <path
                        d="M12 21C10.75 21 9.57917 20.7625 8.4875 20.2875C7.39583 19.8125 6.44583 19.1708 5.6375 18.3625C4.82917 17.5542 4.1875 16.6042 3.7125 15.5125C3.2375 14.4208 3 13.25 3 12C3 10.75 3.2375 9.57917 3.7125 8.4875C4.1875 7.39583 4.82917 6.44583 5.6375 5.6375C6.44583 4.82917 7.39583 4.1875 8.4875 3.7125C9.57917 3.2375 10.75 3 12 3C13.3667 3 14.6625 3.29167 15.8875 3.875C17.1125 4.45833 18.15 5.28333 19 6.35V5C19 4.71667 19.0958 4.47917 19.2875 4.2875C19.4792 4.09583 19.7167 4 20 4C20.2833 4 20.5208 4.09583 20.7125 4.2875C20.9042 4.47917 21 4.71667 21 5V9C21 9.28333 20.9042 9.52083 20.7125 9.7125C20.5208 9.90417 20.2833 10 20 10H16C15.7167 10 15.4792 9.90417 15.2875 9.7125C15.0958 9.52083 15 9.28333 15 9C15 8.71667 15.0958 8.47917 15.2875 8.2875C15.4792 8.09583 15.7167 8 16 8H17.75C17.0667 7.06667 16.225 6.33333 15.225 5.8C14.225 5.26667 13.15 5 12 5C10.05 5 8.39583 5.67917 7.0375 7.0375C5.67917 8.39583 5 10.05 5 12C5 13.95 5.67917 15.6042 7.0375 16.9625C8.39583 18.3208 10.05 19 12 19C13.5833 19 15 18.525 16.25 17.575C17.5 16.625 18.325 15.4 18.725 13.9C18.8083 13.6333 18.9583 13.4333 19.175 13.3C19.3917 13.1667 19.6333 13.1167 19.9 13.15C20.1833 13.1833 20.4083 13.3042 20.575 13.5125C20.7417 13.7208 20.7917 13.95 20.725 14.2C20.2417 16.1833 19.1917 17.8125 17.575 19.0875C15.9583 20.3625 14.1 21 12 21ZM13 11.6L15.5 14.1C15.6833 14.2833 15.775 14.5167 15.775 14.8C15.775 15.0833 15.6833 15.3167 15.5 15.5C15.3167 15.6833 15.0833 15.775 14.8 15.775C14.5167 15.775 14.2833 15.6833 14.1 15.5L11.3 12.7C11.2 12.6 11.125 12.4875 11.075 12.3625C11.025 12.2375 11 12.1083 11 11.975V8C11 7.71667 11.0958 7.47917 11.2875 7.2875C11.4792 7.09583 11.7167 7 12 7C12.2833 7 12.5208 7.09583 12.7125 7.2875C12.9042 7.47917 13 7.71667 13 8V11.6Z"
                        fill="#1C1B1F"
                      />
                    </g>
                  </svg>
                  <h3 className="font-semibold text-md mx-2 text-[#1C1C1C]">
                    Tactics
                  </h3>
                </div>
                <div>
                  {placements.map((el, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() =>
                          navigate(
                            "/tactics/" +
                              campaignSingle.public_identifier +
                              "/" +
                              el.public_identifier
                          )
                        }
                        className={`
                  group strategy-item-container cursor-pointer relative items-center flex w-[280px] sm:w-[300px] md:w-full justify-between rounded-lg opacity-50`}
                      >
                        <div className="flex justify-between group-hover:w-[250px] h-full items-center overflow-hidden relative">
                          <div className="flex items-center">
                            <span>
                              <div className="rounded-xl h-8 flex items-center justify-center !w-6 mx-3">
                                <div className="w-8 h-5 justify-end flex rounded-xl p-[1px] border-transparent !bg-gray-100 border !border-white">
                                  <svg
                                    data-v-a442de1a
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    className="w-4 h-4 fill-gray-500"
                                    alt="Delivering"
                                  >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5-7 4.5z" />
                                  </svg>
                                </div>
                              </div>
                            </span>
                            <span className=" text-sm items-center w-[160px] truncate overflow-hidden">
                              {el.name}
                            </span>
                          </div>

                          <button
                            type="button"
                            className="flex items-center w-full p-2 hover:invisible rounded-lg strategy-item-button"
                          >
                            <MoreHorizOutlinedIcon />
                          </button>
                          <div className="absolute bg-white dupl_icon flex items-center top-0 right-[0px] bottom-0">
                            <Tooltip title="Duplicate">
                              <button
                                type="button"
                                className=" flex items-center w-full p-1 rounded-lg strategy-item-button"
                              >
                                <ContentCopyIcon sx={{ fontSize: "16px" }} />
                              </button>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <button
                                type="button"
                                className="flex items-center w-full p-1 rounded-lg strategy-item-button"
                              >
                                <DeleteOutlineOutlinedIcon
                                  sx={{ fontSize: "20px" }}
                                />
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="font-medium mx-5 w-max bg-[#708090] mt-5 pr-3 pl-2 py-2 rounded-xl"
                  onClick={() => navigate("/tactics/" + public_identifier)}
                >
                  <AddIcon
                    style={{
                      fontSize: "24px",
                      color: "#fff",
                      position: "relative",
                      top: "-2px",
                    }}
                  />
                  <span className="text-[14px] text-center text-[#fff] ml-2">
                    Add Tactic
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-4 w-full max-w-full lg:max-w-[25%] rounded-lg bg-gray-50 h-max px-3 py-3 mt-11 rightbox lg:pr-0 max-h-[550px] overflow-y-auto">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <mask
                      id="mask0_46_3566"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x={0}
                      y={0}
                      width={24}
                      height={24}
                    >
                      <rect width={24} height={24} fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_46_3566)">
                      <path
                        d="M12 21C10.75 21 9.57917 20.7625 8.4875 20.2875C7.39583 19.8125 6.44583 19.1708 5.6375 18.3625C4.82917 17.5542 4.1875 16.6042 3.7125 15.5125C3.2375 14.4208 3 13.25 3 12C3 10.75 3.2375 9.57917 3.7125 8.4875C4.1875 7.39583 4.82917 6.44583 5.6375 5.6375C6.44583 4.82917 7.39583 4.1875 8.4875 3.7125C9.57917 3.2375 10.75 3 12 3C13.3667 3 14.6625 3.29167 15.8875 3.875C17.1125 4.45833 18.15 5.28333 19 6.35V5C19 4.71667 19.0958 4.47917 19.2875 4.2875C19.4792 4.09583 19.7167 4 20 4C20.2833 4 20.5208 4.09583 20.7125 4.2875C20.9042 4.47917 21 4.71667 21 5V9C21 9.28333 20.9042 9.52083 20.7125 9.7125C20.5208 9.90417 20.2833 10 20 10H16C15.7167 10 15.4792 9.90417 15.2875 9.7125C15.0958 9.52083 15 9.28333 15 9C15 8.71667 15.0958 8.47917 15.2875 8.2875C15.4792 8.09583 15.7167 8 16 8H17.75C17.0667 7.06667 16.225 6.33333 15.225 5.8C14.225 5.26667 13.15 5 12 5C10.05 5 8.39583 5.67917 7.0375 7.0375C5.67917 8.39583 5 10.05 5 12C5 13.95 5.67917 15.6042 7.0375 16.9625C8.39583 18.3208 10.05 19 12 19C13.5833 19 15 18.525 16.25 17.575C17.5 16.625 18.325 15.4 18.725 13.9C18.8083 13.6333 18.9583 13.4333 19.175 13.3C19.3917 13.1667 19.6333 13.1167 19.9 13.15C20.1833 13.1833 20.4083 13.3042 20.575 13.5125C20.7417 13.7208 20.7917 13.95 20.725 14.2C20.2417 16.1833 19.1917 17.8125 17.575 19.0875C15.9583 20.3625 14.1 21 12 21ZM13 11.6L15.5 14.1C15.6833 14.2833 15.775 14.5167 15.775 14.8C15.775 15.0833 15.6833 15.3167 15.5 15.5C15.3167 15.6833 15.0833 15.775 14.8 15.775C14.5167 15.775 14.2833 15.6833 14.1 15.5L11.3 12.7C11.2 12.6 11.125 12.4875 11.075 12.3625C11.025 12.2375 11 12.1083 11 11.975V8C11 7.71667 11.0958 7.47917 11.2875 7.2875C11.4792 7.09583 11.7167 7 12 7C12.2833 7 12.5208 7.09583 12.7125 7.2875C12.9042 7.47917 13 7.71667 13 8V11.6Z"
                        fill="#1C1B1F"
                      />
                    </g>
                  </svg>
                  <h3 className="font-semibold text-md mx-2 text-[#1C1C1C]">
                    Tactics
                  </h3>
                </div>

                <button
                  className="font-medium mx-5 w-max bg-[#708090] opacity-40 mt-5 pr-3 pl-2 py-2 rounded-xl"
                  disabled
                  onClick={() => navigate("/tactics/" + public_identifier)}
                >
                  <AddIcon
                    style={{
                      fontSize: "24px",
                      color: "#fff",
                      position: "relative",
                      top: "-2px",
                    }}
                  />
                  <span className="text-[14px] text-center text-[#fff] ml-2">
                    Add Tactic
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateCampaign;
