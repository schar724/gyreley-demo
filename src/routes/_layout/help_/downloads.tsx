import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/help_/downloads")({
  component: DownloadsPage,
});

function DownloadsPage() {
  return (
    <>
      <div className="text-3xl font-bold">Gyreley Support Downloads</div>
      <p>Access application and support downloads</p>
      <br />
      <p className="font-bold text-xl hover:text-blue-600">
        <a href="#">Quick Reference Guide</a>
      </p>
      <br />
      <p className="font-bold text-xl hover:text-blue-600">
        <a href="#">User Manual</a>
      </p>
      <br />
      <p className="font-bold text-xl hover:text-blue-600">
        <a href="#">Demonstration Video</a>
      </p>
    </>
  );
}
