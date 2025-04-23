import React from 'react';
import '../components.css';

const Ratings = ({ rating }) => {
  // Round to nearest half
  const roundedRating = Math.round(rating * 2) / 2;
  
  // Create array to render stars
  const starsArray = [];
  
  // Fill the array with full, half, or empty stars
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(roundedRating)) {
      starsArray.push('full');
    } else if (i - 0.5 === roundedRating) {
      starsArray.push('half');
    } else {
      starsArray.push('empty');
    }
  }

  return (
    <div className="ratings-container">
      {starsArray.map((type, index) => (
        <span key={index} className={`star ${type}`}>
          {type === 'full' && '★'}
          {type === 'half' && '★'}
          {type === 'empty' && '☆'}
        </span>
      ))}
    </div>
  );
};

export default Ratings;