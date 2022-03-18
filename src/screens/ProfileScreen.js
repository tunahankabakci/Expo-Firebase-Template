import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Background from "../components/Background";
import Firebase from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const auth = Firebase.auth();
  const onSignOutPressed = () => {
    auth
      .signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorCode + "\n" + errorMessage);
      });
  };
  return (
    <Background>
      <View style = {{with:"80%"}}>
      <Button title={"Sign Out"} onPress={onSignOutPressed} />
      </View>
    </Background>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
