import { EditorPage } from "@/pages/editor-page";
import { PreviewPage } from "@/pages/preview-page";
import { SettingsPage } from "@/pages/settings-page";
import { pages } from "@/shared/constants";
import type { ReactNode } from "react";
import { Navigate, useRoutes, type RouteObject } from "react-router-dom";

interface RouteProvider {
  children: ReactNode;
}

const routesConfig: RouteObject = {
  children: [
    {
      children: [
        {
          path: pages.editor,
          element: <EditorPage />,
        },
        {
          path: pages.preview,
          element: <PreviewPage />,
        },
        {
          path: pages.settings,
          element: <SettingsPage />,
        },
      ],
    },
  ],
};

export function RouteProvider() {
  const routes = useRoutes([
    routesConfig,
    {
      path: "*",
      element: <Navigate to={pages.editor} />,
    },
  ]);

  return routes;
}
