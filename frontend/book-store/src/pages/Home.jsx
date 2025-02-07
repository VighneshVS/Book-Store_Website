import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import SearchItem from "../components/SearchItem.jsx";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoad(true);
    axios
      .get("http://localhost:8000/books")
      .then((res) => {
        setBooks(res.data.dataList);
        setLoad(false);
      })
      .catch((error) => console.log(error));
  },[]);

  
  return (
    <div className="container">
        
      <div className="Home">
        <h1>Book List</h1>
        <div className="SearchAndAdd">
          <SearchItem 
            search = {search}
            setSearch = {setSearch}
          />
          <Link to="/books/create" className="addParent"> 
            <MdOutlineAddBox className="AddBox" />
            Add new Book
          </Link> 
        </div>
        {load ? (
          <Spinner />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Author</th>
                <th>Published Year</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {books.filter((book) => book.title.toLowerCase().includes(search.toLowerCase())).map((book, index) =>
                <tr key={book._id}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publishYear}</td>
                  <td>
                    <div className="operationButtons">
                      <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className="iButton" />
                      </Link>
                      <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className="editButton" />
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <MdOutlineDelete className="deleteButton" />
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;