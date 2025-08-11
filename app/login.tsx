import { useNavigation, router } from "expo-router";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const circle1X = useSharedValue(-200);
  const circle2X = useSharedValue(width + 200);

  // animação inicial dos círculos
  useEffect(() => {
    circle1X.value = withDelay(
      300,
      withTiming(30, {
        duration: 1200,
        easing: Easing.out(Easing.exp),
      })
    );
    circle2X.value = withDelay(
      600,
      withTiming(width - 130, {
        duration: 1200,
        easing: Easing.out(Easing.exp),
      })
    );
  }, []);

  const circle1Style = useAnimatedStyle(() => ({
    transform: [{ translateX: circle1X.value }],
  }));

  const circle2Style = useAnimatedStyle(() => ({
    transform: [{ translateX: circle2X.value }],
  }));

  // animação da logo com teclado
  const logoOffset = useSharedValue(0);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => {
      logoOffset.value = withTiming(-50, { duration: 300 });
    });
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      logoOffset.value = withTiming(0, { duration: 300 });
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: logoOffset.value }],
  }));

  return (
    <View style={styles.container}>
      {/* círculos fixos */}
      <Animated.View style={[styles.circle1, circle1Style]} />
      <Animated.View style={[styles.circle2, circle2Style]} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Animated.Image
              source={require("../assets/images/logo.png")}
              style={[styles.imgLogo, logoStyle]}
            />
            <TextInput placeholder="MATRÍCULA" style={styles.textInput} />
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="SENHA"
                style={styles.textInputPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.toggleText}>
                  {showPassword ? "Ocultar" : "Mostrar"}
                </Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.btnEnviar}
              onPress={() => router.replace("/menu")}
            >
              <Text style={styles.txtBtnEnviar}>Enviar</Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    width: "100%",
  },
  imgLogo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
    marginBottom: 16,
    borderRadius: 5,
    fontSize: 16,
    fontFamily: "Poppins",
  },
  btnEnviar: {
    backgroundColor: "gold",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  txtBtnEnviar: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Poppins",
  },
  circle1: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "gold",
    opacity: 0.6,
    top: 100,
    left: 10,
  },
  circle2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "gold",
    opacity: 0.3,
    bottom: 0,
    left: -50,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  textInputPassword: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: "Poppins",
  },
  toggleText: {
    color: "blue",
    fontWeight: "bold",
    paddingHorizontal: 8,
    fontFamily: "Poppins",
  },
});
