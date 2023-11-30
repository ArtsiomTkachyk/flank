import { Tooltip } from "@mui/material";
import { useContext } from "react";
import budgetContext from "../../context/selectBudgetContext";

const TacticsBudget = ({ inputValue, changeEvent }) => {
  const { budgetName } = useContext(budgetContext);

  const isNumberKey = (event) => {

    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];

    if (!allowedKeys.includes(event.key) && !/^\d$/.test(event.key)) {
      event.preventDefault();
    }

  }

  return (
    <>
      <div className="mb-9 bg-[#F7F9FB] w-full p-5 rounded-lg">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 6C11.5858 6 11.25 6.33579 11.25 6.75V8.25C11.25 8.66421 11.5858 9 12 9C12.4142 9 12.75 8.66421 12.75 8.25V6.75C12.75 6.33579 12.4142 6 12 6Z"
              fill="#1C1C1C"
            />
            <path
              d="M12 15C11.5858 15 11.25 15.3358 11.25 15.75V17.25C11.25 17.6642 11.5858 18 12 18C12.4142 18 12.75 17.6642 12.75 17.25V15.75C12.75 15.3358 12.4142 15 12 15Z"
              fill="#1C1C1C"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2.25C12 2.25 13.9831 2.25 15.7954 3.01651C15.7954 3.01651 17.5452 3.75663 18.8943 5.10571C18.8943 5.10571 20.2434 6.45478 20.9835 8.20463C20.9835 8.20463 21.75 10.0169 21.75 12C21.75 12 21.75 13.9831 20.9835 15.7954C20.9835 15.7954 20.2434 17.5452 18.8943 18.8943C18.8943 18.8943 17.5452 20.2434 15.7954 20.9835C15.7954 20.9835 13.9831 21.75 12 21.75C12 21.75 10.0169 21.75 8.20463 20.9835C8.20463 20.9835 6.45478 20.2434 5.10571 18.8943C5.10571 18.8943 3.75663 17.5452 3.01651 15.7954C3.01651 15.7954 2.25 13.9831 2.25 12C2.25 12 2.25 10.0169 3.01651 8.20463C3.01651 8.20463 3.75663 6.45478 5.10571 5.10571C5.10571 5.10571 6.45478 3.75663 8.20463 3.01651C8.20463 3.01651 10.0169 2.25 12 2.25ZM12 3.75C12 3.75 10.321 3.75 8.78896 4.39802C8.78896 4.39802 7.30857 5.02417 6.16637 6.16637C6.16637 6.16637 5.02417 7.30857 4.39802 8.78896C4.39802 8.78896 3.75 10.321 3.75 12C3.75 12 3.75 13.679 4.39802 15.211C4.39802 15.211 5.02417 16.6914 6.16637 17.8336C6.16637 17.8336 7.30857 18.9758 8.78896 19.602C8.78896 19.602 10.321 20.25 12 20.25C12 20.25 13.679 20.25 15.211 19.602C15.211 19.602 16.6914 18.9758 17.8336 17.8336C17.8336 17.8336 18.9758 16.6914 19.602 15.211C19.602 15.211 20.25 13.6789 20.25 12C20.25 12 20.25 10.3211 19.602 8.78896C19.602 8.78896 18.9758 7.30857 17.8336 6.16637C17.8336 6.16637 16.6914 5.02417 15.211 4.39802C15.211 4.39802 13.679 3.75 12 3.75Z"
              fill="#1C1C1C"
            />
            <path
              d="M10.875 9H14.25C14.6642 9 15 8.66421 15 8.25C15 7.83579 14.6642 7.5 14.25 7.5H10.875C9.78769 7.5 9.01884 8.26884 9.01884 8.26884C8.25 9.03769 8.25 10.125 8.25 10.125C8.25 11.2123 9.01884 11.9812 9.01884 11.9812C9.78769 12.75 10.875 12.75 10.875 12.75H13.125C13.591 12.75 13.9205 13.0795 13.9205 13.0795C14.25 13.409 14.25 13.875 14.25 13.875C14.25 14.341 13.9205 14.6705 13.9205 14.6705C13.591 15 13.125 15 13.125 15H9.75C9.33579 15 9 15.3358 9 15.75C9 16.1642 9.33579 16.5 9.75 16.5H13.125C14.2123 16.5 14.9812 15.7312 14.9812 15.7312C15.75 14.9623 15.75 13.875 15.75 13.875C15.75 12.7877 14.9812 12.0188 14.9812 12.0188C14.2123 11.25 13.125 11.25 13.125 11.25H10.875C10.409 11.25 10.0795 10.9205 10.0795 10.9205C9.75 10.591 9.75 10.125 9.75 10.125C9.75 9.65901 10.0795 9.32951 10.0795 9.32951C10.409 9 10.875 9 10.875 9Z"
              fill="#1C1C1C"
            />
          </svg>{" "}
          <h2 className="mx-2 text-[#1C1C1C] font-semibold text-[17px]">
            {budgetName === "total"
              ? "Tactic Lifetime Budget"
              : budgetName === "daily" ? "Tactic Daily Budget" : ""}
          </h2>
          <Tooltip
            title="
                  A lifetime budget will spend optimally across the flight of the tactic, while a daily budget will spend approximately that amount per day.
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

        <div className="flex flex-col mt-4">
          <div className="flex relative rounded-lg h-[40px] w-full">
            <span className="absolute left-4 top-2">$</span>

            <input
              id="amount"
              type="text"
              onKeyDown={isNumberKey}
              name="budget"
              value={inputValue}
              onChange={changeEvent}
              className="w-full pl-9 pr-43 rounded-lg outline-0 border-solid focus:border-[#708090] border"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TacticsBudget;
