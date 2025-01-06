import Spinner from "./Spinner";

export const LoadingPage = () => {
  return (
    <div className={"flex justify-center items-center h-screen"}>
      <Spinner className="w-12 h-12 text-black" />
    </div>
  );
};
