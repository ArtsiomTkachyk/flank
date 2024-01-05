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

import dData from '../../../dummUPDATED.json';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import SelectWithSearch from './SelectWithSearch';

function CalendarIcon() {
  return <img src={CalendarSVG} alt='Calendar' />;
}
function DropdownIcon() {
  return <img src={DropdownSVG} alt='Calendar' />;
}
/*
const STATIONS_LIST = [
  { Station: 'True Impact Media', Agency: 'Media Culture' },
  { Station: 'True Impact Media', Agency: 'The Remnant Agency' },
  { Station: 'True Impact Media', Agency: 'Bell Media' },
  { Station: 'National Media Spots', Agency: 'SmartSites' },
  { Station: 'National Media Spots', Agency: 'Ignite Visibility' },
  { Station: 'National Media Spots', Agency: 'HigherVisibility' },
  { Station: 'National Media Spots', Agency: 'Grow My Ads' },
  { Station: 'National Media Spots', Agency: 'SEM Nexus' },
  { Station: 'National Media Spots', Agency: 'Propaganda Creative' },
  { Station: 'National Media Spots' },
  { Station: 'S&P Global', Agency: 'Digital Silk' },
  { Station: 'S&P Global', Agency: 'Disruptive Advertising' },
  { Station: 'S&P Global', Agency: 'DD.NYC' },
  { Station: 'S&P Global' },
  { Station: 'S&P Global' },
];

const dataUpdated = dData.map((item, index) => {
  const id = index % STATIONS_LIST.length;
  return {
    ...item,
    station: STATIONS_LIST[id].Station,
    stationId: index,
    agency: STATIONS_LIST[id].Agency || null,
    agencyId: STATIONS_LIST[id].Agency ? index + 1000 : null,
  };
});
*/

function Filtering({
  selectedCurrentField,
  setSelectedCurrentField,
  dataArray,
  setCurrentDataArray,
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

  const handleSetDateRange = (newValue) => {
    setDateRange(newValue);
  };

  const handleSetStation = (newValue) => {
    console.log(newValue);
    setSelectedCurrentField({
      ...selectedCurrentField,
      Station: newValue.Station,
    });
  };

  const handleSetAdvertiser = (newValue) => {
    setSelectedCurrentField({
      ...selectedCurrentField,
      Advertiser: newValue.Advertiser,
      Campaign: 'Select Campaign',
    });
  };
  const handleSetCampaign = (newValue) => {
    setSelectedCurrentField({
      ...selectedCurrentField,
      Campaign: newValue.Campaign,
    });
  };

  const handleClearAll = () => {
    setDateRange([null, null]);
    setSelectedCurrentField({
      Station: 'Select Station',
      Advertiser: 'Select Advertiser',
      Campaign: 'Select Campaign',
    });
  };

  useEffect(() => {
    setCurrentDataArray(
      dataFiltered?.length !== 0
        ? dataFiltered
        : dateRange[0] || dateRange[1]
        ? []
        : dData
    );
  }, [dataFiltered]);

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
            value={stationValue}
            setValue={setStationValue}
          />
        </div>
        <div className='col-span-1 flex items-center w-full'>
          <SelectWithSearch
            iconSVG={StationSVG}
            placeholder='Select Agency'
            value={stationValue}
            setValue={setStationValue}
          />
        </div>
        <div className='col-span-1 flex items-center w-full'>
          <SelectWithSearch
            iconSVG={AdvertiserSVG}
            placeholder='Select Advertiser'
            value={stationValue}
            setValue={setStationValue}
          />
        </div>
        <div className='col-span-1 flex items-center w-full'>
          <SelectWithSearch
            iconSVG={CampaignSVG}
            placeholder='Select Campaign'
            value={stationValue}
            setValue={setStationValue}
          />
        </div>
      </div>
    </div>
  );
}

export default Filtering;
