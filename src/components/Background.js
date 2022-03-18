import React from "react";
import { StyleSheet, KeyboardAvoidingView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../core/theme";

export default function Background({ children }) {
  return (
    <LinearGradient
      colors={[theme.colors.bg_primary,theme.colors.bg_secondary]}
      start={[0.5, 1]}
      end={[0.5, 0]}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {children}
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
