import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Manage from "./components/manage/ManagePage";
import Home from "./components/home/HomePage";
import Layout from "./components/Layout";
import Create from "./components/create/CreatePage";
import Join from "./components/join/JoinPage";
import Lobby from "./components/lobby/Lobby";
import NoMatch from "./components/NoMatch";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<Home />} />
               <Route path="manage" element={<Manage />} />
               <Route path="create" element={<Create />} />
               <Route path="join" element={<Join />} />
               <Route path="lobby/:roomCode" element={<Lobby />} />

               {/* Using path="*"" means "match anything", so this route
            acts like a catch-all for URLs that we don't have explicit
                routes for. */}
               <Route path="*" element={<NoMatch />} />
            </Route>
         </Routes>
      </BrowserRouter>
   </React.StrictMode>
);
