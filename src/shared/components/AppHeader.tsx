import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeText } from "./ThemeText";

interface AppHeaderProps {
  title?: string;
  onNotificationsPress?: () => void;
  onSyncPress?: () => void;
  canGoBack?: boolean;
  showDrawerButton?: boolean;
}

export default function AppHeader({
  title,
  onNotificationsPress,
  onSyncPress,
  canGoBack = false,
  showDrawerButton = true,
}: AppHeaderProps) {
  const router = useRouter();

  // Optener notificaciones aqui

  // return (
  //     <SafeAreaView className="bg-ampurple-900 h-[70px]">
  //         <View className="flex flex-row items-center px-3">
  //             {/* Botón menú */}
  //             <DrawerToggleButton tintColor="white" />
  //             {/* Centro y derecha */}
  //             <View className="flex-1 flex-row items-center justify-between">

  //                 {/* Título */}
  //                 <ThemeText className="text-white text-lg font-semibold">
  //                     {title}
  //                 </ThemeText>

  //                 {/* Acciones */}
  //                 <View className="flex flex-row gap-5">
  //                     <Ionicons name="notifications" size={22} color="white" />
  //                     <Ionicons name="sync" size={22} color="white" />
  //                 </View>
  //             </View>
  //         </View>
  //     </SafeAreaView>
  // );

  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "#460a78" }}>
      <LinearGradient
        colors={["#460a78", "#be2878", "#e63c41", "#f58746", "#ffbe6e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {/* Botón izquierdo */}

        {showDrawerButton && canGoBack === false ? (
          <View style={styles.side}>
            <DrawerToggleButton tintColor="white" />
          </View>
        ) : (
          <TouchableOpacity onPress={() => router.back()} className="mr-3 ml-5">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        )}

        {/* Título centrado absolutamente */}
        <View style={styles.titleContainer} pointerEvents="none">
          <ThemeText style={styles.title} numberOfLines={1}>
            {title}
          </ThemeText>
        </View>
        {/* Acciones derecha */}
        <View style={[styles.side, styles.sideRight]}>
          <Ionicons
            name="notifications-outline"
            size={22}
            color="white"
            onPress={onNotificationsPress}
          />
          <Ionicons
            name="sync-outline"
            size={22}
            color="white"
            onPress={onSyncPress}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gradient: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  side: {
    width: 80, // ancho fijo igual en ambos lados → título siempre centrado
    justifyContent: "center",
  },
  sideRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 16,
    paddingRight: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
