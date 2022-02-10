import {useState, useEffect} from 'react';
import axios from 'axios';
import API from './serverAPI';

const GenreAPI = () => {
    const [genres, setGenres] = useState([]);
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getGenres = async() =>{
            const res = await API.get('/genres')
            setGenres(res.data)
        }

        getGenres()
    },[callback])
  return{
      genres: [genres, setGenres],
      callback: [callback, setCallback]
  }
};

export default GenreAPI;
