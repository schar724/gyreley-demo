import { createLazyFileRoute } from "@tanstack/react-router";
import "./pfinder.css";
import { ReactNode } from "react";

export const Route = createLazyFileRoute("/_layout/help_/pfmanual")({
  component: PFManual,
});
export function PFManual(): ReactNode {
  return (
    <div className="p-3">
      <div className="text-3xl font-bold">
        General Locator Device User Manual
      </div>

      <hr />
      <br />
      <div className="dropdown">
        <button className="dropbtn">Jump to Section</button>
        <div className="dropdown-content">
          <a href="#top">Top</a>
          <a href="#cl1">Description</a>
          <a href="#cl2">Parts</a>
          <a href="#cl3">Setup</a>
          <a href="#cl4">Device Use</a>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold">1. Description</h2>
        <p className="p-2">
          This device is designed to assist operators in locating various types
          of underground assets. It uses advanced sensing technology to detect
          and provide feedback on buried objects without direct access.
        </p>
        <p className="p-2">
          The system comprises a handheld display unit and a sensor unit. The
          display provides real-time information, while the sensor detects and
          transmits data to the display.
        </p>
      </div>
      <br />
      <div id="cl2">
        <h2 className="text-2xl font-bold">2. Parts Included</h2>
        <table className="border-2 table-auto border-spacing-1 ">
          <thead>
            <tr>
              <th className="p-2 align-top border border-slate-600">
                Component Name
              </th>
              <th className="p-2 align-top border border-slate-600">
                Description
              </th>
              <th className="p-2 align-top border border-slate-600">Image</th>
            </tr>
          </thead>
          <tbody>
            <tr id="display-unit">
              <td className="p-2 align-top border border-slate-600">
                <div id="title" className="font-bold">
                  Display Unit (1x)
                </div>
              </td>
              <td id="desc" className="p-2 align-top border border-slate-600">
                Primary handheld component that provides visual feedback and
                controls.
              </td>
              <td id="img" className="p-2 align-top border border-slate-600">
                <div className="h-24 w-24 bg-gray-300"></div>
              </td>
            </tr>
            <tr id="sensor-unit">
              <td className="p-2 font-bold align-top border border-slate-600">
                <div id="title" className="font-bold">
                  Sensor Unit (1x)
                </div>
              </td>
              <td id="desc" className="p-2 align-top border border-slate-600">
                Device that detects signals from underground assets and relays
                data to the display.
              </td>
              <td id="img" className="p-2 align-top border border-slate-600">
                <div className="h-24 w-24 bg-gray-300"></div>
              </td>
            </tr>
            <tr id="antenna">
              <td className="p-2 align-top border border-slate-600">
                <div id="title" className="font-bold">
                  Antenna (2x)
                </div>
              </td>
              <td id="desc" className="p-2 align-top border border-slate-600">
                Used for wireless communication between the display and sensor
                units.
              </td>
              <td id="img" className="p-2 align-top border border-slate-600">
                <div className="h-24 w-24 bg-gray-300"></div>
              </td>
            </tr>
            <tr id="battery">
              <td className="p-2 align-top border border-slate-600">
                <div id="title" className="font-bold">
                  Rechargeable Battery (2x)
                </div>
              </td>
              <td id="desc" className="p-2 align-top border border-slate-600">
                Powers the display and sensor units.
              </td>
              <td id="img" className="p-2 align-top border border-slate-600">
                <div className="h-24 w-24 bg-gray-300"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <div id="cl3">
        <h2 className="text-2xl font-bold">3. Device Setup</h2>
        <p className="p-2">
          Follow these steps to set up the device before use. This section
          covers pairing the units, attaching components, and configuring
          settings.
        </p>
        <div id="pairing">
          <h3 className="p-2 text-xl font-bold">3.1 Pairing the Units</h3>
          <p className="p-3">
            Ensure both units are powered on. Use the pairing option in the menu
            to establish a connection.
          </p>
          <div id="instructions">
            <p className="p-3">Steps to pair the units: </p>
            <ul className="p-4 list-decimal list-inside">
              <li>Turn on both units using the power button.</li>
              <li>
                Select the pairing option from the menu on the display unit.
              </li>
              <li>
                Follow on-screen instructions to complete the pairing process.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <br />
      <div id="cl4">
        <h2 className="text-2xl font-bold">4. Device Usage</h2>
        <p className="p-2">
          This section describes how to operate the device, take measurements,
          and interpret results.
        </p>
        <div id="taking-measurements">
          <h3 className="p-2 text-xl font-bold">4.1 Taking Measurements</h3>
          <div id="instructions">
            <p className="p-2">
              Position the sensor unit correctly on the ground and start the
              measurement process using the display unit.
            </p>
            <ul className="p-3 list-decimal list-inside">
              <li>Ensure the sensor unit is properly placed.</li>
              <li>Initiate the measurement from the display unit.</li>
              <li>Observe the feedback on the screen and record results.</li>
            </ul>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}
