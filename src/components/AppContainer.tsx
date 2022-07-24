import React, { useState, useEffect, useRef } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  useMantineTheme,
  Center,
  Transition,
  Group,
 
} from '@mantine/core';
import { BrandGithub } from 'tabler-icons-react';
import type { RootState, AppDispatch } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';

import MobileMenuSwitch from './MobileMenu/MobileMenuSwitch';
import RightMenu from './RightMenu';
import {fetchWeatherThunk} from './WeatherData/WeatherDataSlice';
import UsersWeatherCards from './Weather/UsersWeatherCards';
import LogoutButton from './LogoutButton';


export default function AppContainer() {
  const shouldEffect = useRef(true);
  const theme = useMantineTheme();
  const dispatch:AppDispatch = useDispatch();

  const isMenuOpen:boolean = useSelector((state: RootState) => state.MobileMenuSwitch.isOpen);
  const isDesktop:boolean = useSelector((state: RootState) => state.MobileMenuSwitch.isDesktop);
  const weatherData:Array<any> = useSelector((state: RootState) => state.WeatherData.cities);
  const numberOfCitiesStored:number = useSelector((state: RootState) => state.WeatherData.numberOfCities);
  const numberOfUserCites:number = 2;

  useEffect(() => {
    if(shouldEffect.current){
      console.log("done");
      shouldEffect.current = false;
      dispatch(fetchWeatherThunk(["Opole", "Gdańsk"]));   
    }   
  },[])

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Transition mounted={isDesktop ? true : isMenuOpen} transition="fade" duration={400} timingFunction="ease">
          {(styles) =>
          <Navbar style={styles} p="md" hiddenBreakpoint="sm" hidden={!isMenuOpen} width={{ sm: 200, lg: 300 }}>           
            <Navbar.Section grow> 
              <Text>Test</Text>            
            </Navbar.Section>            
            <Navbar.Section> 
              <Center>
                <LogoutButton />
              </Center>              
            </Navbar.Section>           
          </Navbar>
      }
        </Transition>  
              
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%'}}>         
              <MobileMenuSwitch />
            <Text>WeatherPanel</Text>
              <RightMenu></RightMenu>
          </div>
        </Header>
      }
      footer={
        <Footer height={60} p="md">
          <Center>
            <Text component='a' href="https://github.com/PrzemyslawTrabuc/weather-panel"><BrandGithub /> Przemysław Trabuć </Text>
          </Center>
        </Footer>
      }
    >
   {/* MAIN AREA */}
   
   <Group>     
      {/* {renderWeatherCards()} */}
      {/* TODO: Convert it to use {child} */}
      <UsersWeatherCards numberOfUserCites={numberOfUserCites} numberOfCitiesStored={numberOfCitiesStored} weatherData={weatherData} />
    </Group>
   {/* MAIN AREA */}
    </AppShell>
  );
}