import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "@components/Toaster";
import { APIProvider } from "@vis.gl/react-google-maps";
import { LoadingPage } from "./components/LoadingPage";
import ErrorComponent from "./components/ErrorComponent";

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },

  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  defaultPendingComponent: LoadingPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();

  return (
    <>
      <Toaster />
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <RouterProvider router={router} context={{ auth }} />
      </APIProvider>
    </>
  );
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <AuthProvider>
      <InnerApp />
    </AuthProvider>,
  );
}
