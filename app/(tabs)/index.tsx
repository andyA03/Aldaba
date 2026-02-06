import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Platform,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";
import { companyInfo } from "@/constants/data";

const { width } = Dimensions.get("window");

const quickAccessItems = [
  { title: "Alojamiento", icon: "bed-outline" as const, route: "services", color: Colors.light.primary },
  { title: "Gastronomia", icon: "restaurant-outline" as const, route: "services", color: Colors.light.secondary },
  { title: "Excursiones", icon: "compass-outline" as const, route: "excursions", color: Colors.light.gold },
  { title: "Eventos", icon: "sparkles-outline" as const, route: "events", color: Colors.light.primaryLight },
];

const highlights = [
  { title: "Patrimonio UNESCO", subtitle: "Trinidad, ciudad patrimonio desde 1988", icon: "shield-checkmark-outline" as const },
  { title: "Valle de los Ingenios", subtitle: "Historia azucarera viva", icon: "leaf-outline" as const },
  { title: "Cultura Viva", subtitle: "Musica, danza y tradicion", icon: "musical-notes-outline" as const },
];

function QuickAccessCard({ item }: { item: typeof quickAccessItems[0] }) {
  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push(`/${item.route}` as any);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.quickCard,
        { transform: [{ scale: pressed ? 0.95 : 1 }] },
      ]}
    >
      <View style={[styles.quickCardIcon, { backgroundColor: item.color + '15' }]}>
        <Ionicons name={item.icon} size={28} color={item.color} />
      </View>
      <Text style={styles.quickCardTitle}>{item.title}</Text>
    </Pressable>
  );
}

function HighlightCard({ item }: { item: typeof highlights[0] }) {
  return (
    <View style={styles.highlightCard}>
      <View style={styles.highlightIconWrap}>
        <Ionicons name={item.icon} size={22} color={Colors.light.gold} />
      </View>
      <View style={styles.highlightText}>
        <Text style={styles.highlightTitle}>{item.title}</Text>
        <Text style={styles.highlightSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const webTopInset = Platform.OS === "web" ? 67 : 0;
  const topPadding = Platform.OS === "web" ? webTopInset : insets.top;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: Platform.OS === "web" ? 34 : 100 }}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      <LinearGradient
        colors={['#8B2500', '#B8461B', '#D4A373']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.heroSection, { paddingTop: topPadding + 40 }]}
      >
        <View style={styles.heroOverlay}>
          <View style={styles.heroBadge}>
            <Ionicons name="location-outline" size={14} color={Colors.light.gold} />
            <Text style={styles.heroBadgeText}>Trinidad, Cuba</Text>
          </View>
          <Text style={styles.heroTitle}>{companyInfo.name}</Text>
          <Text style={styles.heroSubtitle}>{companyInfo.tagline}</Text>
          <Pressable
            onPress={() => {
              if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push("/services" as any);
            }}
            style={({ pressed }) => [
              styles.heroCta,
              { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] },
            ]}
          >
            <Text style={styles.heroCtaText}>Explorar Servicios</Text>
            <Ionicons name="arrow-forward" size={18} color={Colors.light.primary} />
          </Pressable>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Acceso Rapido</Text>
        <View style={styles.quickGrid}>
          {quickAccessItems.map((item) => (
            <QuickAccessCard key={item.title} item={item} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Lo que nos distingue</Text>
        {highlights.map((item) => (
          <HighlightCard key={item.title} item={item} />
        ))}

        <View style={styles.welcomeCard}>
          <LinearGradient
            colors={['#1B4332', '#2D6A4F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.welcomeGradient}
          >
            <Ionicons name="heart-outline" size={32} color={Colors.light.accentLight} />
            <Text style={styles.welcomeTitle}>Bienvenidos a Trinidad</Text>
            <Text style={styles.welcomeText}>
              Descubra la magia de una ciudad donde cada calle cuenta una historia, 
              cada rincon guarda un tesoro y cada experiencia se convierte en un recuerdo inolvidable.
            </Text>
            <Pressable
              onPress={() => {
                if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push("/about" as any);
              }}
              style={({ pressed }) => [
                styles.welcomeCta,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Text style={styles.welcomeCtaText}>Conocer mas</Text>
              <Ionicons name="arrow-forward" size={16} color={Colors.light.accentLight} />
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  heroSection: {
    paddingBottom: 50,
    paddingHorizontal: 24,
  },
  heroOverlay: {
    alignItems: "flex-start" as const,
  },
  heroBadge: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 16,
  },
  heroBadgeText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 13,
    color: '#F5EDE0',
  },
  heroTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 48,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 24,
    marginBottom: 28,
    maxWidth: width * 0.8,
  },
  heroCta: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    gap: 8,
  },
  heroCtaText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 15,
    color: Colors.light.primary,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: -20,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay_600SemiBold',
    fontSize: 22,
    color: Colors.light.text,
    marginTop: 28,
    marginBottom: 16,
  },
  quickGrid: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 12,
  },
  quickCard: {
    width: (width - 52) / 2,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    alignItems: "center" as const,
    borderWidth: 1,
    borderColor: Colors.light.borderLight,
  },
  quickCardIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginBottom: 12,
  },
  quickCardTitle: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 14,
    color: Colors.light.text,
  },
  highlightCard: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundColor: Colors.light.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.light.borderLight,
    gap: 14,
  },
  highlightIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.light.gold + '12',
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  highlightText: {
    flex: 1,
  },
  highlightTitle: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 2,
  },
  highlightSubtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  welcomeCard: {
    marginTop: 24,
    borderRadius: 20,
    overflow: "hidden" as const,
  },
  welcomeGradient: {
    padding: 28,
    alignItems: "flex-start" as const,
  },
  welcomeTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 10,
  },
  welcomeText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 22,
    marginBottom: 20,
  },
  welcomeCta: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 6,
  },
  welcomeCtaText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 14,
    color: Colors.light.accentLight,
  },
});
