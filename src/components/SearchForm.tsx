import React, {useState, useEffect} from 'react';
import { TextInput, Button, Group, Container } from '@mantine/core';
import type { RootState, AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherForHomePage, fetchForecastForHomePage } from './WeatherData/HomePageWeatherSlice';
import { showNotification } from '@mantine/notifications';

const SearchForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("Londyn");
  const error = useSelector((state: RootState) => state.HomePageWeather.error);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);  
  };

  useEffect(() =>{
    renderAlert();
  },[error])

  const onSubmit = (cityName: string, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchWeatherForHomePage(cityName));
    dispatch(fetchForecastForHomePage(cityName));
  };

  const renderAlert = () =>{
    if(error !== "no error" && searchValue !== "Londyn"){
    showNotification({
      color: "red",
      title: `City: "${searchValue}" not found`,
      message: 'Try another city or check spelling',
    });
  }
  };

  return (
    <>
      <Container size="lg" px="xl">
        <form onSubmit={(event) => onSubmit(searchValue,event)}>
          <Group position="center">
            <TextInput
              placeholder="Enter city name"
              required
              onChange={(event) => onChange(event)}
            />
            <Button type="submit">Search</Button>
          </Group>
        </form>
      </Container>
      </>
  );
};

export default SearchForm;