
import { FaStarHalfAlt, FaStar, FaRegStar } from 'react-icons/fa'

const Rating = (props) => {
    const { rating, numReviews } = props;
    return (
        <div className="rating">
            <span className=''>
                {rating >= 1 ? <FaStar /> :
                    rating >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span className=''>
                {rating >= 2 ? <FaStar /> :
                    rating >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span className=''>
                {rating >= 3 ? <FaStar /> :
                    rating >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span className=''>
                {rating >= 4 ? <FaStar /> :
                    rating >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span className=''>
                {rating >= 5 ? <FaStar /> :
                    rating >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span className='review'>{numReviews} reviews</span>
        </div>
    );
}

export default Rating;