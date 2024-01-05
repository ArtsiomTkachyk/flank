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
import { Bar, Doughnut } from 'react-chartjs-2';

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

  plugins: {
    legend: {
      display: false,
    },
  },
};

export default function ImpressionBarChart({ chartData }) {
  return (
    <div className='bar_chart'>
      <Bar
        style={{ height: 300, margin: 'auto' }}
        options={{
          ...options,
          borderRadius: 5,
          borderSkipped: false,
          backgroundColor: '#193B2C',
          scales: {
            y: {
              grid: {
                drawTicks: false,
              },
              border: {
                display: false,
                dash: [6, 3],
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
          maintainAspectRatio: false,
        }}
        data={chartData}
      />
    </div>
  );
}
export function ImpressionPieChart({ chartData }) {
  return (
    <div className='bar_chart'>
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
