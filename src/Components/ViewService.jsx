
import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Contexts/UserContext";
import { BsFillPersonFill } from "react-icons/bs";
import distanceBetweenLocations from "../Utils/distanceBetweenLocations";

export default function ViewService() {

    const { showService, setShowService, user } = useContext(UserContext);
    const { name, owner, description, category, photo, price, location,available } = showService;
    const [distance, setDistance] = useState();

    useEffect(() => {
        if (!user || !location) return;
        distanceBetweenLocations(user.city_name, location)
            .then((dist) => {
                setDistance(dist + " Km");
            })
            .catch((err) => {
                setDistance("Unknown")
            })
    }, []);

    return (
        <LoginModal onClick={(e) => {setShowService(null); e.stopPropagation()}}>
            <Container onClick={(e) =>  e.stopPropagation()}>
                <div className="left">
                    <h1>{name}</h1>
                    <p>{description}</p>
                    <h1><img src={`/filter/${category}.svg`} alt="" />{category}</h1>
                    <h1><BsFillPersonFill />{owner}</h1>
                    {user && <p>Distance from you: {distance ? distance : "Caculating.."}</p>}
                </div>
                <div className="right">
                   {available && <button> Hire</button>}
                    <img src={photo} alt="" />
                    <div className="info">
                        <p>{available ?  "Price: $" + price : "Service currently not available"}</p>
                    </div>
                </div>
            </Container>
        </LoginModal>
    );
}

const Container = styled.div`
    width: 100%;
    height:  100%;
    max-height: 330px;
    max-width: 900px;
    border-radius: 30px;
    background-color: rgba(0,0,0,0.8);
    padding: 20px;
    display: flex;

    *{
        color: white;
    }

    img{
        width: 100%;
        border-radius: 10px;
    }

    .left,.right{
        max-width: 50%;
    }

    .left{
        display: flex;
        flex-direction: column;
        gap: 30px;
        h1{
            &:first-child{
                font-size: 30px;
            }
            display: flex;
            align-items: center;
            gap: 10px;
            img{
                width: 15px;
            }


        }
        p{
            line-height: 19px;
        }
    }

    .right{
        overflow: hidden;
        position: relative;
        border-radius: 20px;
        button{
            width: 300px;
            height: 300px;
            position: absolute;
            left: -100px;
            top: -100px;
            background-color: #ff000050;
            border-radius: 50%;
            border: 0;
            font-size: 40px;
            padding-left: 80px;
            padding-top: 80px;
            border: 1px solid white;
            &:hover{
                background-color: red;
            }
        }

        .info{
            margin-top: 20px;
            display: flex;
            gap: 10px;
            flex-direction: column;
        }
    }
`;

const LoginModal = styled.main`
    z-index: 3;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.5);
`;