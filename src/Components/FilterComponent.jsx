import { useContext } from "react";
import { styled } from "styled-components";
import UserContext from "../Contexts/UserContext";
import CategoryItem from "./CategoryItem";

export default function FilterComponent() {

    const { currentFilter, setCurrentFilter } = useContext(UserContext);

    const imageNames = [
        "All",
        "TI",
        "Lessons",
        "Autos",
        "Consultancies",
        "Tech",
        "Events",
        "Fashion",
        "Repairs",
        "Health",
        "Home"
    ];

    return (
        <Container>
            <Content>
                {imageNames.map((imgName,index) => {
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
`;

const Container = styled.section`
    display: flex;
    width: 100%;
    
    gap: 10px;
    align-items: center;
    justify-content: center;
    background-color: #1f1f1f;
    height: 100px;
    box-shadow: 10px 10px 20px rgba(8, 8, 8, 1);
`;