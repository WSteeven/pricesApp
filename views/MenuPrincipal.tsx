import { Button, Text, View } from "react-native";

const MenuPrincipal = ({ navigation }) => {
  return (
    <View>
      <Text>Menú de opciones</Text>
      <Button
        title="Listado"
        onPress={() => navigation.navigate("ElementsList")}
      />
      <Button
        title="Nuevo"
        onPress={() => navigation.navigate("CreateElement")}
      />
    </View>
  );
};

export default MenuPrincipal;
