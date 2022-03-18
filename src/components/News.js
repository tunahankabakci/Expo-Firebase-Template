import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Text, Card, Button, Overlay, Icon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../core/theme";
import firebase from "firebase/compat/app";
import * as Animatable from "react-native-animatable";

export default function News({ title, desc, createdAt, ...props }) {
  if (title.length > 25) {
    title = title.substring(0, 25) + "...";
  }
  if (desc.length > 75) {
    desc = desc.substring(0, 75) + "...";
  }

  var dateObject = new Date(createdAt * 1000);
  var date = dateObject.toLocaleDateString("fr-FR");
  var time = dateObject.toLocaleTimeString("fr-FR");

  return (
    <Animatable.View animation='slideInLeft'>
      <TouchableOpacity style={styles.container} {...props}>
      <LinearGradient
        colors={["#F0E9D2", "#FFF8F3"]}
        start={[0.5, 1]}
        end={[0.5, 0]}
        style={{ width: "100%", borderRadius: 15 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.subCardView}>
            <Image
              source={require("../assets/logo2.png")}
              resizeMode="contain"
              style={{
                borderRadius: 25,
                height: 60,
                width: 60,
              }}
            />
          </View>
          <View style={{ marginLeft: 12, alignItems: "flex-start" }}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: "black",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {title}
              </Text>
            </View>
            <View
              style={{
                width: "90%",
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  color: "grey",
                  fontSize: 12,
                  textAlign: "left",
                  flex: 1,
                  flexWrap: "wrap",
                }}
              >
                {desc}
              </Text>
            </View>
            <View
              style={{ marginBottom: -10, margin: 10, alignSelf: "flex-end" }}
            >
              <Text style={{ color: "grey", fontSize: 10 }}>
                {date + "    " + time}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 120,
    width: 50,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
  },
});
