
import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Contexts/UserContext";
import { BsFillPersonFill } from "react-icons/bs";
import distanceBetweenLocations from "../Utils/distanceBetweenLocations";
import { BsFillTrashFill } from "react-icons/bs";
import { BiSolidEdit } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import {AiFillQuestionCircle, AiFillCheckCircle} from "react-icons/ai";
import Swal from "sweetalert2";
import axios from "axios";

export default function ViewService() {

    const { showService, setShowService, user , getServices } = useContext(UserContext);
    const { name, owner, description, category, photo, price, location, available, owner_id, service_id } = showService;
    const [distance, setDistance] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !location || (user && owner_id == user.id)) return;
        distanceBetweenLocations(user.city_name, location)
            .then((dist) => {
                //console.log(user.city_name, location)
                setDistance(dist);
            })
            .catch((err) => {
                setDistance("Unknown");
            })
    }, []);

    function askDeleteService() {
        Swal.fire({
            title: 'Remove',
            color: "white",
            text: 'Remove this service?',
            imageUrl: photo,
            imageWidth: 300,
            width: 300,
            confirmButtonText: `<p style="color:black">Yes</p>`,
            cancelButtonColor: "red",
            confirmButtonColor: "lightgray",
            showCancelButton: true,
            imageAlt: 'Custom image',
            background: "rgba(0,0,0,0.8)",
        }).then(result => {
            if (result.isConfirmed) {
                setShowService(null);
                deleteService();
            }
        })
    }

    function deleteService() {
        axios.delete(`${import.meta.env.VITE_API_URL}/service/${service_id}`, { headers: { Authorization: localStorage.getItem("token") } })
            .then(res => {
                getServices();
            }).catch(error => {
                Swal.fire({
                    title: `Error ${error.response ? error.response.status : ""}`,
                    text: `${error.response ? error.response.data : "Something went wrong"}`,
                    icon: 'error',
                    width: 300,
                    confirmButtonColor: "red",
                    confirmButtonText: 'Ok'
                  });
            });
    }

    return (
        <LoginModal onClick={(e) => { setShowService(null); e.stopPropagation() }}>
            <Container onClick={(e) => e.stopPropagation()}>
                {user && owner_id == user.id &&
                    <Actions>
                        <BiSolidEdit title="edit" onClick={(e) => {
                            e.stopPropagation();
                            setShowService(null);
                            navigate(`/edit-service/${service_id}`, { state: { showService } })
                        }} />
                        <BsFillTrashFill title="delete" onClick={askDeleteService} />
                    </Actions>
                }
                <div className="left">
                    <h1> {name}</h1>
                    <p>{description}</p>
                    <h1><img src={`/filter/${category}.svg`} alt="" />{category}</h1>
                    <h1><BsFillPersonFill />Samurai: {user && owner_id == user.id ? "You" : owner}</h1>
                    {(user && owner_id !== user.id) && <p>{Number(distance) < 1 ? "This Samurai is from your location" : "Distance from you:"} {distance && Number(distance) < 1 ? "" : distance ? distance + " Km" : "Caculating.."}</p>}
                    <p>{available ? (<>Price: <span>{price}</span></>) : "Service currently not available"}</p>
                </div>
                <div className="right">
                    
                    <img src={photo} alt="" />
                    <div className="actions">
                        <button><AiFillQuestionCircle/> Ask something</button>
                        <button><AiFillCheckCircle/> Hire</button>
                    </div>
                </div>
            </Container>
        </LoginModal>
    );
}

const Actions = styled.nav`
    background-color: rgba(0,0,0,0.8);
    position: absolute;
    top: -40px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    right: 0;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
    gap: 10px;
    font-size: 30px;
    *{
        cursor: pointer;
    }
`;

const Container = styled.div`
    width: 100%;
    height:  100%;
    max-height: 330px;
    max-width: 900px;
    border-radius: 30px;
    background-color: rgba(0,0,0,0.8);
    padding: 20px;
    display: flex;
    position: relative;

    *{
        color: white;
    }

    img{
        width: 100%;
        border-radius: 10px;
    }

    .left,.right{
        width: 100%;
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

            span{
                color: red;
                font-weight: bold;
            }
        }
    }

    .right{
        overflow: hidden;
        position: relative;
        border-radius: 20px;
        .actions{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 60px;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content:flex-end;
            gap: 10px;
            align-items: center;
            padding: 10px;

                button{
                background-color: red;
                border-radius: 5px;
                height:40px;
                box-sizing: border-box;
                flex-shrink: 0;
                border: 1px solid transparent;
                font-size: 16px;
                min-width: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                gap: 10px;
                &:hover{
                    background-color: white;
                    color: red !important;
                    *{
                        color: red !important;
                    }
                }
            }
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