import {
  createFileRoute,
  ErrorComponent,
  useLoaderData,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { ComponentType, SVGAttributes, useState } from "react";
import { Place, PlasticLocate } from "../../../types/locate.type";
import Button from "../../../components/Button";
import PlasticLocateList, {
  PlasticLocateListProps,
} from "./-components/PlasticLocateList";
import PlasticLocateMap, {
  PlasticLocateMapProps,
} from "./-components/PlasticLocateMap";
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
import HeaderCard from "@/components/cards/HeaderCard";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { cn } from "@/utils";
import { useMobileContext } from "@/context/MobileContext";
import { ClipboardIcon, MapIcon, PlusIcon } from "@heroicons/react/24/outline";

export const Route = createFileRoute("/_layout/plastic-pipe-locates/")({
  validateSearch: z.object({
    type: z.enum(["list", "map"]).catch("list"),
    emo: z.boolean().optional(),
  }),
  loader: () => {
    return getPlasticLocates();
  },
  component: PlasticPipeLocates,
});

function PlasticPipeLocates(): JSX.Element {
  const [locates, setLocates] = useState<PlasticLocate[]>(
    useLoaderData({ from: "/_layout/plastic-pipe-locates/" }),
  );
  const { user, clientId } = useAuth();
  const { mobile } = useMobileContext();
  const search = useSearch({ from: Route.id });
  const navigate = useNavigate({ from: Route.to });

  const [selectedLocate, setSelectedLocate] = useState<PlasticLocate | null>(
    null,
  );

  type Tab =
    | {
        name: string;
        type: "list";
        icon: ComponentType<SVGAttributes<SVGElement>>;
        component: (props: PlasticLocateListProps) => JSX.Element;
      }
    | {
        name: string;
        type: "map";
        icon: ComponentType<SVGAttributes<SVGElement>>;
        component: (props: PlasticLocateMapProps) => JSX.Element;
      };

  const tabs: Tab[] = [
    {
      name: "List",
      type: "list",
      icon: ClipboardIcon,
      component: (props: PlasticLocateListProps) => (
        <PlasticLocateList {...props} />
      ),
    },
    {
      name: "Map",
      type: "map",
      icon: MapIcon,
      component: (props: PlasticLocateMapProps) => (
        <PlasticLocateMap {...props} />
      ),
    },
  ];

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
    navigate({ search: { emo: true, type: search.type } });
  }

  function handleClose() {
    navigate({ search: { emo: false, type: search.type } });
    setTimeout(() => {
      setSelectedLocate(null);
    }, 500);
  }

  const renderComponent = (tab: Tab) => {
    if (tab.type === "list") {
      return tab.component({ data: { locates }, handleEditLocate });
    } else if (tab.type === "map") {
      const data = locates as (PlasticLocate & { place: Place })[];
      return tab.component({ data: data });
    }
    return <ErrorComponent error="Rendering Error" />;
  };

  return (
    <HeaderCard
      header={
        <div
          className={"hidden pb-5 sm:flex sm:items-center sm:justify-between"}
        >
          <h3 className={"text-base font-semibold leading-6"}>
            Plastic Locates
          </h3>
        </div>
      }
    >
      <TabGroup className="flex flex-col w-full h-full">
        <div className="flex justify-between pb-2">
          <TabList className="space-x-4 flex focus:ring-0">
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  cn(
                    selected
                      ? "border-indigo-500 text-secondary"
                      : "border-transparent text-foreground-muted hover:text-foreground-muted-hover",
                    "whitespace-nowrap  text-sm font-medium",
                    "focus:outline-none",
                  )
                }
                onClick={() => {
                  navigate({ to: Route.to, search: { type: tab.type } });
                }}
              >
                <div>{tab.name}</div>
              </Tab>
            ))}
          </TabList>

          <div className="flex items-baseline">
            <div className="flex items-start justify-between w-full">
              {/* Desktop Add Button */}
              <div id="header-controls" className="hidden sm:block sm:ml-2">
                <Button
                  type="button"
                  label={`Add New Locate`}
                  onClick={() => {
                    navigate({
                      search: {
                        emo: true,
                        type: search.type,
                      },
                    });
                  }}
                />
              </div>

              {!mobile && (
                <div id="header-controls" className="ml-2 sm:hidden">
                  <Button
                    type="button"
                    label=""
                    className="bg-transparent shadow-none text-foreground hover:text-foreground-hover"
                    onClick={() => {
                      navigate({
                        search: {
                          emo: true,
                          type: search.type,
                        },
                      });
                    }}
                  >
                    <PlusIcon className="size-6" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <hr className="mt-4" />
        <TabPanels
          id="tab-panels"
          as="div"
          className="flex flex-1 w-full overflow-hidden"
        >
          {tabs.map((tab, index) => (
            <TabPanel id="tab-panel" key={index} className="flex flex-1 w-full">
              {renderComponent(tab)}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
      <EditPlasticLocateModal
        isNewLocateFormOpen={search.emo || false}
        editLocate={selectedLocate || null}
        handleSaveLocate={handleSaveLocate}
        handleDeleteLocate={handleDeleteLocate}
        handleClose={handleClose}
      />
    </HeaderCard>
  );
}
