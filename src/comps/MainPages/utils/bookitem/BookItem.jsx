import React from 'react';
import BtnRender from './BtnRender';

const BookItem = ({book, isAdmin, handleDelete, handleCheck, isInRead}) => {
 
  return (
  <div className={isInRead ? 'book-card' : 'book-card read-card' }>
     {
        isAdmin && <input type="checkbox" checked={book.checked}
        onChange={() => handleCheck(book._id)} />
      }
      <img src={book.imageUrl || book.images.url} alt="cover" />
      <div className={isInRead ? 'info-container' : "info-container read-item"}>
            <h2 name={book.name}>{book.name}</h2>
            <h4>{book.author}</h4>
           {isInRead ? <p>{book.description}</p> : ""}
            <span>{isInRead ? `₪${book.price}` : ``}</span>
      </div>

     {isInRead && <BtnRender book={book} handleDelete={handleDelete}/>}
  </div>
  )
};

export default BookItem;
