import axios from 'axios';
import { useRef, useState } from 'react';

import { Form } from 'react-bootstrap';
import './index.css';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 20;

const App = () => {
  // console.log(import.meta.env.VITE_API_KEY);

  const searchInput = useRef(null); // useRef(hook) to render only one input instead of using useState.

  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value
        }&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      );
      console.log('data', data);
      setImages(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = event => {
    event.preventDefault(); // to prevent the refresh in the search box
    searchInput.current.value; // handle the form submission
  };
  const handleSelection = selection => {
    searchInput.current.value = selection;
    fetchImages();
  };

  return (
    <div className='container'>
      <h1 className='title'>Search Image By Unsplash</h1>

      <div className='search-section'>
        <Form onSubmit={handleSearch}>
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
        <div onClick={() => handleSelection('shoes')}>Shoes</div>
        <div onClick={() => handleSelection('turtles')}>Turtles</div>
        <div onClick={() => handleSelection('soccer-players')}>
          soccer players
        </div>
      </div>
      <div className='images'>
        {images.map(image => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            className='image'
          />
        ))}
      </div>
    </div>
  );
};
export default App;
