import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const ShowBook = () => {

  const [book, setBook] = useState({});
  const [load, setLoad] = useState(false);
  const {id} = useParams();

  useEffect(()=>{
    setLoad(true);
    axios
        .get(`book-store-dusky-sigma.vercel.app/books/${id}`)
        .then((res) => {
          setBook(res.data);
          setLoad(false);
        })
        .catch(error => {
          console.log(error);
          setLoad(false);
        });   
  },[])

  return (
    <div>
      <h1>Book details</h1>
      {load?(
        <Spinner />
      ):(
        <div className='BookDetails'>
          <div className='entries'>
          <span><strong>ID:</strong> </span>
          <span className='details'>{book._id}</span>
          </div>
          <div className='entries'>
          <span ><strong>Title:</strong> </span>
          <span className='details'>{book.title}</span>
          </div>
          <div className='entries'>
          <span ><strong>Author:</strong></span>
          <span className='details'>{book.author}</span>
          </div>
          <div className='entries'>
          <span><strong>Published Year:</strong></span>
          <span className='details'>{book.publishYear}</span>
          </div>
          <div className='entries'>
          <span><strong>First Entry:</strong></span>
          <span className='dates'>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='entries'>
          <span><strong>Recent Entry:</strong></span>
          <span className='dates'>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook
