import { useEffect, useState } from "react";
import { productos } from "../config/Productos";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import appFirebase from "../credentialsFirebase";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const db = getFirestore(appFirebase);

const EditElement = ({ id, onModificado }) => {
  const [product, setProduct] = useState({
    id: "",
    nombre: "",
    precio: "",
  });

  const handleChangeText = (name, value) => {
    setProduct({ ...product, [name]: value });
  };

  function limpiarCampos() {
    setProduct({ id: "", nombre: "", precio: "" });
  }

  const getProduct = async () => {
    try {
      const docRef = doc(db, "productos", id);
      const docSnap = await getDoc(docRef);
      const { docId, nombre, precio } = docSnap.data();
      setProduct({ id: docId, nombre, precio });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const saveElementModified = async () => {
    if (product.nombre === "") alert("Debes ingresar un nombre");
    else {
      try {
        //guardamos el elemento modificado en la base de datos
        await updateDoc(doc(db, "productos", id), {
          nombre: product.nombre,
          precio: product.precio,
        });
        //Se envia la señal de que se guardo para que se cierre
        ToastAndroid.show("Se modificó el elemento", ToastAndroid.SHORT);
        onModificado();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Producto</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={(value) => handleChangeText("nombre", value)}
          defaultValue={product.nombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          onChangeText={(value) => handleChangeText("precio", value)}
          keyboardType="numeric" // Teclado numérico para el precio
          defaultValue={product.precio.toString()}
        />
      </View>
      <View style={styles.buttonGroup}>
        <Button title="Modificar" onPress={saveElementModified} />
        <Button color={"red"} title="Cancelar" onPress={limpiarCampos} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  buttonGroup: {
    flexDirection: "row", // Para colocar los botones en fila
    justifyContent: "space-between", // Para que haya espacio entre los botones
    width:"100%"
  },
});

export default EditElement;
