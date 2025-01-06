import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/help_/")({
  component: HelpHome,
});

function HelpHome() {
  return (
    <>
      <div className="text-3xl font-bold">Gyreley Support Hub</div>
      <p>
        The Gyreley Support Hub is your resource for using Gyreley's advanced
        detection systems, as well as the Gyreley applications for the Field and
        the Office.
      </p>
    </>
  );
}
