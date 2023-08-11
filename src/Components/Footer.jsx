import { styled } from "styled-components";

export default function Footer() {
    return (
        <SCFooter>
            <Content>
            <img className="logo inverted" src="/logo.png" alt="" />
                <ul>
                    <h1>More info</h1>
                    <li>
                        <a>-About</a>
                    </li>
                    <li>
                        <a>-Contact</a>
                    </li>
                    <li>
                        <a>-FAQ</a>
                    </li>
                    <li>
                        <a>-Work with us</a>
                    </li>
                    <li>
                        <a>-Our app</a>
                    </li>
                    <li>
                        <a>-Terms of service</a>
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
    align-items: center;
    justify-content: space-between;
    @media (max-width: 750px) {
        padding-left: 10px;
        padding-right: 10px;
    }

    .logo{
        height: 90%;
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
    height: 220px;
    width: 100%;
    background-color: #00000073;
    display: flex;
    align-items: center;
    justify-content: center;
    
`;