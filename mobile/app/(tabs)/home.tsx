import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeTab() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Inicio</Text>
        <Text style={styles.body}>Descubre las mejores oportunidades.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  content: { flex: 1, padding: 24 },
  heading: { fontSize: 24, fontWeight: "700", color: "#111827" },
  body: { marginTop: 8, fontSize: 15, color: "#6b7280" },
});
