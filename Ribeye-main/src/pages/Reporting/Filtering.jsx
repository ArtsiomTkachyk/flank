import { useMemo, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import ClearIcon from '../../assets/icons/filtering/ClearIcon.svg';
import CalendarSVG from '../../assets/icons/filtering/CalendarIcon.svg';
import DropdownSVG from '../../assets/icons/filtering/DropdownIcon.svg';
import StationSVG from '../../assets/icons/filtering/StationIcon.svg';
import AdvertiserSVG from '../../assets/icons/filtering/AdvertiserIcon.svg';
import CampaignSVG from '../../assets/icons/filtering/CampaignIcon.svg';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import dData from '../../../dummyMINI.json';
import moment from 'moment/moment';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';

function CalendarIcon() {
  return <img src={CalendarSVG} alt='Calendar' />;
}
function DropdownIcon() {
  return <img src={DropdownSVG} alt='Calendar' />;
}
function StationIcon() {
  return <img src={StationSVG} alt='Calendar' />;
}
function AdvertiserIcon() {
  return <img src={AdvertiserSVG} alt='Calendar' />;
}
function CampaignIcon() {
  return <img src={CampaignSVG} alt='Calendar' />;
}

const STATIONS_LIST = [
  { Station: 'Station 1' },
  { Station: 'Station 2' },
  { Station: 'Station 3' },
  { Station: 'Station 4' },
  { Station: 'Station 5' },
  { Station: 'Station 6' },
];

function Filtering({
  sameAdvertiserArray,
  sameCampaignArray,
  selectedCurrentField,
  setSelectedCurrentField,
  currentDataArray,
  setCurrentDataArray,
}) {
  const [firstDate, setFirstDate] = useState('');
  const [secondDate, setSecondDate] = useState('');

  const [dateRange, setDateRange] = useState([null, null]);
  const [formatedDateRange, setFormatedDateRange] = useState([null, null]);

  useEffect(() => {
    setFormatedDateRange(
      dateRange.map((date, index) => {
        console.log(
          '5555555',
          moment(new Date(0)).format('MM.DD.YYYY').toString(),
          moment(new Date()).format('MM.DD.YYYY').toString()
        );
        if (date) {
          return moment(new Date(date)).format('MM.DD.YYYY').toString();
        }
        return index === 0
          ? moment(new Date(0)).format('MM.DD.YYYY').toString()
          : moment(new Date()).format('MM.DD.YYYY').toString();
      })
    );
  }, [dateRange]);

  const handleSetDateRange = (newValue) => {
    console.log(' dateRange, ', newValue);
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

  const handleFirstDateChange = (newValue) => {
    console.log(newValue);
    setSelectedCurrentField({
      Station: 'Select Station',
      Advertiser: 'Select Advertiser',
      Campaign: 'Select Campaign',
    });
    setFirstDate(newValue);
  };
  const handleLastDateChange = (newValue) => {
    setSelectedCurrentField({
      Station: 'Select Station',
      Advertiser: 'Select Advertiser',
      Campaign: 'Select Campaign',
    });
    setSecondDate(newValue);
  };

  const handleClearAll = () => {
    setDateRange([null, null]);
    setSelectedCurrentField({
      Station: 'Select Station',
      Advertiser: 'Select Advertiser',
      Campaign: 'Select Campaign',
    });
  };

  const fDate = new Date(firstDate);
  const sDate = new Date(secondDate);

  const dateFiltered = useMemo(
    () =>
      dData.filter((val) => {
        return (
          formatedDateRange[0] <= val['Report Date'] &&
          formatedDateRange[1] >= val['Report Date']
        );
      }),
    [formatedDateRange]
  );

  useEffect(() => {
    setCurrentDataArray(
      dateFiltered.length !== 0
        ? dateFiltered
        : formatedDateRange[0] || formatedDateRange[0]
        ? []
        : dData
    );
  }, [dateFiltered]);

  return (
    <div className='h-max pb-8 shadow-md px-4 flex-wrap mb-7 rounded-lg border overflow-hidden'>
      <div className='flex justify-between pt-2'>
        <h2 className='text-[#1c1c1c] font-bold p-2'>Filtering</h2>
        <button className='flex items-center gap-1' onClick={handleClearAll}>
          <img src={ClearIcon} alt='campaign' />
          Clear all
        </button>
      </div>

      <div className='grid gap-y-2 grid-cols-1 md:grid-cols-6 lg:grid-cols-10 gap-x-1'>
        <div className='col-span-4'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['SingleInputDateRangeField']}>
              <DateRangePicker
                format='MMM D,YYYY'
                sx={{
                  height: 100,
                  background: '#fff',
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
          {moment(fDate).format('MM.DD.YYYY').toString() >
            moment(sDate).format('MM.DD.YYYY').toString() &&
            firstDate !== '' && (
              <p className='text-red-500'>Select a valid Start Date</p>
            )}
        </div>
        <div className='col-span-2'>
          <div className=' '>
            <Listbox
              disabled={currentDataArray.length === 0}
              value={selectedCurrentField}
              onChange={handleSetStation}
            >
              <div className='relative mt-1'>
                <Listbox.Button
                  className={`${
                    currentDataArray.length === 0
                      ? 'cursor-not-allowed text-slate-400'
                      : 'cursor-pointer'
                  } w-full rounded-lg border-2 bg-white py-[10px] h-[42px] pl-3 pr-10 text-left focus:outline-none focus-visible:border-[#708090] focus-visible:ring-2 hover:border-slate-400 transition-colors focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm  border-gray-300`}
                >
                  <span className='pointer-events-none absolute inset-y-0 left-2 flex items-center pr-2'>
                    <StationIcon />
                  </span>
                  <span className='block truncate pl-5'>
                    {selectedCurrentField.Station}
                  </span>
                  <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                    <DropdownIcon />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Listbox.Options className=' mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm'>
                    <>
                      {STATIONS_LIST.map((item, itemIndex) => (
                        <Listbox.Option
                          key={itemIndex}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-gray-200
                            }`
                          }
                          value={item}
                        >
                          {({ selectedStation }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selectedStation
                                    ? 'font-medium'
                                    : 'font-normal'
                                }`}
                              >
                                {item.Station}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </>
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
        {/* 
        disabled={currentDataArray.length === 0}
        value={selectedCurrentField}
        onChange={handleSetStation}
        <StationIcon />
        selectedCurrentField.Station
        <DropdownIcon />
        STATIONS_LIST.map((item, itemIndex) => ())
        */
        /* <div className="col-span-2">
          <div className=" ">
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={selectedCurrentField}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div> */}

        <div className='col-span-2'>
          <div className=' '>
            <Listbox
              disabled={currentDataArray.length === 0}
              value={selectedCurrentField}
              onChange={handleSetAdvertiser}
            >
              <div className='relative mt-1'>
                <Listbox.Button
                  className={`${
                    currentDataArray.length === 0
                      ? 'cursor-not-allowed text-slate-400'
                      : 'cursor-pointer'
                  } w-full rounded-lg border-2 bg-white py-[10px] h-[42px] pl-3 pr-10 text-left focus:outline-none focus-visible:border-[#708090] focus-visible:ring-2 hover:border-slate-400 transition-colors focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm  border-gray-300`}
                >
                  <span className='pointer-events-none absolute inset-y-0 left-2 flex items-center pr-2'>
                    <AdvertiserIcon />
                  </span>
                  <span className='block truncate pl-5'>
                    {selectedCurrentField.Advertiser}
                  </span>
                  <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                    <DropdownIcon />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm'>
                    <>
                      {sameAdvertiserArray.map((item, itemIndex) => (
                        <Listbox.Option
                          key={itemIndex}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-gray-200
                            }`
                          }
                          value={item}
                        >
                          {({ selectedCurrentField }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selectedCurrentField
                                    ? 'font-medium'
                                    : 'font-normal'
                                }`}
                              >
                                {item.Advertiser}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </>
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
        <div className='col-span-2'>
          <div className=''>
            <Listbox
              disabled={
                selectedCurrentField.Advertiser === 'Select Advertiser' ||
                currentDataArray.length === 0
              }
              value={selectedCurrentField}
              onChange={handleSetCampaign}
            >
              <div className='relative mt-1'>
                <Listbox.Button
                  className={`${
                    selectedCurrentField.Advertiser === 'Select Advertiser' ||
                    currentDataArray.length === 0
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-black cursor-pointer'
                  } w-full rounded-lg border-2 bg-white py-[10px] h-[42px] pl-3 pr-10 text-left hover:border-slate-400 transition-colors focus:outline-none focus-visible:border-[#708090] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm  border-gray-300`}
                >
                  <span className='pointer-events-none absolute inset-y-0 left-2 flex items-center pr-2'>
                    <CampaignIcon />
                  </span>
                  <span className='block truncate pl-5'>
                    {selectedCurrentField.Campaign}
                  </span>
                  <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                    <DropdownIcon />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm'>
                    {sameCampaignArray.map((item, itemIndex) => (
                      <Listbox.Option
                        key={itemIndex}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-gray-200
                            }`
                        }
                        value={item}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {item.Campaign}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filtering;
