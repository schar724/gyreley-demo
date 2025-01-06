import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import InspectionStats from "./-components/InspectionStats";
import DashboardTaskList from "./-components/DashboardTaskList";
import { useAuth } from "@/context/AuthContext";
import { getPlasticLocates } from "@/hooks/plastic-locates";
import {
  getDashboardStats,
  getOperatorLocations,
  getTodaysLocates,
} from "@/hooks/dashboard";
import React from "react";
const DashboardMap = React.lazy(() => import("./-components/DashboardMap"));

export const Route = createFileRoute("/_layout/dashboard/")({
  loader: () => {
    const locates = getPlasticLocates();
    const operatorLocations = getOperatorLocations();
    const todaysLocates = getTodaysLocates(locates);
    const stats = getDashboardStats(locates);

    return { locates, operatorLocations, todaysLocates, stats };
  },
  component: Dashboard,
});

export default function Dashboard() {
  const data = useLoaderData({ from: "/_layout/dashboard/" });
  const { clientId } = useAuth();
  console.log("clientId ", clientId);

  if (!clientId) {
    return <></>;
  }

  return (
    <div className="flex flex-col overflow-y-auto h-full px-2 pb-2">
      <div id="inspection-stats">
        <InspectionStats data={data.stats} clientId={clientId} />
      </div>

      <div id="dashboard-map">
        <DashboardMap data={data.operatorLocations} />
      </div>

      <div id="task-list" className="flex-1">
        <DashboardTaskList data={data.todaysLocates} clientId={clientId} />
      </div>
    </div>
  );
}
