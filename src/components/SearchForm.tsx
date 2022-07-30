import React, {HtmlHTMLAttributes, useState} from 'react';
import { TextInput, Button, Group, Container } from '@mantine/core';
import type { RootState, AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherForHomePage, fetchForecastForHomePage, setCityOnHomePage } from './WeatherData/HomePageWeatherSlice';

const SearchForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("Londyn");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    //TODO: Add debounce
  };
  const onSubmit = (cityName: string, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.cookie = `cityOnHomePage=${cityName}`;
    dispatch(fetchWeatherForHomePage(cityName));
    dispatch(fetchForecastForHomePage(cityName));
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