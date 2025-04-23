import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import Picker
import appFirebase from "../credentialsFirebase";
import { getFirestore } from "firebase/firestore";
import { Product } from "../types/Product";
import { createProduct } from "../services/products";
import { useMeasures } from "../hooks/useMeasures";

const db = getFirestore(appFirebase);

const CreateElement = ({ navigation, onGuardado }) => {
  const defaultProducto: Omit<Product, "id"> = {
    name: "",
    price: 0,
    unit_id: 1,
  };
  const [state, setstate] = useState(defaultProducto);
  const [loading, setLoading] = useState(false);

  const { units } = useMeasures();

  const handleChangeText = (name, value) => {
    setstate({ ...state, [name]: value });
  };

  const saveNewElement = async () => {
    if (state.name === "") alert("Debes ingresar un nombre");
    else {
      try {
        setLoading(true);

        //guardamos en supabase
        const success = await createProduct({
          name: state.name,
          price: parseFloat(state.price.toString()),
          unit_id: state.unit_id,
        });

        if (success) {
          //Se envia la señal de que se guardo para que se cierre
          ToastAndroid.show("Se guardó el elemento", ToastAndroid.SHORT);
          if (onGuardado) onGuardado();
          else navigation.goBack();
        } else alert("Error al guardar el producto");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Producto</Text>
      <ActivityIndicator animating={loading} size={"large"} />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={(value) => handleChangeText("name", value)}
        />
        <Picker
          selectedValue={state.unit_id}
          onValueChange={(value) => handleChangeText("unit_id", value)}
          style={styles.picker}
        >
          {units.map((unit) => (
            <Picker.Item key={unit.id} label={unit.name} value={unit.id} />
          ))}
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Precio"
          onChangeText={(value) => handleChangeText("price", value)}
          keyboardType="numeric" // Teclado numérico para el precio
        />
      </View>
      <Button title="Guardar" onPress={saveNewElement} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor:"red",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: { height: 50, marginBottom: 10 },
});

export default CreateElement;
