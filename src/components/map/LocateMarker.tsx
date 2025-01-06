import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
  useMap,
} from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";
import { PlasticLocate } from "../../types/locate.type";

type LocateMarkerProps = {
  data: PlasticLocate;
};

export default function LocateMarker({ data }: LocateMarkerProps) {
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
      position={{ lat: data?.place?.lat || 0, lng: data?.place?.lng || 0 }}
      clickable={true}
      onClick={handleMarkerClick}
    >
      <Pin />

      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose} headerDisabled={true}>
          <a href={`/plastic-pipe-locates/${data.plasticLocateId}`}>
            <h1>{data?.place?.formattedAddress}</h1>
            <p>Contact Name: {data?.contactName}</p>
            <p>Phone Number: {data?.contactDetail}</p>
            <p>Scheduled Date: {data?.scheduledDate}</p>
          </a>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
}
