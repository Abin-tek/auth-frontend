import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { Container } from "react-bootstrap";
import axios from "axios";
import API_URL from "../../config/global";
const Home = () => {
  const [res, setRes] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user && user.token) {
      getData(user.token);
    }
  }, []);
  const getData = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.get(`${API_URL}/home`, config);
      if (response.data === "Invalid Token") {
        alert("login again");
      } else if (response.data === "Server Busy") {
        alert("unauthorised access");
      } else if (response?.status) {
        setRes(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
        <h1>Welcome to our Website</h1>
        <p>We are here to serve you {res.name}</p>
    </Container>
  );
};
export default Home;
