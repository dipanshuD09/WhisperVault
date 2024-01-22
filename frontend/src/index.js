import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PrivateRoute from "./components/PrivateRoute";
import CreateThreadScreen from "./screens/CreateThreadScreen";
import ThreadScreen from "./screens/ThreadScreen";
import RecoverPasswordScreen from "./screens/RecoverPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import MyThreadsScreen from "./screens/MyThreadsScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/thread/:id" element={<ThreadScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/recoverpass" element={<RecoverPasswordScreen />} />
      <Route path="/resetpass" element={<ResetPasswordScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/createthread" element={<CreateThreadScreen />} />
        <Route path="/mythreads" element={<MyThreadsScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
