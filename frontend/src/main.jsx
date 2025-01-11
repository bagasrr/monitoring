import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages";

import "./index.css";
import DownloadDataPages from "./pages/DownloadDataPages";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/download-data",
    element: <DownloadDataPages />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
