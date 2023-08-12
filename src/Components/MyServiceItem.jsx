import { styled } from "styled-components";
import { BsFillPersonFill, BsFillTrashFill } from "react-icons/bs";
import { useContext, useState } from "react";
import UserContext from "../Contexts/UserContext";
import StarRating from "./StarRating";
import { BiSolidEdit } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function MyServiceItem({ name, description, category, photo, price, available, service_id}) {
// { name, owner, description, category, photo, price, location, available, owner_id, service_id }
const {user , categories , getUserInfo} = useContext(UserContext);
const [loading,setLoading] = useState(false);
const navigate = useNavigate();
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

    function editService(e)
    {
        e.stopPropagation();
        const service = user.services.filter(item => item.id === service_id)[0];
        service.category = categories[service.category];
        navigate(`/edit-service/${service_id}`, { state: { showService: service  } });
    }

    function changeServiceState()
    {
        if(loading) return;

        setLoading(true);
        
        axios.patch(`${import.meta.env.VITE_API_URL}/service/${service_id}`,{available : !available} ,{ headers: { Authorization: localStorage.getItem("token") } })
        .then(res=>{
            getUserInfo();
            setLoading(false);
        }).catch(error =>{
            console.log(error);
            setLoading(false);
        })      
    }

    return (
        <Container>
            <Actions>
                <BiSolidEdit title="edit" onClick={editService} />
                <BsFillTrashFill onClick={askDeleteService} title="delete" />
            </Actions>
            <Content>
                <img src={photo} alt="" />
                <h1>{name}</h1>
                <p>{description?.substring(0, 30)}</p>
                <p>{category}</p>
                <p>${parseFloat(price.replace(/[^0-9.]/g, ''))}</p>
                <button disabled={loading} onClick={changeServiceState} className={available ? "available" : ""}>
                    {<img src={`/${available ? "available" : "unavaible"}.png`} alt="" />}
                </button>
            </Content>
        </Container>
    );
}

const Actions = styled.nav`
   background-color: #00000040;
    position: absolute;
    top: -50px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    right: 0;
    width: 90px;
    height: 50px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    gap: 10px;
    font-size: 30px;
    color: white;
    *{
        cursor: pointer;
    }
`;

const Content = styled.div`
    border-radius: 20px;
    background-color: #00000040;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-height: 80px;
    width: 100%;
    padding: 10px;
    gap: 15px;
    
    border-top-right-radius: 0;

    .available{
        background-color: green;
    }

    button{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 0;
        overflow: hidden;
        flex-shrink: 0;
        img{
            width: 50px;
            height: 50px;
        }

        &:disabled{
            opacity: 50%;
        }
    }
    *{
        font-size: 20px;
        margin: 0;
        color: white;
    }

    h1{
        width: 100%;
        max-width: 100px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        height: 100%;
    }

    p{
        height: 100%;
        overflow: hidden;
        justify-content: flex-start;
        align-items: center;
        display: flex;
        overflow: hidden;
        white-space: nowrap;
        &:nth-child(3)
        {
            width: 100%;
            max-width: 300px;
        }
        &:nth-child(4)
        {
            width: 100%;
            max-width: 100px;
        }
        &:nth-child(5)
        {
            width: 100%;
            max-width: 100px;
        }
    }

    img{
        height: 60px;
        border-radius: 5px;
    }
`;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 80px;
`;