import { Colors } from "@/constants/theme";
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemeText } from "./ThemeText";
export function CustomDrawerContent(props: DrawerContentComponentProps) {


    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>

            <View className="flex flex-row justify-between">
                <ThemeText>AMGO</ThemeText>
                <View className="flex flex-row gap-5">
                    <Ionicons name="notifications" size={22} color={Colors.red} />
                    <Ionicons name="sync" size={22} color={Colors.red} />
                </View>


            </View>
            <View style={{ flex: 1, paddingTop: 10 }}>
                <DrawerItemList {...props} />
            </View>
            <View style={styles.drawerFooter}>
                <TouchableOpacity style={styles.logoutBtn}>
                    <Ionicons name="log-out-outline" size={22} color={Colors.red} />
                    <ThemeText style={styles.logoutText}>Cerrar Sesión</ThemeText>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    drawerHeader: { padding: 40, paddingTop: 60, marginBottom: 10 },
    drawerHeaderText: { color: 'white', fontSize: 28, fontWeight: '800' },
    drawerFooter: { padding: 20, borderTopWidth: 1, borderTopColor: '#EEE' },
    logoutBtn: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 12, borderEndColor: '#eee', borderWidth: 1, borderColor: Colors.red },
    logoutText: { color: Colors.red, fontWeight: '700', marginLeft: 10 },
});