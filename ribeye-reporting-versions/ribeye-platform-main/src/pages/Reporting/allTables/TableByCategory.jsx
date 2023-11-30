import { useEffect, useState } from 'react';
import ImpressionBarChart, {
  ImpressionPieChart,
} from '../../../components/Charts/ImpressionLineChart';
import Card from '../../../components/shared/Card';

function TableByCategory({
  filtered,
  value,
  heading,
  type,
  selectedAdvertiser,
}) {
  const [getResult, setGetResult] = useState([]);
  useEffect(() => {
    const result = filtered.reduce((accumulator, currentItem) => {
      const existingItem = accumulator.find(
        (item) => item.Advertiser === currentItem.Advertiser
      );

      if (existingItem) {
        existingItem.Impressions += currentItem.Impressions;
        existingItem.Reach += currentItem.Reach;
        existingItem.Frequency += currentItem.Frequency;
        existingItem['Campaign Status'] = currentItem['Campaign Status'];
        const existingChannel = existingItem[value].find(
          (channel) => channel.name === currentItem[value]
        );
        if (existingChannel) {
          existingChannel.Impressions += currentItem.Impressions;
          existingChannel.Reach += currentItem.Reach;
          existingChannel.Frequency += currentItem.Frequency;
          existingItem['Campaign Status'] = currentItem['Campaign Status'];
        } else {
          existingItem[value].push({
            name: currentItem[value],
            Impressions: currentItem.Impressions,
            Reach: currentItem.Reach,
            Frequency: currentItem.Frequency,
            Status: currentItem['Campaign Status'],
          });
        }
      } else {
        accumulator.push({
          Advertiser: currentItem.Advertiser,
          [value]: [
            {
              name: currentItem[value],
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
  }, [value, selectedAdvertiser]);

  const allDataSetData = getResult.map((val) => val[value].map((val) => val));

  const barChartData = {
    labels: allDataSetData[0]?.map((val) =>
      val.name.length >= 10 ? val.name.substring(0, 10) + '...' : val.name
    ),
    datasets: [
      {
        label: 'Impressions',
        data: allDataSetData[0]?.map((val) => val.Impressions),
        backgroundColor: [
          '#708090',
          '#141718',
          '#E3F5FF',
          '#E5ECF6',
          '#EE82EE',
          '#7FFFD4',
          '#F0E68C',
        ],
        borderColor: 'white',
      },
    ],
  };
  const pieChartData = {
    labels: allDataSetData[0]?.map((val) => val.name),
    datasets: [
      {
        label: 'Impressions',
        data: allDataSetData[0]?.map((val) => val.Impressions),
        backgroundColor: [
          '#708090',
          '#141718',
          '#E3F5FF',
          '#E5ECF6',
          '#F0E68C',
          '#7FFFD4',
          '#EE82EE',
        ],
      },
    ],
  };

  return (
    <Card>
      <div>
        <h1 className="font-semibold text-lg text-left mb-4  ">{heading}</h1>
        {type === 'Bar' ? (
          <ImpressionBarChart chartData={barChartData} />
        ) : (
          <ImpressionPieChart chartData={pieChartData} />
        )}
      </div>
    </Card>
  );
}

export default TableByCategory;