import React, {useContext, useState} from 'react';
import {GlobalState} from '../../../GlobalState';
import BookItem from '../utils/bookitem/BookItem';
import Loading from '../utils/loading/Loading';
import axios from 'axios';
import Filters from './Filters';
import LoadMore from './LoadMore';
import API from '../../../api/serverAPI'



const Books = () => {
  const state = useContext(GlobalState)
  const [books, setBooks] = state.booksAPI.books
  const [isAdmin] = state.userAPI.isAdmin
  const token = state.token
  const [callback, setCallback] = state.booksAPI.callback
  const [loading, setLoading] = useState(false)
  const [isCheck, setIsCheck] = useState(false)

  const handleDelete = async (id, public_id) =>{
    try {
      setLoading(true)
      const destroyImg = API.post('/upload/destroy', {public_id},{
        headers: {Authorization: token}
      })
      const deleteBook = API.delete(`/books/${id}`, {
        headers: {Authorization: token}
      })

      await destroyImg
      await deleteBook
      setCallback(!callback)
      setLoading(false)
    } catch (err) {
      alert(err.response.data.msg)
      console.log(err);
    }
  }

  const handleCheck = (id) =>{
    books.forEach(book => {
      if(book._id === id) book.checked = !book.checked
    })
    setBooks([...books])
  }

  const checkAll = () => {
    books.forEach(book => {
      book.checked =  !isCheck
    })
    setBooks([...books])
    setIsCheck(!isCheck)
  }

  const deleteAll = () => {
    books.forEach(book => {
      if(book.checked) handleDelete(book._id, book.images.public_id)
    })
  }

  if(loading) return <Loading />
  return (
    <>
    <Filters />
    {
      isAdmin && 
      <div className='delete-all'>
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete All</button>
      </div>
    }
      <div className='books'>
          {
            books.map(book =>{
              return <BookItem key={book._id} book={book} isAdmin={isAdmin}
              handleDelete={handleDelete} handleCheck={handleCheck} isInRead={true}/>
            })
          }
      </div>
      <LoadMore />
      {books.length === 0 && <Loading />}
  </>
  )
};

export default Books;
