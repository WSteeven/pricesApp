import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  TextInput,
  ToastAndroid,
  ScrollView,
} from "react-native";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Feather";
import CreateElement from "./CreateElement";
import ModalComponent from "../components/ModalComponent";
import EditElement from "./EditElement";
import { useProducts } from "../hooks/useProducts";

const ElementsList = ({ navigation, route }) => {
  const [textABuscar, setTextABuscar] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [component, setComponent] = useState(null);
  const [idProduct, setIdElement] = useState(null);
  const [scannedBarcode, setScannedBarcode] = useState("");
  const [method, setMethod] = useState("create");

  useEffect(() => {
    if (route.params?.scannedBarcode) {
      setScannedBarcode(route.params.scannedBarcode);
      setMethod(route.params.method || "create");
      if (method === "edit") {
        editarElemento();
      }
    }
  });
  const {
    products: productos,
    listadoProductos,
    eliminarProducto,
    filtrarProductos,
    refetchProductos,
  } = useProducts();

  const handleRowPress = (id) => {
    setIdElement(id); // Actualiza el ID del producto seleccionado
  };

  function crearElemento() {
    setComponent(
      <CreateElement navigation={navigation} onGuardado={cerrarModal} />
    );
    abrirModal();
  }

  function abrirModal() {
    setModalVisible(true);
  }

  function cerrarModal() {
    setModalVisible(false);
    refetchProductos();
    filtrarProductos(textABuscar, productos);
  }

  function editarElemento() {
    if (!idProduct) {
      ToastAndroid.show(
        "Selecciona un producto para editar",
        ToastAndroid.SHORT
      );
      return;
    }
    setComponent(
      <EditElement
        id={idProduct}
        onModificado={cerrarModal}
        scannedBarcode={scannedBarcode}
        navigation={navigation}
      />
    );
    abrirModal();
  }

  function eliminarElemento() {
    if (!idProduct) {
      ToastAndroid.show(
        "Selecciona un producto para eliminar",
        ToastAndroid.SHORT
      );
      return;
    }
    Alert.alert(
      "Confirmación",
      "¿Estás segur@ que deseas eliminar el elemento?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await eliminarProducto(idProduct);
            ToastAndroid.show("Elemento eliminado", ToastAndroid.SHORT);
            refetchProductos();
            setIdElement(null); // Limpia el ID seleccionado
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.fixToText}>
        <Text style={{ paddingTop: 5, paddingStart: 5 }}>
          Listado de Productos
        </Text>
        <Text>
          <Pressable
            onPress={() => navigation.navigate("BarcodeScannerScreen")}
          >
            <Ionicons name="barcode-outline" size={25} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("MenuPrincipal")}>
            <Icon name="home" size={25} />
          </Pressable>
        </Text>
      </View>

      <TextInput
        onChangeText={(val) => filtrarProductos(val, productos)}
        style={styles.input}
        placeholder="Buscar"
        defaultValue={textABuscar}
      ></TextInput>
      <View style={styles.botonesCrud}>
        <Pressable onPress={() => crearElemento()}>
          <Ionicons name="add-circle" size={30} color="#12ff" />
        </Pressable>
        <Pressable onPress={() => editarElemento()}>
          <Icon name="edit" size={30} color="#FFC55A" />
        </Pressable>
        <Pressable onPress={() => eliminarElemento()}>
          <Icon name="trash-2" size={30} color="red" />
        </Pressable>
      </View>

      {/* Tabla */}
      <ScrollView>
        <View style={styles.table}>
          {/* Encabezados de la tabla */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.headerCell]}>Nombre</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Unidad</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Precio</Text>
          </View>

          {/* Filas de la tabla */}
          {listadoProductos.map((producto) => (
            <Pressable
              key={producto.id}
              onPress={() => handleRowPress(producto.id)}
              style={[
                styles.tableRow,
                idProduct === producto.id && styles.selectedRow, // Resalta la fila seleccionada
              ]}
            >
              <Text style={styles.tableCell}>{producto.name}</Text>
              <Text style={styles.tableCell}>
                {producto.units_measures?.abbreviation.toUpperCase() || ""}
              </Text>
              <Text style={styles.tableCell}>
                $ {producto.price.toFixed(2)}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Modal */}
      <ModalComponent
        modalVisible={modalVisible}
        onClose={cerrarModal}
        modalContent={component}
      />
    </View>
  );
};

export default ElementsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  botonesCrud: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
  },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#e0e0e0",
  },
  selectedRow: {
    backgroundColor: "#d0f0c0", // Color para la fila seleccionada
  },
});
