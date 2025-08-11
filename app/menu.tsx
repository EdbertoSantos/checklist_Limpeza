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

export default function MenuScreen() {
  const navigation = useNavigation();

useEffect(() => {
  navigation.setOptions({
    headerShown: true,
    headerStyle: {
      backgroundColor: "gold",
    },
    headerTitle: () => (
      <Text
        style={{
          fontSize: 22,
          fontFamily: "Poppins-Black",
          color: "black",
          textAlign: "center",
        }}
      >
        Menu
      </Text>
    ),
    headerTitleAlign: "center",
    headerLeft: () => null,
    headerRight: () => null,
    animation: "fade",
    gestureEnabled: true,
    statusBarStyle: "dark",
  });
}, [navigation]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.btnScan} onPress={() => router.push("/scan")}>
        <Image
          source={require("../assets/images/qr.png")} // troque pela sua imagem real
          style={styles.btnImage}
        />
        <Text style={styles.btnText}>Escanear QR Code</Text>
      </Pressable>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //paddingTop: 20, // para posicionar abaixo do header
    alignItems: "center",
    justifyContent: "center",
  },
  btnScan: {
    width: width * 0.9,
    height: 180,
    borderRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#f0f0f0",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,  
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "center",
  },
  btnText: {
    fontSize: 25,
    color: "#000",
    fontFamily: "Poppins-Black",
    position: "absolute",
    bottom: 5,
    right: 10,
  },
});
