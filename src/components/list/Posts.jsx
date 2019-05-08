import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Alert, Spinner } from 'reactstrap';

import PostCard from './PostCard';

function Posts({ location, radius, days }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    setPosts(null);

    const query = `?d=${days}&r=${radius}&lon=${location.lon}&lat=${location.lat}`;
    const url = `http://geek-med.tk:3030/api/v1/requests/list${query}`;

    fetch(url, { method: 'GET', mode: 'cors', credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => setPosts(json.requests))
      .catch(reject => console.error(reject)); // TODO: show toast
  }, [days, location, radius]);

  function showPostCards() {
    if (posts && posts.length <= 0) {
      return (
        <Alert className='md' color='primary'>
          No posts found. Try expanding the range and/or increasing the amount of days.
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

  return <div className='d-flex justify-content-center'>{!posts ? <Spinner color='primary' /> : showPostCards()}</div>;
}

Posts.propTypes = {
  location: PropTypes.shape({
    lon: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
  }).isRequired,
  radius: PropTypes.number.isRequired,
  days: PropTypes.number.isRequired,
};

export default Posts;
