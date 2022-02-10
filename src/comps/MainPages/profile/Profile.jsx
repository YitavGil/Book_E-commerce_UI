import React, {useState, useContext} from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import BookItem from '../utils/bookitem/BookItem';
import API from '../../../api/serverAPI'


const Profile = () => {
  const state = useContext(GlobalState);
    const [images, setImages] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLogged] = state.userAPI.isLogged;
    const token = state.token;
    const [books] = state.booksAPI.books;
    const [read, setRead] = state.userAPI.read;
    const [user] = state.userAPI.user
   
    
    //--------Images
    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isLogged) return alert("You have to be logged in to sell products")
            const file = e.target.files[0]
            console.log(file);
            if(!file) return alert("File not found")

            if(file.size > 1024 * 1024) //1mb
                return alert("File size must be lower than 1mb")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') //1mb
                return alert("File format not supported")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await API.post('/upload/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
                
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
            console.log(err);
        }
    }

    const handleDestroy = async() => {
        try {
            if(!isLogged) return alert("You have to be logged in to delete products")
            setLoading(true)
            await API.post('/upload/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

   
    const styleUpload = {
        display: images ? "block" : "none"
    }

    //--------/Images

    //-------/Library
    const handleRead = async (read) =>{ 
        await API.patch('/user/addtoread', {read}, {
          headers: {Authorization: token}
        })
      }
      const removeFromRead = (id) =>{
        if(window.confirm("Do you wish to remove this item from your library?")){
         read.forEach((book, index) => {
            if(book._id === id){
             read.splice(index, 1)
            }
          })
    
          setRead([...read])
          handleRead(read)
        }
      }

   


  return (
    <div className='profile-page'>
        <div className="user-upload">
            <input type="file" name='file' id='avatar_upload' onChange={handleUpload} />
            {
                loading ? <div id="user-img"><Loading /></div>

                : <div id="user-img" style={styleUpload}>
                     <img src={images ? images.url : books.imageUrl} alt="cover" />
                     <span onClick={handleDestroy}> X </span>
                </div>
            }
            <div className='user-info'>
            <h3>Name: {user.name}</h3>
            <h5>Books read: <span>{read.length}</span> </h5>
        </div>
        </div>
        
        <h2 className='library-title'>Library</h2>
        <div className="currently-read">
        {    
        read.map(book => (
            <div key={book._id} className="read-box">
            <BookItem book={book} isBtnRender={false}/>
                <button className="delete-read" onClick={() => removeFromRead(book._id)}>Remove</button>
            </div>
        ))
        
      }
     
    </div>

        
    </div>
  )
};

export default Profile;
