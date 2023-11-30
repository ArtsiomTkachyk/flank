import { useEffect, useState, useRef } from "react";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Tooltip } from "@mui/material";
import countriesData from "../../store/data/countries.json"
import citiesData from "../../store/data/cities.json"
import dmaData from "../../store/data/dma.json"
import regionData from "../../store/data/region.json"
import zipCodeData from "../../store/data/zipcode.json"
import CsvUploader from "../../components/Uploader/CsvUploader";
import JsonConverter from "../../components/Converter/JsonConverter";


//  GEOGRAPHIC TARGETING COUNTRIES DATA


const TacticsLocation = ({ csvUploaderRef, matchingZipCodes, setMatchingZipCodes, setPlacementFormValues, selectedLocations, setSelectedLocations }) => {


  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [locationValue, setLocationValue] = useState("");


  const handleConvert = (data) => {

    const csvIds = data.map((item) => item.code);


    const matchedZipCodes = zipCodeData.filter((zipCode) =>
      csvIds.includes(zipCode.code)
    );


    setMatchingZipCodes(matchedZipCodes);


    let postal_codes = [];

    matchedZipCodes.forEach(loc => {
      postal_codes.push(loc?.code)
    })

  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setLocationValue(e.target.value)
    setSearchTerm(value);
    const allData = [
      ...countriesData,
      ...dmaData,
      ...regionData,
      ...zipCodeData,
      ...citiesData,
    ];

    const filteredResults = allData.filter((data) => {
      if (data.name) {
        return data.name.toLowerCase().includes(value.toLowerCase());
      } else if (data.code) {
        return data.code.toLowerCase().includes(value.toLowerCase());
      } else if (data.album) {
        return data.album.toLowerCase().includes(value.toLowerCase());
      }
      return false;
    });

    setSearchResults(filteredResults);
  };

  const handleDeleteLocation = (l, lIndex) => {
    selectedLocations.splice(lIndex, 1);
    setSelectedLocations([...selectedLocations]);
  };

  const handleRemoveLocation = (locName) => {
    const lIndex = selectedLocations.indexOf(locName);
    selectedLocations.splice(selectedLocations[lIndex], 1);
    setSelectedLocations([...selectedLocations]);
  };

  useEffect(() => {
    let cities = [];
    let countries = []
    let regions = []
    let postal_codes = []
    let dmas = []

    selectedLocations?.forEach(loc => {
      if (loc?.locationType === 'city') {
        cities.push(loc.id || loc.year)
      } else if (loc?.locationType === 'country') {
        countries.push(loc?.id || loc?.year)
      } else if (loc?.locationType === 'region') {
        regions.push(loc?.id || loc?.year)
        countries.push(loc?.country_id)
      } else if (loc?.locationType === 'postal_code') {
        postal_codes.push(loc?.id || loc?.year)
      } else if (loc?.locationType === 'dma') {
        dmas.push(loc?.id || loc?.year)
      }

    });


    setPlacementFormValues(prev => ({ ...prev, cities, countries, regions, postal_codes, dmas }))


  }, [selectedLocations, matchingZipCodes]);



  const handleDeleteZipCode = (zipCode, index) => {
    const updatedZipCodes = [...matchingZipCodes];
    updatedZipCodes.splice(index, 1);
    setMatchingZipCodes(updatedZipCodes);
  };

  return (
    <>
      <div className="w-full mb-9 mt-9 rounded-lg bg-[#F7F9FB] py-2">
        <div className="flex px-4 w-full justify-between rounded-lg pt-2 text-left text-md text-[#1C1C1C] font-semibold">
          <div className="flex items-center">
            <div className="flex items-center">
              <LocationOnOutlinedIcon style={{ color: "#000" }} />

              <h2 className="mx-2 text-[#1C1C1C] font-semibold">
                Geographic Targeting
              </h2>
              <Tooltip
                title="
                          Select your ideal geographic target based on country, state, DMA, county, city, and zip.
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
              Entire US 🇺🇸
            </span>
          </div>
        </div>
        <div className="pb-2 text-sm ">
          <div className=" px-4 cursor-pointer text-center flex items-center border-solid w-full">
            <div className="relative w-full rounded-b border-gray-200 mt-4">
              <div className="mt-1 relative rounded-lg">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  autoComplete="off"
                  className="search_input pl-10 px-3 block w-full outline-0 focus:border-[#708090] border h-9 border-gray-200 text-gray-500 text-sm rounded-lg placeholder:text-gray-400"
                  placeholder="Search by states, metros, cities and ZIP codes"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-gray-400"
                    aria-hidden="true"
                  >
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                </div>
              </div>
              <div className="bg-white border overflow-auto z-[999] max-h-[200px] border-gray-200 outline-0 rounded-lg w-full absolute top-11 left-0">
                {locationValue !== "" ? (
                  searchResults.length > 0 ? searchResults.map((val, i) => {
                    return (
                      <div
                        onClick={() => {
                          setSearchTerm("");
                          setLocationValue("");
                          setSelectedLocations([
                            ...selectedLocations,
                            val
                          ])
                        }
                        }
                        key={i}
                        className="hover:bg-gray-100  px-3 p-2 border-b items-center border-gray-200 w-full flex justify-between"
                      >
                        <div className="flex items-center">
                          <h2 className="text-gray-600 mr-3 text-sm">
                            {val?.name || val?.code || val?.album}
                          </h2>
                          <span className="text-gray-400 text-xs">
                            {val?.locationType}
                          </span>
                        </div>
                        {selectedLocations.includes(val?.name || val?.album || val?.code) ? (
                          <button
                            className="text-indigo-800 font-medium"
                            onClick={() => handleRemoveLocation(val?.name || val?.album || val?.code)}
                          >
                            Remove
                          </button>
                        ) : (
                          null
                        )
                        }
                      </div>
                    );
                  }

                  )
                    :
                    <p className="py-2">Search not found</p>
                ) : null}

              </div>

              <div className="mt-3 px-3 p-2 border rounded-lg items-center border-gray-200 flex gap-3 flex-wrap w-full">

                {!(selectedLocations.length === 0) && (
                  selectedLocations?.map((l, lIndex) => (
                    <div
                      key={lIndex}
                      className="loc_viewlist bg-gray-200 rounded-md gap-3 px-2 py-1 my-1 w-max text-left flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <h2 className="text-gray-600 mr-3 text-sm">{l?.name || l?.album || l?.code}</h2>

                        <span className="text-gray-400 text-xs">{l?.locationType}</span>
                      </div>
                      <DeleteOutlineOutlinedIcon
                        className=" text-gray-400"
                        onClick={() => handleDeleteLocation(l, lIndex)}
                      />
                    </div>
                  ))

                )}

                {matchingZipCodes.length > 0 && (
                  matchingZipCodes.map((zipCode, lIndex) => (

                    <div
                      key={lIndex}
                      className="loc_viewlist bg-gray-200 rounded-md gap-3 px-2 py-1 my-1 w-max text-left flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <h2 className="text-gray-600 mr-3 text-sm">{zipCode?.code}</h2>

                        <span className="text-gray-400 text-xs">{zipCode?.locationType}</span>
                      </div>
                      <DeleteOutlineOutlinedIcon
                        className=" text-gray-400"
                        onClick={() => handleDeleteZipCode(zipCode, lIndex)}
                      />
                    </div>
                  ))
                )}
              </div>

              <div className="pb-2 text-sm flex flex-col">
                <h2 className="mx-2 mt-5 text-[#1C1C1C] text-left font-semibold">
                  Zip code Upload
                </h2>
                <div className="  cursor-pointer text-center flex items-center border-solid w-full">
                  <div className="relative w-full rounded-b border-gray-200 mt-4">



                    <div className="w-full upload_zip flex items-center gap-3">
                      <CsvUploader ref={csvUploaderRef} onConvert={handleConvert} />
                    </div>
                  </div>

                </div>


              </div>




            </div>

          </div>

          <div className="w-full flex justify-start self-end p-4">
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedLocations([]);
                setMatchingZipCodes([]);
                if (csvUploaderRef.current) {

                  csvUploaderRef.current.value = ''
                }
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
              <span className="font-normal">Reset Location</span>
            </button>
          </div>
        </div>
      </div >

    </>
  );
};

export default TacticsLocation;
