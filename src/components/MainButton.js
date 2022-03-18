import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../core/theme";

export default function MainButton({ onPress, title, icon, style }) {
  const [isDisabled, setDisabled] = useState(false);
  const handlePress = () => {
    setDisabled(true);
    setTimeout(() => setDisabled(false), 3000);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["#00DAFC", "#0088E5"]}
        start={[0, 1]}
        end={[0.5, 0]}
        style={styles.buttonContainer}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{icon}</Text>
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 40,
    margin: 15,
  },
  buttonText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    paddingVertical:5
  },
  iconText: {
    fontSize: 35,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  iconContainer:{
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
