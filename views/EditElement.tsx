import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { Product } from "../types/Product";
import { getProductById, updateProduct } from "../services/products";
import { Picker } from "@react-native-picker/picker";
import { useMeasures } from "../hooks/useMeasures";

const EditElement = ({ id, onModificado }) => {
  const [product, setProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    unit_id: 1,
  });
  const { units } = useMeasures();
  const handleChangeText = (name, value) => {
    setProduct({ ...product, [name]: value });
  };

  function limpiarCampos() {
    setProduct({ name: "", price: 0, unit_id: 1 });
  }

  const getProduct = async () => {
    try {
      const data = await getProductById(id);
      if (data) {
        const { name, price, unit_id } = data;
        setProduct({ name, price, unit_id });
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const saveElementModified = async () => {
    if (product.name === "") alert("Debes ingresar un nombre");
    else {
      try {
        //guardamos el elemento modificado en la base de datos
        const success = await updateProduct(id, {
          name: product.name,
          price: parseFloat(product.price.toString()),
          unit_id: product.unit_id,
        });
        if (success) {
          ToastAndroid.show("Se modificó el elemento", ToastAndroid.SHORT);
          onModificado();
        } else alert("Error al modificar el producto");
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
          onChangeText={(value) => handleChangeText("name", value)}
          defaultValue={product.name}
        />
        <Picker
          selectedValue={product.unit_id}
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
          defaultValue={product.price.toString()}
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
    width: "100%",
  },
  picker: { height: 50, marginBottom: 10 },
});

export default EditElement;
