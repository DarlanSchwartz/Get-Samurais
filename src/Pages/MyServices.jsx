import { useContext, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import UserContext from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import MyServiceItem from "../Components/MyServiceItem";

export default function MyServices() {
    const {user,categories,getUserInfo} = useContext(UserContext);

   
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        console.log(user);
        getUserInfo();
        if(!localStorage.getItem("token")) return navigate('/');
    },[])
// name, description, category, photo, price, available = false, service_id =8 
    return (
        <PageContainer>
            <h1 className="title">My Services</h1>
            <ServicesList>
                {user && user.services.map((service) =>{
                    return <MyServiceItem 
                    available={service.available} 
                    category={categories[service.category]} 
                    price={service.price} 
                    name={service.name} 
                    photo={service.photo} 
                    description={service.description}
                    service_id={service.id}
                    key={service.id}
                    />
                })}

                {!user&& <p className="no-services">You should not be here</p>}
                { user &&  user.services.length == 0 && <p className="no-services">No services to show!</p>}
                
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
    height: 100%;
    min-height: 400px;
    border-radius: 20px;
    width: 100%;
    max-width: 800px;
    padding: 20px;
    position: relative;

    @media (max-width: 800px) {
        max-width: 100%;
        border-radius: 0;
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
`;
const PageContainer = styled.main`

    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    background-color: transparent;
    height: 100%;

    .title{
        color: white;
        font-size: 50px;
        margin-top: 100px;
        margin-bottom: 30px;

        @media (max-width: 400px) {
        font-size: 40px;
    }
    }

`;