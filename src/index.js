import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Manage from "./components/manage/ManagePage";
import Home from "./components/home/HomePage";
import Layout from "./components/Layout";
import Create from "./components/create/CreatePage";
import Join from "./components/join/JoinPage";
import Lobby, { lobbyLoader } from "./components/lobby/Lobby";
import NoMatch from "./components/NoMatch";
import CategoriesProvider from "./context/CategoriesProvider";
import QuestionsProvider from "./context/QuestionsProvider";
import AnswersProvider from "./context/AnswersProvider";
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
         { path: "*", element: <NoMatch /> },
      ],
   },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <CategoriesProvider>
         <QuestionsProvider>
            <AnswersProvider>
               <RouterProvider router={browserRouter} />
            </AnswersProvider>
         </QuestionsProvider>
      </CategoriesProvider>
   </React.StrictMode>
);
