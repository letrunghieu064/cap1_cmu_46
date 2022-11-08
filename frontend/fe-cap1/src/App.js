//import logo from

import axios from "axios";
import { Fragment, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Page from "./components/Page";
import { useSelector } from "react-redux";
function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Page></Page>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
