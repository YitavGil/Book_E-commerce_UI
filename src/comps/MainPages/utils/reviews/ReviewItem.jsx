import React from 'react';
import reviewAPI from '../../../../api/reviewAPI';

const ReviewItem = (props) => {
  const deleteReview = async() => {
   const res = await reviewAPI.deleteReview(props.review._id, props.token)
   if (res) {
    props.setLoaded((prev) => !prev)
}
  }

  const updateReview = async() => {
      props.setEditReview(props.review)
  }
  return(
      <div className='review-item'>
          <h3>{props.review.user.name}</h3>
          <p>{props.review.content}</p>
            <button onClick={deleteReview}>Delete</button>
            <button className='review-update' onClick={updateReview}>Edit</button>
      </div>
  )
};

export default ReviewItem;
