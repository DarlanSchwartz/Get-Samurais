import { styled } from "styled-components";
import ReviewItem from "./ReviewItem";
import { mainRed } from "../Colors/mainColors";

export default function Reviews({reviews}) {
    return (
        <SCReviews $len={reviews.length * 80}>
            {reviews && reviews.map((rev) =>{
                return <ReviewItem key={rev.id} rating={Number(rev.rating)} review={rev.review_text} writer={rev.writer_name} timestamp={rev.created_at}/>
            })}
        </SCReviews>
    );
}

const SCReviews = styled.article`
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 250px;
    overflow-y: scroll;
    height: ${(props) => props.$len + "px"};
    @media (max-width: 400px) {
       max-height: 100px;
    }
    &::-webkit-scrollbar {
        width: 10px; 
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${mainRed}; 
        border-radius: 3px; 
    }
`;