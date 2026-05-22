import AppHeader from "@/shared/components/AppHeader";
import { CustomDrawerContent } from "@/shared/components/CustomDrawerContent";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import React from "react";
const isAuthenticated = false;

export default function AppLayout() {
  return (
    <Drawer
      screenOptions={{ headerShown: true }}
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} />
      )}
    >
      <Drawer.Screen
        name="mainMenu"
        options={{ header: () => <AppHeader title="Menu principal" /> }}
      />
    </Drawer>
  );
}
