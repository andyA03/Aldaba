import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet, View, Text, Pressable, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import Colors from "@/constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const WEB_NAV_HEIGHT = 64;

const NAV_ITEMS = [
  { name: "index", label: "Inicio", icon: "home" as const, iconOutline: "home-outline" as const },
  { name: "services", label: "Servicios", icon: "business" as const, iconOutline: "business-outline" as const },
  { name: "excursions", label: "Excursiones", icon: "map" as const, iconOutline: "map-outline" as const },
  { name: "events", label: "Eventos", icon: "sparkles" as const, iconOutline: "sparkles-outline" as const },
  { name: "about", label: "Nosotros", icon: "information-circle" as const, iconOutline: "information-circle-outline" as const },
];

function WebTopNav({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={webNavStyles.bar}>
      <View style={webNavStyles.inner}>
        <Pressable onPress={() => navigation.navigate("index")} style={webNavStyles.logoWrap}>
          <Text style={webNavStyles.logoText}>Aldaba</Text>
          <Text style={webNavStyles.logoSub}>Trinidad · Cuba</Text>
        </Pressable>
        <View style={{ flex: 1 }} />
        <View style={webNavStyles.links}>
          {NAV_ITEMS.map((item, idx) => {
            const active = state.index === idx;
            return (
              <Pressable
                key={item.name}
                onPress={() => navigation.navigate(item.name)}
                style={({ hovered }: any) => [webNavStyles.linkWrap, hovered && webNavStyles.linkWrapHovered]}
              >
                <Text style={[webNavStyles.linkText, active && webNavStyles.linkActive]}>
                  {item.label}
                </Text>
                {active && <View style={webNavStyles.linkUnderline} />}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

function MobileTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isIOS = Platform.OS === "ios";

  return (
    <View
      style={[
        mobileTabStyles.bar,
        {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: isDark ? "#0C1524" : Colors.light.card,
        },
      ]}
    >
      {isIOS && (
        <BlurView
          intensity={80}
          tint={isDark ? "dark" : "light"}
          style={StyleSheet.absoluteFill}
        />
      )}
      {state.routes.map((route, idx) => {
        const focused = state.index === idx;
        const item = NAV_ITEMS[idx];
        return (
          <Pressable
            key={route.key}
            style={mobileTabStyles.tab}
            onPress={() => navigation.navigate(route.name)}
          >
            <View style={[mobileTabStyles.iconWrap, focused && mobileTabStyles.iconWrapActive]}>
              <Ionicons
                name={focused ? item.icon : item.iconOutline}
                size={22}
                color={focused ? Colors.light.primary : Colors.light.tabIconDefault}
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) =>
        Platform.OS === "web" ? <WebTopNav {...props} /> : <MobileTabBar {...props} />
      }
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="services" />
      <Tabs.Screen name="excursions" />
      <Tabs.Screen name="events" />
      <Tabs.Screen name="about" />
    </Tabs>
  );
}

const webNavStyles = StyleSheet.create({
  bar: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    height: WEB_NAV_HEIGHT,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    zIndex: 100,
    shadowColor: "#1B4F8A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  inner: {
    flex: 1,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    maxWidth: 1100,
    alignSelf: "center" as const,
    width: "100%",
    paddingHorizontal: 32,
    height: WEB_NAV_HEIGHT,
  },
  logoWrap: {
    flexDirection: "column" as const,
    justifyContent: "center" as const,
  },
  logoText: {
    fontFamily: "PlayfairDisplay_700Bold",
    fontSize: 22,
    color: Colors.light.primary,
    letterSpacing: 1,
    lineHeight: 26,
  },
  logoSub: {
    fontFamily: "DMSans_400Regular",
    fontSize: 10,
    color: Colors.light.secondary,
    letterSpacing: 0.8,
    lineHeight: 14,
  },
  links: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },
  linkWrap: {
    paddingHorizontal: 16,
    height: WEB_NAV_HEIGHT,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    position: "relative" as const,
  },
  linkWrapHovered: {
    backgroundColor: Colors.light.primary + "08",
  },
  linkText: {
    fontFamily: "DMSans_500Medium",
    fontSize: 14,
    color: Colors.light.text,
    letterSpacing: 0.2,
  },
  linkActive: {
    color: Colors.light.primary,
    fontFamily: "DMSans_700Bold",
  },
  linkUnderline: {
    position: "absolute" as const,
    bottom: 0,
    left: 10,
    right: 10,
    height: 3,
    backgroundColor: Colors.light.primary,
    borderRadius: 2,
  },
});

const mobileTabStyles = StyleSheet.create({
  bar: {
    flexDirection: "row" as const,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    position: "relative" as const,
  },
  tab: {
    flex: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  iconWrap: {
    width: 44,
    height: 36,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderRadius: 12,
  },
  iconWrapActive: {
    backgroundColor: Colors.light.primary + "15",
  },
});
