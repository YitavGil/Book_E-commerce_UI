import {useState, useEffect} from 'react';
import axios from 'axios';
import API from './serverAPI';

const BooksAPI = () => {
    const [books, setBooks] = useState([]);
    const [callback, setCallback] = useState(false);
    const [genre, setGenre] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);

    useEffect(() => {
      const getBooks = async () => {
        let queryString = "limit=" + (page*9);
        if (genre.length > 0) {
          queryString += "&" + genre
        }
        if (sort.length > 0){
          queryString += "&" + sort
        }
        if (search.length > 0){
          queryString += "&name[regex]=" + search
        }
        const res = await API.get(`/books?${queryString}`)
        setBooks(res.data.books);
        setResult(res.data.result)
    }
       getBooks()
     }, [callback, genre, sort, search, page])

  return {
     books: [books, setBooks],
     callback: [callback, setCallback],
     genre: [genre, setGenre],
     sort: [sort, setSort],
     search:[search, setSearch],
     page: [page, setPage],
     result: [result, setResult]
    }
};

export default BooksAPI;
