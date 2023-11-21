import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './index.css';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 20;

const App = () => {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0); // set up the images
  const [page, setPage] = useState(1); // set up pagination

  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value
        }&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      );
      console.log('results', data);
      setImages(data.results);
      setTotalImages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = event => {
    event.preventDefault();
    console.log(searchInput.current.value);
    fetchImages();
  };

  const handleSelection = selection => {
    searchInput.current.value = selection;
    fetchImages();
  };

  return (
    <div className='container'>
      <h1 className='title'>Image Search</h1>
      <div className='search-section'>
        <Form onSubmit={handleSearch}>
          <Form.Control
            type='search'
            placeholder='Type something to search...'
            className='search-input'
            ref={searchInput}
          />
        </Form>
      </div>

      <div className='filters'>
        <div onClick={() => handleSelection('nature')}>Nature</div>
        <div onClick={() => handleSelection('birds')}>Birds</div>
        <div onClick={() => handleSelection('cats')}>Cats</div>
        <div onClick={() => handleSelection('shoes')}>Shoes</div>
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

      <div className='buttons'>
        {page > 1 && <Button>Previous</Button>}
        {page < totalImages && <Button>Next</Button>}
      </div>
    </div>
  );
};

export default App;
