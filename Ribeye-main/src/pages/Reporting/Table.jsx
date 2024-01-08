import { Link, useSearchParams } from 'react-router-dom';
import { linkButtons } from './constants';
import { useEffect, useState } from 'react';
import ArrowLineUpDown from '../../assets/icons/ArrowLineUpDown.svg';
import ImpressionBarChart from '../../components/Charts/ImpressionBarChart';
import AllTable from './AllTable';
import Card from '../../components/shared/Card';
import { Switch } from '@headlessui/react';

function Table({ data }) {
  const [searchParams, setSearchParams] = useSearchParams({
    name: '',
  });

  // const [showtab, setShowTab] = useState('table');
  const [enabled, setEnabled] = useState(false);
  const [currentLink, setCurrentLink] = useState({
    label: 'Channel',
    value: 'Digital Channel',
  });
  const [getResult, setGetResult] = useState([]);

  const filtered = data; /*.filter(
    (val) => val.Advertiser === selectedAdvertiser.Advertiser
  );*/

  useEffect(() => {
    setSearchParams({
      name: 'channel',
    });
    const result = filtered.reduce((accumulator, currentItem) => {
      const existingItem = accumulator.find(
        (item) => item.Advertiser === currentItem.Advertiser
      );

      if (existingItem) {
        existingItem.Impressions += currentItem.Impressions;
        existingItem.Reach += currentItem.Reach;
        existingItem.Frequency += currentItem.Frequency;
        existingItem['Campaign Status'] = currentItem['Campaign Status'];
        const existingChannel = existingItem[currentLink.value].find(
          (channel) => channel.name === currentItem[currentLink.value]
        );
        if (existingChannel) {
          existingChannel.Impressions += currentItem.Impressions;
          existingChannel.Reach += currentItem.Reach;
          existingChannel.Frequency += currentItem.Frequency;
          existingItem['Campaign Status'] = currentItem['Campaign Status'];
        } else {
          existingItem[currentLink.value].push({
            name: currentItem[currentLink.value],
            Impressions: currentItem.Impressions,
            Reach: currentItem.Reach,
            Frequency: currentItem.Frequency,
            Status: currentItem['Campaign Status'],
          });
        }
      } else {
        accumulator.push({
          Advertiser: currentItem.Advertiser,
          [currentLink.value]: [
            {
              name: currentItem[currentLink.value],
              Impressions: currentItem.Impressions,
              Reach: currentItem.Reach,
              Frequency: currentItem.Frequency,
              Status: currentItem['Campaign Status'],
            },
          ],
        });
      }
      return accumulator;
    }, []);
    setGetResult(result);
  }, [currentLink]);

  const chartDataSetsData = getResult?.map((val) =>
    val[currentLink.value]?.map((val) => val)
  );

  const chartData = {
    labels: chartDataSetsData[0]?.map((val) => val.name),
    datasets: [
      {
        label: 'Impressions',
        data: chartDataSetsData[0]?.map((val) => val.Impressions),
        backgroundColor: '#708090',
      },

      {
        label: 'Reach',
        data: chartDataSetsData[0]?.map((val) => val.Reach),
        backgroundColor: '#7FFFD4',
      },
      {
        label: 'Frequency',
        data: chartDataSetsData[0]?.map((val) => val.Frequency),
        backgroundColor: '#4398ed',
      },
    ],
  };

  return (
    <div>
      <div className='flex items-center justify-center'>
        <div className='flex flex-wrap items-center gap-3'>
          {linkButtons.map((link) => (
            <Link
              key={link.id}
              to={`/reporting?name=${link.sParams}`}
              onClick={() => {
                setCurrentLink({ value: link.value });
                if (link.value !== currentLink) setGetResult([]);
              }}
              className={`
              ${
                searchParams.get('name') === link.sParams
                  ? 'bg-black'
                  : 'bg-[#708090]'
              }
 border border-solid bg-[#708090] border-[#708090] rounded-full text-sm font-medium text-[#fff] px-5 py-2`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className='h-max flex justify-between items-center gap-x-4 my-6  pt-4'>
        <div className='ml-auto flex items-center gap-2 mr-2'>
          <h1 className='font-semibold text-lg text-slate-800'>
            {enabled ? 'Graph' : 'Table'}
          </h1>

          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? 'bg-slate-600' : 'bg-slate-400'}
          relative inline-flex h-[24px] w-[45px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span
              aria-hidden='true'
              className={`${enabled ? 'translate-x-[1.32rem]' : 'translate-x-0'}
            pointer-events-none inline-block h-[21px] w-[21px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      </div>
      <div
        className={`overflow-x-auto mt-8 mb-14 ${
          !enabled &&
          'rounded-xl shadow-md border border-solid border-[rgba(112, 128, 144, 0.10)]'
        }  `}
      >
        {enabled ? (
          <Card>
            <div className='p-7 pt-4'>
              <ImpressionBarChart chartData={chartData} />
            </div>
          </Card>
        ) : (
          <div className='p-4 '>
            <table
              className={`
                min-h-[90px]
                divide-y-2 w-full`}
            >
              <thead>
                <tr>
                  <th>
                    <div className='flex items-center gap-2 text-base font-semibold text-black'>
                      Name
                      <img src={ArrowLineUpDown} alt='ArrowLineUpDown' />
                    </div>
                  </th>
                  <th>
                    <div className='flex items-center gap-2 text-base font-semibold text-black'>
                      Impressions
                      <img src={ArrowLineUpDown} alt='ArrowLineUpDown' />
                    </div>
                  </th>
                  <th>
                    <div className='flex items-center gap-2 text-base font-semibold text-black'>
                      Reach
                      <img src={ArrowLineUpDown} alt='ArrowLineUpDown' />
                    </div>
                  </th>
                  <th>
                    <div className='flex items-center gap-2 text-base font-semibold text-black'>
                      Frequency
                      <img src={ArrowLineUpDown} alt='ArrowLineUpDown' />
                    </div>
                  </th>
                  <th>
                    <div className='flex items-center gap-2 text-base font-semibold text-black'>
                      Status
                      <img src={ArrowLineUpDown} alt='ArrowLineUpDown' />
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className='text-[#708090] divide-y text-sm'>
                {currentLink.label === '' ? (
                  <tr>
                    <td>Select from above</td>
                  </tr>
                ) : (
                  getResult?.map((val) =>
                    val[currentLink.value]?.map((val, ind) => (
                      <tr key={ind} className='min-w-[900px] hover:bg-gray-50'>
                        <td>
                          {val.name.length > 40
                            ? val.name.slice(0, 40) + '...'
                            : val.name}
                        </td>
                        <td>{val.Impressions}</td>
                        <td className='pl-2'>{val.Reach}</td>
                        <td className='pl-6'>
                          {Number(val.Frequency).toFixed(1)}
                        </td>
                        <td className='pl-2'>{val.Status}</td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className='mt-9 mb-6'>
        {
          <div>
            <AllTable
              filtered={filtered}
              selectedAdvertiser={'selectedAdvertiser'}
            />
          </div>
        }
      </div>
    </div>
  );
}

export default Table;
