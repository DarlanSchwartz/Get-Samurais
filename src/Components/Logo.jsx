import { useWindowSize } from "@uidotdev/usehooks";
import { styled } from "styled-components";
import { mainRed } from "../Colors/mainColors";

export default function Logo()
{
    const size = useWindowSize();
    return(
        <LogoContainer href="/">
            <img src="/logo.png" alt="" />
            <h1>{size.width > 900 ? "Get Samurais" : <span>G<span>S</span></span>}</h1>
        </LogoContainer>
    );
}

const LogoContainer = styled.a`
    width: fit-content;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    margin: 0;
    flex-shrink: 0;
    gap: 10px;
    @media (max-width: 900px) {
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #ffffff39;
        width: 50px;
        height: 50px;
    }
    img{
       height: 60px;
    }
    h1{
        color: white;
        font-size: 50px;
        white-space: nowrap;
        font-family: Bonzai;
        @media (max-width: 900px) {
            font-size: 30px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }

        span{
            span{
                color: ${mainRed};
            }
        }
    }
`;