import React,{memo}  from "react";
import { useContext } from "react";
import { useNavigate  } from "react-router-dom";
import { StateContext } from "../../ContextProvider";



const Card = ({ name, type, num, path }) => {
    num = num ||0
    const navigate = useNavigate()
    const { setPath } = useContext(StateContext)
    
    return (
        <div className={type} onClick={() => {
            navigate(path)
            path=path.split("").filter((e)=>e !=="/").join("")
            setPath(path)
        }}>
            <p>{name}</p>
            <p>{num<10 && num !==0 ?`0${num}`:num}</p>
        </div>
    )
}
export default memo(Card)