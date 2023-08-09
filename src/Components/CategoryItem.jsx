import { styled } from "styled-components";

export default function CategoryItem({src,name,cur_filter,set_filter})
{
    return (
        <SCategoryItem $selected={cur_filter == name} onClick={()=> set_filter(name)} title={name}>
            <img src={src} alt={name} />
            <p>{name}</p>
        </SCategoryItem>
    );
}

const SCategoryItem = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: 115px;
    
    background-color: ${(props)=> props.$selected ? "#6b6b6b" : "transparent"};
    p{
        text-align: center;
        margin-top: 10px;
        color: white;
    }
    img{
        width: 100%;
        max-width: 50px;
    }

    &:hover{
        background-color:${(props)=> props.$selected ? "#6b6b6b" : "#3a3a3a"};
    }
`;