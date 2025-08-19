import { createRoot } from "react-dom/client";
import "./index.css";
import "./pageLoader.css";
import App from "./App.jsx";
import store from "./store";
import { Provider } from "react-redux";
import './i18n.js'

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
