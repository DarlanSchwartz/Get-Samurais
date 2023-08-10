import { useContext, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import UserContext from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function CreateService() {
    const {user,categories} = useContext(UserContext);
    const navigate = useNavigate();
    const defaultPhotoPlaceholder = "/placeholder.png";
    const photoRef = useRef();
    const nameRef = useRef();
    const categoryRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();

    const [currentPhotoPreview, setCurrentPhotoPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        //BUG
        if(!localStorage.getItem("token")) return navigate('/');
    },[])
    /*{ name, owner, , category, , , location, available }*/

    async function seePreview() {
        await validateUrl(photoRef.current.value)
        .then((()=>{
            setCurrentPhotoPreview(photoRef.current.value);
        }))
        .catch(() => {
            setCurrentPhotoPreview(null);
        });
    }

    async function validateUrl(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = function () {
                resolve(true);
            };
            img.onerror = function () {
                reject(false);
            };
            img.src = url;
        });
    }

    function createService(e) {
       e.preventDefault();
       setLoading(true);

       validateUrl(photoRef.current.value)
        .then(()=>{

        })
        .catch(() => {
            Swal.fire({
                title: `Invalid image`,
                text: `Paste a proper image url on the input photo field`,
                icon: 'error',
                width: 300,
                confirmButtonColor: "red",
                confirmButtonText: 'Ok'
              });
              photoRef.current.focus();
              setLoading(false);
        });


         
        const service ={
            name: nameRef.current.value, 
            ownerId:user.id, 
            description:descriptionRef.current.value, 
            category:categories.indexOf(categoryRef.current.value), 
            photo:photoRef.current.value,
            price:Number(priceRef.current.value), 
            available:true
        }

        axios.post(`${import.meta.env.VITE_API_URL}/create-service`,service,{headers:{Authorization:localStorage.getItem("token")}})
        .then((res)=>{

            toast.success('⚔ Created service sucess ⚔', {
                position: "bottom-left",
                autoClose: 50000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });

                navigate('/');
                setLoading(false);

        }).catch(error =>{
            console.log(error.response);
            setLoading(false);
        });
    }

    return (
        <PageContainer>
            <h1>Create service</h1>
            <CreationComponent onSubmit={createService}>
                <div className="main-info">
                    <div className="input-container">
                        <label htmlFor="service-name">Name</label>
                        <input ref={nameRef} required id="service-name" name="service-name" type="text" placeholder="e.g Carpentry" maxLength={100} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="price">Price</label>
                        <input ref={priceRef} required id="price" name="price" type="number" placeholder="e.g 100" />
                    </div>
                </div>
                <div className="input-container">
                    <label htmlFor="photo">Photo</label>
                    <input ref={photoRef} required id="photo" name="photo" type="text" placeholder="e.g https://image.jpg" />
                </div>
                <div className="image-preview">
                    <img src={currentPhotoPreview ? currentPhotoPreview : defaultPhotoPlaceholder} alt="placeholder image" title="Place your image url above" />
                    <button type="button" title="Place your image url above" onClick={seePreview}>Load preview</button>
                </div>

                <div className="input-container">
                    <label htmlFor="description">Description</label>
                    <textarea ref={descriptionRef} required id="description" name="description" type="text" placeholder="e.g I make clothes for almost 10 years, i am good!" maxLength={400} />
                </div>

                <div className="input-container">
                    <label htmlFor="category">Category</label>
                    <select ref={categoryRef} name="category" id="category">
                        {categories.map((category)=>{
                           if(category !== "All")  return <option key={category} value={category}>{category}</option>
                        })}
                       
                    </select>
                </div>

                <button disabled={loading} >{loading ? "Wait.." : "Create"}</button>
            </CreationComponent>
        </PageContainer>
    );
}

const CreationComponent = styled.form`

    margin-top: 20px;
    width: 100%;
    max-width: 600px;
    background-color: rgba(0,0,0,0.5);
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    gap:10px;
    padding: 20px;
    @media (max-width: 640px) {
        max-width: 100%;
        border-radius: 0;
    }
    button{
        border: 0;
            background-color: red;
            border-radius: 5px;
            color: white;
            height: 40px;
            font-size: 20px;
            transition: all 200ms;
            border: 1px solid transparent;
            width: 100%;
            &:enabled{
                &:hover{
                background-color: white;
                color: red;
                border: 1px solid red;
            }
            }
            &:disabled{
                background-color: #3d0a0a;
                cursor: not-allowed;
            }
    }
    .main-info{
        display: flex;
        gap: 10px;
    }
    .image-preview{
        
        width: 100%;
        height: fit-content;
        position: relative;
        img{
            width: 100%;
            border-radius: 10px;
            opacity: 30%;
            min-height: 300px;
            max-height: 300px;
            object-fit: cover;
        }

        button{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            max-width: 200px;
        }
    }

    .input-container{
        display: flex;
        flex-direction: column;
        color: white;
        gap: 10px;
        width: 100%;
        select{
            height: 40px;
            width: 100%;
            cursor: pointer;
            border-radius: 5px;
            border: 0;
            padding-left: 10px;
            &:focus{
                outline: 0;
            }
        }
        input,textarea{
            border-radius: 10px;
            padding-left: 20px;
            height: 40px;
            border: 0;
            width: 100%;
            &:focus{
                outline: 0;
            }
        }

        textarea{
            padding-top: 10px;
            resize: none;
            height: 90px;
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

    h1{
        color: white;
        font-size: 50px;
        margin-top: 100px;

        @media (max-width: 400px) {
        font-size: 40px;
    }
    }

`;