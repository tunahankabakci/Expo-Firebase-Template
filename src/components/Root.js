import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";
import ProfileScreen from "../screens/ProfileScreen";
import NewsScreen from "../screens/NewsScreen";
import AlchemyScreen from "../screens/AlchemyScreen";
import AlertsScreen from "../screens/AlertsScreen";
import GiveawaysScreen from "../screens/GiveawaysScreen";
import RankScreen from "../screens/RankScreen";
import { theme } from "../core/theme";
import { LinearGradient } from "expo-linear-gradient";
import LogoTitle from "./LogoTitle";

const Drawer = createDrawerNavigator();

export default function Root() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerLabelStyle: { marginLeft: -15, fontSize: 15, fontWeight: "700" },
        drawerActiveTintColor: theme.colors.btn_primary,
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          backgroundColor: "#ddd",
        },
      }}
    >
      <Drawer.Screen
        name="News"
        component={NewsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              name="newspaper-variant-outline"
              type="material-community"
              color={color}
              iconStyle={{ fontSize: 20 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              name="user"
              type="font-awesome-5"
              color={color}
              iconStyle={{ fontSize: 20 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Alerts"
        component={AlertsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              name="bell"
              type="font-awesome-5"
              regular
              color={color}
              iconStyle={{ fontSize: 20 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Leaderboard"
        component={RankScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              name="trophy-outline"
              type="material-community"
              color={color}
              iconStyle={{ fontSize: 20 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Alchemy"
        component={AlchemyScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              name="flask-plus-outline"
              type="material-community"
              color={color}
              iconStyle={{ fontSize: 20 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Giveaways"
        component={GiveawaysScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              name="gift"
              type="octicon"
              color={color}
              iconStyle={{ fontSize: 20 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Free Silk"
        component={GiveawaysScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              name="wallet-giftcard"
              type="material-community"
              color={color}
              iconStyle={{ fontSize: 20 }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});
