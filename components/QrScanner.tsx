import { CameraView } from "expo-camera";
import { StyleSheet } from "react-native";

type QrScannerProps = {
  onScanned: (data: string) => void;
};

export default function QrScanner({ onScanned }: QrScannerProps) {
  return (
    <CameraView
      style={styles.camera}
      facing="back"
      barcodeScannerSettings={{
        barcodeTypes: ["qr"],
      }}
      onBarcodeScanned={({ data }) => {
        onScanned(data); // repassa para o pai
      }}
    />
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});
