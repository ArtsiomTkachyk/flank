import React from "react";

const TacticsName = ({ changeEvent, inputValue }) => {
  return (
    <>
      <div className="mb-9 bg-[#F7F9FB] w-full p-5 pb-10 rounded-lg">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className=" w-5 fill-[#000]"
            aria-hidden="true"
          >
            <path d="M4 9h16v2H4V9zm0 4h10v2H4v-2z"></path>
          </svg>
          <h2 className="mx-2 text-[#1C1C1C] text-[17px] font-semibold">
            Tactic Name
          </h2>
        </div>

        <input
          id="amount"
          type="text"
          className="w-full mt-6 rounded-lg h-[35px] outline-0 border-solid focus:border-[#708090] border px-3"
          placeholder="Name your strategy"
          name="name"
          value={inputValue}
          onChange={changeEvent}
        />
      </div>
    </>
  );
};

export default TacticsName;
