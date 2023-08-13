import { styled } from "styled-components";
import StarRating from "./StarRating";
import {BsFillPersonFill} from "react-icons/bs";

export default function ReviewItem({writer,review,rating}) {
    return (
        <SCReview>
            <h2><BsFillPersonFill /> {writer ? writer : "Username"} <StarRating initialRating={rating ? rating : 5} size="15px"/></h2>
            <p>
                {review ? review : ""}
            </p>
            
        </SCReview>
    );
}

const SCReview = styled.section`

    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    position: relative;

    h2{
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        gap: 10px;
    }

    p{
        line-height: 20px;
    }

`;