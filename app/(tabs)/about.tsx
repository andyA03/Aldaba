import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Platform,
  Linking,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";
import { companyInfo, communityProjects } from "@/constants/data";

function ValueCard({ value, index }: { value: string; index: number }) {
  const icons = ["shield-outline", "people-outline", "ribbon-outline", "diamond-outline", "leaf-outline"] as const;
  return (
    <View style={styles.valueCard}>
      <View style={[styles.valueIcon, { backgroundColor: Colors.light.secondary + "18" }]}>
        <Ionicons name={icons[index % icons.length]} size={20} color={Colors.light.secondary} />
      </View>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
}

function CommunityItem({ item }: { item: typeof communityProjects[0] }) {
  return (
    <View style={styles.communityItem}>
      <View style={styles.timelineDot}>
        <View style={styles.timelineDotInner} />
      </View>
      <View style={styles.communityContent}>
        <View style={styles.communityHeader}>
          <View style={[styles.communityIcon, { backgroundColor: Colors.light.primary + "15" }]}>
            <Ionicons name={item.icon as any} size={18} color={Colors.light.primary} />
          </View>
          <View style={styles.communityYearBadge}>
            <Text style={styles.communityYearText}>{item.year}</Text>
          </View>
        </View>
        <Text style={styles.communityTitle}>{item.title}</Text>
        <Text style={styles.communityDesc}>{item.description}</Text>
      </View>
    </View>
  );
}

function ContactItem({ icon, label, value, onPress }: { icon: string; label: string; value: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.contactItem, onPress && { opacity: pressed ? 0.7 : 1 }]}>
      <View style={[styles.contactIcon, { backgroundColor: Colors.light.primary + "12" }]}>
        <Ionicons name={icon as any} size={20} color={Colors.light.primary} />
      </View>
      <View style={styles.contactText}>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={styles.contactValue}>{value}</Text>
      </View>
      {onPress && <Ionicons name="chevron-forward" size={16} color={Colors.light.textTertiary} />}
    </Pressable>
  );
}

