import { useState } from "react";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

// Import Pages
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";
import AccountDetails from "./pages/AccountDetails";

// Imports Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserContext from "./components/UserContext";
import DetectUser from "./components/DetectUser";

function App() {
  const [user, setUser] = useState(0);

  const router = createHashRouter([
    {
      children: [
        { element: <LogIn />, path: "/" },
        { element: <Register />, path: "/Register" },
        { element: <Home />, path: "/Home" },
        { element: <Games />, path: "/Games" },
        { element: <GameDetails />, path: "/Games/:id" },
        { element: <AccountDetails />, path: "/Account" },
      ],
      element: (
        <>
          <UserContext.Provider value={{ user, setUser }}>
            <DetectUser />
            <Header />
            <main>
              <Outlet />
            </main>
            <Footer />
          </UserContext.Provider>
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
