import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
       {/* <Stack screenOptions={{ headerShown: false }} /> */}
       <Stack
       initialRouteName="Splash" 
        screenOptions={{
          headerTransparent: true,        
          headerTitle: '',               
          headerShadowVisible: false,     
          headerTintColor: '#fff',       
        }}
      />
      <Toast /> 
    </>
  );
}
