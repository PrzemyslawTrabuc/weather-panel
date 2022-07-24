import { signOut } from "./GoogleAuth/GoogleAuthSlice";
import deleteCookie from "../tools/deleteCookie";
import { useDispatch } from "react-redux";
import { Button } from '@mantine/core';


const LogoutButton = () =>{
    const dispatch = useDispatch();

    const handleLogout = () =>{
        dispatch(signOut());
        deleteCookie("userName");
        deleteCookie("userId");
    }

    return <Button color="red" onClick={handleLogout}>Sign Out</Button>
}

export default LogoutButton