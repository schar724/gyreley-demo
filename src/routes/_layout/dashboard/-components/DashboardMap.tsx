import OperatorLocationMarkers from "../../../../components/map/OperatorLocationMarkers";
import { OperatorLocation } from "../../../../types/stats.type";
import { lazy } from "react";

type DashboardMapProps = {
  data: OperatorLocation[];
};

const Map = lazy(() =>
  import("@vis.gl/react-google-maps").then((module) => ({
    default: module.Map,
  })),
);

export default function DashboardMap({ data }: DashboardMapProps) {
  return (
    <div>
      <div
        className="relative flex items-center justify-center mb-5 rounded-lg shadow-lg"
        style={{ height: "calc(50vh)" }}
      >
        <Map
          defaultZoom={11}
          defaultCenter={{ lat: 51.0447, lng: -114.10998 }}
          mapId="DASHBOARD"
          reuseMaps
        >
          <OperatorLocationMarkers locations={data} />
        </Map>
      </div>
    </div>
  );
}
