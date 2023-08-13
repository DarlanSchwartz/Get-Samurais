import { styled } from "styled-components";
import CustomInput from "./CustomInput";
import { useContext, useState } from "react";
import UserContext from "../Contexts/UserContext";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { blue, mainRed } from "../Colors/mainColors";

export default function AccountComponent() {
    const { user, setUser, setShowAuthenticate,getUserInfo } = useContext(UserContext);
    const defaultPostalCode = "Insert postal code";
    const invalidPostalCode = "Invalid postal code";

    const [showLogin, setShowLogin] = useState(true);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerPassword2, setRegisterPassword2] = useState("");
    const [registerPhone, setRegisterPhone] = useState("");
    const [registerCity, setRegisterCity] = useState(defaultPostalCode);
    const [postalCode, setPostalCode] = useState("");

    const [loadingPostal, setLoadingPostal] = useState(false);
    const [loading, setLoading] = useState(false);

    function formatPostalCode(value) {
        const valueWithoutLetters = value.replace(/\D/g, '');
        const finalValue = valueWithoutLetters.slice(0, 8);
        setPostalCode(finalValue);
        if (finalValue.length < 8 && finalValue.length > 0) {
            setRegisterCity(invalidPostalCode);
        }
        else {
            setRegisterCity(defaultPostalCode);
        }
    }

    function formatPhone(value) {
        const num = value.replace(/\D/g, '');
        let formatedNumber = '';
    
        if (num.length >= 3) {
            formatedNumber = `(${num.substring(0, 2)}) `;
    
            if (num.length >= 8) {
                formatedNumber += `${num.substring(2, 7)}-`;
    
                if (num.length > 6) {
                    formatedNumber += num.substring(7);
                }
            } else {
                formatedNumber += num.substring(2);
            }
        } else {
            formatedNumber = num;
        }
    
        return formatedNumber;
    }

    function searchCEP() {
        setLoadingPostal(true);

        axios.get(`https://brasilapi.com.br/api/cep/v2/${postalCode}`)
            .then(res => {
                setRegisterCity(res.data.city ? res.data.city : invalidPostalCode);
                setLoadingPostal(false);
            }).catch(error => {

                setLoadingPostal(false);
            });
    }

    function Login(e) {
        e.preventDefault();
        const loginObj = {
            email: loginEmail,
            password: loginPassword
        }
        setLoading(true);
        axios.post(`${import.meta.env.VITE_API_URL}/signin`, loginObj)
            .then(res => {
                localStorage.setItem("token",res.data.token);
                setLoading(false);
                setShowAuthenticate(false);
                getUserInfo(res.data.token);
            }).catch(error => {
                Swal.fire({
                    title: `Error ${error.response?.status}`,
                    text: `${error.response?.data}`,
                    
                    imageUrl:`/oh-no.gif?random=${Date.now()}`,
                    width: 300,
                    background:"#1f1f1f",
                    color:"white",
                    confirmButtonColor: mainRed,
                    confirmButtonText: 'Ok'
                  });
                setLoading(false);
               console.log(error);
            });
    }

    function Register(e) {
        e.preventDefault();
        if(registerCity == defaultPostalCode || registerCity == invalidPostalCode) return;
        const registerObj = {
            name:registerName,
            email: registerEmail,
            password: registerPassword,
            confirmPassword:registerPassword2,
            cellphone: parseInt(registerPhone.replace(/\D/g, "")),
            city:registerCity
        }

        setLoading(true);
        axios.post(`${import.meta.env.VITE_API_URL}/signup`, registerObj)
        .then(res => {
            toast.success('⚔ You became a Samurai ⚔', {
                position: "bottom-left",
                autoClose: 10000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                setLoginEmail(registerEmail);
                setLoginPassword(registerPassword);
                setShowLogin(true);
                setLoading(false);

        }).catch(error => {
            Swal.fire({
                title: `Error ${error.response.status}`,
                text: `${error.response.data}`,
                icon: 'error',
                width: 300,
                confirmButtonColor: mainRed,
                confirmButtonText: 'Ok'
              });
              setLoading(false);
        });
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchCEP();
        }
    };


    return (
        <LoginModal onMouseDown={() => setShowAuthenticate(false)}>
            {showLogin ?

                <AuthenticationContainer onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
                    <h1><img src="/mini-samurai2.png" alt="" /> Sign in <img src="/mini-samurai.png" alt="" /></h1>
                    <form onSubmit={Login}>
                        <CustomInput autocomplete="true" input_value={loginEmail} set_input_value={(e) => setLoginEmail(e)} type={"email"} name={"email"} is_required={true} placeholder={"E-mail"} />
                        <CustomInput placeholder_color={"white"} autocomplete="true" input_value={loginPassword} set_input_value={(e) => setLoginPassword(e)} type={"password"} name={"password"} is_required={true} placeholder={"Password"} content_reveal={"true"} />
                        <button disabled={loading}>{loading ? "Wait.." : "Sign in"}</button>
                        <a>Don't have an account? <span onClick={(e) => { e.stopPropagation(); setShowLogin(false) }}>Sign up</span> </a>
                    </form>
                </AuthenticationContainer>

                :

                <AuthenticationContainer  onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
                    <h1><img src="/mini-samurai2.png" alt="" /> Sign up <img src="/mini-samurai.png" alt="" /></h1>
                    <form onSubmit={Register}>
                        <CustomInput autocomplete="false" input_value={registerName} set_input_value={(e) => setRegisterName(e)} type={"text"} name={"name"} is_required={true} placeholder={"Name"} />
                        <CustomInput autocomplete="false" input_value={registerEmail} set_input_value={(e) => setRegisterEmail(e)} type={"email"} name={"email"} is_required={true} placeholder={"E-mail"} />
                        <CustomInput placeholder_color={"white"} autocomplete="false" input_value={registerPassword} set_input_value={(e) => setRegisterPassword(e)} type={"password"} name={"password"} is_required={true} placeholder={"Password"} content_reveal={"false"} />
                        <CustomInput placeholder_color={"white"} autocomplete="false" input_value={registerPassword2} set_input_value={(e) => setRegisterPassword2(e)} type={"password"} name={"password2"} is_required={true} placeholder={"Confirm Password"} content_reveal={"false"} />
                        <CustomInput placeholder_color={"white"} autocomplete="false" input_value={registerPhone} set_input_value={(e) => setRegisterPhone(formatPhone(e))} type={"text"} name={"phone"} is_required={true} pattern='\(\d{2}\) \d{5}-\d{4}'  placeholder={"Phone"} content_reveal={"false"} max={15} />
                        <div className="postal-container">
                            <p>City: {registerCity}</p>
                            <input onKeyDown={handleKeyPress} minLength={8} value={postalCode} onChange={(e) => formatPostalCode(e.target.value)} className="postal" required type="text" placeholder="Postal Code" id="postal" name="postal" />
                            <button disabled={loadingPostal} onClick={searchCEP} className="search-btn" type="button"><BsSearch /></button>
                        </div>
                        <button disabled={loading}>{loading ? "Wait.." : "Sign up"}</button>
                        <a>Have an account? <span onClick={(e) => setShowLogin(true)}>Sign in</span> </a>
                    </form>
                </AuthenticationContainer>
            }
        </LoginModal>
    );
}

