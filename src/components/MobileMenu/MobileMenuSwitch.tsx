import React, {useState, useEffect} from 'react';
import { toggleMobileMenu, toggleDesktop } from './MobileMenuSwitchSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import {Burger, MediaQuery, useMantineTheme} from '@mantine/core';

const MobileMenuSwitch = () =>{
    const theme = useMantineTheme();
    const isOpen:boolean = useSelector((state: RootState) => state.MobileMenuSwitch.isOpen);
    const dispatch = useDispatch();

    const onResize = (windowWidth : number) =>{
        if(windowWidth > 768)
        dispatch(toggleDesktop(true));
        if(windowWidth < 768)
        dispatch(toggleDesktop(false));
    }
    useEffect(()=>{
        let windowWidth = document.documentElement.clientWidth;
        onResize(windowWidth)

      addEventListener('resize', (event) => {
        windowWidth = document.documentElement.clientWidth;
        onResize(windowWidth)
      });
    },[])
  

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