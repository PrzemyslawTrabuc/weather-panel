import React from 'react';
import { Group } from '@mantine/core';
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";

import DarkModeSwitch from './DarkModeSwitch/DarkModeSwitch';
import GoogleAuth from './GoogleAuth/GoogleAuth';
import CurrentUserBadge from './CurrentUserBadge';

const RightMenu = () =>{
    console.log("right menu")
    const userId = useSelector((state: RootState) => state.GoogleAuth.userId);  
    const renderRightMenu = () =>{
        if(!userId)
            return <GoogleAuth />
        if(userId){
            return(
                <>
                    <CurrentUserBadge />
                </>
            )
        }
    }

    return(
        <div style={{position: 'absolute', right:'5%'}}>
            <Group>
                {renderRightMenu()}
                <DarkModeSwitch></DarkModeSwitch>
            </Group>    
        </div>
    )
}

export default RightMenu