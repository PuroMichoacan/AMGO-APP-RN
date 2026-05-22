import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CargaCoilcar from "./CargaCoilcar";
import PlanificacionSet from "./PlanificacionSet";
import PosicionamientoSets from "./PosicionamientoSets";

type TabType = "Posicionamiento" | "Carga" | "Planificacion sets";

const ProcesoCarga = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Posicionamiento");

  return (
    <View className="flex-1 bg-white">
      {/* Tabs */}

      <LinearGradient
        className="flex-row border-b"
        colors={["#be2878", "#e63c41", "#460a78"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <TouchableOpacity
          className="flex-1 p-1"
          onPress={() => setActiveTab("Posicionamiento")}
        >
          <Text className="text-white text-center font-bold">
            Posicionamiento
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 p-1"
          onPress={() => setActiveTab("Carga")}
        >
          <Text className="text-white text-center font-bold">Carga</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 p-1"
          onPress={() => setActiveTab("Planificacion sets")}
        >
          <Text className="text-white text-center font-bold">
            Planificacion sets
          </Text>
        </TouchableOpacity>
      </LinearGradient>
      {/* <View className="flex-row border-b border-gray-200">
        <TouchableOpacity
          className="flex-1 p-4"
          onPress={() => setActiveTab("Posicionamiento")}
        >
          <Text>Posicionamiento</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 p-4"
          onPress={() => setActiveTab("Carga")}
        >
          <Text>Carga</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 p-4"
          onPress={() => setActiveTab("Planificacion sets")}
        >
          <Text>Planificacion sets</Text>
        </TouchableOpacity>
      </View> */}

      <View className="flex-1">
        {activeTab === "Posicionamiento" && <PosicionamientoSets />}

        {activeTab === "Carga" && <CargaCoilcar />}

        {activeTab === "Planificacion sets" && <PlanificacionSet />}
      </View>
    </View>
  );
};

export default ProcesoCarga;

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
