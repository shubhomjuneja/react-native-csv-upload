import {useEffect, useState} from 'react';
import {getItem, setItem} from '../helpers/storage';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';

const useCSVPreview = () => {
  const [csvs, setCsvs] = useState([]);
  const [previewCSV, setPreviewCSV] = useState({});
  useEffect(() => {
    getItem("data").then((r) => {
      if (r) {
        const data = JSON.parse(r);
        setCsvs(data);
      }
    });
  }, []);

  const setCSV = (item) => {
    const data = [...csvs];
    data.push({
      ...item,
      createdAt: new Date(),
    });
    setCsvs(data);
    setItem("data", data);
  };

  const onBack = () => {
    setPreviewCSV({});
  };

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        presentationStyle: "fullScreen",
        copyTo: "cachesDirectory",
      });
      if (response?.type === "text/csv") {
        Toast.show({
          type: "success",
          text1: "File uploaded successfully",
        });
        setCSV(response);
      } else {
        Toast.show({
          type: "error",
          text1: "Only CSV files are allowed",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error uploading CSV",
      });
    }
  };

  return { setCSV, onBack, previewCSV, csvs, setPreviewCSV, handleDocumentSelection };
};

export default useCSVPreview;
