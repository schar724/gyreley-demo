import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import { Place } from "../../types/locate.type";

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: Place) => void;
  value?: string | null;
  required?: boolean;
}

const PlaceAutocomplete = ({
  onPlaceSelect,
  value = null,
  required = false,
}: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value || "";
    }
  }, [value]);

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address", "place_id", "url"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      const place = placeAutocomplete.getPlace();
      const lat = place?.geometry?.location?.lat() || 0;
      const lng = place?.geometry?.location?.lng() || 0;
      const formattedAddress = place?.formatted_address || "";
      const placeId = place?.place_id || "";
      const url = place?.url || "";

      onPlaceSelect({ formattedAddress, placeId, url, lat, lng });
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="mt-2">
      <label
        htmlFor="address"
        className="block float-left mb-2 text-sm font-medium leading-6 text-gray-900"
      >
        Address
      </label>
      <input
        name="placeAutocomplete"
        id="address"
        ref={inputRef}
        className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        required={required}
      />
    </div>
  );
};

export default PlaceAutocomplete;
