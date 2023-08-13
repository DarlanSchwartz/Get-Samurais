import { styled } from "styled-components";
import { BsSearch } from "react-icons/bs";
import { useContext } from "react";
import UserContext from "../Contexts/UserContext";
import { mainRed } from "../Colors/mainColors";
export default function IntroSearch() {
    const { searchText, setSearchText, currentFilter, setCurrentFilter } = useContext(UserContext);
    return (
        <IntroSearchContainer>
            <div className="top">
                <div className="titles">
                    <h1>Empower Your Tasks with the Way of the Modern Warrior!</h1>
                    <h2>Share your needs, receive up to 4 quotes, choose the best.</h2>
                </div>
                <div className="image">
                    <img src="/samurai-example.png" alt="" />
                </div>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    required
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        setCurrentFilter("All");
                    }}
                    type="text"
                    placeholder="Type your search.." />
                <button><BsSearch /></button>
            </form>
        </IntroSearchContainer>

    );
}

const IntroSearchContainer = styled.section`

display: flex;
flex-direction: column;
width: 100%;
max-width: 1200px;
margin-top: 50px;
@media (max-width:1250px) {
    max-width: calc(100% - 40px);
}
h1,h2{
    color: white;
}

h1{
    font-size: 45px;
    line-height: 50px;

    @media (max-width:400px) {
        font-size: 35px;
    }   
}

.top{
    display: flex;
    @media (max-width: 800px) {
        position: relative;
    }

    .titles{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        max-width: 50%;
        gap: 20px;
        @media (max-width: 800px) {
            max-width: 100%;
            height: 377px;
        }
    }

    .image{
        width: 100%;
        max-width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        img{
            width: 300px;
            opacity: 100%;
        }

        @media (max-width: 800px) {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            z-index: -1;
            filter: blur(2px);
            pointer-events: none;
        }
    }
}

form{
    position: relative;
    width: 100%;
    button{
        position: absolute;
        top: 50%;
        right: 10px;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        font-size: 20px;
        transform: translateY(-50%);
        border: 0;
        color: white;
        background-color: ${mainRed};

        &:hover{
            opacity: 70%;
        }
        
    }
    input{
        width: 100%;
        height: 82px;
        padding-left: 20px;
        border-radius: 10px;
        font-size: 20px;
        &:focus{
            outline: none;
        }
    }
}

`;