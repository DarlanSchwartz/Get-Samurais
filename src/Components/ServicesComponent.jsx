import { styled } from "styled-components";
import ServiceItem from "./ServiceItem";
import { useContext, useEffect } from "react";
import UserContext from "../Contexts/UserContext";
import { useWindowSize } from "@uidotdev/usehooks";

export default function ServicesComponent() {
    const { categories,services,getServices } = useContext(UserContext);
    const size = useWindowSize();
    useEffect(()=>{
        getServices();
    },[])
    return (
        <SCServicesComponent>
            <div className="header">
                <h1>Services</h1>
                <a href="/create-service">
                    <button>{size.width <=500 ? "+" : "Create Service"}</button>
                </a>
            </div>
            <ContainerServices>
                {services &&

                    services.map((service) => {
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
                                rating={Math.floor(Math.random() * 6)}
                            />
                        );
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
    gap: 20px;
    background-color: rgba(0,0,0,0.2);
    height: 100%;
    min-height: 400px;
    border-radius: 20px;
    width: 100%;
    padding: 20px;
    padding-top: 30px;
    padding-bottom: 30px;
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
        button{
            border: 0;
            background-color: red;
            border-radius: 5px;
            color: white;
            height: 40px;
            font-size: 20px;
            transition: all 200ms;
            border: 1px solid transparent;
            width: 200px;
            @media (max-width:500px) {
                border-radius: 50%;
                width: 40px;
            }
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

        h1{
            font-size: 50px;
            color: white;
        }

    }

   
`;