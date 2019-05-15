import React from 'react';
import PropTypes from 'prop-types';
import { Col, Alert } from 'reactstrap';

import PostCard from './PostCard';

import translation from '../../constants/translation';

function Posts({ posts }) {
  function showPostCards() {
    if (posts.length <= 0) {
      return (
        <Alert className='md' color='primary'>
          {translation.list.notFound}
        </Alert>
      );
    }

    const cards = posts.map(post => {
      const { id, username: name, userPlatform, created: createdMs, lon, lat, ...rest } = post;
      const created = new Date();
      created.setTime(createdMs);

      const cardProps = {
        user: {
          name,
          platform: userPlatform,
        },
        location: {
          lon: Number.parseFloat(lon),
          lat: Number.parseFloat(lat),
        },
        created,
        ...rest,
      };

      return <PostCard {...cardProps} key={id} />;
    });

    return (
      <Col sm={12} className='p-0'>
        {cards}
      </Col>
    );
  }

  return <div className='d-flex justify-content-center'>{showPostCards()}</div>;
}

Posts.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  posts: PropTypes.array.isRequired,
};

export default Posts;
