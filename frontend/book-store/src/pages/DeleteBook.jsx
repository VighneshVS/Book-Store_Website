import React, {useState} from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  const handleDelete =() =>{
    setLoad(true);
    axios
        .delete(`http://localhost:8000/books/${id}`)
        .then(()=>{
          setLoad(false);
          navigate('/');
        })
        .catch(error =>{
          console.log(error);
          setLoad(false);
        })
  }

  const backHome = () =>{
    setLoad(true);
    navigate('/');
    setLoad(false);
  }
  return (
    <div className='container'>
      <h1>Delete Book</h1>
      {load? (<Spinner />):('')}
      <div className='DeleteDialog'>
        <h3>Are you sure you want to delete this book?</h3>
        <button className='YesButton' onClick={handleDelete}>Yes</button>
        <button className='NoButton' onClick={backHome}>No</button>
      </div>
    </div>
  )
}

export default DeleteBook;
