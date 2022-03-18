import { StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import Root from "./src/components/Root";



import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

const Stack = createStackNavigator();

export default function App() {
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
            cardStyleInterpolator: forFade,
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
            cardStyleInterpolator: forFade,
          }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Register"
          options={{
            headerShown: false,
            cardStyleInterpolator: forFade,
          }}
          component={RegisterScreen}
        />
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
