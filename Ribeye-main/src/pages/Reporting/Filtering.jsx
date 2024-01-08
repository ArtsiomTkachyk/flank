import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import ClearIcon from '../../assets/icons/filtering/ClearIcon.svg';
import CalendarSVG from '../../assets/icons/filtering/CalendarIcon.svg';
import DropdownSVG from '../../assets/icons/filtering/DropdownIcon.svg';
import StationSVG from '../../assets/icons/filtering/StationIcon.svg';
import AdvertiserSVG from '../../assets/icons/filtering/AdvertiserIcon.svg';
import CampaignSVG from '../../assets/icons/filtering/CampaignIcon.svg';

import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import SelectWithSearch from './SelectWithSearch';

const findUnicFields = (arrayOfElements, nameField, idField) => {
  const newArray = [];
  const total = {
    impressions: 0,
    reach: 0,
    frequency: 0,
    revenue: 0,
  };
  arrayOfElements.forEach((report) => {
    total.impressions += report.Impressions;
    total.reach += report.Reach;
    total.frequency += report.Frequency;
    total.revenue += report.Revenue;
    if (!newArray.map((elem) => elem.id).includes(report[idField])) {
      newArray.push({ id: report[idField], name: report[nameField] });
    }
  });
  return { newArray, total };
};

function CalendarIcon() {
  return <img src={CalendarSVG} alt='Calendar' />;
}
function DropdownIcon() {
  return <img src={DropdownSVG} alt='Calendar' />;
}
/*
const STATIONS_LIST = [
  {
    Station: 'True Impact Media',
    stationId: 11,
    Agency: 'Media Culture',
    agencyId: 1,
  },
  {
    Station: 'True Impact Media',
    stationId: 11,
    Agency: 'The Remnant Agency',
    agencyId: 2,
  },
  {
    Station: 'True Impact Media',
    stationId: 11,
    Agency: 'Bell Media',
    agencyId: 3,
  },
  {
    Station: 'National Media Spots',
    stationId: 55,
    Agency: 'SmartSites',
    agencyId: 4,
  },
  {
    Station: 'National Media Spots',
    stationId: 55,
    Agency: 'Ignite Visibility',
    agencyId: 5,
  },
  {
    Station: 'National Media Spots',
    stationId: 55,
    Agency: 'HigherVisibility',
    agencyId: 6,
  },
  {
    Station: 'National Media Spots',
    stationId: 55,
    Agency: 'Grow My Ads',
    agencyId: 7,
  },
  {
    Station: 'National Media Spots',
    stationId: 55,
    Agency: 'SEM Nexus',
    agencyId: 8,
  },
  {
    Station: 'National Media Spots',
    stationId: 55,
    Agency: 'Propaganda Creative',
    agencyId: 9,
  },
  { Station: 'National Media Spots', stationId: 55 },
  { Station: 'S&P Global', stationId: 2, Agency: 'Digital Silk', agencyId: 10 },
  {
    Station: 'S&P Global',
    stationId: 2,
    Agency: 'Disruptive Advertising',
    agencyId: 11,
  },
  { Station: 'S&P Global', stationId: 2, Agency: 'DD.NYC', agencyId: 12 },
  { Station: 'S&P Global', stationId: 2 },
  { Station: 'S&P Global', stationId: 2 },
];

const dataUpdated = dData.map((item, index) => {
  const id = index % STATIONS_LIST.length;
  return {
    ...item,
    station: STATIONS_LIST[id].Station,
    stationId: STATIONS_LIST[id].stationId,
    agency: STATIONS_LIST[id].Agency || null,
    agencyId: STATIONS_LIST[id].agencyId || null,
  };
});
*/

