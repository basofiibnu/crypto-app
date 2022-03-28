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
import { Col, Row, Typography, Card } from 'antd';

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
            min: 0,
          },
        },
      ],
    },
  };

  const titleContent = () => {
    return (
      <Row className="chart-header">
        <Col>
          <TitleText level={3}>{coinName} Price Chart </TitleText>
        </Col>
        <Col
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <TitleText level={5} style={{ margin: 0 }}>
            Change: {coinHistory?.data?.change}%
          </TitleText>
          <TitleText level={5} style={{ margin: 0 }}>
            Current {coinName} Price: $ {currentPrice}
          </TitleText>
        </Col>
      </Row>
    );
  };

  return (
    <Card title={titleContent()}>
      <Line data={data} options={options} />
    </Card>
  );
};

export default LineChart;
