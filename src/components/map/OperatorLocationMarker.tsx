import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
  useMap,
} from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";
import { OperatorLocation } from "../../types/stats.type";

type OperatorLocationMarkerProps = {
  data: OperatorLocation;
};

export default function OperatorLocationMarker({
  data,
}: OperatorLocationMarkerProps) {
  const map = useMap();
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  // TODO: Center marker on click
  const handleMarkerClick = useCallback(
    (ev: google.maps.MapMouseEvent) => {
      if (!map) return;
      if (!ev.latLng) return;
      map.panTo(ev.latLng);

      setInfoWindowShown((prevValue) => !prevValue);
    },
    [map],
  );

  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <AdvancedMarker
      ref={markerRef}
      position={data.location}
      clickable={true}
      onClick={handleMarkerClick}
    >
      <Pin
        background="#6366F1"
        borderColor="#6366F1"
        glyph=""
        glyphColor="white"
        scale={0.75}
      />

      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose} headerDisabled={true}>
          <div>
            <h1 className="font-bold">{`${data.firstName} ${data.lastName}`}</h1>
            <p>{data.location.lat}</p>
            <p>{data.location.lng}</p>
          </div>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
}
