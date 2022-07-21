import React from 'react';
import { toggleMobileMenu } from './MobileMenuSwitchSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import {Burger, MediaQuery, Transition, useMantineTheme} from '@mantine/core';

const MobileMenuSwitch = () =>{
    const theme = useMantineTheme();
    const isOpen:boolean = useSelector((state: RootState) => state.MobileMenuSwitch.value);
    const dispatch = useDispatch();

    return(
        <>      
        
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>          
                <Burger
                opened={isOpen}
                onClick={() => dispatch(toggleMobileMenu())}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
                />           
            </MediaQuery>            
        </>
    )
}

export default MobileMenuSwitch