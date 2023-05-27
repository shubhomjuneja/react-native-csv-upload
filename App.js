/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import DisplayCsvDataTable from "./components/DataTable";
import CSVUploader from "./components/CSVUploader";
import CSVList from "./components/CSVList";
import useCSVPreview from "./hooks/useCSVPreviewList";

const App = () => {
  const { previewCSV, onBack, setPreviewCSV, csvs, handleDocumentSelection } =
    useCSVPreview();
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <ScrollView>
            {previewCSV?.uri ? (
              <DisplayCsvDataTable
                onBack={onBack}
                createdAt={previewCSV?.createdAt}
                numItemsPerPage={10}
                csvFileUrl={previewCSV?.fileCopyUri}
              />
            ) : (
              <>
                <CSVUploader
                  handleDocumentSelection={handleDocumentSelection}
                />
                <CSVList csvs={csvs} setPreviewCSV={setPreviewCSV} />
              </>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
});

export default App;
