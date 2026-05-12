import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import ScrollToTop from "./helpers/scroll-top";
import history from "./history";

import GenerateBarcode from "./components/admin/barcode/GenerateBarcode";
import ScanBarcode from "./components/admin/barcode/ScanBarcode";
import SampleBarcode from "./components/admin/barcode/sample-barcode/SampleBarcode";
import GenerateSetsBarcode from "./components/admin/barcode/setBarcodeGenerate/GenerateSetsBarcode";

const App = () => {
  return (
    <Router history={history}>
      <ScrollToTop>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/generate-barcode" />} />
          <Route exact path="/generate-barcode" component={GenerateBarcode} />
          <Route exact path="/barcode" component={ScanBarcode} />
          <Route exact path="/dagaImpex/sets-barcode-generator" component={GenerateSetsBarcode} />
          <Route exact path="/dagaImpex/sample-barcode" component={SampleBarcode} />
          <Redirect to="/generate-barcode" />
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

export default App;
