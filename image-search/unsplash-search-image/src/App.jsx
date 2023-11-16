import axios from 'axios';
import { useRef } from 'react';

import { Form } from 'react-bootstrap';
import './index.css';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGEs_PER_PAGE = 20;

const App = () => {
  console.log(import.meta.env.VITE_API_KEY);

  const searchInput = useRef(null); // useRef(hook) to render only one input instead of using useState.

  const fetchImages = async () => {
    try {
      const result = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value
        }&page=1&per_page=${IMAGEs_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      );
      console.log('result', result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = event => {
    event.preventDefault(); // to prevent the refresh in the search box
    console.log(searchInput.current.value); // handle the form submission
  };
  const handleSelection = selection => {
    searchInput.current.value = selection;
    fetchImages();
  };

  return (
    <div className='container'>
      <h1 className='title'>Search Image By Unsplash</h1>
      <h3>Hello..!</h3>
      <div className='search-section'>
        <Form onSubmit={handleSearch} type='text' id='name'>
          <Form.Control
            type='search'
            placeholder='Enter title to search....'
            className='search-input'
            ref={searchInput}
          />
        </Form>
      </div>
      <div className='filters'>
        <div onClick={() => handleSelection('nature')}>Nature</div>
        <div onClick={() => handleSelection('birds')}>Birds</div>
        <div onClick={() => handleSelection('cats')}>Cats</div>
        <div onClick={() => handleSelection('dog')}>Dogs</div>
        <div onClick={() => handleSelection('Shoes')}>Shoes</div>
      </div>
    </div>
  );
};
export default App;
