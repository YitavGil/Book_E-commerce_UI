import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import { useHistory, useParams } from 'react-router-dom';
import API from '../../../api/serverAPI'

const initialState = {
    name: '',
    author: '',
    genre: '',
    price: 0,
    description: '',
    _id: ''
}

const CreateProduct = () => {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [genres] = state.genreAPI.genres
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isLogged] = state.userAPI.isLogged
    const token = state.token

    const history = useHistory()
    const param = useParams()

    const [books] = state.booksAPI.books
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.booksAPI.callback
    
    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            books.forEach(book => {
                if(book._id === param.id){
                    setProduct(book)
                    setImages(book.images || book.imageUrl)
                }
                
            })
        } else {
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, books])

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
    console.log(images);

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

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isLogged) return alert("You have to be logged in to sell products")
            if(!images) return alert("You must include an image")

            if(onEdit){
                await API.put(`/books/${product._id}`, {...product, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await API.post('/books', {...product, images}, {
                    headers: {Authorization: token}
                })
    
            }
            setCallback(!callback)
            // setImages(false)
            // setProduct(initialState)
            history.push("/")

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

  return (
    <div className='create-product'>
        <div className="upload">
            <input type="file" name='file' id='file_upload' onChange={handleUpload} />
            {
                loading ? <div id="file-img"><Loading /></div>

                : <div id="file-img" style={styleUpload}>
                     <img src={images ? images.url : books.imageUrl} alt="cover" />
                     <span onClick={handleDestroy}> X </span>
                </div>
            }

            
        </div>

        <form onSubmit={handleSubmit}>
            <div className="row">
                <label htmlFor="name">Name</label>
                <input type="text" name='name' id='name' required
                value={product.name} onChange={handleChangeInput} />
            </div>

            <div className="row">
                <label htmlFor="author">Author</label>
                <input type="text" name='author' id='author' required
                value={product.author} onChange={handleChangeInput} />
            </div>

            <div className="row">
                <label htmlFor="price">Price</label>
                <input type="number" name='price' id='price' required
                value={product.price} onChange={handleChangeInput} />
            </div>

            <div className="row">
                <label htmlFor="description">Description</label>
                <textarea type="text" name='description' id='description' required
                value={product.description} rows="7" onChange={handleChangeInput} />
            </div>

            <div className="row">
                <label htmlFor="genre">Genre</label>
                <select name="genre" value={product.genre} onChange={handleChangeInput}>
                    <option value="">Select Genre</option>
                    {
                        genres.map(genre => (
                            <option value={genre._id} key={genre._id}>
                                {genre.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <button type='submit'>{onEdit ? "Update" : "Create"}</button>
        </form>
    </div>
  )
};

export default CreateProduct;
