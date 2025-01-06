import * as reactHotToast from "react-hot-toast";

export function Toaster() {
  return (
    <reactHotToast.Toaster
      toastOptions={{
        error: {
          position: "bottom-right",
          duration: 5000,
        },
        success: {
          position: "top-right",
          duration: 2000,
        },
        loading: {
          position: "top-right",
          duration: 2000,
        },
        custom: {
          duration: 10000,
          id: "custom-id",
        },
      }}
    />
  );
}
