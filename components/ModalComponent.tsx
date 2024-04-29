// ModalComponent.js
import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import CloseIcon from "react-native-vector-icons/AntDesign";

const ModalComponent = ({ modalVisible, onClose, modalContent }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Botón de cierre */}
          <Pressable style={styles.closeButtonModal} onPress={onClose}>
            <CloseIcon name="closecircleo" size={30} color="white" />
          </Pressable>
          {modalContent}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#100",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "100%",
    width: "90%", // Puedes ajustar el ancho del modal según tu preferencia
  },
  closeButtonModal: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 30,
    backgroundColor: "red",
  },
});

export default ModalComponent;
