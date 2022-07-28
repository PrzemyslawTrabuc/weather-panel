import { configureStore } from '@reduxjs/toolkit';
import DarkModeSwitchReducer from '../components/DarkModeSwitch/DarkModeSwitchSlice' 
import MobileMenuReducer from '../components/MobileMenu/MobileMenuSwitchSlice';
import GoogleAuthReducer from '../components/GoogleAuth/GoogleAuthSlice';
import WeatherDataReducer from '../components/WeatherData/WeatherDataSlice';
import ModalReducer from '../components/Modal/ModalSlice';
import UserDataReducer from '../components/UserData/UserDataSlice';
import HomePageWeatherReducer from '../components/WeatherData/HomePageWeatherSlice'


export const store = configureStore({
  reducer: {
    DarkModeSwitch: DarkModeSwitchReducer,
    MobileMenuSwitch: MobileMenuReducer,
    GoogleAuth: GoogleAuthReducer,
    WeatherData: WeatherDataReducer,
    Modal: ModalReducer,
    UserData: UserDataReducer,
    HomePageWeather: HomePageWeatherReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
