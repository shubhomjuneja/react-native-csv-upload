import React from "react";
import { Text, TouchableOpacity } from "react-native";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./style";
const CSVUploader = ({ handleDocumentSelection }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={handleDocumentSelection}>
      <MIcon size={30} name="cloud-upload-outline" />
      <Text>{"Upload CSV"}</Text>
    </TouchableOpacity>
  );
};

export default CSVUploader;
