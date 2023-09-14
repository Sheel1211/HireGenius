import React, { useEffect, useState } from "react";
import Papa from "papaparse";

// import csv from 'csv-parser'
// import fs from 'fs'

const Main = () => {
  const [csv, setCsv] = useState(null); //read the data from the uploaded CSV
  const [candidates, setCandidates] = useState([]);

  const [data, setData] = useState([
    { name: "n1", email: "e1@gmail.com" },
    { name: "n2", email: "e2@gmail.com" },
    { name: "n3", email: "e3@gmail.com" },
    { name: "n4", email: "e4@gmail.com" },
  ]); //this state generate the CSV file for the short listed student

  const handleReadCSV = () => {
    Papa.parse(csv, {
      header: true,
      complete: (result) => {
        setCandidates(result.data);
      },
    });
  };

  const handleWriteCSV = () => {
    const csvData = Papa.unparse(data);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    console.log("candidates", candidates);
  }, [candidates]);
  return (
    <div>
      <h1>CSV PARSER</h1>
      <input
        onChange={(e) => {
          setCsv(e.target.files[0]);
        }}
        type="file"
        accept=".csv"
        style={{ marginLeft: "4px" }}
      />
      {console.log("csv", csv)}

      <button onClick={handleReadCSV}>Import Data from CSV</button>

      <button onClick={handleWriteCSV} style={{ marginLeft: "4px" }}>
        Import Data into CSV
      </button>
      {candidates && candidates.length === 0 ? (
        <></>
      ) : (
        <>
          <h1>Candidates Data</h1>
          {candidates.map((can) => (
            <p key={can.email}>
              Name: {can.name}, Email: {can.email}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default Main;
