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
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";
import { accommodations, gastronomyVenues } from "@/constants/data";
import type { Accommodation, GastronomyVenue } from "@/constants/data";

const { width } = Dimensions.get("window");

type TabType = "alojamiento" | "gastronomia";

function AccommodationCard({ item }: { item: Accommodation }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.cardIconWrap, { backgroundColor: Colors.light.primary + '12' }]}>
          <Ionicons name={item.icon as any} size={24} color={Colors.light.primary} />
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.cardBadge}>
            <Ionicons name="key-outline" size={12} color={Colors.light.gold} />
            <Text style={styles.cardBadgeText}>{item.rooms}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <Pressable
        onPress={() => {
          if (Platform.OS !== "web") Haptics.selectionAsync();
          setExpanded(!expanded);
        }}
        style={styles.expandButton}
      >
        <Text style={styles.expandText}>{expanded ? "Ocultar servicios" : "Ver servicios"}</Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={16}
          color={Colors.light.primary}
        />
      </Pressable>
      {expanded && (
        <View style={styles.amenitiesList}>
          {item.amenities.map((amenity, index) => (
            <View key={index} style={styles.amenityItem}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.light.success} />
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function GastronomyCard({ item }: { item: GastronomyVenue }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.cardIconWrap, { backgroundColor: Colors.light.secondary + '12' }]}>
          <Ionicons name={item.icon as any} size={24} color={Colors.light.secondary} />
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.cardTitle}>{item.name}</Text>
        </View>
      </View>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <Pressable
        onPress={() => {
          if (Platform.OS !== "web") Haptics.selectionAsync();
          setExpanded(!expanded);
        }}
        style={styles.expandButton}
      >
        <Text style={[styles.expandText, { color: Colors.light.secondary }]}>
          {expanded ? "Ocultar ofertas" : "Ver ofertas"}
        </Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={16}
          color={Colors.light.secondary}
        />
      </Pressable>
      {expanded && (
        <View style={styles.amenitiesList}>
          {item.offerings.map((offering, index) => (
            <View key={index} style={styles.amenityItem}>
              <Ionicons name="restaurant" size={14} color={Colors.light.secondary} />
              <Text style={styles.amenityText}>{offering}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function RequestModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !service.trim()) {
      Alert.alert("Campos requeridos", "Por favor complete todos los campos.");
      return;
    }
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Solicitud enviada", "Nos pondremos en contacto con usted pronto.");
    setName("");
    setService("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}>
          <View style={styles.modalHandle} />
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Solicitar Servicio</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.light.text} />
            </Pressable>
          </View>
          <Text style={styles.inputLabel}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Su nombre completo"
            placeholderTextColor={Colors.light.textTertiary}
          />
          <Text style={styles.inputLabel}>Servicio deseado</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={service}
            onChangeText={setService}
            placeholder="Describa el servicio que necesita"
            placeholderTextColor={Colors.light.textTertiary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <Pressable
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.submitButton,
              { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
            ]}
          >
            <Text style={styles.submitButtonText}>Enviar Solicitud</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default function ServicesScreen() {
  const insets = useSafeAreaInsets();
  const webTopInset = Platform.OS === "web" ? 67 : 0;
  const topPadding = Platform.OS === "web" ? webTopInset : insets.top;
  const [activeTab, setActiveTab] = useState<TabType>("alojamiento");
  const [showRequest, setShowRequest] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Platform.OS === "web" ? 34 : 100 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <LinearGradient
          colors={['#8B2500', '#B8461B']}
          style={[styles.header, { paddingTop: topPadding + 20 }]}
        >
          <Text style={styles.headerTitle}>Servicios</Text>
          <Text style={styles.headerSubtitle}>Alojamiento y gastronomia de primera</Text>
        </LinearGradient>

        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => {
              if (Platform.OS !== "web") Haptics.selectionAsync();
              setActiveTab("alojamiento");
            }}
            style={[styles.tab, activeTab === "alojamiento" && styles.tabActive]}
          >
            <Ionicons
              name="bed-outline"
              size={18}
              color={activeTab === "alojamiento" ? Colors.light.primary : Colors.light.textTertiary}
            />
            <Text style={[styles.tabText, activeTab === "alojamiento" && styles.tabTextActive]}>
              Alojamiento
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (Platform.OS !== "web") Haptics.selectionAsync();
              setActiveTab("gastronomia");
            }}
            style={[styles.tab, activeTab === "gastronomia" && styles.tabActive]}
          >
            <Ionicons
              name="restaurant-outline"
              size={18}
              color={activeTab === "gastronomia" ? Colors.light.secondary : Colors.light.textTertiary}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "gastronomia" && [styles.tabTextActive, { color: Colors.light.secondary }],
              ]}
            >
              Gastronomia
            </Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          {activeTab === "alojamiento" ? (
            <>
              {accommodations.map((item) => (
                <AccommodationCard key={item.id} item={item} />
              ))}
            </>
          ) : (
            <>
              {gastronomyVenues.map((item) => (
                <GastronomyCard key={item.id} item={item} />
              ))}
            </>
          )}
        </View>
      </ScrollView>

      <View style={[styles.floatingButton, { bottom: Platform.OS === "web" ? 34 + 16 : 100 }]}>
        <Pressable
          onPress={() => {
            if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setShowRequest(true);
          }}
          style={({ pressed }) => [
            styles.fab,
            { transform: [{ scale: pressed ? 0.92 : 1 }] },
          ]}
        >
          <LinearGradient
            colors={[Colors.light.primary, Colors.light.primaryLight]}
            style={styles.fabGradient}
          >
            <Ionicons name="add" size={28} color="#FFFFFF" />
          </LinearGradient>
        </Pressable>
      </View>

      <RequestModal visible={showRequest} onClose={() => setShowRequest(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  headerTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 34,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
  },
  tabContainer: {
    flexDirection: "row" as const,
    marginHorizontal: 20,
    marginTop: -15,
    backgroundColor: Colors.light.card,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.light.borderLight,
  },
  tab: {
    flex: 1,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  tabActive: {
    backgroundColor: Colors.light.backgroundSecondary,
  },
  tabText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 14,
    color: Colors.light.textTertiary,
  },
  tabTextActive: {
    fontFamily: 'DMSans_600SemiBold',
    color: Colors.light.primary,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.light.borderLight,
  },
  cardHeader: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 14,
    marginBottom: 12,
  },
  cardIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 4,
  },
  cardBadge: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 4,
  },
  cardBadgeText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    color: Colors.light.gold,
  },
  cardDescription: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 21,
    marginBottom: 12,
  },
  expandButton: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 4,
    paddingVertical: 6,
  },
  expandText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 13,
    color: Colors.light.primary,
  },
  amenitiesList: {
    marginTop: 12,
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.light.borderLight,
  },
  amenityItem: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 10,
  },
  amenityText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: Colors.light.textSecondary,
    flex: 1,
  },
  floatingButton: {
    position: "absolute" as const,
    right: 20,
  },
  fab: {
    borderRadius: 28,
    overflow: "hidden" as const,
    elevation: 6,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabGradient: {
    width: 56,
    height: 56,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: "flex-end" as const,
  },
  modalContent: {
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.light.border,
    borderRadius: 2,
    alignSelf: "center" as const,
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    marginBottom: 24,
  },
  modalTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 22,
    color: Colors.light.text,
  },
  inputLabel: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 13,
    color: Colors.light.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 14,
    fontFamily: 'DMSans_400Regular',
    fontSize: 15,
    color: Colors.light.text,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: 16,
  },
  textArea: {
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center" as const,
    marginTop: 8,
  },
  submitButtonText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
