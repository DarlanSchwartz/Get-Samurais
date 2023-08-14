import { useContext, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import UserContext from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import MyServiceItem from "../Components/MyServiceItem";
import { mainRed } from "../Colors/mainColors";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillLeftCircle } from "react-icons/ai"
import { useWindowSize } from "@uidotdev/usehooks";
import { RotatingTriangles } from "react-loader-spinner";

export default function MyServices() {
    const { user, categories, getUserInfo, loadingUser } = useContext(UserContext);


    const navigate = useNavigate();
    const size = useWindowSize();
    useEffect(() => {
        getUserInfo();
        if (!localStorage.getItem("token")) return navigate('/');
    }, []);

    return (
        <PageContainer>
            <h1 className="title">
                <button onClick={() => navigate('/')}>{size.width <= 800 ? null : <AiFillLeftCircle />} {size.width <= 800 ? "<" : "Home"}</button>
                My Services
            </h1>
            <ServicesList>
                <button onClick={() => navigate('/create-service')} className="create-btn">
                    <BsFillPlusCircleFill />Create new <BsFillPlusCircleFill />
                </button>
                {
                    (!loadingUser && user && user?.services?.length > 0) &&
                    <div className="indicator">
                        <span>Photo</span>
                        <span>Name</span>
                        {size.width > 500 && <span>Description</span>}
                        <span>{size.width > 500 ? "Category" : "Cat"}</span>
                        <span>Price</span>
                        <span>Status</span>
                    </div>
                }
                {user && user.services.map((service) => {
                    return <MyServiceItem
                        available={service.available}
                        category={categories[service.category]}
                        price={service.price}
                        name={service.name}
                        photo={service.photo}
                        description={service.description}
                        service_id={service.id}
                        key={service.id}
                        owner_id={service.owner_id}
                        rating={service.overall_rating}
                    />
                })}

                {(!user && !localStorage.getItem("token")) && <p className="no-services">You should not be here</p>}
                {loadingUser &&
                    <div className="loading-gif">
                        <RotatingTriangles
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="rotating-triangels-loading"
                            wrapperClass="inner"
                            colors={["red", "white", "black"]}
                        />
                        <p>Loading...</p>
                    </div>
                }
                {user && user.services.length == 0 && <p className="no-services">No services to show!</p>}

            </ServicesList>
        </PageContainer>
    );
}

const ServicesList = styled.div`

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 60px;
    background-color: rgba(0,0,0,0.2);
    min-height: 400px;
    border-radius: 20px;
    width: 100%;
    max-width: 800px;
    padding: 20px;
    height: fit-content;
    position: relative;

    @media (max-width: 500px) {
       padding: 0;
       padding-top: 20px;
       padding-bottom: 20px;
    }

    @media (max-width: 800px) {
        max-width: 100%;
        border-radius: 0;
    }

    .indicator{
        padding: 10px;
        width: 100%;
        color: white;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap:15px;
        
        span{
            height: 25px;
            @media (max-width: 500px) {
                font-size: 15px;
                height: 20px;
            }
            overflow: hidden;
            &:nth-child(1)
            {
                width: 100%;
                max-width: 70px;
            }
            &:nth-child(2)
            {
                width: 100%;
                max-width: 100px;
            }
            &:nth-child(3)
            {
                width: 100%;
                max-width: 250px;
                @media (max-width: 500px) {
                    text-align: center;
                    max-width: 50px;
                }
            }
            &:nth-child(4)
            {
                width: 100%;
                max-width: 100px;
                
            }
            &:nth-child(5)
            {
                width: 100%;
                max-width: 50px;
            }
            &:nth-child(6)
            {
                width: 100%;
                max-width: 100px;
                text-align: right;
            }
        }
    }

    .loading-gif{
        position: absolute;
        z-index: 2;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);

        p{
            color: white;
        }
    }

    .no-services{
        color: white;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        font-size: 30px;

        @media (max-width: 800px) {
           white-space: nowrap;
        }
    }

    .create-btn{
        background-color: ${mainRed};
        border: 1px solid transparent;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 10px;
        font-size: 25px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        color: white;
        width: 100%;
        gap: 10px;
        &:hover{
            background-color: white;
            color: ${mainRed};
            border: 1px solid ${mainRed};
        }

        @media (max-width: 500px) {
            max-width: calc(100% - 20px);
        }
    }
`;
const PageContainer = styled.main`

    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    background-color: transparent;

    .title{
        color: white;
        width: 100%;
        max-width: 800px;
        font-size: 50px;
        margin-top: 100px;
        margin-bottom: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
       
        button{
            background-color: rgba(0,0,0,0.3);
            border: 1px solid transparent;
            border-radius: 10px;
            box-sizing: border-box;
            padding: 10px;
            font-size: 25px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 60px;
            color: white;
            width: fit-content;
            gap: 10px;
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            &:hover{
               opacity: 50%;
            }

            @media (max-width: 800px) {
                border-radius: 50%;
                width: 40px;
                height: 40px;
                justify-content: center;
                font-size: 35px;
            }

    }

        @media (max-width: 450px) {
        font-size: 35px;
    }
    }

`;