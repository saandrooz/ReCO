// Import Pages
import LogIn from "./pages/LogIn";
import CreateAccount from "./pages/CreateAccount";
import Home from "./pages/Home";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";
import AccountDetails from "./pages/AccountDetails";

// Import Components
import Header from "./components/Header";
import Footer from "./components/Footer";

import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <LogIn />, path: "/" },
        { element: <CreateAccount />, path: "/CreateAccount" },
        { element: <Home />, path: "/Home" },
        { element: <Games />, path: "/Games" },
        { element: <GameDetails />, path: "/Games/:id" },
        { element: <AccountDetails />, path: "/Account/:id" },
      ],
      element: (
        <>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
