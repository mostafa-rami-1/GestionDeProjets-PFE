import React from 'react'
import './search.css'
const Search = ({ searchCloser }) => {
   const handleSearch = (event) => {
    searchCloser(event.target.value)
  };
  return (
      <div className="search">
          <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
              <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth={1.333} strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
      
      <input className="input-search"  type="text" onChange={handleSearch}/>
    </div>
    
  )
}

export default Search


