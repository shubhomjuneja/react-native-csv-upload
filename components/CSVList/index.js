import moment from "moment";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./style";

const CSVList = ({ csvs, setPreviewCSV }) =>
  csvs?.length ? (
    csvs?.map((i) => (
      <TouchableOpacity
        onPress={() => setPreviewCSV(i)}
        style={styles.listItem}
      >
        <View style={styles.rightWrap}>
          <Icon name="file-text-o" style={styles.listItemLeftIcon} />
          <Text>{i?.name}</Text>
        </View>
        <View style={styles.rightWrap}>
          <Text>{moment(i?.createdAt).format("LLL")}</Text>
          <Icon name="angle-right" style={styles.listItemIcon} />
        </View>
      </TouchableOpacity>
    ))
  ) : (
    <Text>No data</Text>
  );

export default CSVList;
