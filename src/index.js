import ReactDom from "react-dom";
import App from "./App";
import "react-reflex/styles.css";

const root = ReactDom.render(<App />, document.querySelector("#app-container"));
