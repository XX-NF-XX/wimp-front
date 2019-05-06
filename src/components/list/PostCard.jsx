import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardImg, CardText, CardBody } from 'reactstrap';

import translation from '../../constants/translation';

function PostCard({ type, message, photoURL, created, user }) {
  function getHeader() {
    return translation.postTypes[type.toLowerCase()].toString();
  }

  return (
    <div className='p-2'>
      <Card>
        <CardHeader className='text-center'>{getHeader()}</CardHeader>
        <Row className='no-gutters'>
          <Col md={4}>
            <div className='thumbnail'>
              <a href={photoURL} target='_blank' rel='noopener noreferrer'>
                <CardImg src={photoURL} />
              </a>
            </div>
          </Col>
          <Col md={8}>
            <CardBody>
              <CardText>{message.toString()}</CardText>
              <CardText>{`By: ${user.name.toString()}`}</CardText>
              <CardText>{`From: ${user.platform.toString()}`}</CardText>
              <CardText>
                <small className='text-muted'>{`created: ${created.toLocaleString()}`}</small>
              </CardText>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

PostCard.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,

  user: PropTypes.shape({
    platform: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    lon: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
  }).isRequired,
};

export default PostCard;
