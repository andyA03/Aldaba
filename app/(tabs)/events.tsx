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
import { eventSpaces, culturalServices, otherServices } from "@/constants/data";

const eventSpaceImages: { [key: number]: string } = {
  1: "https://picsum.photos/seed/salon-eventos-colonial/600/240",
  2: "https://picsum.photos/seed/jardin-tropical-events/600/240",
};

function EventSpaceCard({ item, onRequest }: { item: typeof eventSpaces[0]; onRequest: () => void }) {
  const imgUri = eventSpaceImages[item.id] || `https://picsum.photos/seed/event-space${item.id}/600/240`;

  return (
    <View style={styles.spaceCard}>
      <View style={styles.spaceImageWrap}>
        <Image source={{ uri: imgUri }} style={styles.spaceImage} resizeMode="cover" />
        <LinearGradient
          colors={[Colors.light.primary + "CC", Colors.light.primaryLight + "99"]}
          style={styles.spaceImageOverlay}
        >
          <View style={styles.spaceIconWrap}>
            <Ionicons name={item.icon as any} size={26} color="#FFFFFF" />
          </View>
          <View style={styles.spaceImageInfo}>
            <Text style={styles.spaceName}>{item.name}</Text>
            <View style={styles.capacityBadge}>
              <Ionicons name="people" size={14} color={Colors.light.accentLight} />
              <Text style={styles.capacityText}>{item.capacity}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
      <View style={styles.spaceBody}>
        <Text style={styles.spaceDescription}>{item.description}</Text>
        <Text style={styles.eventTypesLabel}>Tipos de eventos:</Text>
        <View style={styles.eventTypesGrid}>
          {item.eventTypes.map((type, index) => (
            <View key={index} style={styles.eventTypeChip}>
              <Text style={styles.eventTypeText}>{type}</Text>
            </View>
          ))}
        </View>
        <Pressable
          onPress={() => {
            if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onRequest();
          }}
          style={({ pressed }) => [styles.spaceButton, { transform: [{ scale: pressed ? 0.97 : 1 }] }]}
        >
          <LinearGradient
            colors={[Colors.light.primary, Colors.light.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.spaceButtonGradient}
          >
            <Ionicons name="calendar-outline" size={18} color="#FFFFFF" />
            <Text style={styles.spaceButtonText}>Solicitar Alquiler</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

function CulturalServiceItem({ item }: { item: typeof culturalServices[0] }) {
  return (
    <View style={styles.serviceItem}>
      <View style={[styles.serviceIcon, { backgroundColor: Colors.light.secondary + "18" }]}>
        <Ionicons name={item.icon as any} size={22} color={Colors.light.secondary} />
      </View>
      <View style={styles.serviceText}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDesc}>{item.description}</Text>
      </View>
    </View>
  );
}

function OtherServiceItem({ item }: { item: typeof otherServices[0] }) {
  return (
    <View style={styles.otherItem}>
      <View style={[styles.otherIcon, { backgroundColor: Colors.light.primary + "12" }]}>
        <Ionicons name={item.icon as any} size={20} color={Colors.light.primary} />
      </View>
      <View style={styles.otherText}>
        <Text style={styles.otherName}>{item.name}</Text>
        <Text style={styles.otherDesc}>{item.description}</Text>
      </View>
    </View>
  );
}

function RequestModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !eventType.trim()) {
      Alert.alert("Campos requeridos", "Por favor complete los campos obligatorios.");
      return;
    }
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Solicitud enviada", "Su solicitud de alquiler ha sido registrada. Le contactaremos pronto.");
    setName(""); setEventType(""); setDate(""); onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}>
          <View style={styles.modalHandle} />
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Solicitar Espacio</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.light.text} />
            </Pressable>
          </View>
          <Text style={styles.inputLabel}>Nombre</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Su nombre completo" placeholderTextColor={Colors.light.textTertiary} />
          <Text style={styles.inputLabel}>Tipo de evento</Text>
          <TextInput style={styles.input} value={eventType} onChangeText={setEventType} placeholder="Ej: Boda, cumpleanos, evento corporativo" placeholderTextColor={Colors.light.textTertiary} />
          <Text style={styles.inputLabel}>Fecha deseada</Text>
          <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="Ej: 15 de marzo 2025" placeholderTextColor={Colors.light.textTertiary} />
          <Pressable onPress={handleSubmit} style={({ pressed }) => [styles.submitButton, { opacity: pressed ? 0.9 : 1 }]}>
            <Text style={styles.submitText}>Enviar Solicitud</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default function EventsScreen() {
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const contentMaxWidth = Math.min(windowWidth, 900);
  const webTopInset = isWeb ? 67 : 0;
  const topPadding = isWeb ? webTopInset : insets.top;
  const [showRequest, setShowRequest] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: isWeb ? 34 : 80 }}>
        <ImageBackground
          source={{ uri: "https://picsum.photos/seed/colonial-event-hall-tropical/1200/400" }}
          style={styles.header}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(27,79,138,0.78)", "rgba(6,182,212,0.55)"]}
            style={[styles.headerOverlay, { paddingTop: topPadding + 20 }]}
          >
            <Text style={styles.headerTitle}>Eventos</Text>
            <Text style={styles.headerSubtitle}>Espacios unicos para momentos inolvidables</Text>
          </LinearGradient>
        </ImageBackground>

        <View style={{ maxWidth: contentMaxWidth, alignSelf: "center" as const, width: "100%", paddingHorizontal: 20 }}>
          <Text style={styles.sectionTitle}>Espacios para Eventos</Text>
          {eventSpaces.map((item) => (
            <EventSpaceCard key={item.id} item={item} onRequest={() => setShowRequest(true)} />
          ))}

          <Text style={styles.sectionTitle}>Servicios Culturales</Text>
          <View style={styles.culturalList}>
            {culturalServices.map((item) => (
              <CulturalServiceItem key={item.id} item={item} />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Otros Servicios</Text>
          <View style={styles.otherList}>
            {otherServices.map((item) => (
              <OtherServiceItem key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>

      <RequestModal visible={showRequest} onClose={() => setShowRequest(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  header: { overflow: "hidden" as const, minHeight: 200 },
  headerOverlay: { paddingHorizontal: 24, paddingBottom: 36 },
  headerTitle: { fontFamily: "PlayfairDisplay_700Bold", fontSize: 38, color: "#FFFFFF", marginBottom: 8, textShadowColor: "rgba(0,0,0,0.4)", textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6 },
  headerSubtitle: { fontFamily: "DMSans_400Regular", fontSize: 15, color: "rgba(255,255,255,0.92)", textShadowColor: "rgba(0,0,0,0.3)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  sectionTitle: { fontFamily: "PlayfairDisplay_600SemiBold", fontSize: 22, color: Colors.light.text, marginTop: 24, marginBottom: 16 },
  spaceCard: { borderRadius: 18, overflow: "hidden" as const, marginBottom: 18, borderWidth: 1, borderColor: Colors.light.borderLight, backgroundColor: Colors.light.card },
  spaceImageWrap: { position: "relative" as const, height: 180 },
  spaceImage: { width: "100%", height: 180 },
  spaceImageOverlay: { position: "absolute" as const, bottom: 0, left: 0, right: 0, top: 0, padding: 18, flexDirection: "row" as const, alignItems: "flex-end" as const, gap: 12 },
  spaceIconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.18)", alignItems: "center" as const, justifyContent: "center" as const },
  spaceImageInfo: { flex: 1 },
  spaceName: { fontFamily: "PlayfairDisplay_700Bold", fontSize: 19, color: "#FFFFFF" },
  capacityBadge: { flexDirection: "row" as const, alignItems: "center" as const, gap: 5, marginTop: 4 },
  capacityText: { fontFamily: "DMSans_500Medium", fontSize: 12, color: Colors.light.accentLight },
  spaceBody: { padding: 18 },
  spaceDescription: { fontFamily: "DMSans_400Regular", fontSize: 14, color: Colors.light.textSecondary, lineHeight: 22, marginBottom: 14 },
  eventTypesLabel: { fontFamily: "DMSans_600SemiBold", fontSize: 13, color: Colors.light.text, marginBottom: 10 },
  eventTypesGrid: { flexDirection: "row" as const, flexWrap: "wrap" as const, gap: 8, marginBottom: 16 },
  eventTypeChip: { backgroundColor: Colors.light.primary + "12", paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: Colors.light.primary + "25" },
  eventTypeText: { fontFamily: "DMSans_500Medium", fontSize: 12, color: Colors.light.primary },
  spaceButton: { borderRadius: 12, overflow: "hidden" as const },
  spaceButtonGradient: { flexDirection: "row" as const, alignItems: "center" as const, justifyContent: "center" as const, gap: 8, paddingVertical: 14 },
  spaceButtonText: { fontFamily: "DMSans_600SemiBold", fontSize: 14, color: "#FFFFFF" },
  culturalList: { gap: 12 },
  serviceItem: { flexDirection: "row" as const, backgroundColor: Colors.light.card, borderRadius: 14, padding: 16, gap: 14, borderWidth: 1, borderColor: Colors.light.borderLight },
  serviceIcon: { width: 48, height: 48, borderRadius: 14, alignItems: "center" as const, justifyContent: "center" as const },
  serviceText: { flex: 1 },
  serviceName: { fontFamily: "DMSans_600SemiBold", fontSize: 15, color: Colors.light.text, marginBottom: 4 },
  serviceDesc: { fontFamily: "DMSans_400Regular", fontSize: 13, color: Colors.light.textSecondary, lineHeight: 20 },
  otherList: { gap: 10 },
  otherItem: { flexDirection: "row" as const, alignItems: "center" as const, backgroundColor: Colors.light.card, borderRadius: 12, padding: 14, gap: 12, borderWidth: 1, borderColor: Colors.light.borderLight },
  otherIcon: { width: 40, height: 40, borderRadius: 10, alignItems: "center" as const, justifyContent: "center" as const },
  otherText: { flex: 1 },
  otherName: { fontFamily: "DMSans_600SemiBold", fontSize: 14, color: Colors.light.text, marginBottom: 2 },
  otherDesc: { fontFamily: "DMSans_400Regular", fontSize: 12, color: Colors.light.textSecondary, lineHeight: 18 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" as const },
  modalContent: { backgroundColor: Colors.light.background, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 24, paddingTop: 12 },
  modalHandle: { width: 40, height: 4, backgroundColor: Colors.light.border, borderRadius: 2, alignSelf: "center" as const, marginBottom: 16 },
  modalHeader: { flexDirection: "row" as const, justifyContent: "space-between" as const, alignItems: "center" as const, marginBottom: 24 },
  modalTitle: { fontFamily: "PlayfairDisplay_700Bold", fontSize: 22, color: Colors.light.text },
  inputLabel: { fontFamily: "DMSans_600SemiBold", fontSize: 13, color: Colors.light.text, marginBottom: 8 },
  input: { backgroundColor: Colors.light.card, borderRadius: 12, padding: 14, fontFamily: "DMSans_400Regular", fontSize: 15, color: Colors.light.text, borderWidth: 1, borderColor: Colors.light.border, marginBottom: 16 },
  submitButton: { backgroundColor: Colors.light.primary, borderRadius: 14, paddingVertical: 16, alignItems: "center" as const, marginTop: 8 },
  submitText: { fontFamily: "DMSans_700Bold", fontSize: 16, color: "#FFFFFF" },
});
