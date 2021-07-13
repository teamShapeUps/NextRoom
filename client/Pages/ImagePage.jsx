import React, { useState, useEffect } from 'react';
const axios = require('axios')

async function postImage({ image, description }) {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('description', description);

  const result = await axios.post('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result.data;
}

const ImagePage = () => {
  const [file, setFile] = useState();
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);


  async function submit(event){
    const result = await postImage({image: file, description})
    setImages([result.image, ...images])
  }

  useEffect((event) => {
    submit(event)
  }, []);

  const handleSubmit = event=>{
    event.preventDefault();
    submit(event);
  }

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className='Uploadpage'>
      <form onSubmit={handleSubmit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input>
        <button type="submit">Submit</button>
      </form>

      { images.map( image => (
        <div key={image}>
          <img src={image}></img>
        </div>
      ))}

    </div>
  );
};

export default ImagePage;
