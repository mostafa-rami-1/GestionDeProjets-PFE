import React from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
export default function ProjectsPerMonth({data}) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
       
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
        scales: {
            x: {
                ticks: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                }
            },
            y: {
                ticks: {
                    precision: 0,
                    
                },
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: data.labels.length*2,
                stepSize:10
            },
        },
    };

  
    
  return (
     
             
    <div className=" min-w-[100%]  max-w-[100%] h-[300px] w-[500px] min-h-fit rounded-lg border border-violet-700 shadow-md scale-95 p-2 ">
        <Line options={options}  data={data} />
    </div>              
        
   
  )
}
