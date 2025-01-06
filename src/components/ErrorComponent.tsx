import LogoCard from "./cards/LogoCard";
import Button from "./Button";

export default function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="flex mt-[25vh] justify-center items-center">
      <LogoCard
        headerText={"An Error Occured"}
        className="justify-center items-center"
      >
        <div className="text-center space-y-3 mt-3">
          <p>Please try again or contact your administrator</p>
          <p>{error.message}</p>
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
