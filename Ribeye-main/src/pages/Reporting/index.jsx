import { useEffect, useRef } from 'react';
import ads_click from '../../assets/icons/ads_click.svg';
import local_atm from '../../assets/icons/local_atm.svg';
import totalCampaign from '../../assets/icons/totalCampaign.svg';
import track_changes from '../../assets/icons/track_changes.svg';
import ImpressionBarChart from '../../components/Charts/ImpressionBarChart';

import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import dData from '../../../dummUPDATED.json';
import Table from './Table';
import HeatMap from '../../components/HeatMap/HeatMap';
// import USMapChart from '../../components/HeatMap/GeoMap';
// import GeoMap from '../../components/HeatMap/GeoMap';
import { listBoxItems } from './constants';
import Card from '../../components/shared/Card';
import autoAnimate from '@formkit/auto-animate';
import Filtering from './Filtering';

const Reporting = () => {
  const [currentDataArray, setCurrentDataArray] = useState(dData);
  const [totals, setTotals] = useState({
    impressions: 0,
    reach: 0,
    frequency: 0,
    revenue: 0,
  });
  const [selected, setSelected] = useState({ ['Campaign Name']: 'Select...' });
  const [listboxSelected, setListboxSelected] = useState({
    label: 'State',
    value: 'Region',
    resolution: 'provinces',
  });
  const [selectedAdvertisments, setSelectAdvertiser] = useState({
    Advertiser: 'Select...',
  });
  const [selectedCurrentField, setSelectedCurrentField] = useState({
    Station: 'Select Station',
    Advertiser: 'Select Advertiser',
    Campaign: 'Select Campaign',
  });

  const [totalImpressions, setTotalImpressions] = useState(0);
  const [totalReach, setTotalReach] = useState(0);
  const [totalFrequency, setTotalFrequency] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  useEffect(() => {
    const tImpressions = currentDataArray.reduce(
      (a, c) => a + c.Impressions,
      0
    );
    setTotalImpressions(tImpressions);
    const tReach = currentDataArray.reduce((a, c) => a + c.Reach, 0);
    setTotalReach(tReach);

    const tFrequency = currentDataArray.reduce((a, c) => {
      return a + c.Frequency;
    }, 0);
    setTotalFrequency(tFrequency);

    const tRevenue = currentDataArray.reduce((a, c) => a + c.Revenue, 0);
    setTotalRevenue(tRevenue);
  }, [
    currentDataArray,
    selected,
    totalImpressions,
    totalFrequency,
    totalReach,
    totalRevenue,
  ]);

  const [impressionsByDate, setImpressionsByDate] = useState({});
  const [sameCampaign, setSameCampaign] = useState({});

  const filterdCampaigns = currentDataArray.filter((val) => {
    return val.Advertiser?.includes(selectedAdvertisments.Advertiser);
  });

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    // Calculate the total impressions for each date
    const impressions = currentDataArray.reduce((acc, item) => {
      const { 'Report Date': Date, Impressions } = item;
      acc[Date] = (acc[Date] || 0) + Impressions;
      return acc;
    }, {});

    setImpressionsByDate(impressions);
  }, [selected, totalImpressions, totalFrequency, totalReach, totalRevenue]);

  useEffect(() => {
    // */ Campaign==================================================

    // Same Campaign and their impressions
    const sCampaign = filterdCampaigns.reduce((acc, item) => {
      const { ['Campaign Name']: Campaign, Impressions } = item;
      acc[Campaign] = (acc[Campaign] || 0) + Impressions;
      return acc;
    }, {});
    setSameCampaign(sCampaign);
  }, [selected, totalImpressions, totalFrequency, totalReach, totalRevenue]);

  // Chart Data
  const chartDataInArray = Object.entries(impressionsByDate).map(
    ([key, value]) => ({
      Date: key,
      Impressions: value,
    })
  );

  const sameCampaignArray = Object.entries(sameCampaign).map(
    ([key, value]) => ({
      Campaign: key,
      Impressions: value,
    })
  );

  const dateObjects = chartDataInArray.map((val) => {
    const [month, day, year] = val.Date.split('.').map(Number);
    return new Date(year, month - 1, day); // Month is 0-indexed in Date constructor (0 for January)
  });

  // Sort the Date objects in descending order
  dateObjects.sort((a, b) => a - b);

  // Convert the sorted Date objects back to the desired format 'MM.DD.YYYY'
  const sortedDates = dateObjects.map((date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month.toString().padStart(2, '0')}.${day
      .toString()
      .padStart(2, '0')}.${year}`;
  });

  const chartData = {
    labels: sortedDates,
    datasets: [
      {
        label: 'By Day',
        data: chartDataInArray.map((val) => val.Impressions),
      },
    ],
  };

  return (
    <>
      <div className='w-full space-y-10 px-4 py-6'>
        <Filtering
          selectedCurrentField={selectedCurrentField}
          setSelectedCurrentField={setSelectedCurrentField}
          sameCampaignArray={sameCampaignArray}
          dataArray={dData}
          setCurrentDataArray={setCurrentDataArray}
          setTotals={setTotals}
        />
        <div>
          <div className='flex flex-wrap gap-x-3 gap-y-5 justify-between'>
            <div className='flex w-full sm:w-[47%] md:w-[24%] min-w-[250px] min-h-[100px] justify-center rounded-lg bg-[#E3F5FF] shadow-shadowInset10 flex-col px-4 py-2 border border-solid border-[rgba(112, 128, 144, 0.10)]'>
              <h2 className='text-base font-semibold'>Impressions</h2>
              <div className='w-full text-[#000] flex justify-between '>
                <span className='text-2xl font-semibold'>
                  {totals.impressions}
                </span>
                <img src={totalCampaign} alt='campaign' />
              </div>
            </div>

            <div className='flex w-full sm:w-[47%] md:w-[24%] min-w-[250px] min-h-[100px] justify-center rounded-lg bg-[#E5ECF6] shadow-shadowInset10 flex-col px-4 py-2 border border-solid border-[rgba(112, 128, 144, 0.10)]'>
              <h2 className='text-base font-semibold'>Reach</h2>
              <div className='w-full text-[#000] flex justify-between '>
                <span className='text-2xl font-semibold'>{totals.reach}</span>
                <img src={track_changes} alt='track changes' />
              </div>
            </div>

            <div className='flex w-full sm:w-[47%] md:w-[24%] min-w-[250px] min-h-[100px] justify-center rounded-lg bg-[#E3F5FF] shadow-shadowInset10 flex-col px-4 py-2 border border-solid border-[rgba(112, 128, 144, 0.10)]'>
              <h2 className='text-base font-semibold'>Frequency</h2>
              <div className='w-full text-[#000] flex justify-between '>
                <span className='text-2xl font-semibold'>
                  {totals.frequency.toFixed(1)}
                </span>
                <img src={ads_click} alt='ads' />
              </div>
            </div>

            <div className='flex w-full sm:w-[47%] md:w-[24%] min-w-[250px] min-h-[100px] justify-center rounded-lg bg-[#E5ECF6] shadow-shadowInset10 flex-col px-4 py-2 border border-solid border-[rgba(112, 128, 144, 0.10)]'>
              <h2 className='text-base font-semibold'>Budget Spent</h2>
              <div className='w-full text-[#000] flex justify-between '>
                <span className='text-2xl font-semibold'>
                  {totals.revenue.toFixed(3)}
                </span>
                <img src={local_atm} alt='local atm' />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full my-5 flex  flex-col overflow-x-hidden mt-9'>
          <div className='flex justify-between gap-x-[10px] items-center mb-6'></div>
          <Card>
            <div className='p-7 pt-4 '>
              <h2 className='text-[#171725] text-4xl mb-5 text-center font-bold'>
                Impressions
              </h2>
              <ImpressionBarChart chartData={chartData} />
            </div>
          </Card>
        </div>
        <div className='my-20 '>
          {selectedCurrentField.Advertiser !== 'Select Advertiser' && (
            <>
              <div className='max-w-[12rem]'>
                <Listbox value={listboxSelected} onChange={setListboxSelected}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className='block text-sm font-medium leading-6 text-gray-900'>
                        Selection type
                      </Listbox.Label>
                      <div className='relative mt-2'>
                        <Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6'>
                          <span className='flex items-center'>
                            <span className='ml-3 h-5 block truncate'>
                              {listboxSelected.label}
                            </span>
                          </span>
                          <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                            <ChevronUpDownIcon
                              className='h-5 w-5 text-gray-400'
                              aria-hidden='true'
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave='transition ease-in duration-100'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                        >
                          <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                            {listBoxItems.map((val) => (
                              <Listbox.Option
                                key={val.id}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? 'bg-indigo-600 text-white'
                                      : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                  )
                                }
                                value={val}
                              >
                                {({ listboxSelected, active }) => (
                                  <>
                                    <div className='flex items-center'>
                                      <span
                                        className={classNames(
                                          listboxSelected
                                            ? 'font-semibold'
                                            : 'font-normal',
                                          'ml-3 block truncate'
                                        )}
                                      >
                                        {val.label}
                                      </span>
                                    </div>

                                    {listboxSelected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? 'text-white'
                                            : 'text-indigo-600',
                                          'absolute inset-y-0 right-0 flex items-center pr-4'
                                        )}
                                      >
                                        <CheckIcon
                                          className='h-5 w-5'
                                          aria-hidden='true'
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
              <div className='mb-20'>
                {listboxSelected.label !== 'Select...' && (
                  <HeatMap
                    value={listboxSelected.value}
                    data={currentDataArray}
                    selectedAdvertiser={selectedCurrentField}
                    resolution={listboxSelected.resolution}
                  />
                )}
              </div>
            </>
          )}
        </div>
        <div>
          <Table
            data={currentDataArray}
            selectedAdvertiser={selectedCurrentField}
          />
        </div>
      </div>
    </>
  );
};

export default Reporting;
