import { useEffect, useState } from "react";
import axios from 'axios'
import { Line } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';

function App() {
  Chart.register(CategoryScale);
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);

  const fetchXAxis = async () => {
    try {
      const response = await axios.get('https://retoolapi.dev/gDa8uC/data');
      setXAxis(response.data.slice(0, 50)); 
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const fetchYAxis = async () => {
    try {
      const response = await axios.get('https://retoolapi.dev/o5zMs5/data');
      setYAxis(response.data.slice(0, 50));
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchXAxis();
    fetchYAxis();
  }, []);

  const xLabels = xAxis.map(point => point.Label);
  const xRandomNumbers = xAxis.map(point => parseFloat(point.RandomNumber));
  const yRandomNumbers = yAxis.map(point => parseFloat(point.RandomNumber));

  const data = {
    labels: xLabels,
    datasets: [
      {
        label: 'X Axis',
        data: xRandomNumbers,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Y Axis',
        data: yRandomNumbers,
        fill: false,
        backgroundColor: 'rgb(192, 75, 192)',
        borderColor: 'rgba(192, 75, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      },
      y: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10
        }
      }
    }
  };

  return (
    <div className="App">
      <h2>X and Y Axis </h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default App;
