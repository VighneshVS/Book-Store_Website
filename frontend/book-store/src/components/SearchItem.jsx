import React from "react";

const SearchItem = ({search, setSearch}) => {
  return (
    <form className="SearchBox">
      <input
        type="text"
        role="searchbox"
        placeholder="Search Books"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
       />
    </form>
  );
};

export default SearchItem;
