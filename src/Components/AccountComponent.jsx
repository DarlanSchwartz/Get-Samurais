import { styled } from "styled-components";
import CustomInput from "./CustomInput";
import { useContext, useState } from "react";
import UserContext from "../Contexts/UserContext";

export default function AccountComponent() {
    const { user, setUser, setShowAuthenticate } = useContext(UserContext);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerPassword2, setRegisterPassword2] = useState("");
    const [registerPhone, setRegisterPhone] = useState("");

    const [loading, setLoading] = useState(false);

    function Login(e)
    {
        e.preventDefault();
    }

    function Register(e)
    {
        e.preventDefault();
    }

    const [showLogin, setShowLogin] = useState(true);
    return (
        <LoginModal onClick={() => setShowAuthenticate(false)}>
            {showLogin ?

                <AuthenticationContainer onClick={(e) => e.stopPropagation()}>
                    <h1><img src="/mini-samurai2.png" alt="" /> Sign in <img src="/mini-samurai.png" alt="" /></h1>
                    <form onSubmit={Login}>
                        <CustomInput autocomplete="true" input_value={loginEmail} set_input_value={(e) => setLoginEmail(e)} type={"email"} name={"email"} is_required={true} placeholder={"E-mail"} />
                        <CustomInput placeholder_color={"white"} autocomplete="true" input_value={loginPassword} set_input_value={(e) => setLoginPassword(e)} type={"password"} name={"password"} is_required={true} placeholder={"Password"} content_reveal={"true"} />
                        <button>Sign in</button>
                        <a>Don't have an account? <span onClick={(e)=> {e.stopPropagation(); setShowLogin(false)}}>Sign up</span> </a>
                    </form>
                </AuthenticationContainer>

                :

                <AuthenticationContainer onClick={(e) => e.stopPropagation()}>
                    <h1><img src="/mini-samurai2.png" alt="" /> Sign up <img src="/mini-samurai.png" alt="" /></h1>
                    <form onSubmit={Register}>
                        <CustomInput autocomplete="false" input_value={registerName} set_input_value={(e) => setRegisterName(e)} type={"text"} name={"name"} is_required={true} placeholder={"Name"} />
                        <CustomInput autocomplete="false" input_value={registerEmail} set_input_value={(e) => setRegisterEmail(e)} type={"email"} name={"email"} is_required={true} placeholder={"E-mail"} />
                        <CustomInput placeholder_color={"white"} autocomplete="false" input_value={registerPassword} set_input_value={(e) => setRegisterPassword(e)} type={"password"} name={"password"} is_required={true} placeholder={"Password"} content_reveal={"false"} />
                        <CustomInput placeholder_color={"white"} autocomplete="false" input_value={registerPassword2} set_input_value={(e) => setRegisterPassword2(e)} type={"password"} name={"password2"} is_required={true} placeholder={"Confirm Password"} content_reveal={"false"} />
                        <CustomInput placeholder_color={"white"} autocomplete="false" input_value={registerPhone} set_input_value={(e) => setRegisterPhone(e)} type={"number"} name={"phone"} is_required={true} placeholder={"Phone"} content_reveal={"false"} max={10} />
                        <button>Sign up</button>
                        <a>Have an account? <span onClick={(e)=>  setShowLogin(true)}>Sign in</span> </a>
                    </form>
                </AuthenticationContainer>
            }
        </LoginModal>
    );
}

const LoginModal = styled.main`
    z-index: 1;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.5);
`;

const AuthenticationContainer = styled.section`
    background-color: white;
    width: 100%;
    max-width: 500px;
    max-height: 500px;
    height: fit-content;
    padding: 20px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: url("/authentication-image.png");
    background-size: cover;
    h1{
        color: black;
        font-size: 40px;
        margin-bottom: 30px;
        font-family: Bonzai;
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: center;

        img{
            width: 20px;
        }
    }

    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    

    a{
        font-size: 14px;
        color: white;
        span{
            color: blue;
            cursor: pointer;
            font-weight: bold;
        }
    }

    button{
        border: 0;
        background-color: red;
        border-radius: 5px;
        color: white;
        height: 40px;
        font-size: 20px;
        &:hover{
            background-color: white;
            color: red;
            border: 1px solid red;
        }
    }

`;