import { styled } from "styled-components";
import ServiceItem from "./ServiceItem";

export default function ServicesComponent()
{
    return(
        <SCServicesComponent>
            <h1>Services</h1>
            <ContainerServices>
            <ServiceItem available={true} location={"São Paulo"} price={0} name={"Name"} category={"Home"} owner={"Lenhador vara longa"} photo={"/authentication-image.png"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. At soluta eum eos velit enim culpa iure fugiat molestias fuga non cumque, eius corporis autem tenetur sunt reiciendis commodi eaque? Eum?"}/>
            <ServiceItem available={true} location={"São Paulo"} price={0} name={"Name"} category={"Home"} owner={"Lenhador vara longa"} photo={"/authentication-image.png"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. At soluta eum eos velit enim culpa iure fugiat molestias fuga non cumque, eius corporis autem tenetur sunt reiciendis commodi eaque? Eum?"}/>
            <ServiceItem available={false} location={"São Paulo"} price={0} name={"Name"} category={"Home"} owner={"Lenhador vara longa"} photo={"/authentication-image.png"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. At soluta eum eos velit enim culpa iure fugiat molestias fuga non cumque, eius corporis autem tenetur sunt reiciendis commodi eaque? Eum?"}/>
            <ServiceItem available={true} location={"São Paulo"} price={0} name={"Name"} category={"Home"} owner={"Lenhador vara longa"} photo={"/authentication-image.png"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. At soluta eum eos velit enim culpa iure fugiat molestias fuga non cumque, eius corporis autem tenetur sunt reiciendis commodi eaque? Eum?"}/>
            <ServiceItem available={true} location={"São Paulo"} price={0} name={"Name"} category={"Home"} owner={"Lenhador vara longa"} photo={"/authentication-image.png"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. At soluta eum eos velit enim culpa iure fugiat molestias fuga non cumque, eius corporis autem tenetur sunt reiciendis commodi eaque? Eum?"}/>
            <ServiceItem available={true} location={"São Paulo"} price={0} name={"Name"} category={"Home"} owner={"Lenhador vara longa"} photo={"/authentication-image.png"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. At soluta eum eos velit enim culpa iure fugiat molestias fuga non cumque, eius corporis autem tenetur sunt reiciendis commodi eaque? Eum?"}/>
            <ServiceItem available={false} location={"São Paulo"} price={0} name={"Name"} category={"Home"} owner={"Lenhador vara longa"} photo={"/authentication-image.png"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. At soluta eum eos velit enim culpa iure fugiat molestias fuga non cumque, eius corporis autem tenetur sunt reiciendis commodi eaque? Eum?"}/>
            <ServiceItem available={true} location={"São Paulo"} price={0} name={"Name"} category={"Home"} owner={"Lenhador vara longa"} photo={"/authentication-image.png"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. At soluta eum eos velit enim culpa iure fugiat molestias fuga non cumque, eius corporis autem tenetur sunt reiciendis commodi eaque? Eum?"}/>
            <ServiceItem available={true} location={"São Paulo"} price={0} name={"Name"} category={"Home"} owner={"Lenhador vara longa"} photo={"/authentication-image.png"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. At soluta eum eos velit enim culpa iure fugiat molestias fuga non cumque, eius corporis autem tenetur sunt reiciendis commodi eaque? Eum?"}/>
            <ServiceItem available={true} location={"São Paulo"} price={0} name={"Name"} category={"Home"} owner={"Lenhador vara longa"} photo={"/authentication-image.png"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. At soluta eum eos velit enim culpa iure fugiat molestias fuga non cumque, eius corporis autem tenetur sunt reiciendis commodi eaque? Eum?"}/>
            <ServiceItem available={true} location={"São Paulo"} price={0} name={"Name"} category={"Home"} owner={"Lenhador vara longa"} photo={"/authentication-image.png"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. At soluta eum eos velit enim culpa iure fugiat molestias fuga non cumque, eius corporis autem tenetur sunt reiciendis commodi eaque? Eum?"}/>
            <ServiceItem available={true} location={"São Paulo"} price={0} name={"Name"} category={"Home"} owner={"Lenhador vara longa"} photo={"/authentication-image.png"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. At soluta eum eos velit enim culpa iure fugiat molestias fuga non cumque, eius corporis autem tenetur sunt reiciendis commodi eaque? Eum?"}/>
            <ServiceItem available={true} location={"São Paulo"} price={0} name={"Name"} category={"Home"} owner={"Lenhador vara longa"} photo={"/authentication-image.png"} description={"Lorem ipsum dolor sit amet consectetur adipisicing elit. At soluta eum eos velit enim culpa iure fugiat molestias fuga non cumque, eius corporis autem tenetur sunt reiciendis commodi eaque? Eum?"}/>
            
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
    max-height: 2000px;
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

    h1{
        font-size: 50px;
        color: white;
        margin-bottom: 30px;
    }
`;