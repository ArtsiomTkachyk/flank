import Tooltip from "@mui/material/Tooltip";
import { useSelector, useDispatch } from 'react-redux';
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { addPlacement, getPlacement, getSinglePlacement } from "../../store/slices/placementSlice";
import { useNavigate } from "react-router-dom";

const DeliveryEstimate = ({
  activePlacement, setActivePlacement,
  singleCampaign, setSelectChannel, selectedPlacement, onNewTacticAdd,
  campaign_public_identifier, setEditingPlacementIdx, setPlacementFormValues,
  setEditingPlacementId, defaultPlacementValue }) => {

  const { placements: placementsHistory } = useSelector(state => state.placement)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPlacement({ public_identifier: campaign_public_identifier }))
  }, [])


  return (
    <>
      <div className="mb-4 w-full py-5 mt-[30px] h-max rounded-lg bg-gray-50 max-w-full lg:max-w-[25%] rightbox max-h-[550px] overflow-y-auto min-w-max addTacticsList">
        <div className="flex flex-col space-y-3">
          <h2
            onClick={() =>
              navigate(`/campaigns/edit/${singleCampaign.public_identifier}`)
            }
            className="px-3 text-xl font-bold hover:text-gray-600 hover:underline w-max cursor-pointer">{singleCampaign.name}</h2>

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
            {
              placementsHistory?.map((el, idx) => {
                if (selectedPlacement && (selectedPlacement === el.public_identifier)) {
                  setEditingPlacementIdx(idx)
                }
                return (
                  <div key={'tactic-history-item-' + idx}
                    onClick={() => {
                      setActivePlacement(el.public_identifier)
                      dispatch(getSinglePlacement({ public_identifier: el.public_identifier, statePlacement: el.statePlacement, placement: el }));
                      setEditingPlacementId(el.public_identifier);
                      setEditingPlacementIdx(idx)
                      setSelectChannel("")
                    }}
                    className={`
                    ${activePlacement === el.public_identifier ? "bg-gray-300" : ""} group strategy-item-container cursor-pointer  relative items-center flex w-[280px] sm:w-[300px] md:w-full justify-between rounded-lg opacity-50`}
                  >
                    <div className="flex justify-between group-hover:w-[250px] h-full items-center overflow-hidden relative">
                      <div className="flex items-center">
                        <span>
                          <div className="rounded-xl h-8 flex items-center justify-center !w-6 mx-3">
                            <div

                              className="w-8 h-5 justify-end flex rounded-xl p-[1px] border-transparent !bg-gray-100 border !border-white">
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
                        className="flex items-center w-full group-hover:invisible p-2 hover:invisible rounded-lg strategy-item-button"
                      >
                        <MoreHorizOutlinedIcon />
                      </button>
                      <div className="absolute dupl_icon flex items-center top-0 right-[-4px] bottom-0">
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
                )
              })
            }


          </div>
          <button className="font-medium mx-5 w-max bg-[#708090] mt-5 pr-3 pl-2 py-2 rounded-xl" onClick={
            () => {
              setPlacementFormValues({ ...defaultPlacementValue, statePlacement: true, });
              dispatch(addPlacement({ ...defaultPlacementValue, statePlacement: true }));
              setEditingPlacementId("")
              setEditingPlacementIdx(-1)

              onNewTacticAdd();
            }
          }>
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
      </div >

    </>
  );
};

export default DeliveryEstimate;
