import { styled } from "styled-components";
import ServiceItem from "./ServiceItem";
import { useContext, useEffect } from "react";
import UserContext from "../Contexts/UserContext";
import { useWindowSize } from "@uidotdev/usehooks";
import { RotatingTriangles } from "react-loader-spinner";
import { MdOutlineSegment } from "react-icons/md";
import { mainRed } from "../Colors/mainColors";

export default function ServicesComponent() {
    const { categories, services, getServices, searchText, setSearchText, currentFilter, setCurrentFilter, user } = useContext(UserContext);
    const size = useWindowSize();
    useEffect(() => {
        getServices();
    }, [])
    return (
        <SCServicesComponent>
            <div className="header">
                <h1>Services</h1>
                <div className="actions">
                    {user &&
                        <>
                            <a href="/my-services">
                                <button>{size.width <= 700 ? <MdOutlineSegment /> : <>My Services <MdOutlineSegment /></>}</button>
                            </a>
                            <a href="/create-service">
                                <button>{size.width <= 700 ? "+" : "Create Service +"}</button>
                            </a>
                        </>
                    }
                </div>
            </div>
            <ContainerServices>
                {!services &&

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
                {services &&

                    services.map((service) => {
                        if (currentFilter == "All" && searchText == "" ||
                            (searchText !== "" && service.name.toLowerCase().includes(searchText.toLowerCase())) ||
                            (currentFilter == categories[service.category] && searchText == "") ||
                            (searchText !== "" && categories[service.category].toLowerCase().includes(searchText.toLowerCase()))) {
                            return (

                                <ServiceItem
                                    service_id={service.id}
                                    key={service.id}
                                    owner_id={service.owner_id}
                                    description={service.description}
                                    available={service.available}
                                    location={service.city_name}
                                    price={service.price}
                                    name={service.name}
                                    category={categories[service.category]}
                                    owner={service.owner_name}
                                    photo={service.photo}
                                    rating={service.overall_rating}
                                    reviews={service.reviews}
                                />
                            );
                        }
                    })
                }
            </ContainerServices>
        </SCServicesComponent>
    );
}

const ContainerServices = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    position: relative;
    gap: 20px;
    background-color: rgba(0,0,0,0.2);
    height: 100%;
    min-height: 400px;
    border-radius: 20px;
    width: 100%;
    padding: 20px;
    padding-top: 30px;
    padding-bottom: 30px;

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
`;

const SCServicesComponent = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    margin-top: 40px;

    @media (max-width:1250px) {
    max-width: calc(100% - 40px);
}

    .header{
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        margin-bottom: 30px;

        .actions{
            display: flex;
            align-items: center;
            justify-content: center;
            gap:20px;
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
            width: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            @media (max-width:700px) {
                border-radius: 50%;
                width: 40px;
            }
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

        h1{
            font-size: 50px;
            color: white;
        }

    }

   
`;