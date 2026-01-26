import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeText } from "./ThemeText";
export default function AppHeader({ title }: { title?: string }) {

    // Optener notificaciones aqui

    return (
        <SafeAreaView className="bg-ampurple-900">
            <View className="flex flex-row items-center px-3">
                {/* Botón menú */}
                <DrawerToggleButton tintColor="white" />
                {/* Centro y derecha */}
                <View className="flex-1 flex-row items-center justify-between">

                    {/* Título */}
                    <ThemeText className="text-white text-lg font-semibold">
                        {title}
                    </ThemeText>

                    {/* Acciones */}
                    <View className="flex flex-row gap-5">
                        <Ionicons name="notifications" size={22} color="white" />
                        <Ionicons name="sync" size={22} color="white" />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );


}