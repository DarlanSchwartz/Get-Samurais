import { styled } from "styled-components";
import ReviewItem from "./ReviewItem";

export default function Reviews({reviews}) {
    return (
        <SCReviews len={reviews.length * 70}>
            {reviews && reviews.map((rev) =>{
                return <ReviewItem rating={Number(rev.rating)} review={rev.review_text} writer={rev.writer_name}/>
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
    height: ${(props) => props.len + "px"};
    &::-webkit-scrollbar {
        width: 10px; 
    }
    &::-webkit-scrollbar-thumb {
        background-color: red; 
        border-radius: 3px; 
    }
`;