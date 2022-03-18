import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { theme } from "../core/theme";
import { colors, Icon } from "react-native-elements";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Firebase from "../../firebase";
import { useNavigation } from "@react-navigation/native";



const CustomDrawer = (props) => {
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
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <ImageBackground
          source={require("../assets/bg.jpg")}
          style={{ padding: 15 }}
        >
          <Image
            source={require("../assets/test1.jpg")}
            style={{ height: 75, width: 75, borderRadius: 40, opacity: 1 }}
          />
          <Text style={styles.username}>{auth.currentUser.email}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.ep}>10</Text>
            <Icon
              name="coins"
              type="font-awesome-5"
              color="#fff"
              iconStyle={{ fontSize: 13, margin: 4, marginLeft: 8 }}
            />
          </View>
        </ImageBackground>

        <View style={{ backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderTopWidth: 2,
          borderTopColor: "#ccc",
        }}
      >
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="share-2"
              type="feather"
              iconStyle={{
                fontSize: 20,
                marginHorizontal: 10,
                color: "dimgray",
              }}
            />
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "dimgray" }}
            >
              Social
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSignOutPressed}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="log-out"
              type="feather"
              iconStyle={{
                fontSize: 20,
                marginHorizontal: 10,
                color: "dimgray",
              }}
            />
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "dimgray" }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    backgroundColor: theme.colors.bg_tertiary,
  },
  username: {
    color: theme.colors.buttonText,
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
  },
  ep: {
    color: theme.colors.buttonText,
    fontSize: 13,
    fontStyle: "italic",
  },
});

export default CustomDrawer;
