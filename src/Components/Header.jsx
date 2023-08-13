import { styled } from "styled-components";
import Logo from "./Logo";
import { mainColor, mainRed } from "../Colors/mainColors";
import { useContext, useState } from "react";
import UserContext from "../Contexts/UserContext";
import { MdLogout } from "react-icons/md";
import Swal from "sweetalert2";
import 'animate.css';
import { useLocation, useNavigate } from "react-router-dom";
import AccountComponent from "./AccountComponent";
import { useWindowScroll, useWindowSize } from "@uidotdev/usehooks";

export default function Header() {

    const { user, setUser,showAuthenticate,setShowAuthenticate,searchText,setSearchText,showService } = useContext(UserContext);
    const navigate = useNavigate();
    const [{ x, y }, scrollTo] = useWindowScroll();
    const size = useWindowSize();
    const location = useLocation();
    
    function logout(){
        localStorage.removeItem('token');
        setUser(null);
       window.location.reload();
    }
    function askLogout()
    {
        //animate__hinge
        Swal.fire({
            showClass: {
                popup: 'animate__animated animate__fadeIn'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOut'
              },

            title: 'Logout',
            color:"white",
            text: 'Are you sure?',
            imageUrl: `/areusure.gif?random=${Date.now()}`,
            imageWidth: 300,
            imageHeight: 200,
            width:300,
            confirmButtonText:`<p style="color:black">Yes</p>`,
            cancelButtonColor:mainRed,
            confirmButtonColor:"lightgray",
            showCancelButton: true,
            imageAlt: 'Custom image',
            background:"rgba(0,0,0,0.8)",
          }).then(result =>{
            if(result.isConfirmed)
            {
                logout();
            }
          })
    }

    function showLoginPopup()
    {
        setShowAuthenticate(true);
    }
    return (
        <HeaderContainer $y ={(showAuthenticate || showService)  ? 0 : y}>
            <Content>
                <Logo />
                {(y > 100 && location.pathname == '/') && <SearchBar>
                    {user && <input value={searchText} onChange={(e) => setSearchText(e.target.value)} title="Search for samurai services" type="text" required placeholder="Search.." name="search" id="search" />}
                </SearchBar> }
                <Actions>
                    {user ?
                        <>
                            <a className="user-btn">
                                <img src="/login.png" alt="" />
                                <p>{size.width <=700 ? "" : user.name}</p>
                            </a>
                            <a className="logout-btn" onClick={askLogout}>
                                <MdLogout />
                            </a>
                        </>
                        :
                        !localStorage.getItem("token") ?
                        <a onClick={showLoginPopup} className="login-btn">Login</a> : null
                    }

                </Actions>
            </Content>
            {
                showAuthenticate && <AccountComponent/>
            }
        </HeaderContainer>
    );
}

const Actions = styled.section`

display: flex;
justify-content: space-between;
align-items: center;
gap: 15px;

@media (max-width: 700px) {
    gap: 0;
}

.login-btn,.logout-btn{
    cursor: pointer;
    font-family: Poppins;
    width: fit-content;
    height: 30px;
    text-decoration: none;
    color: white;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
        opacity: 60%;
    }
}

.logout-btn{
    min-width: 50px;
}
.user-btn{
    cursor: pointer;
    font-family: Poppins;
    width: fit-content;
    height: 30px;
    text-decoration: none;
    color: white;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    img{
        height: 100%;
    }
}
`;

const SearchBar = styled.form`
    width: 100%;
    max-width: 300px;
box-sizing: content-box;
    input{
        width: 100%;
        max-width: 300px;
        height: 40px;
        padding-left: 20px;
        font-size: 15px;
        border-radius: 30px;
        border: 0;
        &:focus{
            outline: 0;
        }
    }
`;

const Content = styled.section`
    max-width: 1200px;
    width: 100%;
    gap: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const HeaderContainer = styled.header`
    height: 80px;
    width: 100%;
    background-color:${mainColor} ;
    display: flex;
    z-index: 2;
    align-items: center;
    justify-content: center;

    padding-left: 20px;
    padding-right: 20px;
    background-color: ${(props) => props.$y > 100 ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.1)"};
    position: ${(props) => props.$y > 100 ? "fixed" : "static"};
    left: 0;
    top: 0;
`;