
import { styled } from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../Contexts/UserContext";
import { BsFillPersonFill } from "react-icons/bs";
import distanceBetweenLocations from "../Utils/distanceBetweenLocations";
import { BsFillTrashFill } from "react-icons/bs";
import { BiSolidEdit } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import { AiFillQuestionCircle, AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import axios from "axios";
import StarRating from "./StarRating";
import Reviews from "./Reviews";
import { blue, mainRed, secondRed } from "../Colors/mainColors";
import { useWindowSize } from "@uidotdev/usehooks";

export default function ViewService() {

    const { showService, setShowService, user, getServices, categories, setShowAuthenticate } = useContext(UserContext);
    const { name, owner, description, category, photo, price, location, available, owner_id, service_id, rating, reviews } = showService;
    const reviewRef = useRef();
    const [distance, setDistance] = useState();
    const [loading, setLoading] = useState(false);
    const [reviewRating, setReviewRating] = useState(1);
    const [userCanWriteReview, setUserCanWriteReview] = useState(false);
    const size = useWindowSize();

    const navigate = useNavigate();

    useEffect(() => {
        if (reviews && user) {
            if (reviews.length > 0) {
                const myRevs = reviews.filter(rev => rev.writer_id == user.id).length;
                setUserCanWriteReview(myRevs == 0 ? true : false);
            }
            else {
                setUserCanWriteReview(true);
            }
        }

        if (!user || !location || (user && owner_id == user.id)) return;
        distanceBetweenLocations(user.city_name, location)
            .then((dist) => {
                //console.log(user.city_name, location)
                setDistance(dist);
            })
            .catch((err) => {
                setDistance("Unknown");
            });


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
            cancelButtonColor: mainRed,
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

    function publishReview() {
        if (!user || !reviewRef.current || reviewRef.current.value == "") return;
        const review = {
            review_text: reviewRef.current.value,
            rating: reviewRating,
            service_id: service_id,
            writer_id: user.id,
        };
        setLoading(true);
        axios.post(`${import.meta.env.VITE_API_URL}/service/review/new`, review, { headers: { Authorization: localStorage.getItem("token") } })
            .then(res => {
                getServices();
                setLoading(false);
                const newService = {
                    name: res.data.name,
                    owner: res.data.owner_name,
                    description: res.data.description,
                    category: categories[res.data.category],
                    photo: res.data.photo,
                    price: res.data.price,
                    location: res.data.city_name,
                    available: res.data.available,
                    owner_id: res.data.owner_id,
                    service_id: res.data.id,
                    rating: res.data.overall_rating,
                    reviews: res.data.reviews
                }
                setShowService(newService);
                const myRevs = newService.reviews.filter(rev => rev.writer_id == user.id);
                setUserCanWriteReview(myRevs.length > 0 ? false : true);

                reviewRef.current.value = "";
            }).catch(error => {
                Swal.fire({
                    title: `Error ${error.response ? error.response.status : ""}`,
                    text: `${error.response ? error.response.data : "Something went wrong"}`,
                    icon: 'error',
                    width: 300,
                    confirmButtonColor: mainRed,
                    confirmButtonText: 'Ok'
                });
                console.log(error);
                setLoading(false);
            });
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
                    confirmButtonColor: mainRed,
                    confirmButtonText: 'Ok'
                });
            });
    }

    return (
        <LoginModal onClick={(e) => { setShowService(null); e.stopPropagation() }}>
            <Container onClick={(e) => e.stopPropagation()}>

                <Actions>
                    {
                        user && owner_id == user.id &&
                        <>
                            <BiSolidEdit className="action" title="Edit" onClick={(e) => {
                                e.stopPropagation();
                                setShowService(null);
                                navigate(`/edit-service/${service_id}`, { state: { showService } })
                            }} />
                            <BsFillTrashFill className="action" title="Delete" onClick={askDeleteService} />
                        </>
                    }
                    <AiFillCloseCircle title="Close" className="action" onClick={() => setShowService(null)} />
                </Actions>

                <div className="main">
                    <div className="left">
                        <h1> {name}</h1>
                        <p>{description}</p>
                        <h1><img src={`/filter/${category}.svg`} alt="" />{category}</h1>
                        <h1><BsFillPersonFill />Samurai: {user && owner_id == user.id ? "You" : owner}</h1>
                        {(user && owner_id !== user.id) && <p className="distance">{Number(distance) < 1 ? "This Samurai is from your location" : "Distance from you:"} {distance && Number(distance) < 1 ? "" : distance ? distance + " Km" : "Caculating.."}</p>}
                        <p>{available ? (<>Price: <span>{price}</span></>) : "Service currently not available"}</p>
                    </div>
                    <div className="right">

                        <img src={photo} alt="" />
                        <div className="actions">
                            <button className="ask"><AiFillQuestionCircle /> {size.width <= 500 ? "" : "Ask something"}</button>
                            <button><AiFillCheckCircle /> Hire</button>
                        </div>
                        <div className="rating">
                            <StarRating size={size.width <=500 ? "15px" : "30px"} initialRating={rating} />
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <h1>Reviews</h1>
                    <Reviews reviews={reviews} />
                    {!reviews || reviews && reviews.length == 0 ? <p>No reviews yet, write the first review!</p> : undefined}
                    {user && userCanWriteReview &&
                        <>
                            <label htmlFor="write-review">Write your review </label>
                            <h2>Rating <StarRating size="20px" onChange={setReviewRating} interactable={true} initialRating={1} /></h2>
                            <textarea ref={reviewRef} type="text" placeholder="e.g This was a great service!" />
                            <button disabled={loading} onClick={publishReview}>{loading ? "Wait.." : "Publish"}</button>
                        </>
                    }
                    {
                        !userCanWriteReview &&

                        <>
                            <h3 className="cant-review">{user ? "You already wrote your review of this service!" : <><span onClick={() => { setShowAuthenticate(true); setShowService(null) }}>Login</span> to write reviews</>}</h3>
                        </>
                    }
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
    padding: 10px;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
    gap: 10px;
    font-size: 30px;

    .action{
        cursor: pointer;
        &:hover{
           *{
            color: ${mainRed};
           }
        }
    }
`;

const Container = styled.div`
    width: 100%;
    height: fit-content;
    max-width: 900px;
    border-radius: 30px;
    background-color: rgba(0,0,0,0.8);
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
    border-top-right-radius: 0;

    @media (max-width: 500px) {
       max-width: 100%;
       border-radius: 0;
    }
    
    .main{
        display: flex;
        height: 100%;
        max-height: 330px;
    }

    .bottom{
        display: flex;
        flex-direction: column;
        position: relative;
        @media (max-width: 500px) {
            margin-top: 20px;
        }
        button{
            background-color: ${mainRed};
            color: white;
            border-radius: 5px;
            font-size: 15px;
            width: fit-content;
            border: 0;
            position: absolute;
            bottom: 5px;
            right: 5px;
            border: 1px solid transparent;
            &:hover{
                color: ${mainRed};
                background-color: white;
                border: 1px solid ${mainRed};
            }
        }
        textarea{
            height: 90px;
            resize: none;
            border-radius: 5px;
            padding: 10px;
            color: black;
            border: 0;
            &::-webkit-scrollbar {
                width: 10px; 
            }
            &::-webkit-scrollbar-thumb {
                background-color: ${mainRed}; 
                border-radius: 3px; 
            }

            &:focus{
                outline: none;
            }

          
        }
        .cant-review{
            margin-top: 20px;
            span{
                color: ${blue};
                &:hover{
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
        }
        h2{
            font-size: 16px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap : 20px ;
            justify-content: flex-end;
        }
        label{
            font-size: 22px;
            margin-top: 30px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          
        }
        h1{
            font-size: 30px;
            margin-bottom: 25px;
            padding-bottom: 10px;
            border-bottom: 1px solid white;
        }
    }

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
        height: 100%;
        max-height: 330px;
    }

    .left{
        display: flex;
        flex-direction: column;
        gap: 30px;
        @media (max-width: 500px) {
            gap: 20px;
        }
        .distance{
            white-space: nowrap;
        }
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
                color: ${secondRed};
                font-weight: bold;
            }
        }
    }

    .right{
        overflow: hidden;
        position: relative;
        border-radius: 20px;
        .rating{
            position: absolute;
            right: 0;
            top: 0;
            border-bottom-left-radius: 20px;
            height: 30px;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content:flex-end;
            gap: 10px;
            align-items: center;
            padding: 10px;
        }
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
            .ask{
                @media (max-width: 500px) {
                    min-width: 40px;
                    width: 40px !important;
                    height: 40px !important;
                    border-radius: 50%;
                    flex-grow: 0;
                    box-sizing: border-box;
                    gap: 0;
                }
            }
                button{
                background-color: ${mainRed};
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
                    color: ${mainRed} !important;
                    *{
                        color: ${mainRed} !important;
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