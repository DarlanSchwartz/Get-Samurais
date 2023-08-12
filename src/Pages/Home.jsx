import { styled } from "styled-components";
import FilterComponent from "../Components/FilterComponent";
import IntroSearch from "../Components/IntroSearch";
import ServicesComponent from "../Components/ServicesComponent";

export default function Home()
{
    return(
        <PageContainer>
            <FilterComponent/>
            <IntroSearch/>
            <ServicesComponent/>
        </PageContainer>
    );
}

const PageContainer = styled.main`

    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: transparent;

`;