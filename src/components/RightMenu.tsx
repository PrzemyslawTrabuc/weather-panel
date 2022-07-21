import React from 'react';
import { Group } from '@mantine/core';

import DarkModeSwitch from './DarkModeSwitch/DarkModeSwitch';
import GoogleAuth from './GoogleAuth/GoogleAuth'

const RightMenu = () =>{

    return(
        <div style={{position: 'absolute', right:'5%'}}>
            <Group>
                <GoogleAuth></GoogleAuth>
                <DarkModeSwitch></DarkModeSwitch>
            </Group>    
        </div>
    )
}

export default RightMenu