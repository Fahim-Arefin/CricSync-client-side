import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import ScoreboardForm from "./components/ScoreboardForm";
import TeamForm from "./components/TeamForm";
import { Provider } from "react-redux";
import { store } from "./store";
import CreateMatchForm from "./components/CreateMatchFrom";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/match",
        element: <ScoreboardForm />,
      },
      {
        path: "/team/new",
        element: <TeamForm />,
      },
      {
        path: "/match/new",
        element: <CreateMatchForm />,
      },
    ],
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
