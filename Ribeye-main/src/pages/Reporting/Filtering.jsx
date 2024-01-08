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

const calculateTotal = (arrayOfElements) => {
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
  });
  return total;
};
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

function Filtering({ dataArray, setCurrentDataArray, setTotals }) {
  const [dataFiltered, setDataFiltered] = useState(dataArray);
  const [dateRange, setDateRange] = useState([null, null]);
  const [stationValue, setStationValue] = useState([]);
  const [stationList, setStationList] = useState([]);
  const [agencyValue, setAgencyValue] = useState([]);
  const [agencyList, setAgencyList] = useState([]);
  const [advertiserValue, setAdvertiserValue] = useState([]);
  const [advertiserList, setAdvertiserList] = useState([]);
  const [campaignValue, setCampaignValue] = useState([]);
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
    if (stationValue.length !== 0) setStationValue([]);
    const calculatedData = findUnicFields(dataFiltered, 'station', 'stationId');
    setStationList(calculatedData.newArray);
    setTotals(calculatedData.total);
  }, [dataFiltered]);

  useEffect(() => {
    if (agencyValue.length !== 0) setAgencyValue([]);
    setAgencyList([]);
    if (stationValue.length !== 0) {
      const calculatedData = findUnicFields(
        dataFiltered.filter((item) =>
          stationValue.map((item) => item.id).includes(item.stationId)
        ),
        'agency',
        'agencyId'
      );
      setAgencyList(calculatedData.newArray);
      setTotals(calculatedData.total);
    }
  }, [stationValue]);

  useEffect(() => {
    if (advertiserValue.length !== 0) setAdvertiserValue([]);
    setAdvertiserList([]);
    if (stationValue.length !== 0 && agencyValue.length !== 0) {
      const calculatedData = findUnicFields(
        dataFiltered.filter(
          (item) =>
            stationValue.map((item) => item.id).includes(item.stationId) &&
            agencyValue.map((item) => item.id).includes(item.agencyId)
        ),
        'Advertiser',
        'advertiserId'
      );
      setAdvertiserList(calculatedData.newArray);
      setTotals(calculatedData.total);
    }
    if (stationValue.length !== 0 && agencyValue.length === 0) {
      const calculatedData = findUnicFields(
        dataFiltered.filter((item) =>
          stationValue.map((item) => item.id).includes(item.stationId)
        ),
        'Advertiser',
        'advertiserId'
      );
      setAdvertiserList(calculatedData.newArray);
      setTotals(calculatedData.total);
    }
  }, [stationValue, agencyValue]);

  useEffect(() => {
    if (campaignValue.length !== 0) setCampaignValue([]);
    setCampaignList([]);
    if (stationValue.length !== 0 && advertiserValue.length !== 0) {
      const calculatedData = findUnicFields(
        dataFiltered.filter(
          (item) =>
            stationValue.map((item) => item.id).includes(item.stationId) &&
            (!agencyValue.length
              ? true
              : agencyValue.map((item) => item.id).includes(item.agencyId)) &&
            advertiserValue.map((item) => item.id).includes(item.advertiserId)
        ),
        'Campaign Name',
        'campaignId'
      );
      setCampaignList(calculatedData.newArray);
      setTotals(calculatedData.total);
    }
  }, [advertiserValue]);

  useEffect(() => {
    if (
      stationValue.length !== 0 &&
      agencyValue.length !== 0 &&
      advertiserValue.length !== 0
    ) {
      if (campaignValue.length !== 0) {
        const calculatedData = findUnicFields(
          dataFiltered.filter(
            (item) =>
              stationValue.map((item) => item.id).includes(item.stationId) &&
              agencyValue.map((item) => item.id).includes(item.agencyId) &&
              advertiserValue
                .map((item) => item.id)
                .includes(item.advertiserId) &&
              campaignValue.map((item) => item.id).includes(item.campaignId)
          ),
          'Campaign Name',
          'campaignId'
        );
        setTotals(calculatedData.total);
      } else {
        const calculatedData = findUnicFields(
          dataFiltered.filter(
            (item) =>
              stationValue.map((item) => item.id).includes(item.stationId) &&
              agencyValue.map((item) => item.id).includes(item.agencyId) &&
              advertiserValue.map((item) => item.id).includes(item.advertiserId)
          ),
          'Campaign Name',
          'campaignId'
        );
        setTotals(calculatedData.total);
      }
    }
  }, [campaignValue]);

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
            iconSVG={null}
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
            listOfItems={advertiserList}
            value={advertiserValue}
            setValue={setAdvertiserValue}
          />
        </div>
        <div className='col-span-1 flex items-center w-full'>
          <SelectWithSearch
            iconSVG={CampaignSVG}
            placeholder='Select Campaign'
            listOfItems={campaignList}
            value={campaignValue}
            setValue={setCampaignValue}
          />
        </div>
      </div>
    </div>
  );
}

export default Filtering;
