import { useColorScheme } from "@/hooks/use-color-scheme";
import { CustomDrawerContent } from "@/shared/components/CustomDrawerContent";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import Drawer from "expo-router/drawer";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded, error] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <GestureHandlerRootView>
      <Drawer
        screenOptions={{ headerShown: false }}
        drawerContent={(props: DrawerContentComponentProps) => (
          <CustomDrawerContent {...props} />
        )}
      >
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
