import { useContext, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import UserContext from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { mainRed } from "../Colors/mainColors";
import { useWindowSize } from "@uidotdev/usehooks";
import { AiFillLeftCircle } from "react-icons/ai";
import { TfiReload } from "react-icons/tfi";

export default function CreateService() {
    const { user, categories } = useContext(UserContext);
    const navigate = useNavigate();
    const defaultPhotoPlaceholder = "/placeholder.png";
    const photoRef = useRef();
    const photoRef2 = useRef();
    const nameRef = useRef();
    const categoryRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();

    const [currentPhotoPreview, setCurrentPhotoPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const size = useWindowSize();
    useEffect(() => {
        if (!localStorage.getItem("token")) return navigate('/');
    }, []);

    function fileChanged() {

        photoRef.current.value = "";
        const selectedFile = photoRef2.current.files[0];
        const allowedExtensions = [".jpg", ".jpeg", ".png", ".bmp", ".gif", ".tif", ".webp"];

        if (allowedExtensions.some(extension => selectedFile.name.toLowerCase().endsWith(extension))) {
            setCurrentPhotoPreview(URL.createObjectURL(selectedFile));
            photoRef.current.value = "";
        } else {
            setCurrentPhotoPreview(null);
            Swal.fire({
                title: `Invalid file format`,
                text: `Select a file with a valid format (${allowedExtensions.join(", ")})`,
                icon: "error",
                width: 300,
                confirmButtonColor: mainRed,
                confirmButtonText: "Ok"
            });
        }
    }

    function uploadImage(img) {
        let body = new FormData()
        body.set('key', import.meta.env.VITE_IMAGE_API_KEY)
        body.append('image', img)

        return axios({
            method: 'post',
            url: 'https://api.imgbb.com/1/upload',
            data: body
        })
    }
    async function seePreview() {

        if (photoRef.current.value === "") {
            const photoFile = URL.createObjectURL(photoRef2.current.files[0]);
            setCurrentPhotoPreview(photoFile);
            return;
        }

        try {
            await validateUrl(photoRef.current.value);
            setCurrentPhotoPreview(photoRef.current.value);
        } catch (error) {

            Swal.fire({
                title: `Invalid image`,
                text: `Paste a proper image url on the input photo field`,
                icon: 'error',
                width: 300,
                confirmButtonColor: mainRed,
                confirmButtonText: 'Ok'
            });

            setCurrentPhotoPreview(null);
        }
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

    async function servicePhotoCheck(e) {
        e.preventDefault();
        setLoading(true);

        const wasAImageFile = photoRef.current.value == "";

        try {
            if (!wasAImageFile) {
                await validateUrl(photoRef.current.value);
                createService(photoRef.current.value);

            } else {
                const selectedFile = photoRef2.current.files[0];
                if (!selectedFile) return alert("Erro");
                uploadImage(selectedFile)
                    .then(res => {
                        createService(res.data.data.display_url);
                        console.log(res);
                    }).catch(error => {
                        Swal.fire({
                            title: `Image error`,
                            text: `There was a problem trying to upload your image, try again with another method or file`,
                            icon: 'error',
                            width: 300,
                            confirmButtonColor: mainRed,
                            confirmButtonText: 'Ok'
                        });
                    });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: `Invalid image`,
                text: `Paste a proper image url on the input photo field`,
                icon: 'error',
                width: 300,
                confirmButtonColor: mainRed,
                confirmButtonText: 'Ok'
            });

            photoRef.current.focus();
            setLoading(false);
            setCurrentPhotoPreview(null);
        }
    }

    function createService(photoUrl) {

        if (!user) {
            Swal.fire({
                title: `Login`,
                text: `You need to be logged in to create services!`,
                icon: 'error',
                width: 300,
                confirmButtonColor: mainRed,
                confirmButtonText: 'Ok'
            });
            setLoading(false);
            return;
        }

        const service = {
            name: nameRef.current.value,
            ownerId: user.id,
            description: descriptionRef.current.value,
            category: categories.indexOf(categoryRef.current.value),
            photo: photoUrl,
            price: Number(priceRef.current.value),
            available: true
        }

        axios.post(`${import.meta.env.VITE_API_URL}/create-service`, service, { headers: { Authorization: localStorage.getItem("token") } })
            .then((res) => {

                toast.success('⚔ Created service sucess ⚔', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                navigate('/');
                setLoading(false);

            }).catch(error => {
                Swal.fire({
                    title: `Error ${error?.response?.status}`,
                    text: `${error?.response?.statusText}`,
                    icon: 'error',
                    width: 300,
                    confirmButtonColor: mainRed,
                    confirmButtonText: 'Ok'
                });
                setLoading(false);
            });
    }

    return (
        <PageContainer>
            <h1><button onClick={() => navigate('/')}>{"<"}</button>Create service</h1>
            <CreationComponent onSubmit={servicePhotoCheck}>
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
                <div className="input-container photo-container">
                    <div className="photo-actions">
                        <label htmlFor="photo">Image url</label>
                        <input ref={photoRef} required={photoRef2.current?.files[0] ? false : true} id="photo" name="photo" type="text" placeholder="e.g https://image.jpg" />
                        <span>or</span>
                        <button
                            type="button"
                            className="custom-file-button"
                            onClick={() => photoRef2.current.click()}
                        >
                            Choose file
                        </button>
                        <input
                            ref={photoRef2}
                            accept=".jpg, .jpeg, .png, .bmp, .gif, .tif, .webp"
                            id="photo2"
                            name="photo2"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={fileChanged}
                        />
                    </div>
                    <div className="image-preview">
                        <img src={currentPhotoPreview ? currentPhotoPreview : defaultPhotoPlaceholder} alt="placeholder image" title="Place your image url above" />
                        <button type="button" title="Place your image url above" onClick={seePreview}><TfiReload /></button>
                    </div>
                </div>


                <div className="input-container">
                    <label htmlFor="description">Description</label>
                    <textarea ref={descriptionRef} required id="description" name="description" type="text" placeholder="e.g I make clothes for almost 10 years, i am good!" maxLength={400} />
                </div>

                <div className="input-container">
                    <label htmlFor="category">Category</label>
                    <select ref={categoryRef} name="category" id="category">
                        {categories.map((category) => {
                            if (category !== "All") return <option key={category} value={category}>{category}</option>
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
            background-color: ${mainRed};
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
                color: ${mainRed};
                border: 1px solid ${mainRed};
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
   

    .photo-container{
        flex-direction: row !important;

        .photo-actions{
            display: flex;
            flex-direction: column;
            width: 50%;
            gap: 20px;
            span{
                text-align: center;
            }
        }

        .image-preview{
            border: 2px solid ${mainRed};
            width: 50%;
            position: relative;
            border-radius: 10px;
            overflow: hidden;
            height: 173px;
            img{
                width: 100%;
                height: 100%;
                
                opacity: 30%;
                object-fit: cover;
            }

            button{
                position: absolute;
                right: 10px;
                top: 10px;
                max-width: 200px;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }
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

    h1{
        color: white;
        font-size: 50px;
        margin-top: 60px;
        width: 100%;
        max-width: 620px;
        text-align: center;
        position: relative;

        @media (max-width: 500px) {
            font-size: 35px;
        }

        
       
            button{
                background-color: rgba(0,0,0,0.3);
                border: 1px solid transparent;
                border-radius: 10px;
                box-sizing: border-box;
                padding: 10px;
                font-size: 35px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: white;
                width: fit-content;
                gap: 10px;
                position: absolute;
                left: 10px;
                top: 50%;
                border-radius: 50%;
                width: 40px;
                height: 40px;
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
    }

`;