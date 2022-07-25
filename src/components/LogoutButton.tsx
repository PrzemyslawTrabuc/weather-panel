import { signOut } from "./GoogleAuth/GoogleAuthSlice";
import deleteCookie from "../tools/deleteCookie";
import { useDispatch, useSelector } from "react-redux";
import { Button } from '@mantine/core';
import type { RootState, AppDispatch } from '../store/store';


const LogoutButton = () =>{
    const dispatch:AppDispatch = useDispatch();
    const userId = useSelector((state:RootState) => state.GoogleAuth.userId)

    const handleLogout = () =>{
        dispatch(signOut());
        deleteCookie("userName");
        deleteCookie("userId");
    }
    if(!userId)
    return null
    return <Button color="red" onClick={handleLogout}>Sign Out</Button>
}

export default LogoutButton