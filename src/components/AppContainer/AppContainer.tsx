import React, { useEffect, useRef } from "react";
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
  Space,
} from "@mantine/core";

import { BrandGithub } from "tabler-icons-react";
import type { RootState, AppDispatch } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import db from "../../api/firebase";
import { showNotification } from "@mantine/notifications";

import MobileMenuSwitch from "../MobileMenu/MobileMenuSwitch";
import Homepage from "../Homepage/Homepage";
import { toggleMobileMenu } from "../MobileMenu/MobileMenuSwitchSlice";
import LogoutButton from "../GoogleAuth/LogoutButton";
import UsersWeatherCards from "../FavouriteCities/UsersWeatherCards";
import RightMenu from "./RightMenu";
import { addNewCityToWeatherData } from "../WeatherData/WeatherDataSlice";
import {
  setNumberOfFavUsersCities,
  setUserFavCities,
} from "../UserData/UserDataSlice";

export default function AppContainer(props: any) {
  const shouldEffect = useRef(true);
  const theme = useMantineTheme();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.GoogleAuth.userId);
  const isMenuOpen = useSelector(
    (state: RootState) => state.MobileMenuSwitch.isOpen
  );
  const isDesktop = useSelector(
    (state: RootState) => state.MobileMenuSwitch.isDesktop
  );
  const homepageWeather = useSelector(
    (state: RootState) => state.HomePageWeather
  );
  const isWeatherDataFetched = useSelector(
    (state: RootState) => state.WeatherData.isFetched
  );
  const numberOfCitiesStored = useSelector(
    (state: RootState) => state.WeatherData.numberOfCities
  );
  const numberOfFavUsersCities = useSelector(
    (state: RootState) => state.UserData.numberOfFavUsersCities
  );
  const userFavCities = useSelector(
    (state: RootState) => state.UserData.userFavCities
  );

  const addFavCityToFirebase = async (userId: string, cityName: string) => {
    if (userId) {
      if (!userFavCities.includes(cityName)) {
        dispatch(addNewCityToWeatherData(homepageWeather));
        let dataToInsert: Array<string> = [];
        if (userFavCities.length > 0)
          userFavCities.forEach((element: string) => {
            dataToInsert.push(element);
          });
        dataToInsert.push(cityName);
        await setDoc(doc(db, "UsersData", userId), {
          favCities: dataToInsert,
        });
        dispatch(setNumberOfFavUsersCities(numberOfFavUsersCities + 1));
        dispatch(setUserFavCities(dataToInsert));
        showNotification({
          icon: <i className="fa-solid fa-check"></i>,
          color: "green",
          title: `City "${cityName}" has been added to your list `,
          message: "City correctly deleted from your list",
        });
      } else
        return showNotification({
          icon: <i className="fa-solid fa-info"></i>,
          color: "cyan",
          title: `City "${cityName}" is already on Favourite List`,
          message: "Check your list!",
        });
    }
  };

  const pushFavListOrderToFirebase = async (userId: string) => {
    if (userId) {
      let dataToInsert: Array<string> = [];
      userFavCities.forEach((element: string) => {
        dataToInsert.push(element);
      });
      await setDoc(doc(db, "UsersData", userId), {
        favCities: dataToInsert,
      });
    }
  };

  const handleMobileMenu = () => {
    if (!isDesktop) dispatch(toggleMobileMenu());
  };

  useEffect(() => {
    if (userId && location.pathname === "/") {
      props.saveFavUsersCitiesInStore(userId);
    }
  }, [userId]);

  // useEffect(() => {
  //   if (userId && location.pathname === "/mycities") {
  //     //favRefreshInterval = window.setInterval(refreshWeatherData, 10000);
  //   }
  //   return () => {
  //     clearInterval(favRefreshInterval);
  //   };
  // });

  // useEffect(() => {
  //   if (userId && location.pathname === "/mycities") {
  //     props.getFavCitiesWeatherByUserId(userId);
  //   }
  // }, [userId]);

  // useEffect(() => {
  //   if (location.pathname !== "/mycities") clearInterval(favRefreshInterval);
  // }, [location.pathname]);

  // const refreshWeatherData = () => {
  //   dispatch(clearWeatherData());
  //   dispatch(() => props.getFavCitiesWeatherByUserId(userId));
  // };

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
          pushFavListOrderToFirebase={() => pushFavListOrderToFirebase(userId)}
          numberOfCitiesStored={numberOfCitiesStored}
          isWeatherDataFetched={isWeatherDataFetched}
          fetchFavCities={() => props.saveFavUsersCitiesInStore(userId)}
        />
      );
    }
  };
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          width: "100%",
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Transition
          mounted={isDesktop ? true : isMenuOpen}
          transition="fade"
          duration={150}
        >
          {(styles) => (
            <Navbar
              style={styles}
              p="md"
              hiddenBreakpoint="sm"
              hidden={!isMenuOpen}
              width={{ sm: 200, lg: 300 }}
            >
              <Navbar.Section>
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
              <Space h={50} />
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
          element={
            <Group position={isDesktop ? "left" : "center"}>
              {renderMainContent()}
            </Group>
          }
        />
        <Route
          path="/"
          element={<Homepage addFavCity={addFavCityToFirebase} />}
        />
      </Routes>
    </AppShell>
  );
}
