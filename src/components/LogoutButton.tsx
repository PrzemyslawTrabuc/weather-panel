import { signOut } from "./GoogleAuth/GoogleAuthSlice";
import { toggleMobileMenu } from "./MobileMenu/MobileMenuSwitchSlice";
import deleteCookie from "../tools/deleteCookie";
import { useDispatch, useSelector } from "react-redux";
import { Button } from '@mantine/core';
import type { RootState, AppDispatch } from '../store/store';
import {clearWeatherData} from "./WeatherData/WeatherDataSlice";
import {clearUserData} from "./UserData//UserDataSlice";

const LogoutButton = () =>{
    const dispatch:AppDispatch = useDispatch();
    const userId = useSelector((state:RootState) => state.GoogleAuth.userId)

    const handleLogout = () =>{
        dispatch(signOut());
        dispatch(toggleMobileMenu());
        dispatch(clearWeatherData());
        dispatch(clearUserData());
        deleteCookie("userName");
        deleteCookie("userId");
    }
    if(!userId)
    return null
    return <Button color="red" onClick={handleLogout}>Sign Out</Button>
}

export default LogoutButton