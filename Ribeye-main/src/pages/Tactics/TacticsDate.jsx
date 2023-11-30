import { Tooltip } from "@mui/material";
import StartDatePicker from "../../components/DatePicker/StartDatePicker";
import EndDatePicker from "../../components/DatePicker/EndDatePicker";

const TacticsDate = ({ endDateValidation, singleCampaign, startDateValidation, placementFormValues, handleStartDateChange, handleEndDateChange }) => {

  return (
    <>
      <div className="campaign_date mb-9 bg-[#F7F9FB] w-full p-5 rounded-lg">
        <div className="flex items-center mb-8">
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
              d="M15.75 3V2.25C15.75 1.83579 16.0858 1.5 16.5 1.5C16.9142 1.5 17.25 1.83579 17.25 2.25V3H19.5C19.5 3 20.1213 3 20.5607 3.43934C20.5607 3.43934 21 3.87868 21 4.5V19.5C21 19.5 21 20.1213 20.5607 20.5607C20.5607 20.5607 20.1213 21 19.5 21H4.5C4.5 21 3.87868 21 3.43934 20.5607C3.43934 20.5607 3 20.1213 3 19.5V4.5C3 4.5 3 3.87868 3.43934 3.43934C3.43934 3.43934 3.87868 3 4.5 3H6.75V2.25C6.75 1.83579 7.08579 1.5 7.5 1.5C7.91421 1.5 8.25 1.83579 8.25 2.25V3H15.75ZM4.5 9V19.5H19.5V9H4.5ZM19.5 7.5H4.5V4.5H6.75V5.25C6.75 5.66421 7.08579 6 7.5 6C7.91421 6 8.25 5.66421 8.25 5.25V4.5H15.75V5.25C15.75 5.66421 16.0858 6 16.5 6C16.9142 6 17.25 5.66421 17.25 5.25V4.5H19.5V7.5Z"
              fill="black"
            />
          </svg>

          <h2 className="mx-2 text-[#1C1C1C] text-[17px] font-semibold">
            Tactic Dates
          </h2>
          <Tooltip
            title="
                  Select start and end dates for your tactic
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
        </div>
        <div className="flex w-full gap-3 flex-col">
          <div className="flex w-full gap-3 items-center dateDivRow">
            <div className="w-full">
              <StartDatePicker
                name="start_date"
                minDate={(singleCampaign.start_date)}
                maxDate={singleCampaign.end_date}
                startDate={placementFormValues.start_date}
                changeEvent={handleStartDateChange}
              />

            </div>

            <div className="w-full">
              <EndDatePicker
                name="end_date"
                minDate={(singleCampaign.start_date)}
                maxDate={singleCampaign.end_date}
                endDate={placementFormValues.end_date}
                changeEvent={handleEndDateChange}
              />

            </div>
          </div>

          {
            endDateValidation ?
              <div className="text-red-500">
                End Date can't be less than or equal to start Date
              </div>
              :
              null
          }
        </div>
      </div>
    </>
  );
};

export default TacticsDate;