const LoginModal = styled.main`
    z-index: 7;
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
    max-height: 550px;
    height: fit-content;
    padding: 20px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: url("/authentication-image.png");
    background-size: cover;
    @media (max-width: 400px)  {
        width: 100%;
        max-width: 100%;
        border-radius: 0;
    }
    .postal-container{
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
        .search-btn{
            &:hover{
                background-color: white !important;
                *{
                    color: ${mainRed};
                }
                
            }
        }
        p{
            width: 100%;
            max-width: 250px;
            color: white;
        }
        .postal{
            width: 100%;
            border-radius: 5px;
            border: 0;
            padding-left: 20px;
            height: 40px;
            max-width: 150px;

            &:focus{
                outline: 0;
            }

           
        }

        button{
            transition: all 200ms;
            height: 40px;
            width: 40px;
            max-width: 40px;
            flex-shrink: 0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
           &:enabled{
            &:hover{
                background-color: ${mainRed};
                color: white;
            }
           }

           &:disabled{
            background-color: #3d0a0a;
            cursor: not-allowed;
           }
        }
    }
    
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
            color: ${blue};
            cursor: pointer;
            font-weight: bold;
            &:hover{
                text-decoration: underline;
            }
        }
    }

    button{
        border: 0;
        background-color: ${mainRed};
        border-radius: 5px;
        color: white;
        height: 40px;
        font-size: 20px;
        transition: all 200ms;
        border: 1px solid transparent;
        &:enabled{
            &:hover{
            background-color: white;
            color: ${mainRed};
            border: 1px solid ${mainRed};
        }
        }
        &:disabled{
            background-color: #3d0a0a;
            cursor: not-allowed;
           }
    }

`;