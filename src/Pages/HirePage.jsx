import { styled } from "styled-components";
import UserContext from "../Contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiFillPhone } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import formatPhone from "../Utils/formatPhone";
import { MdLocationPin } from "react-icons/md";
import { mainRed } from "../Colors/mainColors";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { RotatingTriangles } from "react-loader-spinner";

export default function HirePage() {
    const { user, categories } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [service, setService] = useState();
    const params = useParams();
    const [loading,setLoading] =useState(false);
    const [notFound,setNotFound] =useState(false);

    useEffect(() => {
        if (!localStorage.getItem("token")) return navigate('/');
        axios.get(`${import.meta.env.VITE_API_URL}/service/${params.id}`)
            .then(res => {
                setService(res.data);
            }).catch(error => {
                setNotFound(true);
                console.log(error);
            });
    }, []);

    function hire(e)
    {
        e.preventDefault();
        Swal.fire({
            title: `Hire ${service.name}?`,
            color: "white",
            text: `You'll receive an e-mail with additional information and ${service.owner_name} will call you soon!`,
            icon:"question",
            iconColor:mainRed,
            confirmButtonText: `<p style="color:white">Yes</p>`,
            cancelButtonColor: "lightgray",
            cancelButtonText:`<p style="color:black">Cancel</p>`,
            confirmButtonColor: mainRed,
            showCancelButton: true,
            imageAlt: 'Custom image',
            background: "rgba(0,0,0,0.8)",
        }).then(result => {
            if (result.isConfirmed) {
                setLoading(true);
               setTimeout(() => {
                    toast.success(`⚔ Hired ${service.owner_name} for ${service.price} ⚔`, {
                        position: "bottom-left",
                        autoClose: 10000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    navigate('/');
               }, 1000);
            }
        })
    }


    return (
        <PageContainer>
            <Container>
                <h1 className="title"><button onClick={() => navigate('/')}>{"<"}</button>Hiring</h1>
                {service &&
                    <Service>
                        <Info>
                            <Left>
                                <h1> {service.name}</h1>
                                <p>{service.description}</p>
                                <h1><img src={`/filter/${categories[service.category]}.svg`} alt="" />{categories[service.category]}</h1>
                                <h1><BsFillPersonFill />{user && service.owner_id == user.id ? "You" : service.owner_name}</h1>
                                <h1 className="phone"><AiFillPhone /> {formatPhone(service.owner_phone)}</h1>
                                <h1 className="phone"><MdLocationPin /> {service.city_name}</h1>
                                <p>{service.available ? (<>Price: <span>{service.price}</span></>) : "Service currently not available"}</p>
                            </Left>
                            <Rigth>
                                <img src={service.photo} alt="" />
                            </Rigth>
                        </Info>
                       <Bottom onSubmit={hire}>
                        <div className="agreement">
                            <label htmlFor="agree">Do you agree do share your info with the service provider?</label>
                            <input type="checkbox" required id="agree" name="agree" />
                        </div>
                        <button disabled={loading}>{loading ? "Wait.." : "Hire"}</button>
                       </Bottom>
                    </Service>
                }
                {
                     notFound && <h1 className="not-found">Page not found</h1>
                }
                {
                    (!notFound && !service) &&  
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

            </Container>
        </PageContainer>
    );
}

const Bottom = styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 20px;
    border-top: 2px solid white;
    padding-top: 20px;
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

    .agreement{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        label{
            color: white;
            line-height: 20px;
        }

        input{
            width: 30px;
            height: 30px;
            cursor: pointer;
            accent-color:${mainRed};
        }
    }
`;

const Info = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    padding-bottom: 10px;
`;


const Rigth = styled.div`
    @media (max-width: 500px) {
       position: absolute;
       left: 0;
       top: 80px;
       width: 100%;
       z-index: -1;
    }
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 50%;
    img{
        border-radius: 10px;
        width: 100%;
        object-fit: cover;

        @media (max-width: 500px) {
           border-radius: 0;
           max-height: 480px;
        }
    }
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    height: fit-content;
    min-height: 310px;
    @media (max-width: 500px) {
           width: 100%;
    }
`;

const Service = styled.div`
    overflow: hidden;
    margin-top: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 650px;
    background-color: rgba(0,0,0,0.5);
    padding: 10px;
    min-height: 468px;
    padding-bottom: 20px;
    @media (max-width: 500px) {
           border-radius: 0;
    }
    p{
        color: white;
    }
    h1{
        color: white;
        &:first-child{
            font-size: 25px;
            @media (max-width: 500px) {
               text-align: center;
               justify-content: center;
            }
        }
        display: flex;
        align-items: center;
        gap: 10px;
        img{
            width: 15px;
        }

        &:first-child{
        overflow: hidden;
        height: fit-content;
        flex-shrink: 0;
        }
    }
`;

const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: 650px;
    .loading-gif{
        height: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        p{
            color: white;
        }
    }
    .title{
        text-align: center;
        font-size: 30px;
        margin-top: 30px;
        color: white;
        width: 100%;
        position: relative;
        max-width: 650px;
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

    .not-found{
        text-align: center;
        width: 100%;
        color: white;
        white-space: nowrap;
        font-size: 30px;
        margin-top: 200px;
        margin-bottom: 275px;
    }
`;

const PageContainer = styled.main`

    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: transparent;

`;