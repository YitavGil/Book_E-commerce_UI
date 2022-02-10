import React, {useContext} from 'react';
import { GlobalState } from '../../../GlobalState';

const LoadMore = () => {
    const state = useContext(GlobalState);
    const [page, setPage] = state.booksAPI.page
    const [result] = state.booksAPI.result
  return (
      <div className='load-more'>
          {
              result < page * 9 ? ""
              : <button onClick={() => setPage(page+1)}>Load More</button>
          }
      </div>
  )
};

export default LoadMore;
