import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { DataTable } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import useCSVUpload from "../../hooks/useCSVUpload";
import { styles } from "./style";
export default function DisplayCsvDataTable({
  csvFileUrl,
  numItemsPerPage,
  createdAt,
  onBack,
}) {
  const { loading, state, invalidRows, processedRows, page, setPage } =
    useCSVUpload(csvFileUrl, numItemsPerPage, createdAt);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Icon name="angle-left" size={24} style={styles.backIcon} />
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <DataTable>
            <DataTable.Header>
              {state.tableHead.map((rowData, index) => (
                <DataTable.Title key={index}>{rowData}</DataTable.Title>
              ))}
            </DataTable.Header>

            {state.currentPageData.map((rowData, index) => (
              <DataTable.Row key={index}>
                {rowData.map((cellData, cellIndex) => (
                  <DataTable.Cell
                    style={{
                      textAlign: "center",
                    }}
                    key={cellIndex}
                  >
                    {cellData}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.round(state.numberOfPages)}
              onPageChange={(page) => setPage(page)}
              label={`Page ${page + 1} of ${Math.round(state.numberOfPages)}`}
              showFastPagination
              optionsLabel={"Rows per page"}
            />
          </DataTable>
        </>
      )}
      <Text>
        Processed {processedRows} of {state?.tableData?.length} rows
      </Text>
      {invalidRows ? <Text>{invalidRows} Invalid Rows</Text> : null}
    </View>
  );
}
