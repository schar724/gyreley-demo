import Button from "@/components/Button";
import LogoCard from "@/components/cards/LogoCard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/permission-denied")({
  component: permissionDenied,
});

function permissionDenied() {
  return (
    <div className="flex flex-col pt-[15vh] justify-center items-center">
      <LogoCard
        headerText={"Permission Denied"}
        className="justify-center items-center p-6"
      >
        <div className="space-y-6 mt-6">
          <p>
            You do not have permission to view that page. <br /> Please contact
            your administrator for access.
          </p>
          <Button
            type="button"
            label="Go Back"
            onClick={() => {
              window.location.assign("/");
            }}
          />
        </div>
      </LogoCard>
    </div>
  );
}
