import axios from "axios";
import { Fragment, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
// import "./App.css";
import Page from "../Page";
// import HomePage from "../homepage/HomePage";
import { ToastContainer, toast } from 'react-toastify';
// import { useSelector } from "react-redux";
function  GoPage() {
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

export default GoPage;
