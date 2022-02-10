import React, {useContext, useState, useEffect} from 'react';
import {GlobalState} from '../../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PayPalButton from './PayPalButton';
import API from '../../../api/serverAPI'

const Cart = () => {
  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart
  const token = state.token
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getTotalPrice = () =>{
      const total = cart.reduce((prev, book) => {
        return prev + (book.price * book.quantity)
      }, 0)

      setTotal(total)
    }

    getTotalPrice()
  }, [cart])

  const handleCart = async (cart) =>{ //Changes in the cart will remain after refresh
    await API.patch('/user/addtocart', {cart}, {
      headers: {Authorization: token}
    })
  }

  const increment = (id) =>{
    cart.forEach(book => {
      if(book._id === id){
        book.quantity += 1
      }
    })

    setCart([...cart])
    handleCart(cart)
  }

  const decrement = (id) =>{
    cart.forEach(book => {
      if(book._id === id){
        book.quantity === 1 ? book.quantity = 1 : book.quantity -= 1
      }
    })

    setCart([...cart])
    handleCart(cart)
  }

  const removeFromCart = (id) =>{
    if(window.confirm("Do you wish to remove this item from your cart?")){
      cart.forEach((book, index) => {
        if(book._id === id){
          cart.splice(index, 1)
        }
      })

      setCart([...cart])
      handleCart(cart)
    }
  }

  const transferSuccess = async(payment) => {
    const {paymentID, address} = payment;

    await API.post('/payment', {cart, paymentID, address},{
      headers: {Authorization: token}
    })

    setCart([])
    handleCart(cart)
    alert("Order was placed successfully.")
  }

  if(cart.length === 0){
    return <h2 style={{textAlign: "center", fontSize: "5rem"}}>No items in your cart</h2>
  }
  return (
    <div>
      {
        cart.map(book => (
              <div className='detail cart' key={book._id}>
            <img src={book.imageUrl || book.images.url} alt='book-cover'/>
            <div className='detail-box'>
                <h2>{book.name}</h2>
                <h3>₪ {book.price * book.quantity}</h3>
                <p>{book.description}</p>

                <div className="amount">
                  <button onClick={() => decrement(book._id)}> - </button>
                  <span>{book.quantity}</span>
                  <button onClick={() => increment(book._id)}> + </button>
                </div>

                <div className="delete" onClick={() => removeFromCart(book._id)}>X</div>
                <Link to='/cart' className='cart'>Buy Now</Link>
            </div>
        </div>
        ))
      }

      <div className="total">
          <h3>Total: ₪{total}</h3>
          <PayPalButton
          total={total}
          transferSuccess={transferSuccess} 
          />
      </div>
  </div>
  )
};

export default Cart;
