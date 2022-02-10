import React, {useState, useContext} from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import API from '../../../api/serverAPI'

const Genres = () => {
    const state = useContext(GlobalState)
    const [genres] = state.genreAPI.genres
    const [genre, setGenre] = useState('')
    const token = state.token
    const [callback, setCallback] = state.genreAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createGenre = async e =>{
        e.preventDefault()
        try {
            if(onEdit) {
                const res = await API.put(`/genres/${id}`, {name: genre},{
                    headers: {Authorization: token} 
            })
            alert(res.data.msg)

            } else{
                const res = await API.post('/genres', {name: genre},{
                    headers: {Authorization: token} 
            })
            
            alert(res.data.msg)
        }
        setOnEdit(false)
        setGenre("")
        setCallback(!callback)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editGenre = async (id, name) =>{
        setID(id)
        setGenre(name)
        setOnEdit(true)
    }

    const deleteGenre = async id =>{
        try {
            const res = await API.delete(`genres/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

  return (
    <div className='genres'>
        <form onSubmit={createGenre}>
            <label htmlFor="genres">Genre</label>
            <input type="text" name='genre' value={genre} required
            onChange={(e) => setGenre(e.target.value)}
            />

            <button type='submit'>{onEdit ? "Update" : "Create"}</button>
        </form>

        <div className="col">
            {
                genres.map(genre => (
                    <div className='row' key={genre._id}>
                        <p>{genre.name}</p>
                        <div className="genre-btn">
                            <button onClick={() => editGenre(genre._id, genre.name)}>Edit</button>
                            <button onClick={() => deleteGenre(genre._id)}>Delete</button>
                        </div>
                    </div>
                ))
            }
        </div>

    </div>
  )
};

export default Genres;
