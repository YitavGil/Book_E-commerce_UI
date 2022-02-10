import React, {useState} from 'react';
import reviewAPI from '../../../../api/reviewAPI';

const AddReview = (props) => {
    const [review, setReview] = useState("")


    const handleReview = async(e) => {
        e.preventDefault()
        console.log('handleReview token',props.token);
      const res = await reviewAPI.postReview(props.bookId, review, props.token)
      if (res) {
          props.setLoaded((prev) => !prev)
      }
    }

  return( 
    <div className='review-card'>
      <h2>Write a Review:</h2>
        <form onSubmit={handleReview}>
            <textarea type="text" required value={review} onChange={(e) => setReview(e.target.value)} rows="7"/>
            <button>Send</button>
        </form>
    </div>
  )
};

export default AddReview;
