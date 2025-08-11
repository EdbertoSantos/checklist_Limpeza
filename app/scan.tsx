import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import QrScanner from "@/components/QrScanner";
import Base64Decoder from "@/components/Base64Decoder";

export default function ScanScreen() {
  const navigation = useNavigation();

  const [qrData, setQrData] = useState<string | null>(null);
  const [decodedData, setDecodedData] = useState<string | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: "gold" },
      headerTitle: () => (
        <Text
          style={{
            fontSize: 22,
            fontFamily: "Poppins-Black",
            color: "black",
            textAlign: "center",
          }}
        >
          Scan
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

const handleQrScanned = (data: string) => {
  if (!scanned) {
    setQrData(data);
    setDecodedData(Base64Decoder(data)); // usa como função pura
    setScanned(true);
  }
};

  return (
    <View style={styles.container}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}

      {!scanned ? (
        <QrScanner onScanned={handleQrScanned} />
      ) : (
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>Mensagem decodificada:</Text>
          <Text style={styles.text}>{decodedData}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontWeight: "bold", fontSize: 18, marginBottom: 10 },
  text: { fontSize: 16, color: "#333", fontFamily: "monospace" },
});
