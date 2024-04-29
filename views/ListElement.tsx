import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  TextInput,
  ToastAndroid,
} from "react-native";
import { View, Text, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Feather";
import CreateElement from "./CreateElement";
import ModalComponent from "../components/ModalComponent";
import EditElement from "./EditElement";
import appFirebase from "../credentialsFirebase";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const db = getFirestore(appFirebase);

const ElementsList = ({ navigation }) => {
  const [textABuscar, setTextABuscar] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [productos, setProductos] = useState([]);
  const [listadoProductos, setListadoProductos] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const [component, setComponent] = useState(null);
  const [idProduct, setIdElement] = useState("");

  const handleLongPress = (val) => {
    setIdElement(val);
    setIsPressed(true);
  };

  useEffect(() => {
    const getProductos = async () => {
      try {
        const query = await getDocs(collection(db, "productos"));
        const docs = [];
        query.forEach((doc) => {
          const { nombre, precio } = doc.data();
          // // console.log("doc obtenido", doc.id, nombre);
          docs.push({
            id: doc.id,
            nombre,
            precio,
          });
        });
        setProductos(docs);
        filtrarProductos(textABuscar, docs);
      } catch (error) {
        console.error(error);
      }
    };
    getProductos();
  }, [productos]);

  const handlePressOut = () => {
    setIsPressed(false);
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

    filtrarProductos(textABuscar, productos);

    // console.log(productos);
  }
  function editarElemento() {
    setComponent(<EditElement id={idProduct} onModificado={cerrarModal} />);
    abrirModal();
  }
  async function eliminarProducto() {
    await deleteDoc(doc(db, "productos", idProduct));
    ToastAndroid.show("Producto eliminado correctamente", ToastAndroid.SHORT);
  }
  function eliminarElemento() {
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
            // const index = productos.findIndex(
            //   (producto) => producto.id === idElement
            // );
            // productos.splice(index, 1);
            eliminarProducto();
            filtrarProductos(textABuscar, productos);
          },
        },
      ]
    );
  }
  function filtrarProductos(val, productosArray) {
    setTextABuscar(val);
    const resultados = productosArray.filter(
      (producto) => producto.nombre.indexOf(val) > -1
    );
    setListadoProductos(resultados);
  }
  return (
    <View>
      <View style={styles.fixToText}>
        <Text style={{ paddingTop: 5, paddingStart: 5 }}>
          Listado de Productos
        </Text>
        <Pressable onPress={() => navigation.navigate("MenuPrincipal")}>
          <Icon name="home" size={25} />
        </Pressable>
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
      <ScrollView style={styles.scroll}>
        {listadoProductos.map((producto) => (
          <View
            key={producto.id}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "gray" : "#fff", // Cambia el color de fondo al presionar
                  padding: 10,
                  borderRadius: 5,
                },
                isPressed && styles.pressedButton, // Aplica estilos adicionales cuando está presionado
              ]}
              onLongPress={(val) => handleLongPress(producto.id)}
              onPressOut={handlePressOut}
            >
              <Text style={{ paddingStart: 8 }} key={producto.id}>
                {producto.nombre}
              </Text>
            </Pressable>
            <Text>$ {producto.precio}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Modal */}
      <ModalComponent
        modalVisible={modalVisible}
        onClose={cerrarModal}
        modalContent={component} // Pasa el componente CreateElement como contenido del modal
      />
    </View>
  );
};
export default ElementsList;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  scroll: {
    marginBottom: 130,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingEnd: 10,
  },
  botonesCrud: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingStart: "70%",
    paddingEnd: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  pressedButton: {
    // Estilos adicionales cuando está presionado
    borderWidth: 2,
    borderColor: "white",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
