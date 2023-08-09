import { styled } from "styled-components";
import { BsFillPersonFill} from "react-icons/bs";

export default function ServiceItem({name, owner,description, category, photo, price})
{
    return(
        <Container>
            <ServiceImage>
                <img src={`${photo ? photo : "/samurai-example.png"}`} alt="" />
            </ServiceImage>
            <Banner className="banner">
                <h1>{name ? name : "Service name"} <span>{price ? price : "$ 0"}</span></h1>
                <p>{description ? description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. At soluta eum eos velit enim culpa iure fugiat molestias fuga non cumque, eius corporis autem tenetur sunt reiciendis commodi eaque? Eum?"}</p>
                <h6>
                    <img src={`/filter/${category ? category : "All"}.svg`} alt="" />
                    {category ? category : "All"}
                </h6>
                <h6><BsFillPersonFill/>{owner ? owner : "Owner name"}</h6>
            </Banner>
        </Container>
    );
}

const ServiceImage = styled.div`
width: 100%;
height: 100%;
img{
    width: 100%;
    object-fit: cover;
}
`;

const Banner = styled.div`
height: 55px;
width: 100%;
background-color: rgba(0,0,0,0.5);
position: absolute;
left: 0;
bottom: 0;
padding: 10px;
overflow: hidden;
h1{
    font-size: 35px !important;
    font-family: Bonzai;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span{
        font-family: sans-serif;
        font-size: 20px;
        color: red;
        font-weight: bold;
    }
}

p{
    color: white;
    height: 100%;
    max-height: 100px;
    overflow: hidden;
}

h6{
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
background-color: white;
border-radius: 20px;
overflow: hidden;
cursor: pointer;

&:hover{
    .banner{
        height: 100%;
    }
}

`;