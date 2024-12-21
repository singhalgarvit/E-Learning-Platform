import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ContextProvider from "./context/ContextProvider";
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import { ToastContainerElem } from "./utils/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ContextProvider>
      <Loading/>
      <Navbar />
      <App />
      <SideBar />
      <Footer />
      <ToastContainerElem/>
    </ContextProvider>
  </BrowserRouter>
);
