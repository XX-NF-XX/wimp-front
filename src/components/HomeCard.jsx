import React from 'react';
import PropTypes from 'prop-types';

import { Container, Card, CardBody, CardHeader, CardText } from 'reactstrap';

function HomeCard({ title, description, children }) {
  return (
    <Container className='py-2'>
      <Card>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          <CardText className='text-justify'>
            <p>
              {`${description}${children ? ' ' : ''}`}
              {children || ''}
            </p>
          </CardText>
        </CardBody>
      </Card>
    </Container>
  );
}

HomeCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.element,
};

HomeCard.defaultProps = {
  children: undefined,
};

export default HomeCard;
