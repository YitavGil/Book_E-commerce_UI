import {useState, useEffect} from 'react';
import axios from 'axios';
import Books from '../comps/MainPages/books/Books';
import API from './serverAPI';


const UserAPI = (token) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [read, setRead] = useState([]);
    const [users, setUsers] = useState([]);
    const [callback] = useState(false)
    const userID = localStorage.getItem('userID')

    useEffect(() =>{
        
        if(token && token.length > 0){
            const getUser = async () =>{
                try {
                    const res = await API.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    
                    setCart(res.data.cart)
                    setRead(res.data.read)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
        }
    },[token])

    useEffect(() =>{
        const collectUsers = async() =>{
            try {
            const res = await API.get('/user/user/'+userID)
            setUsers(res.data)
            console.log(users);
            } catch (err) {
                console.log(err);
            }
            
            
        }
        
        collectUsers()
    },[callback])
  

    const addToCart = async (product) => {
        const check = cart.every(item =>{
            return item._id !== Books._id
        })

        if(check){
            setCart([...cart, {...product, quantity:1}])

            await API.patch('/user/addtocart', {cart: [...cart, {...product, quantity:1}]}, {
                headers: {Authorization: token}
            })
        }else {
            alert("This product has been added to the cart.")
        }
    }

    const addToRead = async (product) => {
        const check = read.every(item =>{
            return item._id !== Books._id
        })

        if(check){
            setRead([...read, {...product, quantity:1}])

            await API.patch('/user/addtoread', {read: [...read, {...product, quantity:1}]}, {
                headers: {Authorization: token}
            })
        }else {
            alert("This product has been added to your library.")
        }
    }

  return {
      isLogged: [isLogged, setIsLogged],
      isAdmin: [isAdmin, setIsAdmin],
      cart: [cart, setCart],
      addToCart: addToCart,
      read: [read, setRead],
      addToRead: addToRead,
      user: [users, setUsers],
  }
};

export default UserAPI;
