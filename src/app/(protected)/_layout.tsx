import { useAuthStore } from "@/modules/auth/store/useAuthStore";
import AppHeader from "@/shared/components/AppHeader";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  const { status, checkStatus } = useAuthStore();

  if (status === "unauthenticated") {
    return <Redirect href="/(auth)/Login" />;
  }

  return (
    // <Stack
    //   screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    // />

    <Stack
      screenOptions={{
        /*
          USAR CUSTOM HEADER
        */
        header: ({ route, options, navigation }) => {
          return (
            <AppHeader
              title={options.title ?? ""}
              // canGoBack={navigation.canGoBack()}
            />
          );
        },
      }}
    />
  );
}
