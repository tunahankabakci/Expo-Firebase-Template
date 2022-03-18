import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Background from "../components/Background";
import MainButton from "../components/MainButton";
import { theme } from "../core/theme";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import AlchemyScreen from "./AlchemyScreen";
import GiveawaysScreen from "./GiveawaysScreen";
import NewsScreen from "./NewsScreen";
import RankScreen from "./RankScreen";

const MainScreen = () => {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();
  return (
    <Background>
      <View style={styles.row}>
        <View style={styles.container}>
          <MainButton
            onPress={() => navigation.navigate("News")}
            title="News"
            icon={
              <Icon
                name="newspaper-variant-outline"
                type="material-community"
                color="#fff"
                iconStyle={{ fontSize: 45 }}
              />
            }
          ></MainButton>
        </View>
        <View style={styles.container}>
          <MainButton
            onPress={() => navigation.navigate("Alerts")}
            title="Alerts"
            icon={
              <Icon
                name="bell-ring"
                type="material-community"
                color="#fff"
                iconStyle={{ fontSize: 45 }}
              />
            }
          ></MainButton>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.container}>
          <MainButton
            onPress={() => navigation.navigate("News")}
            title="News"
            icon={
              <Icon
                name="newspaper-variant-outline"
                type="material-community"
                color="#fff"
                iconStyle={{ fontSize: 45 }}
              />
            }
          ></MainButton>
        </View>
        <View style={styles.container}>
          <MainButton
            onPress={() => navigation.navigate("Alchemy")}
            title="Alchemy"
            icon={
              <Icon
                name="lab-flask"
                type="entypo"
                color="#fff"
                iconStyle={{ fontSize: 45 }}
              />
            }
          ></MainButton>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.container}>
          <MainButton
            onPress={() => navigation.navigate("Alchemy")}
            title="Alchemy"
            icon={
              <Icon
                name="lab-flask"
                type="entypo"
                color="#fff"
                iconStyle={{ fontSize: 45 }}
              />
            }
          ></MainButton>
        </View>
        <View style={styles.container}>
          <MainButton
            onPress={() => navigation.navigate("Rank")}
            title="Rank"
            icon={
              <Icon
                name="trophy"
                type="font-awesome"
                color="#fff"
                iconStyle={{ fontSize: 45 }}
              />
            }
          ></MainButton>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.container}>
          <MainButton
            onPress={() => navigation.navigate("Giveaways")}
            title="Giveaways"
            icon={
              <Icon
                name="gift"
                type="material-community"
                color="#fff"
                iconStyle={{ fontSize: 45 }}
              />
            }
          ></MainButton>
        </View>
        <View style={styles.container}>
          <MainButton
            onPress={() => navigation.navigate("Profile")}
            title="Profile"
            icon={
              <Icon
                name="user"
                type="font-awesome"
                color="#fff"
                iconStyle={{ fontSize: 45 }}
              />
            }
          ></MainButton>
        </View>
      </View>
    </Background>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  container: {
    width: 180,
    alignSelf: "center",
  },
});
