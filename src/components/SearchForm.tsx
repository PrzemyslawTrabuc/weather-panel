import React, {HtmlHTMLAttributes, useState, useRef} from 'react';
import { TextInput, Button, Group, Container } from '@mantine/core';
import type { RootState, AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherForHomePage, fetchForecastForHomePage, setCityOnHomePage } from './WeatherData/HomePageWeatherSlice';
import { showNotification } from '@mantine/notifications';

const SearchForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("Londyn");
  const error = useSelector((state: RootState) => state.HomePageWeather.error);
  const test = useRef(true);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    //TODO: Add debounce
  };
  const onSubmit = (cityName: string, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchWeatherForHomePage(cityName));
    dispatch(fetchForecastForHomePage(cityName));
    test.current=true;
  };

  const renderAlert = ()=>{
    if(test.current === true && error !== "no error")
    showNotification({
      color: "red",
      title: `City: "${searchValue}" not found`,
      message: 'Try another city or check spelling',
    })
    test.current = false;
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
      {renderAlert()}
      </>
  );
};

export default SearchForm;