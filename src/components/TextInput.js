import React from "react";
import { View, StyleSheet, TextInput as Input, Text } from "react-native";
import { theme } from "../core/theme";

export default function TextInput({ leftIcon, rightIcon, errorMsg, ...props }) {
  return (
    <View style={[styles.container]}>
      <View style={styles.action}>
        {leftIcon}
        <Input {...props} />
        {rightIcon}
      </View>
      {errorMsg}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 5,
  },
  action: {
    flexDirection: "row",
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
});
