import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Platform,
  useWindowDimensions,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";
import { companyInfo } from "@/constants/data";

const carouselSlides = [
  {
    uri: "https://picsum.photos/seed/plaza-mayor-trinidad/900/450",
    caption: "Plaza Mayor de Trinidad",
    sub: "Patrimonio de la Humanidad UNESCO",
  },
  {
    uri: "https://picsum.photos/seed/colonial-street-cuba/900/450",
    caption: "Calles Coloniales",
    sub: "Historia viva en cada adoquin",
  },
  {
    uri: "https://picsum.photos/seed/valle-ingenios-sugar/900/450",
    caption: "Valle de los Ingenios",
    sub: "Herencia azucarera del Caribe",
  },
  {
    uri: "https://picsum.photos/seed/playa-ancon-caribbean/900/450",
    caption: "Playa Ancon",
    sub: "La perla del Caribe cubano",
  },
  {
    uri: "https://picsum.photos/seed/trinidad-panorama/900/450",
    caption: "Trinidad, Cuba",
    sub: "Turismo, cultura y tradicion",
  },
];

const quickAccessItems = [
  { title: "Alojamiento", icon: "bed-outline" as const, route: "services", color: Colors.light.primary },
  { title: "Gastronomia", icon: "restaurant-outline" as const, route: "services", color: Colors.light.secondary },
  { title: "Excursiones", icon: "compass-outline" as const, route: "excursions", color: Colors.light.accent },
  { title: "Eventos", icon: "sparkles-outline" as const, route: "events", color: Colors.light.gold },
];

const highlights = [
  { title: "Patrimonio UNESCO", subtitle: "Trinidad, ciudad patrimonio desde 1988", icon: "shield-checkmark-outline" as const },
  { title: "Valle de los Ingenios", subtitle: "Historia azucarera viva", icon: "leaf-outline" as const },
  { title: "Cultura Viva", subtitle: "Musica, danza y tradicion", icon: "musical-notes-outline" as const },
];

