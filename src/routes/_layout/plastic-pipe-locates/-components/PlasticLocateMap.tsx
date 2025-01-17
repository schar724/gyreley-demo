import LocateMarkers from "../../../../components/map/LocateMarkers";
import { Place, PlasticLocate } from "../../../../types/locate.type";
import { Map, useApiIsLoaded } from "@vis.gl/react-google-maps";
import Spinner from "../../../../components/Spinner";

export type PlasticLocateMapProps = {
  data: (PlasticLocate & { place: Place })[];
};

export default function PlasticLocateMap({
  data,
}: PlasticLocateMapProps): JSX.Element {
  const apiIsLoaded = useApiIsLoaded();

  console.log("apiIsLoaded ", apiIsLoaded);
  return apiIsLoaded ? (
    <Map
      defaultZoom={11}
      defaultCenter={{ lat: 50.958793, lng: -114.10998 }}
      mapId="PLASTICLOCATES"
      reuseMaps
    >
      {data && <LocateMarkers locations={data} />}
    </Map>
  ) : (
    <Spinner className="w-12 h-12 text-slate-900" />
  );
}
