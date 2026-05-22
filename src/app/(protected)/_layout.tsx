import { useAuthStore } from "@/modules/auth/store/useAuthStore";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  const { status, checkStatus } = useAuthStore();

  if (status === "unauthenticated") {
    return <Redirect href="/(auth)/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
