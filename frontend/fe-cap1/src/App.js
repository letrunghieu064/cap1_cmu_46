//import logo from

import axios from "axios";
import { Fragment, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Page from "./components/Page";
import HomePage from "./components/homepage/HomePage";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
function App() {
  return (
    <Fragment>
      <BrowserRouter>
        {/* <HomePage></HomePage> */}
        <Page></Page>
        <ToastContainer/>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
