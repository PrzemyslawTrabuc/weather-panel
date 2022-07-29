import React, { useState, useEffect, useRef } from "react";
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
  NavLink,
} from "@mantine/core";

import { BrandGithub } from "tabler-icons-react";
import type { RootState, AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {doc, getDoc,setDoc } from "firebase/firestore";
import db from "../api/firebase";

import MobileMenuSwitch from "./MobileMenu/MobileMenuSwitch";
import Homepage from "./Homepage";
import { toggleMobileMenu } from "./MobileMenu/MobileMenuSwitchSlice";
import RightMenu from "./RightMenu";
import LogoutButton from "./LogoutButton";
import UsersWeatherCards from "./Weather/UsersWeatherCards";
import { clearWeatherData, WeatherDetailsForCity, addNewCityToWeatherData, fetchSingleWeatherThunk } from "./WeatherData/WeatherDataSlice";
import { setNumberOfFavUsersCities, setUserFavCities } from "./UserData/UserDataSlice";


export default function AppContainer(props: any) {
  const shouldEffect = useRef(true);
  const theme = useMantineTheme();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.GoogleAuth.userId);
  const isMenuOpen = useSelector((state: RootState) => state.MobileMenuSwitch.isOpen);
  const isDesktop = useSelector((state: RootState) => state.MobileMenuSwitch.isDesktop);
  const weatherData = useSelector((state: RootState) => state.WeatherData.cities);
  const currentCityWeather = useSelector((state: RootState) => state.WeatherData.currentCityWeather);
  const isWeatherDataFetched = useSelector((state: RootState) => state.WeatherData.isFetched);
  const numberOfCitiesStored = useSelector((state: RootState) => state.WeatherData.numberOfCities);
  const numberOfFavUsersCities = useSelector((state: RootState) => state.UserData.numberOfFavUsersCities);

  let favRefreshInterval: number = 0;

  const addFavCityToFirebase = async(userId: string, cityName:string)=>{    
    let dataToInsert:Array<string> = []
    weatherData.forEach((element:any)=>{
      if(element.temp !== 99999)
      dataToInsert.push(element.cityName);
    })
    dataToInsert.push(cityName);
      await setDoc(doc(db, "UsersData", userId),{
        favCities: dataToInsert
      })  
      dispatch(addNewCityToWeatherData(currentCityWeather))
      dispatch(setNumberOfFavUsersCities(numberOfFavUsersCities+1))
      dispatch(setUserFavCities(dataToInsert));
  }

  const pushFavListOrderToFirebase = async(userId: string)=>{
    console.log("GOGOGOGOGO")
    let dataToInsert:Array<string> = []
    weatherData.forEach((element)=>{
      dataToInsert.push(element.cityName);
    })
      await setDoc(doc(db, "UsersData", userId),{
        favCities: dataToInsert
      }) 
      console.log(dataToInsert);
  }

  const handleMobileMenu = () => {
    if (!isDesktop) dispatch(toggleMobileMenu());
  };

  useEffect(() => {
    if(userId && location.pathname === "/"){
      props.saveNumberOfFavUsersCitieInStore(userId);     
  }
  },[userId])

  useEffect(() => {
    if (userId && location.pathname === "/mycities") {
      //favRefreshInterval = window.setInterval(refreshWeatherData, 10000);
    }
    return () => {
      clearInterval(favRefreshInterval);
    };
  });

  useEffect(() => {
    if (userId && location.pathname === "/mycities") {
      props.getFavCitiesWeatherByUserId(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (location.pathname !== "/mycities") 
      clearInterval(favRefreshInterval);
  }, [location.pathname]);

  const refreshWeatherData = () => {
    dispatch(clearWeatherData());
    dispatch(() => props.getFavCitiesWeatherByUserId(userId))
  };

  const renderMainContent = () => {
    if (userId) {
      if (
        isWeatherDataFetched === false &&
        shouldEffect.current &&
        location.pathname === "/mycities"
      ) {
        shouldEffect.current = false;
      }
      return (
        <UsersWeatherCards
          pushFavListOrderToFirebase={()=>pushFavListOrderToFirebase(userId)}
          numberOfCitiesStored={numberOfCitiesStored}
          weatherData={weatherData}
          isWeatherDataFetched={isWeatherDataFetched}
        />
      );
    }
  };
  console.log("appContainer")
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Transition
          mounted={isDesktop ? true : isMenuOpen}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <Navbar
              style={styles}
              p="md"
              hiddenBreakpoint="sm"
              hidden={!isMenuOpen}
              width={{ sm: 200, lg: 300 }}
            >
              <Navbar.Section grow>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <NavLink
                    icon={<i className="fa-solid fa-house-chimney"></i>}
                    description="Homepage"
                    label="Home"
                    active={location.pathname === "/" ? true : false}
                    onClick={handleMobileMenu}
                  />
                </Link>
                {userId ? (
                  <Link to="/mycities" style={{ textDecoration: "none" }}>
                    <NavLink
                      icon={<i className="fa-solid fa-heart"></i>}
                      description={`Weather for your cities (${numberOfFavUsersCities})`}
                      label="My Cities"
                      active={location.pathname === "/mycities" ? true : false}
                      onClick={handleMobileMenu}
                    />
                  </Link>
                ) : null}
              </Navbar.Section>
              <Navbar.Section>
                <Center>
                  <Link to="/">
                    <LogoutButton />
                  </Link>
                </Center>
              </Navbar.Section>
            </Navbar>
          )}
        </Transition>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <MobileMenuSwitch />
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <Text weight={700}>
                <i className="fa-2xl fa-solid fa-sun"></i> WP
              </Text>
            </Link>
            <RightMenu></RightMenu>
          </div>
        </Header>
      }
      footer={
        <Footer height={60} p="md">
          <Center>
            <Text
              component="a"
              href="https://github.com/PrzemyslawTrabuc/weather-panel"
            >
              <BrandGithub /> Przemysław Trabuć
            </Text>
          </Center>
        </Footer>
      }
    >
      {/* MAIN AREA */}

      <Routes>
        <Route
          path="/mycities"
          element={<Group position={isDesktop? "left" : "center"} >{renderMainContent()}</Group>}
        />
        <Route 
          path="/" 
          element={
              <Homepage />
          } 
        />
      </Routes>
      <button onClick={() => addFavCityToFirebase(userId, "Opole")}>DUPA</button>
      <button onClick={() => dispatch(fetchSingleWeatherThunk("Opole"))}>DUPA2</button>
    </AppShell>
  );
}
