import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import {
  Col,
  Row,
  Typography,
  Select,
  Collapse,
  List,
  Card,
} from 'antd';
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  NumberOutlined,
  CheckOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  GithubOutlined,
  RedditOutlined,
  TwitterOutlined,
  ChromeOutlined,
} from '@ant-design/icons';

import {
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
} from '../services/cryptoApi';
import LineCharts from './LineCharts';
import Loader from './Loader';

const { Title } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${
        cryptoDetails?.price && millify(cryptoDetails?.price)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'Rank',
      value: cryptoDetails?.rank,
      icon: <NumberOutlined />,
    },
    {
      title: 'Listed at',
      value: `$ ${
        cryptoDetails?.listedAt && millify(cryptoDetails?.listedAt)
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
    {
      title: 'Number Of Markets',
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${
        cryptoDetails?.supply?.total &&
        millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  const iconAvatar = (icon) => {
    switch (icon) {
      case 'facebook':
        return <FacebookOutlined />;
      case 'github':
        return <GithubOutlined />;
      case 'reddit':
        return <RedditOutlined />;
      case 'youtube':
        return <YoutubeOutlined />;
      case 'twitter':
        return <TwitterOutlined />;
      default:
        return <ChromeOutlined />;
    }
  };

  console.log(cryptoDetails);

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2}>
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars. View value
          statistics, market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date, i) => (
          <Option value={date} key={i}>
            {date}
          </Option>
        ))}
      </Select>
      <Row style={{ marginTop: '1rem' }}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <LineCharts
            coinHistory={coinHistory}
            currentPrice={millify(cryptoDetails.price)}
            coinName={cryptoDetails.name}
          />
        </Col>
      </Row>

      <Row gutter={[12, 12]} className="coin-desc-link">
        <Col xs={24} sm={24} md={11} lg={7}>
          <Collapse accordion defaultActiveKey={'1'}>
            <Panel header={`What is ${cryptoDetails.name}`} key="1">
              <p>{HTMLReactParser(cryptoDetails.description)}</p>
            </Panel>
          </Collapse>
        </Col>
        <Col xs={24} sm={24} md={11} lg={7}>
          <Card className="coin-desc-link__list-container">
            <List
              itemLayout="horizontal"
              dataSource={stats}
              header={
                <Title level={4}>
                  {cryptoDetails.name} Statistics
                </Title>
              }
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    style={{ alignItems: 'center' }}
                    avatar={item.icon}
                    title={
                      <span style={{ textTransform: 'capitalize' }}>
                        {item.title}
                      </span>
                    }
                    description={
                      <span style={{ wordBreak: 'break-all' }}>
                        {item.value}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={11} lg={8}>
          <Card className="coin-desc-link__list-container">
            <List
              itemLayout="horizontal"
              dataSource={cryptoDetails.links}
              header={
                <Title level={4}>{cryptoDetails.name} Links</Title>
              }
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    style={{ alignItems: 'center' }}
                    avatar={iconAvatar(item.type)}
                    title={
                      <a
                        href={item.url}
                        style={{ textTransform: 'capitalize' }}
                      >
                        {item.type}
                      </a>
                    }
                    description={
                      <a
                        href={item.url}
                        style={{ wordBreak: 'break-all' }}
                      >
                        {item.url}
                      </a>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Col>
  );
};

export default CryptoDetails;
