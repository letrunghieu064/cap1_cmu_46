//import logo from

import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Page from "./components/Page";

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
