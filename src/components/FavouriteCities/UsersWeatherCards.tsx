import React, { useMemo, useEffect, useRef, useCallback } from "react";
import WeatherCard from "../Weather/WeatherCard";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import {
  Loader,
  Center,
  Modal,
  Text,
  Title,
  Button,
  Stack,
  Space,
} from "@mantine/core";
import { toggleModal, hideModal } from "../Modal/ModalSlice";
import { selectCityFromUsersList } from "../UserData/UserDataSlice";
import {
  fetchWeatherThunk,
  fetchForecastThunk,
  setHighestTemperature,
  setLowestTemperature,
} from "../WeatherData/WeatherDataSlice";

import WeatherOnHomePage from "../Homepage/WeatherOnHomePage";
import ForecastOnHomepage from "../Weather/ForecastCards";

const UsersWeatherCards = (props: any) => {
  const dispatch: AppDispatch = useDispatch();
  const numberOfFavUsersCities = useSelector(
    (state: RootState) => state.UserData.numberOfFavUsersCities
  );
  const isOpenModal = useSelector((state: RootState) => state.Modal.isOpen);
  const numberOfselectedCity = useSelector(
    (state: RootState) => state.UserData.citySelectedByUserOnHisList
  );
  const weatherData = useSelector(
    (state: RootState) => state.WeatherData.weather.gatheredData
  );
  const forecastData = useSelector(
    (state: RootState) => state.WeatherData.forecast.gatheredData
  );
  const highestTemperature = useSelector(
    (state: RootState) => state.WeatherData.highestTemperature
  );
  const lowestTemperature = useSelector(
    (state: RootState) => state.WeatherData.lowestTemperature
  );
  const userFavCities = useSelector(
    (state: RootState) => state.UserData.userFavCities
  );
  const userId = useSelector((state: RootState) => state.GoogleAuth.userId);
  const test = useRef(false);
  const test2 = useRef(false);

  const handleDetailsClick = (cityNumber: number) => {
    dispatch(selectCityFromUsersList(cityNumber));
    dispatch(toggleModal());
  };

  const toggleTest = () => {
    test.current = true;
  };

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const getHottestCity = () => {
    let highestTemperature: number = -9999;
    for (const item of weatherData) {
      if (highestTemperature < item.main.temp)
        highestTemperature = item.main.temp;
    }
    dispatch(setHighestTemperature(highestTemperature));
  };
  const getColdestCity = () => {
    let lowestTemperature: number = 9999;
    for (const item of weatherData) {
      if (lowestTemperature > item.main.temp)
        lowestTemperature = item.main.temp;
    }
    dispatch(setLowestTemperature(lowestTemperature));
  };

  useEffect(() => {
    if (userId) {
      if (test.current === true) props.pushFavListOrderToFirebase(userId);
    }
  }, [weatherData]);

  const handleFetchFavCitiesAndWeatherData = async () => {
    if (userFavCities.length < 1) {
      props.fetchFavCities();
    }
    if (userId && userFavCities.length >= 1 && test2.current === false) {
      dispatch(fetchWeatherThunk(userFavCities));
      dispatch(fetchForecastThunk(userFavCities));
      test2.current = true;
    }
  };

  useEffect(() => {
    handleFetchFavCitiesAndWeatherData();
  }, [location.pathname, userFavCities]);

  useEffect(() => {
    getHottestCity();
    getColdestCity();
  }, [weatherData]);

  const buildWeatherCardsList = () => {
    let counter: number = 0;
    if (props.isWeatherDataFetched) {
      const items: any[] = [];
      while (counter < weatherData.length) {
        items.push(
          <WeatherCard
            key={counter}
            cityNumber={counter}
            weatherData={weatherData[counter]}
            forecastData={forecastData[counter]}
            handleDetailsClick={handleDetailsClick}
            pushFavListOrderToFirebase={() =>
              props.pushFavListOrderToFirebase(userId)
            }
            toggleTest={toggleTest}
            highestTemperature={highestTemperature}
            lowestTemperature={lowestTemperature}
          ></WeatherCard>
        );
        counter++;
      }
      return items;
    }
    if (props.isWeatherDataFetched === false) {
      const items: any[] = [];
      while (counter <= weatherData.length) {
        items.push(
          <WeatherCard
            key={counter}
            forecastData={forecastData[0]}
            weatherData={weatherData[0]}
            cityNumber={counter}
          ></WeatherCard>
        );
        counter++;
      }
      return items;
    }
  };

  const renderWeatherCards = () => {
    if (props.isWeatherDataFetched && numberOfFavUsersCities > 0)
      return <>{buildWeatherCardsList()}</>;
    if (props.isWeatherDataFetched === false && numberOfFavUsersCities > 0)
      return (
        <Center>
          <Loader size="xl"></Loader>
        </Center>
      );
    if (numberOfFavUsersCities === 0) {
      return (
        <Center>
          <Text>Add Some Cities</Text>
        </Center>
      );
    }
  };

  const MemoizedCards = useMemo(() => {
    return renderWeatherCards();
  }, [weatherData, forecastData, numberOfFavUsersCities, highestTemperature]);

  return (
    <>
      {MemoizedCards}
      {weatherData && weatherData[numberOfselectedCity] ? (
        <Modal
          opened={isOpenModal}
          onClose={handleCloseModal}
          overlayOpacity={0.1}
          overlayBlur={3}
          size="100%"
          closeButtonLabel="Close"
        >
          <Stack>
            <Title order={3} align="center">
              {weatherData[numberOfselectedCity].name} - details
            </Title>
            <WeatherOnHomePage
              weatherData={weatherData[numberOfselectedCity]}
            />
            <ForecastOnHomepage
              forecastData={forecastData[numberOfselectedCity]}
            />
            <Space h="xs" />
            <Button onClick={handleCloseModal}>Close</Button>
          </Stack>
        </Modal>
      ) : null}
    </>
  );
};

export default UsersWeatherCards;
