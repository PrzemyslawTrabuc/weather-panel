import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
  useMantineTheme,
} from "@mantine/core";
import { DropletFilled2, Windsock, Cloud, CloudRain } from "tabler-icons-react";

import WeatherIcon from "../Weather/WeatherIcon";
import metersPerSecToKilometersPerH from "../../utils/metersPerSecToKilometersPerH";

const ForecastCards = (props: any) => {
  const isModalOpen = useSelector((state: RootState) => state.Modal.isOpen);
  const isDarkModeOn = useSelector(
    (state: RootState) => state.DarkModeSwitch.isDarkModeOn
  );
  const theme = useMantineTheme();
  const scrollDivRef = useRef<any>();
  const forecastScrollListPosition = useRef({ left: 0, x: 0 });
  const [numberOfCards, setNumberfCards] = useState<number>(10);

  const handleScroll = () => {
    if (
      scrollDivRef.current.scrollWidth - scrollDivRef.current.offsetWidth <
        scrollDivRef.current.scrollLeft + 10 &&
      numberOfCards < 40
    ) {
      setNumberfCards(numberOfCards + 10);
    }
  };

  const mouseDownHandler = (e: React.MouseEvent) => {
    if (scrollDivRef.current) {
      forecastScrollListPosition.current = {
        left: scrollDivRef.current.scrollLeft,
        x: e.clientX,
      };
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
      scrollDivRef.current.style.cursor = "grabbing";
    }
  };

  const mouseMoveHandler = function (e: MouseEvent) {
    // How far the mouse has been moved
    const dx = e.clientX - forecastScrollListPosition.current.x;

    if (scrollDivRef.current)
      scrollDivRef.current.scrollLeft =
        forecastScrollListPosition.current.left - dx;
  };
  const mouseUpHandler = function () {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
    if (scrollDivRef.current) scrollDivRef.current.style.cursor = "grab";
  };

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
        <Card
          style={{
            minWidth: 200,
            backgroundColor:
              isModalOpen && !isDarkModeOn ? theme.colors.gray[0] : "",
          }}
        >
          <Center>
            <Stack>
              <Title align="center" order={4} color="#8c8c8c">
                {item.dt_txt.substring(5, 16)}
              </Title>
              <Center>
                <WeatherIcon iconId={item.weather[0].icon} />
                <Title align="center" order={2}>
                  {item.main.temp} °C
                </Title>
              </Center>
              <Group spacing="sm" grow>
                <CloudRain
                  size={30}
                  color={
                    isDarkModeOn ? theme.colors.cyan[8] : theme.colors.cyan[6]
                  }
                />
                <Title color="cyan" order={4}>
                  {Math.round(item.pop * 100)} %
                </Title>
                <Cloud size={25} />
                <Title order={5}>{item.clouds.all} %</Title>
              </Group>
              <Group>
                <Windsock size={25} />
                <Title order={5}>
                  {metersPerSecToKilometersPerH(item.wind.speed).toFixed(2)}{" "}
                  km/h
                </Title>
                <DropletFilled2 size={25} />
                <Title order={5}>{item.main.humidity} %</Title>
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
        <List
          style={{
            whiteSpace: "nowrap",
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
            cursor: "grab",
          }}
        >
          <Center>
            <ScrollArea
              viewportRef={scrollDivRef}
              offsetScrollbars
              style={{ height: 300 }}
              onScrollPositionChange={handleScroll}
            >
              <div onMouseDown={mouseDownHandler}>
                {buildDaysForecastList(numberOfCards)}
              </div>
            </ScrollArea>
          </Center>
        </List>
      </>
    );
  else return <>Forecast</>;
};

export default ForecastCards;
