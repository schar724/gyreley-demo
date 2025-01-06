import { Measurement } from '../../types/locate.type';
import MeasurementMarker from './MeasurementMarker';

type MeasurementMarkersProps = {
  locations: Measurement[];
};

export default function MeasurementMarkers({
  locations,
}: MeasurementMarkersProps) {
  return (
    <>
      {locations.map((location, index) => (
        <MeasurementMarker data={location} key={index} />
      ))}
    </>
  );
}
