import axios from 'axios';
import API from './serverAPI'

const reviewAPI =  {
  getReviews: async (bookId, token) => {
   console.log('rewfghjkl');
    const res = await API.get(`/review/`+ bookId, {
      headers: {Authorization: token}
    }) 
    
    return res.data;
},
postReview: async(bookId, review, token) => {
  console.log('postReview', token)
  const reviewBody = {bookId, content: review}
  const res = await API.post(`/review`,reviewBody, {
    headers: {"Authorization": token},
   
  })
  if(res.status === 201){
    return true;
  }else{
    return false;
  }
},
updateReview: async(bookId, review, token) => {
  const reviewBody = {bookId, content: review}
  const res = await API.patch(`/review`,reviewBody, {
    headers: {"Authorization": token},
   
  })
  if(res.status === 201){
    return true;
  }else{
    return false;
  }
},
deleteReview: async (reviewId, token) =>{
  const res = await API.delete(`/review/${reviewId}`, {
    headers: {"Authorization": token},
   
  })
  if(res.status === 200){
    return true;
  }else{
    return false;
  }
}

};

export default reviewAPI;
