import React from 'react';
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
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const { Title: TitleText } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  console.log(coinHistory, 'hist');
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    const unixTimestamp = coinHistory?.data?.history[i].timestamp;
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString();
    coinTimestamp.push(humanDateFormat.split(' ')[0]);
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <TitleText level={2} className="chart-title">
          {coinName} Price Chart{' '}
        </TitleText>
        <Col className="price-container">
          <TitleText level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </TitleText>
          <TitleText level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </TitleText>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
