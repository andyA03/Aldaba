import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Platform,
  Modal,
  TextInput,
  Alert,
  Image,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";
import { excursions } from "@/constants/data";
import type { Excursion } from "@/constants/data";

const excursionImages: { [key: number]: string } = {
  1: "https://picsum.photos/seed/topes-collantes-nature/600/260",
  2: "https://picsum.photos/seed/horseback-countryside/600/260",
  3: "https://picsum.photos/seed/colonial-city-tour/600/260",
  4: "https://picsum.photos/seed/sugar-valley-history/600/260",
  5: "https://picsum.photos/seed/caribbean-beach-ancon/600/260",
};

function ExcursionCard({ item, onRequest }: { item: Excursion; onRequest: (name: string) => void }) {
  const imgUri = excursionImages[item.id] || `https://picsum.photos/seed/excursion${item.id}/600/260`;

  return (
    <View style={styles.card}>
      <View style={styles.cardImageWrap}>
        <Image source={{ uri: imgUri }} style={styles.cardImage} resizeMode="cover" />
        <LinearGradient
          colors={["transparent", "rgba(12,21,36,0.55)"]}
          style={styles.cardImageOverlay}
        >
          <View style={styles.cardIconBadge}>
            <Ionicons name={item.icon as any} size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.cardImageTitle}>{item.name}</Text>
        </LinearGradient>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.featuresList}>
          {item.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        <Pressable
          onPress={() => {
            if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onRequest(item.name);
          }}
          style={({ pressed }) => [styles.requestButton, { transform: [{ scale: pressed ? 0.97 : 1 }] }]}
        >
          <LinearGradient
            colors={[Colors.light.primary, Colors.light.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.requestButtonGradient}
          >
            <Ionicons name="calendar-outline" size={18} color="#FFFFFF" />
            <Text style={styles.requestButtonText}>Solicitar Excursion</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

function RequestModal({ visible, onClose, excursionName }: { visible: boolean; onClose: () => void; excursionName: string }) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [people, setPeople] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) { Alert.alert("Campo requerido", "Por favor ingrese su nombre."); return; }
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Solicitud enviada", `Su solicitud para "${excursionName}" ha sido registrada. Le contactaremos pronto.`);
    setName(""); setPeople(""); setNotes(""); onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}>
          <View style={styles.modalHandle} />
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>Solicitar Excursion</Text>
              <Text style={styles.modalSubtitle}>{excursionName}</Text>
            </View>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.light.text} />
            </Pressable>
          </View>
          <Text style={styles.inputLabel}>Nombre</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Su nombre completo" placeholderTextColor={Colors.light.textTertiary} />
          <Text style={styles.inputLabel}>Numero de personas</Text>
          <TextInput style={styles.input} value={people} onChangeText={setPeople} placeholder="Ej: 4" placeholderTextColor={Colors.light.textTertiary} keyboardType="numeric" />
          <Text style={styles.inputLabel}>Notas adicionales</Text>
          <TextInput style={[styles.input, styles.textArea]} value={notes} onChangeText={setNotes} placeholder="Preferencias, fecha deseada, etc." placeholderTextColor={Colors.light.textTertiary} multiline numberOfLines={3} textAlignVertical="top" />
          <Pressable onPress={handleSubmit} style={({ pressed }) => [styles.submitButton, { opacity: pressed ? 0.9 : 1 }]}>
            <Text style={styles.submitText}>Enviar Solicitud</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default function ExcursionsScreen() {
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const contentMaxWidth = Math.min(windowWidth, 900);
  const webTopInset = isWeb ? 67 : 0;
  const topPadding = isWeb ? webTopInset : insets.top;
  const [requestModal, setRequestModal] = useState({ visible: false, name: "" });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: isWeb ? 34 : 80 }}>
        <ImageBackground
          source={{ uri: "https://picsum.photos/seed/cuba-nature-hiking-mountains/1200/400" }}
          style={styles.header}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(6,182,212,0.78)", "rgba(12,21,36,0.62)"]}
            style={[styles.headerOverlay, { paddingTop: topPadding + 20 }]}
          >
            <Text style={styles.headerTitle}>Excursiones</Text>
            <Text style={styles.headerSubtitle}>Descubra Trinidad y el Valle de los Ingenios</Text>
          </LinearGradient>
        </ImageBackground>

        <View style={{ maxWidth: contentMaxWidth, alignSelf: "center" as const, width: "100%", paddingHorizontal: 20 }}>
          <View style={styles.infoBar}>
            <View style={styles.infoItem}>
              <Ionicons name="compass-outline" size={18} color={Colors.light.secondary} />
              <Text style={styles.infoText}>Guias expertos</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Ionicons name="camera-outline" size={18} color={Colors.light.secondary} />
              <Text style={styles.infoText}>Fotos incluidas</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoItem}>
              <Ionicons name="car-outline" size={18} color={Colors.light.secondary} />
              <Text style={styles.infoText}>Transporte</Text>
            </View>
          </View>

          <View style={styles.content}>
            {excursions.map((item) => (
              <ExcursionCard key={item.id} item={item} onRequest={(name) => setRequestModal({ visible: true, name })} />
            ))}
          </View>
        </View>
      </ScrollView>

      <RequestModal
        visible={requestModal.visible}
        onClose={() => setRequestModal({ visible: false, name: "" })}
        excursionName={requestModal.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  header: { overflow: "hidden" as const, minHeight: 200 },
  headerOverlay: { paddingHorizontal: 24, paddingBottom: 36 },
  headerTitle: { fontFamily: "PlayfairDisplay_700Bold", fontSize: 38, color: "#FFFFFF", marginBottom: 8, textShadowColor: "rgba(0,0,0,0.4)", textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6 },
  headerSubtitle: { fontFamily: "DMSans_400Regular", fontSize: 15, color: "rgba(255,255,255,0.92)", textShadowColor: "rgba(0,0,0,0.3)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  infoBar: {
    flexDirection: "row" as const, alignItems: "center" as const, justifyContent: "center" as const,
    marginTop: -15, backgroundColor: Colors.light.card, borderRadius: 14, paddingVertical: 14,
    paddingHorizontal: 12, borderWidth: 1, borderColor: Colors.light.borderLight, gap: 8,
  },
  infoItem: { flexDirection: "row" as const, alignItems: "center" as const, gap: 6 },
  infoText: { fontFamily: "DMSans_500Medium", fontSize: 12, color: Colors.light.textSecondary },
  infoDivider: { width: 1, height: 16, backgroundColor: Colors.light.border },
  content: { paddingTop: 20 },
  card: { backgroundColor: Colors.light.card, borderRadius: 18, marginBottom: 18, borderWidth: 1, borderColor: Colors.light.borderLight, overflow: "hidden" as const },
  cardImageWrap: { position: "relative" as const, height: 200 },
  cardImage: { width: "100%", height: 200 },
  cardImageOverlay: { position: "absolute" as const, bottom: 0, left: 0, right: 0, padding: 16, flexDirection: "row" as const, alignItems: "center" as const, gap: 10 },
  cardIconBadge: { width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center" as const, justifyContent: "center" as const },
  cardImageTitle: { fontFamily: "PlayfairDisplay_700Bold", fontSize: 18, color: "#FFFFFF", flex: 1 },
  cardBody: { padding: 20 },
  cardDescription: { fontFamily: "DMSans_400Regular", fontSize: 14, color: Colors.light.textSecondary, lineHeight: 22, marginBottom: 16 },
  featuresList: { gap: 8, marginBottom: 18 },
  featureItem: { flexDirection: "row" as const, alignItems: "center" as const, gap: 10 },
  featureDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.light.secondary },
  featureText: { fontFamily: "DMSans_400Regular", fontSize: 13, color: Colors.light.textSecondary, flex: 1 },
  requestButton: { borderRadius: 14, overflow: "hidden" as const },
  requestButtonGradient: { flexDirection: "row" as const, alignItems: "center" as const, justifyContent: "center" as const, gap: 8, paddingVertical: 14 },
  requestButtonText: { fontFamily: "DMSans_600SemiBold", fontSize: 14, color: "#FFFFFF" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" as const },
  modalContent: { backgroundColor: Colors.light.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 24, paddingTop: 12 },
  modalHandle: { width: 40, height: 4, backgroundColor: Colors.light.border, borderRadius: 2, alignSelf: "center" as const, marginBottom: 16 },
  modalHeader: { flexDirection: "row" as const, justifyContent: "space-between" as const, alignItems: "flex-start" as const, marginBottom: 24 },
  modalTitle: { fontFamily: "PlayfairDisplay_700Bold", fontSize: 22, color: Colors.light.text },
  modalSubtitle: { fontFamily: "DMSans_400Regular", fontSize: 14, color: Colors.light.secondary, marginTop: 4 },
  inputLabel: { fontFamily: "DMSans_600SemiBold", fontSize: 13, color: Colors.light.text, marginBottom: 8 },
  input: { backgroundColor: Colors.light.card, borderRadius: 12, padding: 14, fontFamily: "DMSans_400Regular", fontSize: 15, color: Colors.light.text, borderWidth: 1, borderColor: Colors.light.border, marginBottom: 16 },
  textArea: { minHeight: 80 },
  submitButton: { backgroundColor: Colors.light.primary, borderRadius: 14, paddingVertical: 16, alignItems: "center" as const, marginTop: 8 },
  submitText: { fontFamily: "DMSans_700Bold", fontSize: 16, color: "#FFFFFF" },
});
