import React,{memo} from "react";
import { Chart as ChartJS, ArcElement,Tooltip,  Legend } from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
ChartJS.register(ArcElement,Tooltip,  Legend);
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
        position: "bottom",
          align: "start",
      labels: {
        font: 44,
      },
    },
    },
    
  
};


const Stat = ({ title, Data}) => {
    const data = {
                    labels: Data.labels,
                    datasets: [
                    {
                    
                    data: Data.data,
                    backgroundColor: [
                        '#594f8c',
                        '#bc4f8f',
                        '#ff6360',
                    ],
                    
                    borderWidth: 0.5,
                    },
                ], 
};
    return(
        <div className="stat">
            <h4>
                {title}
            </h4>
            <div>
                    <Doughnut options={options} width="100%" height="100%" data={data}/>
            </div>
        </div>
    )
}

export default memo(Stat)