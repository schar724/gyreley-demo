import { Place, PlasticLocate } from '../../types/locate.type';

import LocateMarker from './LocateMarker';

type LocateMarkersProps = {
  locations: (PlasticLocate & { place: Place })[];
};

export default function LocateMarkers({ locations }: LocateMarkersProps) {
  return (
    <>
      {locations.map((location: PlasticLocate & { place: Place }) => (
        <LocateMarker data={location} key={location.identifier} />
      ))}
    </>
  );
}
