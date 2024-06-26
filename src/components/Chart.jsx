import React, { useState, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import jsonData from '../data.json';
import './chart.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  export function Chart() {
    const [selectedBatchIndex, setSelectedBatchIndex] = useState(0);

    const handleBatchClick = useCallback(index => {
      setSelectedBatchIndex(index);
    }, []);

    const batch = jsonData.batchList[selectedBatchIndex];

    const labels = [];
    const rates = [];

    batch.rates.forEach((rate, index) => {
      labels.push(new Date(batch.startTime + index * batch.interval));
      rates.push(rate);
    });

    const dataset = {
      label: `Batch ${selectedBatchIndex + 1}`,
      data: rates,
      borderColor: 'rgb(0, 113, 235)',
      backgroundColor: 'rgb(0, 113, 235)',
    };

    const data = {
      labels,
      datasets: [dataset],
    };

    return (
      <div>
      <div className='header'>
      {jsonData.batchList.map((batch, index) => (
        <button
        key={index}
        onClick={() => handleBatchClick(index)}
        style={{ opacity: selectedBatchIndex === index ? 0.6 : 1 }}
        >
        {batch.name}
        </button>
        ))}
        </div>
        <Line options={options} data={data} />
        </div>
        );
      }
