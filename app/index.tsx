import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { height } = Dimensions.get("window");

  // Valores animados para transição vertical (subir do fundo)
  const translateY1 = useSharedValue(height); // começa fora da tela
  const translateY2 = useSharedValue(height); // idem

  // Animação de entrada ao montar a tela
  useEffect(() => {
    translateY1.value = withDelay(
      300,
      withTiming(0, {
        duration: 1200,
        easing: Easing.out(Easing.exp),
      })
    );

    translateY2.value = withDelay(
      600,
      withTiming(0, {
        duration: 1200,
        easing: Easing.out(Easing.exp),
      })
    );
  }, []);

  // Estilos animados
  const circle1Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY1.value }],
    };
  });

  const circle2Style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY2.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontFamily: "Poppins" }}>Seja bem vindo</Text>
      <Image
        style={styles.imgLogo}
        source={require("../assets/images/logo.png")}
      />
      <Pressable style={styles.btnLogin} onPress={() => router.replace("/login")} >
        <Text style={{ fontSize: 25, fontFamily: "Poppins" }}>ENTRAR</Text>
      </Pressable>
      <Animated.View style={[styles.yellowCircle, circle1Style]} />
      <Animated.View style={[styles.yellowCircle2, circle2Style]} />
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  imgLogo: {
    width: 150,
    height: 150,
    marginBottom: 5,
    position: "absolute",
    top: height / 4,
  },
  yellowCircle: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 150,
    backgroundColor: "gold",
    bottom: height / 5 - 250,
    left: width / 1.5,
    opacity: 1,
  },
  yellowCircle2: {
    position: "absolute",
    width: 500,
    height: 500,
    borderRadius: 300,
    backgroundColor: "gold",
    bottom: height / 5 - 400,
    left: width / 2.5,
    opacity: 0.5,
  },
  btnLogin: {
    backgroundColor: "gold",
    width: 250,
    height: 35,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
