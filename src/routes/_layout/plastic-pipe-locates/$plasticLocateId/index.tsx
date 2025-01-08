import {
  createFileRoute,
  Link,
  useLoaderData,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import {
  deletePlasticLocate,
  getMeasurements,
  getPlasticLocate,
  updatePlasticLocate,
} from "@/hooks/plastic-locates";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import { useState } from "react";
import { Map } from "@vis.gl/react-google-maps";
import {
  LocateData,
  Measurement,
  PipeData,
  PlaceData,
  PlasticLocate,
} from "@/types/locate.type";
import MeasurementMarkers from "@/components/map/MeasurementMarkers";
import LocateMarker from "@/components/map/LocateMarker";
import DetailsCard from "./-components/DetailsCard";
import EditPlasticLocateModal from "@/components/modals/EditPlasticLocateModal";
import { addAttachments, Attachment, getAttachments } from "@/hooks/attachment";
import AttachmentsCard from "./-components/AttachmentsCard";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute(
  "/_layout/plastic-pipe-locates/$plasticLocateId/",
)({
  loader: ({
    params,
  }): {
    pipeData: PipeData;
    placeData: PlaceData;
    locateData: LocateData;
    locate: PlasticLocate;
    measurements: Measurement[] | undefined;
    attachments: Attachment[];
  } | null => {
    const locate: PlasticLocate | undefined = getPlasticLocate(
      params.plasticLocateId,
    );

    const measurements = getMeasurements(params.plasticLocateId);
    const attachments = getAttachments(params.plasticLocateId);

    if (!locate || !locate.place) {
      return null;
    }

    const pipeData: PipeData = {
      "Device Tag": "Device Tag",
      "Device Mount": "Device Mount",
      "Pipe Tag": "Pipe Tag",
    };

    const placeData: PlaceData = {
      Address: locate.place.formattedAddress,
      "Contact Name": locate.contactName,
      "Phone Number": locate.contactDetail,
    };

    const locateData: LocateData = {
      Identifier: locate.identifier,
      Status: locate.inspectionStatusName,
      Requestor: locate.requestorName,
      Inspector: locate?.inspectorName ?? "",
      Scheduled: locate.scheduledDate,
      Completed: locate?.completionDate ?? "",
      Notes: locate?.notes ?? "",
    };

    return {
      pipeData,
      placeData,
      locateData,
      locate,
      measurements,
      attachments,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const data = useLoaderData({
    from: Route.id,
  });
  const [isEditLocateModalOpen, setIsEditLocateModalOpen] =
    useState<boolean>(false);
  const [isMeasurement] = useState<boolean>(!!data?.measurements);
  const [markers] = useState<Measurement[]>(data?.measurements || []);
  const router = useRouter();
  const navigate = useNavigate({ from: Route.to });
  const { clientId } = useAuth();

  if (!data) {
    return <>Locate Not Found</>;
  }

  function setStatus(status: string) {
    const statusMap: { [key: string]: string } = {
      complete: "8A500B63-DEF0-4478-BAB0-A9F10A353A55",
      review: "4A133D05-C639-4ADF-B540-BB9FC95255F0",
    };

    if (!data?.locateData.Identifier) {
      throw new Error("Plastic locate id not found");
    }

    updatePlasticLocate({
      ...data.locate,
      inspectionStatusId: statusMap[status],
      completionDate: status === "complete" ? new Date().toISOString() : "",
    });
  }

  function handleSaveLocate(locate: PlasticLocate, attachments: File[]) {
    updatePlasticLocate(locate);
    addAttachments(locate.plasticLocateId, clientId ?? "123", attachments);
    router.invalidate();
  }

  function handleDeleteLocate(locate: PlasticLocate) {
    deletePlasticLocate(locate);
    navigate({ to: ".." });
  }

  return (
    <div className="h-dvh overflow-auto">
      <div className="flex items-center justify-between p-4">
        <Link to="" onClick={() => window.history.back()}>
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>

        <h3 className="font-semibold leading-7 text-gray-900">
          {data.locate?.identifier}
        </h3>
        <div>
          <Button
            type="button"
            label="Edit Locate"
            onClick={() => {
              setIsEditLocateModalOpen(true);
            }}
          />
        </div>
      </div>
      <div
        className="relative flex mb-5 rounded-lg shadow-sm"
        style={{ height: "calc(50vh)" }}
      >
        {isMeasurement ? (
          <Map
            id="measurements-map"
            defaultZoom={19.25}
            defaultCenter={{
              lat: data.locate?.place?.lat || 0,
              lng: data.locate?.place?.lng || 0,
            }}
            mapId="DASHBOARD"
            reuseMaps
          >
            <>
              <MeasurementMarkers locations={markers as Measurement[]} />
            </>
          </Map>
        ) : (
          <Map
            id="locate-details-map"
            defaultZoom={14}
            defaultCenter={{
              lat: data.locate?.place?.lat || 0,
              lng: data.locate?.place?.lng || 0,
            }}
            mapId="DASHBOARD"
          >
            <LocateMarker data={data.locate} />
          </Map>
        )}
      </div>
      <div className="flex mt-5 gap-x-2">
        <div className="w-1/2">
          <DetailsCard
            title={"Locate Information"}
            data={data.locateData}
            description={"Locate Detail"}
            handleClick={setStatus}
          />
        </div>
        <div className="w-1/2">
          <DetailsCard
            title={"Completion Details"}
            data={data.pipeData}
            description={"Completion Data"}
          />
        </div>
        <div className="w-1/2">
          <DetailsCard
            title={"Location Information"}
            data={data.placeData}
            description={"Address Information"}
          />
        </div>
      </div>
      <div className="flex mt-5 gap-x-2">
        <div className="w-1/2">
          {data.attachments[0] && (
            <AttachmentsCard attachmentData={data.attachments} />
          )}
        </div>
      </div>
      <EditPlasticLocateModal
        isNewLocateFormOpen={isEditLocateModalOpen}
        editLocate={data.locate}
        handleSaveLocate={handleSaveLocate}
        handleDeleteLocate={handleDeleteLocate}
        handleClose={() => {
          setIsEditLocateModalOpen(false);
        }}
      />
    </div>
  );
}
