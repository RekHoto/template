import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { App } from "@/components/App/App";
import { MainPage } from "@/pages/main/MainPage";
import { PlaygroundPage } from "@/pages/playground/PlaygroundPage";

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
  {
    path: "/playground",
    element: <PlaygroundPage />,
  },
];

export const router = createBrowserRouter(routes);
