import {
  Outlet,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";
import { AuthContext } from "../context/AuthContext";
import { TMobileContext } from "@/context/MobileContext";
import LogoCard from "@components/cards/LogoCard";
import Button from "@/components/Button";

export const Route = createRootRouteWithContext<{
  auth: AuthContext;
  mobile: TMobileContext;
}>()({
  beforeLoad: async ({ location }) => {
    if (location.pathname == "/") {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  notFoundComponent: () => {
    return (
      <div className="flex mt-[25vh] justify-center items-center">
        <LogoCard
          headerText={"404 - This page does not exist"}
          className="justify-center items-center px-16 py-10"
        >
          <div className="text-center w-full space-y-3 text-sm pt-8">
            <Button
              type="button"
              label="Go Back"
              className="w-full"
              onClick={() => {
                window.location.assign("/");
              }}
            />
          </div>
        </LogoCard>
      </div>
    );
  },
  component: Root,
});

function Root(): JSX.Element {
  return <Outlet />;
}
