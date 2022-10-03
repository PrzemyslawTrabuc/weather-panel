import React, { useState, useEffect } from "react";
import { TextInput, Button, Group, Container } from "@mantine/core";
import type { RootState, AppDispatch } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchWeatherForHomePage,
  fetchForecastForHomePage,
} from "../WeatherData/HomePageWeatherSlice";
import { showNotification } from "@mantine/notifications";
import { Search } from "tabler-icons-react";

const SearchForm = (props: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("Londyn");
  const error = useSelector((state: RootState) => state.HomePageWeather.error);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    renderAlert();
  }, [error]);

  const onSubmit = (
    cityName: string,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (searchValue.toLowerCase() !== props.cityOnHomePage.toLowerCase()) {
      dispatch(fetchWeatherForHomePage(cityName));
      dispatch(fetchForecastForHomePage(cityName));
    } else {
      setSearchValue(props.cityOnHomePage);
    }
  };

  const renderAlert = () => {
    if (error !== "no error" && searchValue !== "Londyn") {
      showNotification({
        color: "red",
        title: `City: "${searchValue}" not found`,
        message: "Try another city or check spelling",
      });
    }
  };

  return (
    <>
      <Container size="lg" px="xl">
        {/* <form onSubmit={(event) => onSubmit(searchValue, event)}> */}
        <form onSubmit={(event) => onSubmit(searchValue, event)}>
          <Group position="center" grow>
            <TextInput
              placeholder="Enter city name"
              size="lg"
              required
              onChange={(event) => onChange(event)}
              sx={{ minWidth: "100%" }}
            />
            <Button
              size="md"
              sx={{ marginLeft: "-70px", maxWidth: "50px", padding: 0 }}
              type="submit"
            >
              <Search size={32}></Search>
            </Button>
          </Group>
        </form>
      </Container>
    </>
  );
};

export default SearchForm;
