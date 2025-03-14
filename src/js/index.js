import React from "react";
import ReactDOM from "react-dom";
import Layout from "./layout.js";
import "../styles/styles.css";
import InjectContext from "./store/appContext.js";

const LayoutWithContext = InjectContext(Layout);

ReactDOM.render(<LayoutWithContext />, document.getElementById("app"));