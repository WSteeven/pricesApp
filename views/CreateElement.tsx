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
import { productos } from "../config/Productos";
import { encontrarUltimoIdListado } from "../config/utils";
import appFirebase from "../credentialsFirebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(appFirebase);

const CreateElement = ({ navigation, onGuardado }) => {
  const defaultProducto = {
    id: 0,
    nombre: "",
    precio: "",
    categoria: "",
  };
  const [state, setstate] = useState(defaultProducto);
  const [loading, setLoading] = useState(false);

  const handleChangeText = (name, value) => {
    setstate({ ...state, [name]: value });
  };

  const saveNewElement = async () => {
    if (state.nombre === "") alert("Debes ingresar un nombre");
    else {
      try {
        setLoading(true);
        //guardamos el elemento en el array
        productos.push({
          id: productos.length ? encontrarUltimoIdListado(productos) + 1 : 1,
          nombre: state.nombre,
          precio: parseFloat(state.precio),
          categoria: "varios",
        });

        //guardamos en firebase
        await addDoc(collection(db, "productos"), { ...state });

        //Se envia la señal de que se guardo para que se cierre
        ToastAndroid.show("Se guardó el elemento", ToastAndroid.SHORT);
        if (onGuardado !== undefined) onGuardado();
        else navigation.goBack();
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
          onChangeText={(value) => handleChangeText("nombre", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          onChangeText={(value) => handleChangeText("precio", value)}
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
});

export default CreateElement;
