import React, { useState } from 'react';

import Form from './ListForm';
import Posts from './Posts';

function List() {
  const [searchResults, setSearchResults] = useState(null);

  return (
    <div className='container pt-2'>
      <Form resultHandler={setSearchResults} isCollapsed />
      {searchResults != null ? <Posts posts={searchResults} /> : <div />}
    </div>
  );
}

export default List;
