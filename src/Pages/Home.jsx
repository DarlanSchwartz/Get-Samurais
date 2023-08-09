import { styled } from "styled-components";
import FilterComponent from "../Components/FilterComponent";

export default function Home()
{
    return(
        <PageContainer>
            <FilterComponent/>
        </PageContainer>
    );
}

const PageContainer = styled.main`

    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 80px;
    align-items: center;
    justify-content: center;

`;