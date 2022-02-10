import React, {useContext} from 'react';
import { GlobalState } from '../../../GlobalState';

const Filters = () => {
  const state = useContext(GlobalState);
  const [genres] = state.genreAPI.genres
  const [genre, setGenre] = state.booksAPI.genre;
  const [sort, setSort] = state.booksAPI.sort;
  const [search, setSearch] = state.booksAPI.search;


  const handleGenre = e =>{
      setGenre(e.target.value)
      setSearch("")
  }

  return(
      <div className='filter-menu'>
        <div className="row">
            <span>Filters: </span>
            <select name="genre" value={genre} onChange={handleGenre}>
                <option>All Products</option>
                {
                  genres.map(genre => (
                    <option value={"genre=" + genre._id} key={genre._id}>
                        {genre.name}
                    </option>
                  ))
                }
            </select>
        </div>
        
        <input type="text" value={search} placeholder="Find your next read..." 
        onChange={e => setSearch(e.target.value.toLowerCase())} />

          <div className="row sort">
            <span>Sort By: </span>
            <select value={sort} onChange={e => setSort(e.target.value)}>
                <option value=''>Newest Addition</option>
                <option value='sort=oldest'>Oldest Addition</option>
                <option value='sort=-price'>Highest Price</option>
                <option value='sort=price'>Lowest Price</option>
                
            </select>
        </div>
      </div>
  )
};

export default Filters;
