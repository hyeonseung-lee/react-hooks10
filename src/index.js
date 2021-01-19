import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import useAxios from "./useAxios";

function App() {
  const { loading, data, error, refetch } = useAxios({
    url:
      "https://cors-anywhere.herokuapp.com/https://yts.am/api/v2/list_movies.json",
  });
  console.log(
    `loading : ${loading} \n Error : ${error} \n Data : ${JSON.stringify(data)}`
  );

  return (
    <div className="App" style={{ height: "1000vh" }}>
      <h1>{data && data.status}</h1>
      <h2>{loading && "Loading"}</h2>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
