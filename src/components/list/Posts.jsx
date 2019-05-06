import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';

function Posts({ location, radius, days }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (posts != null) return;

    console.log('hit Effect');

    const query = `?d=${days}&r=${radius}&lon=${location.lon}&lat=${location.lat}`;
    const url = `http://geek-med.tk:3030/api/v1/requests/list${query}`;
    fetch(url, { method: 'GET', mode: 'cors', credentials: 'same-origin' })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
        setPosts(res);
      })
      .catch(rej => {
        console.error(rej);
      });
  });

  return <div className='container'>{!posts ? <Spinner color='primary' /> : JSON.stringify(posts, ' ', 2)}</div>;
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
