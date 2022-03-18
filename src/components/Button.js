import React from "react";
import { StyleSheet } from "react-native";
import { theme } from "../core/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Button as ElementButton } from "react-native-elements";

export default function Button({ buttonStyle, title, ...props }) {
  return (
    <ElementButton
      ViewComponent={LinearGradient} // Don't forget this!
      linearGradientProps={{
        colors: [theme.colors.btn_primary, theme.colors.btn_secondary],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
      titleStyle={styles.text}
      style={styles.button}
      title={title}
      buttonStyle={[{
        borderRadius: 15,
        paddingVertical: 10,
        marginVertical: 25,
      }, buttonStyle]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
  text: {
    fontWeight: "700",
    fontSize: 17,
    color: theme.colors.buttonText,
  },
});
