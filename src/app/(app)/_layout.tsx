import AppHeader from "@/modules/components/AppHeader";
import { CustomDrawerContent } from "@/modules/components/CustomDrawerContent";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import React from 'react';
const isAuthenticated = false;

export default function AppLayout() {

  // obtener modulos y pantalllas asignadas al usuario

  return (
    <Drawer screenOptions={{ headerShown: true }}
      drawerContent={(props: DrawerContentComponentProps) => <CustomDrawerContent {...props}/>}
    >
      {/* Esta pantalla siempre existira, no es dinamica, esta pantalla es compartida por todas las apps */}
      <Drawer.Screen name='mainMenu' options={{ header : () => <AppHeader title="Menu principal"/> }} />

      {/* Cuando el usuario logea y tiene pantallas asignadas se cargan abajo como modulos */}

    </Drawer>
  )
}