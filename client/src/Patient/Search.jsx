import React,{useState,useEffect} from "react";


function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App" style={{textAlign:"center"}}>
    <input
      type="texy"
      placeholder="Search"
      onChange={(e) => {
        setSearchTerm(e.target.value);
      }}
    />
    <a className="my_view">search</a>
  </div>
  );
}

export default Search;