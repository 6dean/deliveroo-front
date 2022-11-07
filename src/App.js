import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3100/");
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <h2>{data.meta.metatags.title}</h2>
      <p>{data.meta.metatags.titleSocial}</p>
      <p>{data.meta.metatags.description}</p>
      <p>{data.meta.metatags.descriptionSocial}</p>
      <img src={data.meta.metatags.image} alt="" />
      <p>{data.meta.restaurant.name}</p>
    </>
  );
}

export default App;
