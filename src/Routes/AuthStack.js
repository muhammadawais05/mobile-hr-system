import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import InitialStack from "./InitialStack";
import MainScreen from "../screens/MainScreen";
import ApplyLeave from "../screens/ApplyLeave";
import ApplyExtraWorkingDay from "../screens/ApplyExtraWorkingDay";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={InitialStack}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="ApplyLeave" component={ApplyLeave} />
      <Stack.Screen
        name="ApplyExtraWorkingDay"
        component={ApplyExtraWorkingDay}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
