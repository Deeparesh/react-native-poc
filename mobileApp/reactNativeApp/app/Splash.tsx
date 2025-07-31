// app/splash.tsx
import { useEffect } from "react";
import { ImageBackground, StyleSheet, View, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/"); // or just "/" if Index is root
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/homeBg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.center}>
        <Animatable.Image
          animation="zoomIn"
          duration={1500}
          source={require("../assets/images/logoWhite.png")} // your logo/mascot
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});
