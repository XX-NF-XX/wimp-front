import React from 'react';

import { Container, Row, Col, Alert } from 'reactstrap';

import logo from '../../public/logo.png';

import HomeCard from './HomeCard';

import translation from '../constants/translation';

function HomePage() {
  return (
    <Container>
      <Row>
        <Col className='md-auto text-center'>
          <img src={logo} className='responsive' height='auto' width='auto' alt='WIMP' />
        </Col>
      </Row>
      <Row>
        <Col className='md-auto text-center py-2'>
          <Alert color='success h2'>{translation.home.title}</Alert>
        </Col>
      </Row>
      <Row>
        <HomeCard {...translation.home.goal} />
      </Row>
      <Row>
        <HomeCard {...translation.home.why} />
      </Row>
      <Row>
        <HomeCard {...translation.home.how} />
      </Row>
      <Row>
        <HomeCard {...translation.home.todo} />
      </Row>
      <Row>
        <HomeCard {...translation.home.howItWorks}>
          <a href='http://telegram.org' target='_blank' rel='noopener noreferrer'>
            Telegram
          </a>
        </HomeCard>
      </Row>
      <Row>
        <HomeCard {...translation.home.whyBot} />
      </Row>
    </Container>
  );
}

export default HomePage;