export default function AboutScreen() {
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const contentMaxWidth = Math.min(windowWidth, 900);
  const webTopInset = isWeb ? 64 : 0;
  const topPadding = isWeb ? webTopInset : insets.top;

  const handleEmail = () => {
    if (Platform.OS !== "web") Haptics.selectionAsync();
    Linking.openURL(`mailto:${companyInfo.contact.email}`);
  };

  const handlePhone = () => {
    if (Platform.OS !== "web") Haptics.selectionAsync();
    Linking.openURL(`tel:${companyInfo.contact.phone}`);
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: isWeb ? 34 : 80 }}
    >
      <LinearGradient
        colors={[Colors.light.primary, Colors.light.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: topPadding + 20 }]}
      >
        <Text style={styles.headerTitle}>Sobre Aldaba</Text>
        <Text style={styles.headerSubtitle}>Nuestra historia, valores y compromiso con Trinidad</Text>
      </LinearGradient>

      <View style={{ maxWidth: contentMaxWidth, alignSelf: "center" as const, width: "100%", paddingHorizontal: 20 }}>
        <View style={styles.aboutCard}>
          <View style={styles.aboutIconWrap}>
            <Ionicons name="information-circle-outline" size={28} color={Colors.light.primary} />
          </View>
          <Text style={styles.aboutTitle}>Quienes Somos</Text>
          <Text style={styles.aboutText}>{companyInfo.description}</Text>
        </View>

        <View style={styles.missionCard}>
          <LinearGradient
            colors={[Colors.light.secondary, Colors.light.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.missionGradient}
          >
            <Ionicons name="flag-outline" size={28} color="#FFFFFF" />
            <Text style={styles.missionLabel}>Nuestra Mision</Text>
            <Text style={styles.missionText}>{companyInfo.mission}</Text>
          </LinearGradient>
        </View>

        <Text style={styles.sectionTitle}>Nuestros Valores</Text>
        <View style={styles.valuesGrid}>
          {companyInfo.values.map((value, index) => (
            <ValueCard key={value} value={value} index={index} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Proyeccion Comunitaria</Text>
        <View style={styles.timeline}>
          {communityProjects.map((item) => (
            <CommunityItem key={item.id} item={item} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Contacto</Text>
        <View style={styles.contactCard}>
          <ContactItem icon="location-outline" label="Direccion" value={companyInfo.contact.address} />
          <View style={styles.contactDivider} />
          <ContactItem icon="call-outline" label="Telefono" value={companyInfo.contact.phone} onPress={handlePhone} />
          <View style={styles.contactDivider} />
          <ContactItem icon="mail-outline" label="Correo" value={companyInfo.contact.email} onPress={handleEmail} />
        </View>

        <View style={styles.footer}>
          <View style={styles.footerLogoWrap}>
            <Text style={styles.footerLogo}>Aldaba</Text>
          </View>
          <Text style={styles.footerText}>{companyInfo.tagline}</Text>
          <Text style={styles.footerLocation}>{companyInfo.location}</Text>
          <View style={styles.footerDivider} />
          <View style={styles.footerUciWrap}>
            <Ionicons name="school-outline" size={16} color={Colors.light.textTertiary} />
            <Text style={styles.footerUci}>Universidad de las Ciencias Informaticas</Text>
          </View>
          <Text style={styles.footerCopy}>Aldaba - Todos los derechos reservados</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  header: { paddingHorizontal: 24, paddingBottom: 30 },
  headerTitle: { fontFamily: "PlayfairDisplay_700Bold", fontSize: 34, color: "#FFFFFF", marginBottom: 6 },
  headerSubtitle: { fontFamily: "DMSans_400Regular", fontSize: 15, color: "rgba(255,255,255,0.9)" },
  aboutCard: { backgroundColor: Colors.light.card, borderRadius: 18, padding: 24, marginTop: 20, borderWidth: 1, borderColor: Colors.light.borderLight, alignItems: "flex-start" as const },
  aboutIconWrap: { width: 52, height: 52, borderRadius: 16, backgroundColor: Colors.light.primary + "12", alignItems: "center" as const, justifyContent: "center" as const, marginBottom: 14 },
  aboutTitle: { fontFamily: "PlayfairDisplay_700Bold", fontSize: 22, color: Colors.light.text, marginBottom: 12 },
  aboutText: { fontFamily: "DMSans_400Regular", fontSize: 14, color: Colors.light.textSecondary, lineHeight: 23 },
  missionCard: { borderRadius: 18, overflow: "hidden" as const, marginTop: 16 },
  missionGradient: { padding: 24, alignItems: "flex-start" as const },
  missionLabel: { fontFamily: "DMSans_600SemiBold", fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 12, textTransform: "uppercase" as const, letterSpacing: 1 },
  missionText: { fontFamily: "DMSans_400Regular", fontSize: 15, color: "#FFFFFF", lineHeight: 24, marginTop: 8 },
  sectionTitle: { fontFamily: "PlayfairDisplay_600SemiBold", fontSize: 22, color: Colors.light.text, marginTop: 28, marginBottom: 16 },
  valuesGrid: { gap: 10 },
  valueCard: { flexDirection: "row" as const, alignItems: "center" as const, backgroundColor: Colors.light.card, borderRadius: 14, padding: 16, gap: 14, borderWidth: 1, borderColor: Colors.light.borderLight },
  valueIcon: { width: 42, height: 42, borderRadius: 12, alignItems: "center" as const, justifyContent: "center" as const },
  valueText: { fontFamily: "DMSans_600SemiBold", fontSize: 15, color: Colors.light.text, flex: 1 },
  timeline: { paddingLeft: 8 },
  communityItem: { flexDirection: "row" as const, marginBottom: 0 },
  timelineDot: { width: 20, alignItems: "center" as const, paddingTop: 6 },
  timelineDotInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.light.primary, borderWidth: 2, borderColor: Colors.light.primary + "35" },
  communityContent: { flex: 1, backgroundColor: Colors.light.card, borderRadius: 14, padding: 16, marginLeft: 12, marginBottom: 12, borderWidth: 1, borderColor: Colors.light.borderLight },
  communityHeader: { flexDirection: "row" as const, alignItems: "center" as const, justifyContent: "space-between" as const, marginBottom: 10 },
  communityIcon: { width: 36, height: 36, borderRadius: 10, alignItems: "center" as const, justifyContent: "center" as const },
  communityYearBadge: { backgroundColor: Colors.light.primary + "15", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  communityYearText: { fontFamily: "DMSans_600SemiBold", fontSize: 12, color: Colors.light.primary },
  communityTitle: { fontFamily: "DMSans_700Bold", fontSize: 15, color: Colors.light.text, marginBottom: 4 },
  communityDesc: { fontFamily: "DMSans_400Regular", fontSize: 13, color: Colors.light.textSecondary, lineHeight: 20 },
  contactCard: { backgroundColor: Colors.light.card, borderRadius: 18, overflow: "hidden" as const, borderWidth: 1, borderColor: Colors.light.borderLight },
  contactItem: { flexDirection: "row" as const, alignItems: "center" as const, padding: 16, gap: 14 },
  contactIcon: { width: 42, height: 42, borderRadius: 12, alignItems: "center" as const, justifyContent: "center" as const },
  contactText: { flex: 1 },
  contactLabel: { fontFamily: "DMSans_500Medium", fontSize: 12, color: Colors.light.textTertiary, marginBottom: 2 },
  contactValue: { fontFamily: "DMSans_600SemiBold", fontSize: 14, color: Colors.light.text },
  contactDivider: { height: 1, backgroundColor: Colors.light.borderLight, marginHorizontal: 16 },
  footer: { marginTop: 36, alignItems: "center" as const, paddingVertical: 28 },
  footerLogoWrap: { marginBottom: 12 },
  footerLogo: { fontFamily: "PlayfairDisplay_700Bold", fontSize: 30, color: Colors.light.primary },
  footerText: { fontFamily: "DMSans_400Regular", fontSize: 13, color: Colors.light.textSecondary, textAlign: "center" as const, paddingHorizontal: 20, lineHeight: 20 },
  footerLocation: { fontFamily: "DMSans_500Medium", fontSize: 12, color: Colors.light.secondary, marginTop: 6 },
  footerDivider: { height: 1, backgroundColor: Colors.light.border, width: "60%", marginVertical: 18 },
  footerUciWrap: { flexDirection: "row" as const, alignItems: "center" as const, gap: 6, marginBottom: 8 },
  footerUci: { fontFamily: "DMSans_500Medium", fontSize: 12, color: Colors.light.textSecondary, textAlign: "center" as const },
  footerCopy: { fontFamily: "DMSans_400Regular", fontSize: 11, color: Colors.light.textTertiary },
});
