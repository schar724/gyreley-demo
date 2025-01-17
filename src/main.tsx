import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouter,
  createHashHistory,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { MobileProvider, useMobileContext } from "./context/MobileContext";
import { Toaster } from "@components/Toaster";
import { APIProvider } from "@vis.gl/react-google-maps";
import { LoadingPage } from "./components/LoadingPage";
import ErrorComponent from "./components/ErrorComponent";
import {
  FC,
  IframeHTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Button from "./components/Button";
import { isMobile } from "react-device-detect";

const hashHistory = createHashHistory();

export const router = createRouter({
  routeTree,
  basepath: "/",
  context: {
    auth: undefined!,
    mobile: undefined!,
  },
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  defaultPendingComponent: LoadingPage,
  history: hashHistory,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

interface IFrameProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  children?: ReactNode;
}

const IFrame: FC<IFrameProps> = ({ children, ...props }) => {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (contentRef?.contentWindow?.document) {
      const { document } = contentRef.contentWindow;

      // Initialize the iframe structure
      document.open();
      document.write(
        `<!DOCTYPE html>
          <html lang="en">
            <head>

              <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Gyreley Help Service</title>
    <meta name="description" content="Gyreley customer support and help service" />
    <link rel="icon" href="/favicon.ico" />
    <link
      rel="apple-touch-icon"
      href="/apple-touch-icon-108x180.png"
      sizes="180x180"
    />
    <link rel="mask-icon" href="/favicon.svg" color="#FFFFFF" />
    <meta name="theme-color" content="#ffffff" />
    <link rel="stylesheet" href='./src/index.css'/>
            </head>
            <body></body>
          </html>`,
      );
      document.close();

      setMountNode(document.body);
    }
  }, [contentRef]);

  return (
    <iframe
      className="aspect-[375/812] w-full max-w-[375px] border-12 border-black rounded-[30px] overflow-hidden shadow-lg bg-background"
      {...props}
      ref={setContentRef}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

function InnerApp() {
  const auth = useAuth();
  const mobile = useMobileContext();

  return (
    <>
      <Toaster />
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <RouterProvider router={router} context={{ auth, mobile }} />
      </APIProvider>
    </>
  );
}

function AppWrapper() {
  const { mobile, toggleMobile } = useMobileContext();
  console.log("mobile", mobile);

  if (mobile && !isMobile) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-primary">
        <IFrame>
          <InnerApp />
        </IFrame>
        <Button
          label="Desktop View"
          type="button"
          className="w-[10%] mt-4"
          onClick={() => {
            toggleMobile();
          }}
        />
      </div>
    );
  } else {
    return <InnerApp />;
  }
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <AuthProvider>
      <MobileProvider>
        <AppWrapper />
      </MobileProvider>
    </AuthProvider>,
  );
}
