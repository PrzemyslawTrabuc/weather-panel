import React, { useState } from "react";
import {
  Card,
  Text,
  Button,
  Group,
  Badge,
  LoadingOverlay,
  Transition,
  Space,
  Title,
} from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { showNotification } from "@mantine/notifications";
import { Windsock, Cloud, DropletFilled2 } from "tabler-icons-react";

import WeatherIcon from "./WeatherIcon";
import {
  moveItemLeftInArray,
  moveItemRightInArray,
  deleteCityFromCities,
} from "../WeatherData/WeatherDataSlice";
import {
  moveFavCityLeftInArray,
  moveFavCityRightInArray,
} from "../UserData/UserDataSlice";
import {
  deleteUserFavCity,
  setNumberOfFavUsersCities,
} from "../UserData/UserDataSlice";
import metersPerSecToKilometersPerH from "../../utils/metersPerSecToKilometersPerH";

const WeatherCardStyle: React.CSSProperties = {
  maxWidth: "400px",
};

const WeatherCardTextStyle: React.CSSProperties = {
  fontSize: "1.5rem",
};

const WeatherCard = (props: any) => {
  const isDesktop = useSelector(
    (state: RootState) => state.MobileMenuSwitch.isDesktop
  );
  const isWeatherDataFetched: boolean = useSelector(
    (state: RootState) => state.WeatherData.isFetched
  );
  const numberOfFavUsersCities = useSelector(
    (state: RootState) => state.UserData.numberOfFavUsersCities
  );
  const userFavCities = useSelector(
    (state: RootState) => state.UserData.userFavCities
  );
  const dispatch = useDispatch();

  const [animate, setAnimate] = useState(true);

  const deleteFavCityFromStore = (cityId: number) => {
    dispatch(setNumberOfFavUsersCities(numberOfFavUsersCities - 1));
  };
  const deleteFavCityFromFirebase = (cityId: number) => {
    setAnimate(false);
    setTimeout(() => dispatch(deleteUserFavCity(cityId)), 300);
    setTimeout(() => setAnimate(true), 300);
    setTimeout(() => dispatch(deleteCityFromCities(cityId)), 300);
    setTimeout(() => deleteFavCityFromStore(cityId), 300);
    props.toggleTest();

    showNotification({
      icon: <i className="fa-solid fa-trash-can"></i>,
      color: "red",
      title: `City "${userFavCities[cityId]}" has been deleted from you list `,
      message: "City correctly deleted from your list",
    });
  };
  const handleMoveCardLeft = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 300);
    setTimeout(
      () =>
        dispatch(
          moveFavCityLeftInArray({
            cityIndexInArrayToChange: props.cityNumber,
            cityWeatherToUseAsTemp: props.weatherData,
            cityForecastToUseAsTemp: props.forecastData,
          })
        ),
      300
    );
    setTimeout(
      () =>
        dispatch(
          moveItemLeftInArray({
            cityIndexInArrayToChange: props.cityNumber,
            cityWeatherToUseAsTemp: props.weatherData,
            cityForecastToUseAsTemp: props.forecastData,
          })
        ),
      300
    );
    props.toggleTest();
  };

  const handleMoveCardRight = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 300);
    setTimeout(
      () =>
        dispatch(
          moveFavCityRightInArray({
            cityIndexInArrayToChange: props.cityNumber,
            cityWeatherToUseAsTemp: props.weatherData,
            cityForecastToUseAsTemp: props.forecastData,
          })
        ),
      300
    );
    setTimeout(
      () =>
        dispatch(
          moveItemRightInArray({
            cityIndexInArrayToChange: props.cityNumber,
            cityWeatherToUseAsTemp: props.weatherData,
            cityForecastToUseAsTemp: props.forecastData,
          })
        ),
      300
    );
    props.toggleTest();
  };

  const renderCard = () => {
    console.log(props.weatherData.name + "card");
    return (
      <Transition
        mounted={animate}
        transition="fade"
        duration={300}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <Card
              className="weatherCard"
              shadow="sm"
              p="lg"
              style={{ width: !isDesktop ? "90vw" : "385px" }}
            >
              <LoadingOverlay visible={!isWeatherDataFetched} />
              <Card.Section>
                <Group position="left" spacing="xs">
                  <WeatherIcon iconId={props.weatherData.weather[0].icon} />
                  <Text
                    style={WeatherCardTextStyle}
                    sx={
                      isDesktop
                        ? { paddingLeft: "0px" }
                        : { paddingLeft: "20px" }
                    }
                    weight={700}
                  >
                    {props.weatherData.main.temp} °C
                  </Text>
                </Group>
              </Card.Section>
              <Group position="apart" style={{ marginBottom: 5 }}>
                <Title order={2}>{props.weatherData.name}</Title>
                {props.highestTemperature === props.weatherData.main.temp &&
                numberOfFavUsersCities > 2 ? (
                  <Badge size="lg" color="orange" variant="filled">
                    Hottest
                  </Badge>
                ) : null}
                {props.lowestTemperature === props.weatherData.main.temp &&
                numberOfFavUsersCities > 2 ? (
                  <Badge size="lg" color="cyan" variant="filled">
                    Coldest
                  </Badge>
                ) : null}
              </Group>
              <Space h="md" />
              <Group spacing="sm" grow>
                <div>
                  <Cloud size={30} />
                  <Title order={4}>{props.weatherData.clouds.all} %</Title>
                </div>
                <div>
                  <Windsock size={30} />
                  <Title order={4}>
                    {metersPerSecToKilometersPerH(
                      props.weatherData.wind.speed
                    ).toFixed(2)}{" "}
                    km/h
                  </Title>
                </div>
                <div>
                  <DropletFilled2 size={30} />
                  <Title order={4}>{props.weatherData.main.humidity} %</Title>
                </div>
              </Group>
              <Button
                onClick={() => props.handleDetailsClick(props.cityNumber)}
                variant="light"
                color="blue"
                fullWidth
                style={{ marginTop: 14 }}
              >
                Details
              </Button>
              <Group spacing="xs" grow>
                <Button
                  onClick={handleMoveCardLeft}
                  variant="light"
                  color="blue"
                  fullWidth
                  style={{ marginTop: 14 }}
                >
                  {isDesktop ? (
                    <i className="fa-solid fa-arrow-left"></i>
                  ) : (
                    <i className="fa-solid fa-arrow-up"></i>
                  )}
                </Button>
                <Button
                  onClick={handleMoveCardRight}
                  variant="light"
                  color="blue"
                  fullWidth
                  style={{ marginTop: 14 }}
                >
                  {isDesktop ? (
                    <i className="fa-solid fa-arrow-right"></i>
                  ) : (
                    <i className="fa-solid fa-arrow-down"></i>
                  )}
                </Button>
              </Group>
              <Space h="sm" />
              <Text align="right">
                <Button
                  color="red"
                  size="md"
                  compact
                  onClick={() => deleteFavCityFromFirebase(props.cityNumber)}
                >
                  <i className="fa-md fa-solid fa-trash-can"></i>
                </Button>
              </Text>
            </Card>
          </div>
        )}
      </Transition>
    );
  };

  return <>{renderCard()}</>;
};

export default WeatherCard;
