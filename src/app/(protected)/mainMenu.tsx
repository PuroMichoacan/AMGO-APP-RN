import { goTo } from "@/core/navigation/route-resolver";
import { getModulosAsync } from "@/modules/auth/actions/auth-actions";
import { useAuthStore } from "@/modules/auth/store/useAuthStore";
import {
  BannerAppDTO,
  getBannerCarrouselAsync,
} from "@/modules/mainMenu/mainMenu-actions";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  LayoutAnimation,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const mainMenu = () => {
  const [expandedModule, setExpandedModule] = useState(null);

  const modulos = useAuthStore((state) => state.modulos);
  const ensureModulos = useAuthStore((state) => state.ensureModulos);
  const setModulos = useAuthStore((state) => state.setModulos); // para refresh forzado
  const [refreshing, setRefreshing] = useState(false);
  const [banners, setBanners] = useState<BannerAppDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleAccordion = (id: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedModule(expandedModule === id ? null : id);
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const data = await getBannerCarrouselAsync();
      setBanners(data);

      const user = useAuthStore.getState().user;

      if (user?.email) {
        const freshModulos = await getModulosAsync(user.email);
        await setModulos(freshModulos);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const data = await getBannerCarrouselAsync();
        setBanners(data);

        await ensureModulos();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "Menu principal" }} />

      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar barStyle="light-content" />

        {/* HEADER PERSONALIZADO */}
        {/* <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-gray-100">
          <View>
            <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest">Bienvenido a</Text>
            <Text className="text-[#460a78] text-2xl font-black">ArcelorMittal</Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-[#be2878] items-center justify-center">
            <Settings color="white" size={20} />
          </View>
        </View> */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* CARRUSEL SPECTACULAR */}

          <View className="m-4">
            {loading ? (
              <Text>Cargando banners...</Text>
            ) : (
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
              >
                {banners.map((item) => (
                  <View
                    key={item.idSeguridadBanner}
                    className="mr-4 overflow-hidden rounded-3xl shadow-lg bg-white"
                    style={{ width: width * 0.82, height: 200 }}
                  >
                    <Image
                      source={{
                        uri:
                          "https://portal.arcelormittal.com.mx/banner/" +
                          item.imagen,
                      }}
                      className="absolute w-full h-full opacity-90"
                    />
                    {/* <View className="flex-1 p-6 justify-end bg-black/30">
                    <Text className="text-white text-xl font-bold">
                      {item.nombre}
                    </Text>
                    <Text className="text-white/80 text-sm">{item.subtitle}</Text>
                  </View> */}
                  </View>
                ))}
              </ScrollView>
            )}
          </View>

          {/* SECCIÓN DE MÓDULOS (ACORDEÓN) */}
          <View className="px-6 mt-8 mb-10">
            <Text className="text-gray-800 text-lg font-bold mb-4">
              Módulos Operativos
            </Text>

            {loading ? (
              <Text className="text-center mt-10">Cargando modulos</Text>
            ) : modulos.length === 0 ? (
              <View className="items-center justify-center py-10">
                <Text className="text-gray-400 text-sm text-center">
                  No tienes módulos asignados.
                </Text>
                <Text className="text-gray-300 text-xs mt-2 text-center">
                  Desliza hacia abajo para actualizar.
                </Text>
              </View>
            ) : (
              modulos.map((module) => {
                const isOpen = expandedModule === module.idModulo;
                // const Icon = module.icono;

                return (
                  <View
                    key={module.idModulo}
                    className={`mb-3 overflow-hidden rounded-2xl border ${isOpen ? "border-[#be2878] bg-white" : "border-gray-200 bg-white"} shadow-sm`}
                  >
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => toggleAccordion(module.idModulo)}
                      className="flex-row items-center justify-between p-5"
                    >
                      <View className="flex-row items-center">
                        <View
                          className="p-2 rounded-xl mr-4"
                          style={{
                            backgroundColor: isOpen ? "#be2878" : "#f3f4f6",
                          }}
                        >
                          {/* <Icon color={isOpen ? "white" : "#460a78"} /> */}
                          <MaterialIcons name="check" />
                        </View>
                        <Text
                          className={`text-base font-semibold ${isOpen ? "text-[#be2878]" : "text-gray-700"}`}
                        >
                          {module.nombre}
                        </Text>
                      </View>
                      {isOpen ? (
                        <ChevronUp size={20} color="#be2878" />
                      ) : (
                        <ChevronDown size={20} color="#9ca3af" />
                      )}
                    </TouchableOpacity>

                    {isOpen && (
                      <View className="bg-gray-50 px-5 pb-4">
                        {module.pantallas.map((option, index) => (
                          // aqui necesito hacer la navegacion
                          <TouchableOpacity
                            key={index}
                            onPress={() => goTo(option.codigoPantalla)}
                            className="flex-row items-center justify-between py-3 border-t border-gray-100"
                          >
                            {/* {IconRegistry[option.nombreIcono]} */}
                            <Text className="text-gray-600 text-sm font-medium">
                              {option.nombrePantalla}
                            </Text>
                            <ArrowRight size={16} color="#f58746" />
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default mainMenu;
