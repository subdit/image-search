import React, { useRef } from 'react';

import { Form } from 'react-bootstrap';
import './index.css';

const App = () => {
  const searchInput = useRef(null); // useRef(hook) to render only one input instead of using useState.

  const handleSearch = event => {
    event.preventDefault(); // to prevent the refresh in the search box
    console.log(searchInput.current.value); // handle the form submission
  };
  const handleSelection = selection => {
    searchInput.current.value = selection;
  };

  return (
    <div className='container'>
      <h1 className='title'>Search Image</h1>
      <div className='search-section'>
        <Form onSubmit={handleSearch}>
          <Form.Control
            type='search'
            placeholder='Enter title to search..'
            className='search-input'
            ref={searchInput}
          />
        </Form>
      </div>
      <div className='filters'>
        <div onClick={() => handleSelection('nature')}>Nature</div>
        <div onClick={() => handleSelection('birds')}>Birds</div>
        <div onClick={() => handleSelection('cats')}>Cats</div>
        <div onClick={() => handleSelection('Shoes')}>Shoes</div>
      </div>
    </div>
  );
};
export default App;
