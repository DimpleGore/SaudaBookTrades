import { useState } from "react";
import * as XLSX from "xlsx";
import React from "react";
import MaterialTable from "material-table";

function MockupUI() {
  const [col, setCol] = useState([]);
  const [data, setData] = useState([]);

  const convertToJson = (headers, data) => {
    const rows = [];
    data.forEach((row) => {
      let rowData = {};
      row.forEach((element, index) => {
        rowData[headers[index]] = element;
      });
      rows.push(rowData);
    });
    return rows;
  };

  const readExcel = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;

      const wb = XLSX.read(bufferArray, { type: "buffer" });

      const wsname = wb.SheetNames[0];

      const ws = wb.Sheets[wsname];
      console.log(ws);

      const fileData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(fileData);
      const headers = fileData[0];
      console.log(headers);
      var newheader = [];
      headers.forEach((element) => {
        newheader.push(element.split(" ").join(""));
      });

      console.log(newheader);
      const heads = headers.map((head) => ({ title: head, field: head }));
      console.log(heads);
      setCol(heads);

      fileData.splice(0, 1);
      console.log(fileData);
      setData(convertToJson(headers, fileData));
    };
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

      <MaterialTable title="Sauda Book Trades" data={data} columns={col} />
    </div>
  );
}

export default MockupUI;
