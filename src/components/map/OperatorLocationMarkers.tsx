import { OperatorLocation } from "../../types/stats.type";

import OperatorLocationMarker from "./OperatorLocationMarker";

type OperatorLocationMarkersProps = {
  locations: OperatorLocation[];
};

export default function OperatorLocationMarkers({
  locations,
}: OperatorLocationMarkersProps) {
  return (
    <>
      {locations.map((location) => (
        <OperatorLocationMarker data={location} key={location.personId} />
      ))}
    </>
  );
}
