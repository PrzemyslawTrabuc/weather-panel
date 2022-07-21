import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Center,
  Transition
} from '@mantine/core';
import { BrandGithub } from 'tabler-icons-react';
import type { RootState } from '../store/store';

import DarkModeSwitch from './DarkModeSwitch/DarkModeSwitch';
import { useSelector } from 'react-redux';
import MobileMenuSwitch from './MobileMenu/MobileMenuSwitch'


export default function AppContainer() {
  const theme = useMantineTheme();
  const isMenuOpen = useSelector((state: RootState) => state.MobileMenuSwitch.value);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.light,
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Transition mounted={isMenuOpen} transition="fade" duration={400} timingFunction="ease">
          {(styles) => 
          <Navbar style={styles} p="md" hiddenBreakpoint="sm" hidden={!isMenuOpen} width={{ sm: 200, lg: 300 }}>
            <Text>Test</Text>
          </Navbar>
      }
        </Transition>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%'}}>         
              <MobileMenuSwitch />
            <Text>WeatherPanel</Text>
              <DarkModeSwitch></DarkModeSwitch>
          </div>
        </Header>
      }
      footer={
        <Footer height={60} p="md">
          <Center>
            <Text component='a' href="https://github.com/PrzemyslawTrabuc/weather-panel"><BrandGithub /> Przemysław Trabuć </Text>
          </Center>
        </Footer>
      }
    >
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  );
}