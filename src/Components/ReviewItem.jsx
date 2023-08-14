import { styled } from "styled-components";
import StarRating from "./StarRating";
import {BsFillPersonFill} from "react-icons/bs";

export default function ReviewItem({writer,review,rating,timestamp}) {
    const dateString = timestamp;
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const extractedDate = ` ${year} - ${month} - ${day} `;
    const time = timestamp.split('T')[1].split(':');
    time[2] = parseInt(time[2]);
    const finalTime = time.join(':');
    return (
        <SCReview>
            <h2>
                <div className="main">
                    <BsFillPersonFill /> 
                    {writer ? writer : "Username"} 
                    <StarRating initialRating={rating ? rating : 5} size="15px"/>
                </div>
                <span title={extractedDate + " at " + finalTime}>{extractedDate}</span>
                </h2>
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
        justify-content: space-between !important;
        flex-direction: row;
        gap: 10px;
        width: 100%;

        .main{
            display: flex;
            align-items: center;
            gap: 10px;
            justify-content: center;
        }

        span{
            color: lightgray;
            font-size: 10px;
            align-self: flex-end;
        }
    }

    p{
        line-height: 20px;
    }

`;