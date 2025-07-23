// components/Texto.tsx
import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

export default function Texto(props: TextProps) {
  return <Text style={[styles.textoPadrao, props.style]} {...props} />;
}

const styles = StyleSheet.create({
  textoPadrao: {
    fontFamily: "Poppins",
  },
});
