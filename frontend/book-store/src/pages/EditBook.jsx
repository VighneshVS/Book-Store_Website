import React, {useState, useEffect} from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

const EditBook = () => {
  const [title,setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() =>{
    setLoad(true);
    axios
        .get(`book-store-dusky-sigma.vercel.app/books/${id}`)
        .then(res => {
          setTitle(res.data.title);
          setAuthor(res.data.author);
          setPublishYear(res.data.publishYear);
          setLoad(false);
        })
        .catch(err => {
          console.log(err);
          setLoad(false);
        })

  },[])

  const handleEditBook = () => { 
    const data = {
      title,
      author,
      publishYear
    };
    setLoad(true);

    axios
        .put(`book-store-dusky-sigma.vercel.app/books/${id}`, data)
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
      <h1>Edit Book</h1>
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
        <button className='saveButton' onClick={handleEditBook}>Save</button>
      </div>
    </div>
  )
}

export default EditBook
