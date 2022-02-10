import React, {useState} from 'react';
import reviewAPI from '../../../../api/reviewAPI';

const EditReview = (props) => {
    const [review, setReview] = useState(props.editReview.content)


    const handleReview = async(e) => {
        e.preventDefault()
        console.log(props.token);
      const res = await reviewAPI.updateReview(props.bookId, review, props.token)
      if (res) {
          props.setLoaded((prev) => !prev)
      }
    }

  return( 
    <div className='review-card'>
      <h2>Edit Review:</h2>
        <form onSubmit={handleReview}>
            <textarea type="text" required value={review} onChange={(e) => setReview(e.target.value)} rows="7"/>
            <button>Send</button>
        </form>
    </div>
  )
};

export default EditReview;


// /cancel button the et edit rewview to null
