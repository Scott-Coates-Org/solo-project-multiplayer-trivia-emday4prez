import { Routes, Route, Link } from "react-router-dom";
import { useCollection } from "./hooks/useCollection";
import Manage from "./components/manage/ManagePage";
import Home from "./components/home/HomePage";
import Layout from "./components/Layout";
import Create from "./components/create/CreatePage";
import Join from "./components/join/JoinPage";
import Lobby from "./components/lobby/Lobby";

export default function App() {
   const { documents: categories } = useCollection("categories");
   console.log("render app");

   return (
      <div>
         <h1>Trivia</h1>

         <p>
            This example demonstrates some of the core features of React Router
            including nested <code>&lt;Route&gt;</code>
            s, <code>&lt;Outlet&gt;</code>s, <code>&lt;Link&gt;</code>s, and
            using a "*" route (aka "splat route") to render a "not found" page
            when someone visits an unrecognized URL.
         </p>

         {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<Home />} />
               <Route
                  path="manage"
                  element={<Manage categories={categories} />}
               />
               <Route
                  path="create"
                  element={<Create categories={categories} />}
               />
               <Route path="join" element={<Join />} />
               <Route
                  path="lobby"
                  element={<Lobby categories={categories} />}
               />

               {/* Using path="*"" means "match anything", so this route
            acts like a catch-all for URLs that we don't have explicit
                routes for. */}
               <Route path="*" element={<NoMatch />} />
            </Route>
         </Routes>
         {/* <DbTest /> */}
      </div>
   );
}

function NoMatch() {
   return (
      <div>
         <h2>Nothing to see here!</h2>
         <p>
            <Link to="/">Go to the home page</Link>
         </p>
      </div>
   );
}
