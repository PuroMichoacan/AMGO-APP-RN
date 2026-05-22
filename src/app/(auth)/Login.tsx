import { useAuthStore } from "@/modules/auth/store/useAuthStore";
import { ThemeText } from "@/shared/components/ThemeText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export default function Login() {
  const [env, setEnv] = useState<"calidad" | "produccion" | "Desarrollo">(
    "produccion",
  );

  const { login, setEnvironment } = useAuthStore();

  const mapEnv = {
    calidad: "QAS",
    produccion: "PROD",
    Desarrollo: "DEV",
  } as const;

  const [isPosting, setIsPosting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    const { email, password } = form;

    if (email.length === 0 || password.length === 0) {
      Alert.alert(
        "Campos incompletos",
        "Verifica que la informacion este completa",
      );
      return;
    }
    setEnvironment(mapEnv[env]);

    setIsPosting(true);
    const wasSuccesful = await login(email, password);
    console.log(wasSuccesful);
    setIsPosting(false);

    if (wasSuccesful) {
      // router.replace("/mainMenu");
      router.replace("/(protected)/mainMenu");
      return;
    }

    Alert.alert("Error", "Usuario o contraseña no son correctos");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient
        colors={["#460a78", "#be2878", "#e63c41", "#f58746", "#ffbe6e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 items-center justify-center"
      >
        <View className="w-[90%] max-w-[400px] rounded-[30px] border border-white/20 bg-white/10 px-6 py-10">
          {/* Logo */}

          <View className="items-center mb-10">
            <ThemeText className="text-white text-2xl font-bold">
              ArcelorMittal
            </ThemeText>
            <ThemeText className="text-white font-poppinRegular text-[10px] tracking-[3px] opacity-80">
              México
            </ThemeText>
          </View>

          <ThemeText className="text-white text-lg font-light text-center mb-6 opacity-90">
            Inicia sesión en tu cuenta
          </ThemeText>

          {/* Selector de ambiente */}
          <View className="flex-row bg-black/20 rounded-xl p-1 mb-6 relative">
            <Pressable
              onPress={() => setEnv("calidad")}
              className={`flex-1 py-2 rounded-lg ${
                env === "calidad" ? "bg-white/20" : ""
              }`}
            >
              <ThemeText className="text-center text-white font-semibold text-xs">
                CALIDAD
              </ThemeText>
            </Pressable>

            <Pressable
              onPress={() => setEnv("produccion")}
              className={`flex-1 py-2 rounded-lg ${
                env === "produccion" ? "bg-white/20" : ""
              }`}
            >
              <ThemeText className="text-center text-white font-semibold text-xs">
                PRODUCCIÓN
              </ThemeText>
            </Pressable>

            <Pressable
              onPress={() => setEnv("Desarrollo")}
              className={`flex-1 py-2 rounded-lg ${
                env === "Desarrollo" ? "bg-white/20" : ""
              }`}
            >
              <ThemeText className="text-center text-white font-semibold text-xs">
                DESARROLLO
              </ThemeText>
            </Pressable>
          </View>

          {/* Inputs */}
          <View className="mb-4">
            <TextInput
              placeholder="Correo electrónico"
              placeholderTextColor="#666"
              keyboardType="email-address"
              value={form.email}
              className="bg-white rounded-xl px-4 py-4 text-base text-gray-800"
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
          </View>

          <View className="mb-6">
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor="#666"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
              className="bg-white rounded-xl px-4 py-4 text-base text-gray-800"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4"
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {/* Botón */}
          <Pressable
            onPress={onLogin}
            disabled={isPosting}
            className="bg-white rounded-xl py-4 active:scale-95"
          >
            <ThemeText className="text-center text-ampurple font-extrabold tracking-widest">
              INGRESAR
            </ThemeText>
          </Pressable>

          {/* Versión */}
          <ThemeText className="text-white text-[10px] text-center mt-8 opacity-60">
            v1.6.9 • Digital Transformation Team
          </ThemeText>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
