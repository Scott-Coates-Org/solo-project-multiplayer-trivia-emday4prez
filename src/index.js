import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Manage from "./components/manage/ManagePage";
import Home from "./components/home/HomePage";
import Layout from "./components/Layout";
import Create from "./components/create/CreatePage";
import Join from "./components/join/JoinPage";
import Game from "./components/game/GamePage";
import Lobby, { lobbyLoader } from "./components/lobby/Lobby";
import NoMatch from "./components/NoMatch";
import "./index.css";

const browserRouter = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children: [
         { path: "/", element: <Home /> },
         { path: "manage", element: <Manage /> },
         { path: "create", element: <Create /> },
         { path: "join", element: <Join /> },
         {
            path: "/lobby/:roomCode",
            element: <Lobby />,
            loader: lobbyLoader,
         },
         {
            path: "/game/:gameDocId",
            element: <Game />,
         },
         { path: "*", element: <NoMatch /> },
      ],
   },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <RouterProvider router={browserRouter} />
   </React.StrictMode>
);
