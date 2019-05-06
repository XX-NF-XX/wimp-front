import React, { useState } from 'react';

import Form from './ListForm';
import Posts from './Posts';

function List() {
  const [search, setSearch] = useState(null);

  return (
    <div className='container'>
      <Form searchHandler={setSearch} />
      {search != null ? <Posts {...search} /> : <div />}
    </div>
  );
}

export default List;
