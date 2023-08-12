import { useContext } from "react";
import { styled } from "styled-components";
import UserContext from "../Contexts/UserContext";
import CategoryItem from "./CategoryItem";
import { useWindowScroll } from "@uidotdev/usehooks";
import { mainRed } from "../Colors/mainColors";

export default function FilterComponent() {

    const { currentFilter, setCurrentFilter, categories } = useContext(UserContext);
    const [{ x, y }, scrollTo] = useWindowScroll();

    //scrollTo({ left: 0, top: 0, behavior: "smooth" })}
   
    return (
        <Container $y ={y}>
            <Content>
                {categories.map((imgName,index) => {
                    return (
                        <CategoryItem src={`/filter/${imgName}.svg`} name={imgName} set_filter={setCurrentFilter} cur_filter={currentFilter} key={index}/>
                    );
                })}
            </Content>
        </Container>
    );
}

const Content = styled.div`
    display: flex;
    width: 100%;
    max-width: 1250px;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    @media (max-width: 900px) {
        flex-wrap: wrap;
        
    }
    
`;

const Container = styled.section`
    display: flex;
    width: 100%;
    overflow: hidden;
    gap: 10px;
    align-items: center;
    justify-content: center;
    height: 100px;
    position: ${(props) => props.$y > 100 ? "fixed" : "static"};
    left: 0;
    top: 80px;
    z-index: 4;
    background-color: ${(props) => props.$y > 100 ? "rgba(0,0,0,0.8)" : "transparent"};
    @media (max-width: 900px) {
        padding-top: 10px;
        padding-bottom: 10px;
    }
    box-shadow: 10px 10px 20px rgba(8, 8, 8, 1);
`;