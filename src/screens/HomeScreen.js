import { StyleSheet } from "react-native";
import React from "react";
import Button from "../components/Button";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Background from "../components/Background";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <Background>
      <Logo/>
      <Header>Welcome to Electus !</Header>
      <Button mode="outlined" onPress={() => navigation.navigate("Login")}>
        Login
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate("Register")}>
        Sign Up
      </Button>
    </Background>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
