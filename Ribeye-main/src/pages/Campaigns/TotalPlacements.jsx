import React from "react";

const TotalPlacements = ({ placements }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-black font-bold text-sm">Total Placements</h2>
      <strong className="text-xs rounded-[1000px] text-center min-w-[60px] py-[0.9px] px-2 mt-1  border-black  border-solid  font-normal">
        {placements}
      </strong>
    </div>
  );
};

export default TotalPlacements;