function Filtering({
  selectedCurrentField,
  setSelectedCurrentField,
  dataArray,
  setCurrentDataArray,
  setTotals,
}) {
  const [dataFiltered, setDataFiltered] = useState(dataArray);
  const [dateRange, setDateRange] = useState([null, null]);
  const [stationValue, setStationValue] = useState([]);
  const [stationList, setStationList] = useState([]);
  const [agencyValue, setAgencyValue] = useState([]);
  const [agencyList, setAgencyList] = useState([]);
  const [advertiserValue, setAdvertiserValue] = useState([]);
  const [advertiserList, setAdvertiserList] = useState([]);
  const [CampaignValue, setCampaignValue] = useState([]);
  const [campaignList, setCampaignList] = useState([]);

  const handleSetDateRange = (newValue) => {
    setDateRange(newValue);
  };

  const handleClearAll = () => {
    setDateRange([null, null]);
  };

  useEffect(() => {
    setDataFiltered(
      dataArray.filter((val) => {
        return (
          (dateRange[0] || new Date(0)) <= new Date(val['Report Date']) &&
          (dateRange[1] || new Date()) >= new Date(val['Report Date'])
        );
      })
    );
  }, [dateRange]);

  useEffect(() => {
    setStationValue([]);
    const calculatedData = findUnicFields(dataFiltered, 'station', 'stationId');
    setStationList(calculatedData.newArray);
    setTotals(calculatedData.total);
  }, [dataFiltered]);

  useEffect(() => {
    setAgencyValue([]);
    setAgencyList([]);
    if (stationValue.length !== 0) {
      const calculatedData = findUnicFields(
        dataFiltered.filter((item) =>
          stationValue.map((item) => item.id).includes(item.stationId)
        ),
        'agency',
        'agencyId'
      );
      console.log('calculatedData', calculatedData);
      setAgencyList(calculatedData.newArray);
      setTotals(calculatedData.total);
    }
  }, [stationValue]);

  // | outdated part
  // V
  useEffect(() => {
    setCurrentDataArray(
      dataFiltered?.length !== 0
        ? dataFiltered
        : dateRange[0] || dateRange[1]
        ? []
        : dataArray
    );
  }, [dataFiltered]);

  //
  //

  return (
    <div className='h-max pb-8 shadow-md px-4 flex-wrap mb-7 rounded-lg border overflow-hidden'>
      <div className='flex justify-between pt-2'>
        <h2 className='text-[#1c1c1c] font-bold p-2'>Filtering</h2>
        <button className='flex items-center gap-1' onClick={handleClearAll}>
          <img src={ClearIcon} alt='campaign' />
          Clear all
        </button>
      </div>

      <div className='grid gap-y-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3'>
        <div className='col-span-1 md:col-span-2 pt-0 '>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['SingleInputDateRangeField']}>
              <DateRangePicker
                className='overflow-hidden'
                format='MMM D,YYYY'
                calendars={1}
                sx={{
                  height: 'auto',
                  borderRadius: '8px',
                }}
                slots={{
                  field: SingleInputDateRangeField,
                }}
                slotProps={{
                  textField: {
                    InputProps: {
                      sx: { height: 38, minWidth: 270 },
                      startAdornment: <CalendarIcon />,
                      endAdornment: <DropdownIcon />,
                    },
                  },
                }}
                value={dateRange}
                onChange={handleSetDateRange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className='col-span-1 flex items-center w-full'>
          <SelectWithSearch
            iconSVG={StationSVG}
            placeholder='Select Station'
            listOfItems={stationList}
            value={stationValue}
            setValue={setStationValue}
          />
        </div>
        <div className='col-span-1 flex items-center w-full'>
          <SelectWithSearch
            iconSVG={StationSVG}
            placeholder='Select Agency'
            listOfItems={agencyList}
            value={agencyValue}
            setValue={setAgencyValue}
          />
        </div>
        <div className='col-span-1 flex items-center w-full'>
          <SelectWithSearch
            iconSVG={AdvertiserSVG}
            placeholder='Select Advertiser'
            listOfItems={[]}
            value={advertiserValue}
            setValue={setAdvertiserValue}
          />
        </div>
        <div className='col-span-1 flex items-center w-full'>
          <SelectWithSearch
            iconSVG={CampaignSVG}
            placeholder='Select Campaign'
            listOfItems={[]}
            value={CampaignValue}
            setValue={setCampaignValue}
          />
        </div>
      </div>
    </div>
  );
}

export default Filtering;
