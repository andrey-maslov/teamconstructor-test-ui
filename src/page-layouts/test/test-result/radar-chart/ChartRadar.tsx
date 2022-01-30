import React from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { ITendency } from '../../../../libs/psychology/build/main/types/types';
import { useMediaPredicate } from 'react-media-hook';
import { COLORS } from '../../../../constants/constants';
import hexToRgba from '../../../../helper/hexToRgba';
import style from './radar-chart.module.scss';
import { Radar } from 'react-chartjs-2';

type ChartsPropsType = {
  profile: readonly ITendency[];
  chartLabels: string[];
};

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const data = {
  labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
  datasets: [
    {
      label: '# of Votes',
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const ChartRadar: React.FC<ChartsPropsType> = ({ profile, chartLabels }) => {
  const chartRadarOptions: any = {
    desktop: {
      width: 550,
      height: 420,
      labels: chartLabels,
    },
    mobi: {
      width: 350,
      height: 300,
      labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
    },
  };

  const isMobi = useMediaPredicate('(max-width: 600px)');

  const currentOptions = !isMobi ? { ...chartRadarOptions.desktop } : { ...chartRadarOptions.mobi };

  const data = {
    labels: currentOptions.labels,
    datasets: [
      {
        label: '',
        backgroundColor: hexToRgba(COLORS.orange, 0.5),
        pointBackgroundColor: COLORS.orange,
        borderColor: COLORS.orange,
        pointRadius: 7,
        data: profile.map((item) => item.value),
      },
    ],
  };

  // chartjs.org/docs/latest/configuration/tooltip.html#tooltip-callbacks
  const options_ = {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    scale: {
      reverse: false,
      gridLines: {
        color: [
          'black',
          'red',
          'orange',
          'yellow',
          'green',
          'blue',
          'indigo',
          'violet',
          'red',
          'orange',
          'yellow',
          'green',
          'blue',
          'indigo',
          'violet',
        ],
      },
      ticks: {
        // suggestedMax: 30,
        beginAtZero: true,
      },
      pointLabels: {
        fontSize: 15,
      },
    },
    tooltips: {
      // enabled: false,
      callbacks: {
        title(tooltipItem: any) {
          const i = tooltipItem[0].index;
          return chartLabels[i];
        },
      },
    },
  };

  ChartJS.defaults.font.size = 15;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      r: {
        max: 30,
        min: 0,
        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            size: 16
          }
        }
      }
    }
  };

  return (
    <div className={style.wrapper}>
      <Radar data={data} width={currentOptions.width} height={currentOptions.height} options={options} />
    </div>
  );
};

export default ChartRadar;
