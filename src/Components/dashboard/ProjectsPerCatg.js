import React  from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Colors
    
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Colors
);



export default function ProjectsPerCatg({data}) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: 44,
                    color: '#ff6360'
                }
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
                color: '#594f8c',
            },
            
           
        },
        scales: {

            y: {
                ticks: {
                    precision: 0,
                    color: '#594f8c',

                },
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: data.labels.length * 2,
                stepSize: 10
            },
            x: {
                ticks: {
                    color: '#594f8c',
                }
            }

        },
    };
  
    
  return (
      <div className=" min-w-[100%]  max-w-[100%] h-[300px] w-[500px] min-h-fit rounded-lg border border-violet-700 shadow-md scale-95 p-2 ">
          <Bar options={options} data={data}  />

      </div>)
}
