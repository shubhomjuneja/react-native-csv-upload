import React, { useEffect, useState } from "react";
import csv from "csvtojson";
import moment from "moment";
import Toast from "react-native-toast-message";
let invalidRows = 0;

const useCSVUpload = (csvFileUrl, numItemsPerPage, createdAt) => {
  const [processedRows, setProcessedRows] = useState(0);
  const [page, setPage] = useState(0);
  let myInterval;

  const [loading, setLoading] = useState(true);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = React.useState(10);
  const [state, setState] = React.useState({
    tableHead: [],
    tableData: [[]],
    currentPageData: [[]],
    numberOfPages: 1,
  });
  useEffect(() => {
    // processedRows = 0;
    setTableData(csvFileUrl);
    setNumberOfItemsPerPage(numItemsPerPage);
  }, []);

  useEffect(() => {
    setCurrentPageData();
  }, [page]);

  useEffect(() => {
    setCurrentPageData();
  }, [state.tableData]);

  const setCurrentPageData = () => {
    const startIndex = page * numberOfItemsPerPage;
    let endIndex = startIndex + numberOfItemsPerPage;
    if (endIndex > state.tableData.length) {
      endIndex = state.tableData.length - 1;
    }
    if (state.tableData.length > 1) {
      setState({
        ...state,
        currentPageData: state.tableData.slice(startIndex, endIndex),
      });
    }
  };

  const setTableData = (csvFileUrl) => {
    invalidRows = 0;
    setState({
      tableHead: [],
      tableData: [[]],
      currentPageData: [[]],
      numberOfPages: 1,
    });
    setLoading(true);
    myInterval = setInterval(() => {
      setProcessedRows((p) => p + 1);
    }, 200);
    fetch(csvFileUrl)
      .then(async (response) => {
        const resp = await response.text();
        csv({
          noheader: true,
          output: "csv",
        })
          .fromString(resp)
          .then((csvRow) => {
            if (!csvRow?.[0]?.[0]?.length) {
              Toast.show({
                type: "error",
                text1: "Invalid CSV",
                position: "top",
              });
              setProcessedRows(0);
              clearInterval(myInterval);
              setLoading(false);
            } else {
              let pages = csvRow?.length / numberOfItemsPerPage;
              if (csvRow?.length > numberOfItemsPerPage * pages) {
                pages = pages + 1;
              }
              const data = csvRow.slice(1);
              setTimeout(() => {
                setProcessedRows(data?.length);
                clearInterval(myInterval);
              }, 3000);
              const datas = data.map((item) => {
                const bb = [];
                const [id, amount, due_date] = item;
                if (!due_date) {
                  invalidRows++;
                }
                if (!amount) {
                  invalidRows++;
                }
                if (!id) {
                  invalidRows++;
                }
                const startDate = moment(createdAt, "YYYY-MM-DD");
                const endDate = moment(due_date || new Date(), "YYYY-MM-DD");
                const diff = endDate.diff(startDate, "days") || 0;
                const coefficient = due_date ? (diff > 30 ? 0.5 : 0.3) : 0;
                const selling_price =
                  amount && due_date
                    ? ((Number(amount) || 0) * coefficient).toFixed(2)
                    : "N/A";
                bb.push(id, amount, due_date, selling_price);
                return bb;
              });
              setLoading(false);

              setState({
                ...state,
                tableHead: ["id", "amount","due_date","selling price"],
                tableData: datas,
                numberOfPages: pages,
              });
            }
          });
      })
      .catch((error) => {
        setLoading(false);
        console.error("some error occurred", error);
        Toast.show({
          type: "error",
          text1: "Something went wrong uploading the CSV",
        });
      });
  };
  return {
    state,
    loading,
    invalidRows,
    processedRows,
    page,
    setPage,
  };
};

export default useCSVUpload;
