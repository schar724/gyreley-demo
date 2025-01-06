import { createFileRoute } from "@tanstack/react-router";
import "./pfinder.css";

export const Route = createFileRoute("/_layout/help_/faq")({
  component: FAQPage,
});

function FAQPage() {
  return (
    <div>
      <br />
      <div className="text-3xl font-bold">Frequently Asked Questions</div>

      <hr />
      <br />
      <div className="dropdown p-2">
        <button className="dropbtn">Select a FAQ Section</button>
        <div className="dropdown-content">
          <a href="#cl1">Using the Device</a>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />

      <hr id="cl1" />
      <div>
        <br />
        <h2 className="text-2xl font-bold">Using the Device</h2>
        <p className="p-3">
          1. Access gas meter at outside of house. Quick connect the receiver
          (listening device) on the gas service.
        </p>
        <p className="p-3">
          2. Move toward the buried asset with the portable transmitter which
          creates an acoustic condition.
        </p>
        <p className="p-3">
          3. The transmitter will indicate you have located the service of
          interest via communication back to the receiver.
        </p>
        <p className="p-3">
          4. Mark out the buried pipe asset in a series of passes, and then
          quickly and easily de-mobilize and move onto the next site.
        </p>
      </div>
      <br />
      <hr id="cl2" />
    </div>
  );
}