function QuickAccessCard({ item }: { item: typeof quickAccessItems[0] }) {
  const handlePress = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/${item.route}` as any);
  };
  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.quickCard, { transform: [{ scale: pressed ? 0.95 : 1 }] }]}
    >
      <View style={[styles.quickCardIcon, { backgroundColor: item.color + '18' }]}>
        <Ionicons name={item.icon} size={26} color={item.color} />
      </View>
      <Text style={styles.quickCardTitle}>{item.title}</Text>
    </Pressable>
  );
}

function HighlightCard({ item }: { item: typeof highlights[0] }) {
  return (
    <View style={styles.highlightCard}>
      <View style={styles.highlightIconWrap}>
        <Ionicons name={item.icon} size={22} color={Colors.light.secondary} />
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
  const { width: windowWidth } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const isDesktop = windowWidth >= 768;
  const contentMaxWidth = Math.min(windowWidth, 900);
  const webTopInset = isWeb ? 64 : 0;
  const topPadding = isWeb ? webTopInset : insets.top;
  const carouselRef = useRef<ScrollView>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => {
        const next = (prev + 1) % carouselSlides.length;
        carouselRef.current?.scrollTo({ x: next * windowWidth, animated: true });
        return next;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [windowWidth]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: isWeb ? 34 : 80 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.carouselWrapper, { paddingTop: topPadding }]}>
        <ScrollView
          ref={carouselRef}
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / windowWidth);
            setActiveSlide(index);
          }}
          style={{ width: windowWidth }}
        >
          {carouselSlides.map((slide, i) => (
            <View key={i} style={[styles.carouselSlide, { width: windowWidth }]}>
              <Image
                source={{ uri: slide.uri }}
                style={[styles.carouselImage, { width: windowWidth }]}
                resizeMode="cover"
              />
              <LinearGradient
                colors={["transparent", "rgba(12,21,36,0.75)"]}
                style={styles.carouselGradient}
              >
                <Text style={styles.carouselCaption}>{slide.caption}</Text>
                <Text style={styles.carouselSub}>{slide.sub}</Text>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>

        <View style={styles.carouselDots}>
          {carouselSlides.map((_, i) => (
            <Pressable
              key={i}
              onPress={() => {
                carouselRef.current?.scrollTo({ x: i * windowWidth, animated: true });
                setActiveSlide(i);
              }}
              style={[styles.dot, i === activeSlide && styles.dotActive]}
            />
          ))}
        </View>

        <View style={[styles.heroBadge, { top: topPadding + 16 }]}>
          <Ionicons name="location-outline" size={13} color={Colors.light.secondary} />
          <Text style={styles.heroBadgeText}>Trinidad, Cuba</Text>
        </View>
      </View>

      <View style={[styles.content, { maxWidth: contentMaxWidth, alignSelf: "center" as const, width: "100%" }]}>
        <View style={styles.heroTextCard}>
          <Text style={styles.heroTitle}>{companyInfo.name}</Text>
          <Text style={styles.heroSubtitle}>{companyInfo.tagline}</Text>
          <Pressable
            onPress={() => {
              if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              router.push("/services" as any);
            }}
            style={({ pressed }) => [styles.heroCta, { opacity: pressed ? 0.9 : 1 }]}
          >
            <LinearGradient
              colors={[Colors.light.primary, Colors.light.primaryLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.heroCtaGradient}
            >
              <Text style={styles.heroCtaText}>Explorar Servicios</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </LinearGradient>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Acceso Rapido</Text>
        <View style={[styles.quickGrid, isDesktop && styles.quickGridDesktop]}>
          {quickAccessItems.map((item) => (
            <QuickAccessCard key={item.title} item={item} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Lo que nos distingue</Text>
        {highlights.map((item) => (
          <HighlightCard key={item.title} item={item} />
        ))}

        <View style={styles.footer}>
          <View style={styles.footerDivider} />
          <View style={styles.footerLogoWrap}>
            <Text style={styles.footerLogo}>Aldaba</Text>
          </View>
          <Text style={styles.footerText}>{companyInfo.tagline}</Text>
          <Text style={styles.footerLocation}>{companyInfo.location}</Text>
          <View style={styles.footerSeparator} />
          <View style={styles.footerUciWrap}>
            <Ionicons name="school-outline" size={15} color={Colors.light.textTertiary} />
            <Text style={styles.footerUci}>Universidad de las Ciencias Informaticas</Text>
          </View>
          <Text style={styles.footerCopy}>© Aldaba — Todos los derechos reservados</Text>
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
  carouselWrapper: {
    position: "relative" as const,
    overflow: "hidden" as const,
  },
  carouselSlide: {
    height: 300,
    overflow: "hidden" as const,
  },
  carouselImage: {
    height: 300,
  },
  carouselGradient: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 60,
  },
  carouselCaption: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 22,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  carouselSub: {
    fontFamily: "DMSans_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
  },
  carouselDots: {
    position: "absolute" as const,
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row" as const,
    justifyContent: "center" as const,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.45)",
  },
  dotActive: {
    width: 18,
    backgroundColor: "#FFFFFF",
  },
  heroBadge: {
    position: "absolute" as const,
    left: 16,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },
  heroBadgeText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 12,
    color: Colors.light.primary,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  heroTextCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    padding: 24,
    marginTop: 16,
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 8,
  },
  heroTitle: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 30,
    color: Colors.light.primary,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  heroCta: {
    borderRadius: 14,
    overflow: "hidden" as const,
    alignSelf: "flex-start" as const,
  },
  heroCtaGradient: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    paddingHorizontal: 22,
    paddingVertical: 13,
    gap: 8,
  },
  heroCtaText: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 14,
    color: "#FFFFFF",
  },
  sectionTitle: {
    fontFamily: "PlayfairDisplay_600SemiBold",
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
  quickGridDesktop: {
    flexDirection: "row" as const,
  },
  quickCard: {
    flex: 1,
    minWidth: 130,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    alignItems: "center" as const,
    borderWidth: 1,
    borderColor: Colors.light.borderLight,
  },
  quickCardIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginBottom: 10,
  },
  quickCardTitle: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 13,
    color: Colors.light.text,
    textAlign: "center" as const,
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
    backgroundColor: Colors.light.secondary + "15",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  highlightText: {
    flex: 1,
  },
  highlightTitle: {
    fontFamily: "DMSans_600SemiBold",
    fontSize: 15,
    color: Colors.light.text,
    marginBottom: 2,
  },
  highlightSubtitle: {
    fontFamily: "DMSans_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
  },
  footer: {
    marginTop: 32,
    alignItems: "center" as const,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  footerDivider: {
    height: 1,
    backgroundColor: Colors.light.border,
    width: "100%",
    marginBottom: 28,
  },
  footerLogoWrap: {
    marginBottom: 10,
  },
  footerLogo: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 28,
    color: Colors.light.primary,
  },
  footerText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 13,
    color: Colors.light.textSecondary,
    textAlign: "center" as const,
    lineHeight: 20,
    maxWidth: 320,
  },
  footerLocation: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: Colors.light.secondary,
    marginTop: 6,
    marginBottom: 20,
  },
  footerSeparator: {
    height: 1,
    backgroundColor: Colors.light.border,
    width: "50%",
    marginBottom: 16,
  },
  footerUciWrap: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 6,
    marginBottom: 8,
  },
  footerUci: {
    fontFamily: "DMSans_500Medium",
    fontSize: 12,
    color: Colors.light.textSecondary,
    textAlign: "center" as const,
  },
  footerCopy: {
    fontFamily: "DMSans_400Regular",
    fontSize: 11,
    color: Colors.light.textTertiary,
  },
});
