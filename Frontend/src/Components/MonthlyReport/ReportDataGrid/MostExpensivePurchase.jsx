import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import BaseUrl from "../../../util/BaseUrl";
import {Card, Typography} from "@mui/material";

const MostExpensivePurchase = () =>{
    const [cost, setCost] = useState(0);
    const [description, setDescription]=useState("");
    useEffect(() => {
        const handleMostExpensivePurchase = async ()=>{
            const token = localStorage.getItem("token");
            const username = jwtDecode(token).sub;
            const userIdResponse = await axios.get(`${BaseUrl}/user/${username}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userId = userIdResponse.data;

            const purchaseResponse = await axios.get(`${BaseUrl}/report/purchase/most-expensive`,{
                params:{userId},
                headers:{Authorization: `Bearer ${token}`}
            });
            setCost(purchaseResponse.data.amount);
            setDescription(purchaseResponse.data.description);
        }
        handleMostExpensivePurchase();
    }, []);

    return(
        <>
            <Typography sx={{fontFamily: "'Archivo Black', sans-serif", color:"white", fontSize:20}}>
                ₹ {cost}
            </Typography>
            <Typography sx={{color:"white", fontSize:16}}>
                {description}
            </Typography>
        </>
    );
};

export default MostExpensivePurchase;