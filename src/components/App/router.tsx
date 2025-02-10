import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { App } from "@/components/App/App";
import { MainPage } from "@/pages/main/MainPage";

const routes = [
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
