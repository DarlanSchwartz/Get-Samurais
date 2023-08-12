import { useWindowSize } from "@uidotdev/usehooks";
import { styled } from "styled-components";

export default function Footer() {
    const size = useWindowSize();
    return (
        <SCFooter>
            <Content>
            <img className="logo inverted" src="/logo.png" alt="" />
                <ul>
                    <h1>Info</h1>
                    <li>
                        <a>About</a>
                    </li>
                    <li>
                        <a>Contact</a>
                    </li>
                    <li>
                        <a>FAQ</a>
                    </li>
                    <li>
                        <a>{size.width < 400 ? "Work" : "Work with us"}</a>
                    </li>
                    <li>
                        <a>{size.width < 400 ? "App" : "Our app"}</a>
                    </li>
                    <li>
                        <a title="Terms of service">{size.width < 400 ? "TOS" : "Terms of service"}</a>
                    </li>
                </ul>
                <ul>
                    <h1>Developer</h1>
                    <li>
                        <a target="_blank" href="https://github.com/DarlanSchwartz">Github</a>
                    </li>
                    <li>
                        <a target="_blank" href="https://www.linkedin.com/in/darlan-leite-73349427a/">Linkedin</a>
                    </li>
                </ul>
                <ul>
                    <h1>Tech stack</h1>
                    <li>
                        <a target="_blank" href="https://react.dev/">React</a>
                    </li>
                    <li>
                        <a target="_blank" href="https://styled-components.com/showcase">Styled components</a>
                    </li>
                    <li>
                        <a target="_blank" href="https://fkhadra.github.io/react-toastify/introduction/">Toastify</a>
                    </li>
                    <li>
                        <a target="_blank" href="https://sweetalert2.github.io/">Sweet alert</a>
                    </li>
                    <li>
                        <a target="_blank" href="https://animate.style/">Animate.css</a>
                    </li>
                    <li>
                        <a target="_blank" href="https://react-icons.github.io/react-icons/">React-Icons</a>
                    </li>

                    <li>
                        <a target="_blank" href="https://usehooks.com/">useHooks</a>
                    </li>
                </ul>
                <img className="logo" src="/logo.png" alt="" />
            </Content>
        </SCFooter>
    );
}

const Content = styled.nav`
    width: 100%;
    max-width: 1200px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 750px) {
        padding-left: 10px;
        padding-right: 10px;
    }

    .logo{
        height: 90%;
        width: 200px;
        @media (max-width: 750px) {
            display: none;
        }
    }

    .inverted{
        transform: scaleX(-100%);
    }

    


    ul{
        padding: 10px;
        padding-top: 20px;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: flex-start;

        *{
            width: fit-content;
            max-width: 100px;
        }
    }

    h1{
        color: white;
    }

    a{
        text-decoration: none;
        color:rgb(189, 183, 175);
        cursor: pointer;
        &:hover{
            text-decoration: underline;
        }
    }
`;

const SCFooter = styled.footer`
    margin-top: 40px;
    height: fit-content;
    width: 100%;
    background-color: #00000073;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;