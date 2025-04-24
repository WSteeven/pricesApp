// Dependencias
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

//Components
import MenuPrincipal from "./views/MenuPrincipal";
import ElementsList from "./views/ListElement";
import CreateElement from "./views/CreateElement";

//Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BarcodeScannerScreen from "./views/BarcodeScannerScreen";

const Stack = createNativeStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#121FF7",
        },
        headerTintColor: "#ffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="ElementsList"
        component={ElementsList}
        options={{ title: "Listado de ítems" }}
      />
      <Stack.Screen
        name="MenuPrincipal"
        component={MenuPrincipal}
        options={{ title: "Menú principal" }}
      />
      <Stack.Screen
        name="CreateElement"
        component={CreateElement}
        options={{ title: "Crear ítem" }}
      />
      <Stack.Screen 
        name="BarcodeScannerScreen" 
        component={BarcodeScannerScreen} 
        options={{title:"Escanear código de barras"}} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
