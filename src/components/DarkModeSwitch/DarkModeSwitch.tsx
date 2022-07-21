import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';
import { toggleDarkMode } from './DarkModeSwitchSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';


const DarkModeSwitch = () => {
  const isDarkModeOn = useSelector((state: RootState) => state.DarkModeSwitch.isDarkModeOn);
  const dispatch = useDispatch();

    return (
      <ActionIcon
        variant="outline"
        color={isDarkModeOn === true ? 'yellow' : 'blue'}
        onClick={() => dispatch(toggleDarkMode())}
        title="Toggle color scheme"
        size="md"
      >
        {isDarkModeOn === true ? <Sun size={18} /> : <MoonStars size={18} />}
      </ActionIcon>
    );
  }

  export default DarkModeSwitch;