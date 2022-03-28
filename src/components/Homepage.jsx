import React, { Fragment } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data.stats;

  if (isFetching) return <Loader />;
  return (
    <Fragment>
      <Title level={2} className="home-title">
        Global Crypto Stats
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8} lg={5} className="statistic-card">
          <Card title="Total Cryptocurrencies" hoverable>
            <Statistic value={globalStats.total} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={5} className="statistic-card">
          <Card title="Total Exchanges" hoverable>
            <Statistic value={millify(globalStats.totalExchanges)} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={5} className="statistic-card">
          <Card title="Total Market Cap" hoverable>
            <Statistic value={millify(globalStats.totalMarketCap)} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={5} className="statistic-card">
          <Card title="Total 24h Volume" hoverable>
            <Statistic value={millify(globalStats.total24hVolume)} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4} className="statistic-card">
          <Card title="Total Markets" hoverable>
            <Statistic value={millify(globalStats.totalMarkets)} />
          </Card>
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </Fragment>
  );
};

export default Homepage;
