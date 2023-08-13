import { useRef, useState } from "react";
import { styled } from "styled-components";
import { mainRed } from "../Colors/mainColors";

export default function CustomInput({ type, placeholder, is_required, name, content_reveal,input_value, set_input_value,autocomplete,max,placeholder_color,pattern}) {
    const [focused, setFocused] = useState(false);
    const [reveal,setReveal] =  useState(false);

    return (
        <CustomInputContainer $focused={!focused && input_value == "" ? "false" : "true"} $placeholder_color={placeholder_color}>
            <label className="placeholder" htmlFor={name}>{placeholder}</label>
            <input maxLength={max ? max : 300} autoComplete={name} value={input_value} onChange={(e) => set_input_value(e.target.value)} type={content_reveal == "true" && reveal ? "text" : type} name={name} id={name} required={is_required} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
            {
                content_reveal == "true" &&

                <div className="show-pass">
                    <label htmlFor="show-pass">Show Password</label>
                    <input value={reveal} onChange={(e) => setReveal(e.target.checked)} type="checkbox" />
                </div>
            }
        </CustomInputContainer>
    );
}

const CustomInputContainer = styled.section`

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .placeholder{
        transition: all 100ms;
        position: absolute;
        left: 0;
        top: ${(props) => props.$focused == "true" ? "-5px" : "20%"};
        color: ${(props) => props.$placeholder_color};
        font-size: ${(props) => props.$focused == "true" ? "10px" : "16px"};
        user-select: none;
    }


    input:-internal-autofill-selected {
        background-color: transparent !important;
    }
    input{
        width: 100%;
        height: 40px;
        border: 0;
        background-color: transparent;
        color: ${(props) => props.$placeholder_color};
        border-bottom: 1px solid lightgray !important;
        border-bottom-color: lightgray !important;
        &:focus{
            outline: none;
            .placeholder{
                color: ${mainRed};
            }
        }

    }

    .show-pass{
        display: flex;
        gap: 5px;
        align-items: center;
        justify-content: center;
        margin-top: 10px;

        label{
            font-size: 12px;
            color: white;
        }
        input{
            width: 11px;
            height: 11px;
            cursor: pointer;
        }
    }
   
`;