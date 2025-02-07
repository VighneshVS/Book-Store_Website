import React, {useState} from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
  const [title,setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => { 
    const data = {
      title,
      author,
      publishYear
    };
    setLoad(true);

    axios
        .post('http://localhost:8000/books', data)
        .then(() =>{
          setLoad(false);
          navigate('/');
        })
        .catch(error => {
          setLoad(false);
          console.log(error);
        });
  }
  return (
    <div className='container'>
      <h1>Create Book</h1>
      {load? (<Spinner />):('')}
      <div className='createBox'>
        <div className='itemList'>
          <label>Title</label>
          <input 
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Author</label>
          <input 
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label>Published Year</label>
          <input 
            type= 'number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        <button className='saveButton' onClick={handleSaveBook}>Save</button>
      </div>
    </div>
  )
}

export default CreateBook