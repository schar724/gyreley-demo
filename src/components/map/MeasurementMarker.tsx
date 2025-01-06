import {
  AdvancedMarker,
  useAdvancedMarkerRef,
  useMap,
} from '@vis.gl/react-google-maps';
import { useCallback } from 'react';
import { Circle } from './Circle';
import { Measurement } from '../../types/locate.type';

type MeasurementMarkerProps = {
  data: Measurement;
};

const color = {
  'google-blue 100': `#4285F4`,
  'white 100': `rgb(255,255,255)`,
  'marker-red 100': `#FF0000`,
  'marker-green 800': `#2e7d32`,
};

export default function MeasurementMarker({ data }: MeasurementMarkerProps) {
  const map = useMap();
  const [markerRef] = useAdvancedMarkerRef();

  const handleMarkerClick = useCallback(
    (ev: google.maps.MapMouseEvent) => {
      if (!map) return;
      if (!ev.latLng) return;
      map.panTo(ev.latLng);
    },
    [map]
  );

  return (
    <AdvancedMarker
      ref={markerRef}
      position={{ lat: data?.lat as number, lng: data?.lng as number }}
      clickable={true}
      onClick={handleMarkerClick}
    >
      <Circle
        radius={0.5}
        fillColor={
          data.pipeDetected
            ? color['marker-green 800']
            : color['marker-red 100']
        }
        fillOpacity={1}
        strokeWeight={0.4}
        center={{ lat: data?.lat as number, lng: data?.lng as number }}
      />
    </AdvancedMarker>
  );
}
