import { styled } from "styled-components";

export default function Logo()
{
    return(
        <LogoContainer href="/">
            {/* <img src="/logo.png" alt="" /> */}
            <h1>Get Samurais</h1>
        </LogoContainer>
    );
}

const LogoContainer = styled.a`
    width: fit-content;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    gap: 10px;
    img{
       height: 60px;
    }
    h1{
        color: white;
        font-size: 50px;
        white-space: nowrap;
        font-family: Bonzai;
    }
`;