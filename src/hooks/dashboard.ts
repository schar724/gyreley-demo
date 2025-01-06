import { PlasticLocate } from "@/types/locate.type";
import { OperatorLocation } from "@/types/stats.type";
import {
  CalendarIcon,
  CheckIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { sessionStorageUtil } from "./sessionStorageUtil";
import mockLocations from "../mockdb/location.json";

const LOCATIONS_KEY = "location";

sessionStorageUtil.initialize(LOCATIONS_KEY, mockLocations);

function _readOperatorLocations(): OperatorLocation[] {
  return sessionStorageUtil.read<OperatorLocation[]>(LOCATIONS_KEY);
}

export const getOperatorLocations = (): OperatorLocation[] => {
  return _readOperatorLocations();
};

export const getTodaysLocates = (locates: PlasticLocate[]): PlasticLocate[] => {
  console.log('lcoates ', locates)
  if (!locates) return [];
  const filtered = locates.filter(
    (locate) =>
      new Date(locate.scheduledDate).toDateString() ===
      new Date().toDateString()
  );
  console.log('filtered ', filtered)
  return filtered
};

export const getDashboardStats = (locates: PlasticLocate[]) => {
  if (!locates) return [];

  const scheduled = locates.filter(
    (locate) =>
      locate.inspectionStatusName !== "" &&
      locate.inspectionStatusName !== "Complete"
  );
  const active = locates.filter(
    (locate) => locate.inspectionStatusName === "Active"
  );
  const completed = locates.filter(
    (locate): locate is PlasticLocate & { completionDate: string } =>
      locate.inspectionStatusName === "Complete" &&
      locate.completionDate !== undefined &&
      locate.completionDate !== null
  );

  const currentMonth = new Date().getMonth();
  const lastMonth = new Date(new Date().setMonth(currentMonth - 1));

  const scheduledCurrentMonth = scheduled.filter(
    (locate) => new Date(locate.scheduledDate).getMonth() === currentMonth
  ).length;
  const scheduledLastMonth = scheduled.filter(
    (locate) =>
      new Date(locate.scheduledDate).getMonth() === lastMonth.getMonth()
  ).length;

  const activeCurrentMonth = active.filter(
    (locate) => new Date(locate.scheduledDate).getDate() === new Date().getDate()
  ).length;
  const activeLastMonth = active.filter(
    (locate) =>
      new Date(locate.scheduledDate).getDate() ===
      new Date(new Date().setDate(new Date().getDate() - 1)).getDate()
  ).length;

  const completedCurrentMonth = completed.filter(
    (locate) => new Date(locate.completionDate).getMonth() === currentMonth
  ).length;
  const completedLastMonth = completed.filter(
    (locate) =>
      new Date(locate.completionDate).getMonth() === lastMonth.getMonth()
  ).length;

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return "N/A";
    return (((current - previous) / previous) * 100).toFixed(2) + "%";
  };

  const calculateChangeType = (
    current: number,
    previous: number
  ): "increase" | "decrease" => {
    return current >= previous ? "increase" : "decrease";
  };

  return [
    {
      id: 1,
      name: "Scheduled Inspections",
      stat: `${scheduledCurrentMonth}`,
      icon: CalendarIcon,
      change: calculateChange(scheduledCurrentMonth, scheduledLastMonth),
      changeType: calculateChangeType(
        scheduledCurrentMonth,
        scheduledLastMonth
      ),
    },
    {
      id: 2,
      name: "Active Inspections",
      stat: `${activeCurrentMonth}`,
      icon: MapPinIcon,
      change: calculateChange(activeCurrentMonth, activeLastMonth),
      changeType: calculateChangeType(activeCurrentMonth, activeLastMonth),
    },
    {
      id: 3,
      name: "Completed Inspections",
      stat: `${completedCurrentMonth}`,
      icon: CheckIcon,
      change: calculateChange(completedCurrentMonth, completedLastMonth),
      changeType: calculateChangeType(
        completedCurrentMonth,
        completedLastMonth
      ),
    },
  ];
};
;
