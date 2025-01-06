import { OperatorLocation } from '../../types/stats.type';

import OperatorLocationMarker from './OperatorLocationMarker';

type MarkersProps = {
  pois: (OperatorLocation & { location: { lat: number; lng: number } })[];
};

export default function Markers({ pois }: MarkersProps) {
  return (
    <>
      {pois.map((poi, index) => (
        <OperatorLocationMarker data={poi} key={`ol-${index}`} />
      ))}
    </>
  );
}
