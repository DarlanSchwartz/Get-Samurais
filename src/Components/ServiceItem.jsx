import { styled } from "styled-components";
import { BsFillPersonFill } from "react-icons/bs";
import { useContext } from "react";
import UserContext from "../Contexts/UserContext";
import StarRating from "./StarRating";
import { mainRed, secondRed } from "../Colors/mainColors";

export default function ServiceItem({ name, owner, description, category, photo, price, location, available,owner_id,service_id,rating,reviews }) {
    const { setShowService } = useContext(UserContext);


    return (
        <Container onClick={() => setShowService({ name, owner, description, category, photo, price, location, available,owner_id,service_id,rating,reviews })}>
            {/* <StarRating initialRating={rating}/> */}
            <ServiceImage>
                <img src={`${photo ? photo : "/samurai-example.png"}`} alt="" />
                {!available && <img className="not-available" src="/not-available.png" alt="" /> }  
            </ServiceImage>
            <Banner className="banner">
                <h1>{name ? name : "Service name"} <span>{price ? price : "$ 0"}</span></h1>
                <p>{description ? description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. At soluta eum eos velit enim culpa iure fugiat molestias fuga non cumque, eius corporis autem tenetur sunt reiciendis commodi eaque? Eum?"}</p>
                <h6>
                    <img src={`/filter/${category ? category : "All"}.svg`} alt="" />
                    {category ? category : "All"}
                    
                </h6>
                <h6><BsFillPersonFill />{owner ? owner : "Owner name"}</h6>
                <h5>Rating: <StarRating size="20px" initialRating={rating}/></h5>
            </Banner>
        </Container>
    );
}

const ServiceImage = styled.div`
width: 100%;
height: 100%;
overflow: hidden;
position: relative;

.not-available{
    width: 102%;
    height: 102%;
    position: absolute;
    left: 0;
    top: 0;
}

img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 0 0;
}
`;

const Banner = styled.div`
height: 55px;
width: 100%;
background-color: rgba(0,0,0,0.5);
position: absolute;
left: 0;
bottom: 0;
z-index: 1;
padding: 10px;
display: flex;
flex-direction: column;
gap: 10px;
overflow: hidden;
h1{
    font-size: 35px !important;
    font-family: Bonzai;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    margin-bottom: 10px;

    span{
        font-family: sans-serif;
        font-size: 20px;
        color: ${secondRed};
        font-weight: bold;
    }
}

p{
    color: white;
    height: 100%;
    max-height: 100px;
    overflow: hidden;
    line-height: 20px;
}

h6,h5{
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-start;
    color: white;
    img{
        height: 15px;
    }

    &:last-child{
        margin-top: 10px;
    }
}
`;

const Container = styled.div`
position: relative;
width: 370px;
height: 250px;
background-color: transparent;
border-radius: 20px;
overflow: hidden;
cursor: pointer;

.star-rating{
}

&:hover{
    .banner{
        height: 100%;
    }
}

`;