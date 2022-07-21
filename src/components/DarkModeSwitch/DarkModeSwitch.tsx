import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';
import { toggleDarkMode } from './DarkModeSwitchSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';


const DarkModeSwitch = () => {
  const dark = useSelector((state: RootState) => state.DarkModeSwitch.value);
  const dispatch = useDispatch();

    return (
      <ActionIcon
        variant="outline"
        color={dark === 'dark' ? 'yellow' : 'blue'}
        onClick={() => dispatch(toggleDarkMode())}
        title="Toggle color scheme"
      >
        {dark === 'dark'? <Sun size={18} /> : <MoonStars size={18} />}
      </ActionIcon>
    );
  }

  export default DarkModeSwitch;