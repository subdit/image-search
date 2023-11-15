import React from 'react';
import { Form } from 'react-bootstrap';
import './index.css';

const App = () => {
  return (
    <div className='container'>
      <h1 className='title'>Image Search</h1>
      <div className='search-section'>
        <Form>
          <Form.Control
            type='search'
            placeholder='Enter title to search'
            className='search-input'
          />
        </Form>
      </div>
    </div>
  );
};
export default App;
