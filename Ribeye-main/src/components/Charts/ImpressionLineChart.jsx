import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const options = {
  responsive: true,

  tooltips: {
    enabled: true,
    mode: 'label',
    callbacks: {
      title: function (tooltipItems, data) {
        var idx = tooltipItems[0].index;
        return 'Title:' + data.labels[idx]; //do something with title
      },
      label: function (tooltipItems, data) {
        //var idx = tooltipItems.index;
        //return data.labels[idx] + ' €';
        return tooltipItems.xLabel + ' €';
      },
    },
  },
  plugins: {
    legend: {
      position: 'right',
    },
  },
};



export default function ImpressionBarChart({ chartData }) {
  return (
    <div className="bar_chart">
      <Bar
        style={{ width: 300, height: 300, margin: 'auto' }}
        options={
          (options,
          {
            maintainAspectRatio: false,
          })
        }
        data={chartData}
      />
    </div>
  );
}
export function ImpressionPieChart({ chartData }) {
  return (
    <div className="bar_chart">
      <Doughnut
        style={{ width: 300, height: 300, margin: 'auto' }}
        // style={{ width: 600, height: 600, margin: 'auto' }}
        options={
          (options,
          {
            plugins: {
              legend: {
                position: 'right',
              },
            },
            maintainAspectRatio: false,
          })
        }
        data={chartData}
      />
    </div>
  );
}
