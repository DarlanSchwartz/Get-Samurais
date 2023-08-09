import { styled } from "styled-components";
import ServiceItem from "./ServiceItem";

export default function ServicesComponent()
{
    return(
        <SCServicesComponent>
            <h1>Services</h1>
            <ContainerServices>
                <ServiceItem name={"Carpentry"} category={"Home"} owner={"Lenhador vara longa"}/>
                <ServiceItem/>
                <ServiceItem/>
                <ServiceItem/>
                <ServiceItem/>
                <ServiceItem/>
                <ServiceItem/>
                <ServiceItem/>
                <ServiceItem/>
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
    background-color: rgba(255,255,255,0.2);
    height: 100%;
    min-height: 400px;
    max-height: 2000px;
    border-radius: 20px;
    width: 100%;
    padding: 20px;
`;

const SCServicesComponent = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    margin-top: 40px;

    h1{
        font-size: 50px;
        color: white;
        margin-bottom: 30px;
    }
`;