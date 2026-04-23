import AuthStack from "./src/Routes/AuthStack";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

const navTheme = DefaultTheme;
navTheme.colors.background = "yellow";

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <AuthStack />
    </NavigationContainer>
  );
}
