import React, { useState } from 'react';
import { styled } from 'styled-components';

export default function StarRating ({ initialRating, onChange,size = "30px",interactable }){
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(null);
  
  function handleRatingChange(newRating) {
    if(!interactable) return;
    if(rating == 1 && newRating == 1)
    {
      setRating(0);
    }
    else{
      setRating(newRating);
    }
    if (onChange) {
      onChange(newRating);
    }
  }

  function handleStarHover(hoveredValue) {
    if(!interactable) return;
    setHoveredRating(hoveredValue);
  }

  return (
    <SCStarRating $fsize={size} className='star-rating'>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`star ${value <= rating ? 'filled' : value <= hoveredRating ? 'semi-filled' : ''}`}
          onClick={() => handleRatingChange(value)}
          onMouseEnter={() => handleStarHover(value)}
          onMouseLeave={() => setHoveredRating(null)}
          title={value}
        >
          &#9733;
        </span>
      ))}
    </SCStarRating>
  );
};

const SCStarRating = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap:2px;
    width: fit-content;

    p{
        color: white;
    }
    .star {
        color: gray;
        cursor: pointer;
        font-size:${(props)=> props.$fsize};
    }

    .filled {
        color: yellow;
    }

    .semi-filled {
        color: #b9b922;
    }
`;