import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import {
  Group,
  ScrollArea,
  Card,
  List,
  Center,
  Stack,
  Title,
  useMantineTheme
} from "@mantine/core";
import { DropletFilled2, Windsock, Cloud, CloudRain } from "tabler-icons-react";

import WeatherIcon from "../Weather/WeatherIcon";
import metersPerSecToKilometersPerH from "../../utils/metersPerSecToKilometersPerH";

const ForecastCards = (props: any) => {
    const isModalOpen = useSelector((state: RootState) => state.Modal.isOpen);
    const isDarkModeOn = useSelector((state: RootState) => state.DarkModeSwitch.isDarkModeOn);
    const theme = useMantineTheme();

  const buildDaysForecastList = (numberOfCards: number) => {
    const reducedForecast = props.forecastData.list.slice(0, numberOfCards);
    const listToRender = reducedForecast.map((item: any) => (
      <List.Item
        key={item.dt}
        style={{
          maxWidth: "260px",
          height: "auto",
          display: "inline-block",
          margin: 8,
        }}
      >
        <Card style={{minWidth:200, backgroundColor: isModalOpen && !isDarkModeOn  ? theme.colors.gray[0] : "" }}>
          <Center>
            <Stack>
              <Title align="center" size="h4">
                <i>{item.dt_txt.substring(5,16)}</i>
              </Title>
              <Center>
                <WeatherIcon iconId={item.weather[0].icon} />
                <Title align="center" size="h2">
                  {item.main.temp} °C
                </Title>
              </Center>
              <Group spacing="sm">
                <CloudRain />
                <Title size="h4">{Math.round(item.pop * 100)} %</Title>
                <Cloud size={25} />
                <Title size="h4">
                    {item.clouds.all} %
                </Title>
              </Group>
                <Group>
                    <Windsock size={25} />
                    <Title size="h4">
                        {metersPerSecToKilometersPerH(item.wind.speed).toFixed(2)}          
                    </Title>
                    <DropletFilled2 size={25} />
                    <Title size="h4">
                        {item.main.humidity} %                
                    </Title>
                </Group>
            </Stack>
          </Center>
        </Card>
      </List.Item>
    ));
    return listToRender;
  };

  if (Object.keys(props.forecastData).length > 0)
    return (
      <>
        <List style={{ whiteSpace: "nowrap"}}>
          <Center>
            <ScrollArea offsetScrollbars style={{ height: 300 }}>
              {buildDaysForecastList(40)}
            </ScrollArea>
          </Center>
        </List>
      </>
    );
  else return <>Forecast</>;
};

export default ForecastCards;
