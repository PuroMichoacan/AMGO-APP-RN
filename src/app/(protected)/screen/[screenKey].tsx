import { getScreenDefinition } from "@/core/navigation/helpers/getScreenDefinition";
import AppHeader from "@/shared/components/AppHeader";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DynamicScreenPage() {
  const { screenKey } = useLocalSearchParams<{
    screenKey: string;
  }>();

  // Obtener definicion
  const screenDefinition = getScreenDefinition(screenKey);

  if (!screenDefinition) {
    console.log("Screen key", screenKey);
    console.log("Screen definition", screenDefinition);

    return (
      <View className="flex-1 justify-center items-center">
        <Text>Pantalla no encontrada</Text>
      </View>
    );
  }

  const ScreenComponent = screenDefinition.component;

  return (
    <>
      <Stack.Screen
        options={{
          title: screenDefinition.titulo,

          header: () => (
            <AppHeader
              title={screenDefinition.titulo}
              canGoBack={screenDefinition.canGoBack}
              showDrawerButton={screenDefinition.showDrawer}
            />
          ),
        }}
      />
      <ScreenComponent />
    </>
  );
}
