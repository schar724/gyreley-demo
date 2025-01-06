import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import MultiViewPage from "../../../components/pages/multi-view/MultiViewPage";
import { useState } from "react";
import { Place, PlasticLocate } from "../../../types/locate.type";
import Button from "../../../components/Button";
import PlasticLocateList from "./-components/PlasticLocateList";
import PlasticLocateMap from "./-components/PlasticLocateMap";
import {
  addPlasticLocate,
  deletePlasticLocate,
  getPlasticLocates,
  updatePlasticLocate,
} from "../../../hooks/plastic-locates";
import EditPlasticLocateModal from "../../../components/modals/EditPlasticLocateModal";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { addAttachments } from "@/hooks/attachment";

export const Route = createFileRoute("/_layout/plastic-pipe-locates/")({
  validateSearch: z.object({
    plv: z.enum(["list", "map"]).catch("list"),
  }),
  loader: () => {
    console.log("loading plastic locates...");
    return getPlasticLocates();
  },
  component: PlasticPipeLocates,
});

function PlasticPipeLocates(): JSX.Element {
  const [locates, setLocates] = useState<PlasticLocate[]>(
    useLoaderData({ from: "/_layout/plastic-pipe-locates/" }),
  );
  const { user, clientId } = useAuth();

  const [isNewLocateFormOpen, setIsNewLocateFormOpen] = useState(false);
  const [selectedLocate, setSelectedLocate] = useState<PlasticLocate | null>(
    null,
  );

  function handleSaveLocate(locate: PlasticLocate, attachments: File[] = []) {
    if (user) {
      locate.requestorId = user.uid;
    }

    if (locate.plasticLocateId && user) {
      const updatedLocates = updatePlasticLocate(locate);
      setLocates(updatedLocates);
      addAttachments(locate.plasticLocateId, clientId ?? "123", attachments);
    } else {
      const locateId = `loc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      locate.plasticLocateId = locateId;

      const updatedLocates = addPlasticLocate(locate);
      setLocates(updatedLocates);
      addAttachments(locateId, clientId ?? "123", attachments);
    }
  }

  function handleDeleteLocate(locate: PlasticLocate) {
    const updatedLocates = deletePlasticLocate(locate);
    setLocates(updatedLocates);
  }

  function handleEditLocate(locate: PlasticLocate | null): void {
    setSelectedLocate(locate);
    setIsNewLocateFormOpen(true);
  }

  function handleClose() {
    setIsNewLocateFormOpen(false);
    setTimeout(() => {
      setSelectedLocate(null);
    }, 500);
  }

  function HeaderControls() {
    return (
      <Button
        type="button"
        label="Add New"
        onClick={() => {
          console.log("click");
          setIsNewLocateFormOpen(true);
        }}
      />
    );
  }

  return (
    <>
      <MultiViewPage
        settings={{
          pageName: "Plastic Pipe Locates",
          pageViewSearchParam: "plv",
        }}
        views={{
          list: {
            name: "List",
            view: (
              <PlasticLocateList
                data={{ locates }}
                handleEditLocate={handleEditLocate}
              />
            ),
            headerControls: HeaderControls(),
          },
          map: {
            name: "Map",
            view: (
              <PlasticLocateMap
                data={locates as (PlasticLocate & { place: Place })[]}
              />
            ),
            headerControls: HeaderControls(),
          },
        }}
      />
      <EditPlasticLocateModal
        isNewLocateFormOpen={isNewLocateFormOpen}
        editLocate={selectedLocate || null}
        handleSaveLocate={handleSaveLocate}
        handleDeleteLocate={handleDeleteLocate}
        handleClose={handleClose}
      />
    </>
  );
}
