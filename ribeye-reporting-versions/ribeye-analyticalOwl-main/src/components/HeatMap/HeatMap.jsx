import {
  Chart as ChartJS,
  BarElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import { Chart } from 'react-google-charts';
import * as ChartGeo from 'chartjs-chart-geo';
import { useEffect } from 'react';
import { useState } from 'react';

ChartJS.register(
  // CategoryScale,
  // LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ChartGeo.ChoroplethController,
  ChartGeo.ProjectionScale,
  ChartGeo.ColorScale,
  ChartGeo.GeoFeature
);

export default function HeatMap({ data: dataB, selectedAdvertiser, value }) {
  const [getResult, setGetResult] = useState([]);
  const filtered = dataB.filter(
    (val) => val.Advertiser === selectedAdvertiser.Advertiser
  );
  useEffect(() => {
    const result = filtered.reduce((accumulator, currentItem) => {
      const existingItem = accumulator.find(
        (item) => item.Advertiser === currentItem.Advertiser
      );

      if (existingItem) {
        const existingChannel = existingItem[value].find(
          (channel) => channel.name === currentItem[value]
        );
        if (existingChannel) {
          existingChannel.Impressions += currentItem.Impressions;
          existingChannel.Reach += currentItem.Reach;
          existingChannel.Frequency += currentItem.Frequency;
        } else {
          existingItem[value].push({
            name: currentItem[value],
            Impressions: currentItem.Impressions,
            Reach: currentItem.Reach,
            Frequency: currentItem.Frequency,
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
            },
          ],
        });
      }
      return accumulator;
    }, []);
    setGetResult(result);
  }, [selectedAdvertiser, value]);

  const allDataSetData = getResult?.map((val) => val[value]?.map((val) => val));

 
  const geoChartData = allDataSetData[0] !== undefined && [
    ['name', 'Impressions', 'Frequency'],
    ...allDataSetData[0].map((usdata) =>
      value === 'Region'
        ? [
            usdata['name'].split(',')[0],
            usdata['Impressions'],
            usdata['Frequency'],
            // usdata['Reach'],
          ]
        : [
            usdata['name'],
            usdata['Impressions'],
            usdata['Frequency'],
            // usdata['Reach'],
          ]
    ),
  ];
  return (
    <div style={{ width: '100%' }}>
      <Chart
        chartEvents={[
          {
            eventName: 'select',
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 0) return;
              const region = geoChartData[selection[0].row + 1];
              console.log('Selected : ' + region);
            },
          },
        ]}
        chartType="GeoChart"
        width="100%"
        height="100vh"
        data={geoChartData}
        options={{
          region: 'US',
          displayMode: 'regions',
          resolution: 'provinces',
          colorAxis: { colors: ['#000'] },
          tooltip: { trigger: 'focus' }, // Set trigger to "focus" for tooltips on hover
        }}
      />
      {/* <USMapChart data={allDataSetData[0]} /> */}
    </div>
  );
}
