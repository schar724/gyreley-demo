import HeaderCard from "@/components/cards/HeaderCard";
import {
  createFileRoute,
  useLoaderData,
  useNavigate,
  ErrorComponent,
  useSearch,
} from "@tanstack/react-router";
import Button from "@components/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { z } from "zod";
import { AdminPanelData, AdminPanelTab } from "@/types/admin-panel.type";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { cn } from "@/utils";
import { loader } from "./-loader";
import { useMobileContext } from "@/context/MobileContext";

export const Route = createFileRoute("/_layout/admin-panel_/")({
  validateSearch: z.object({
    type: z.enum(["User", "Client"]).catch("User"),
    emo: z.boolean().optional(),
  }),
  loader: async (): Promise<{
    adminPanelData: AdminPanelData;
    isSysAdmin: boolean;
    tabs: AdminPanelTab[];
  }> => await loader(),
  component: AdminPanel,
});

function AdminPanel() {
  const navigate = useNavigate({ from: Route.to });
  const search = useSearch({ from: Route.id });
  const { mobile } = useMobileContext();
  const {
    adminPanelData: { users, clients },
    tabs,
  } = useLoaderData({ from: Route.id });

  const renderComponent = (tab: AdminPanelTab) => {
    if (tab.type === "User") {
      return tab.component({ users });
    } else if (tab.type === "Client") {
      return tab.component({ clients });
    }
    return <ErrorComponent error="Rendering Error" />;
  };

  console.log("mobile in admin ", mobile);

  return (
    <HeaderCard
      header={
        <div
          className={"hidden pb-5 sm:flex sm:items-center sm:justify-between"}
        >
          <h3 className={"text-base font-semibold leading-6"}>Admin Panel</h3>
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
              {!mobile && (
                <div id="header-controls" className="hidden sm:block sm:ml-2">
                  <Button
                    type="button"
                    label={`Add New ${search.type}`}
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
              )}
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
    </HeaderCard>
  );
}
