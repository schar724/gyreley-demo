import { PlasticLocate, Measurement } from "@/types/locate.type";
import { format } from 'date-fns/format'
import { sessionStorageUtil } from "./sessionStorageUtil";
import mockPlasticLocates from "../mockdb/plasticLocates.json"
import mockMeasurements from "../mockdb/measurements.json"


const PLASTIC_LOCATES_KEY = "plastic-locates"
const MEASUREMENTS_KEY = "measurements"

sessionStorageUtil.initialize(PLASTIC_LOCATES_KEY, mockPlasticLocates)
sessionStorageUtil.initialize(MEASUREMENTS_KEY, mockMeasurements)

export const getPlasticLocates = (): PlasticLocate[] => {
  return sessionStorageUtil.read<PlasticLocate[]>(PLASTIC_LOCATES_KEY);

}

export const addPlasticLocate = (item: PlasticLocate): PlasticLocate[] => {
  const locates = sessionStorageUtil.read<PlasticLocate[]>(PLASTIC_LOCATES_KEY);
  locates.push(item);
  sessionStorageUtil.write(PLASTIC_LOCATES_KEY, locates);
  console.log('locates ', locates)
  return locates;
};

export const deletePlasticLocate = (item: PlasticLocate): PlasticLocate[] => {
  const locates = sessionStorageUtil.read<PlasticLocate[]>(PLASTIC_LOCATES_KEY);
  const filteredLocates = locates.filter(
    (locate) => locate.plasticLocateId !== item.plasticLocateId
  );
  sessionStorageUtil.write(PLASTIC_LOCATES_KEY, filteredLocates);
  return filteredLocates;
};

export const updatePlasticLocate = (item: PlasticLocate): PlasticLocate[] => {
  const locates = sessionStorageUtil.read<PlasticLocate[]>(PLASTIC_LOCATES_KEY);
  const index = locates.findIndex(
    (locate) => locate.plasticLocateId === item.plasticLocateId
  );

  console.log('in item ', item)

  if (index !== -1) {
    locates[index] = item;
    sessionStorageUtil.write(PLASTIC_LOCATES_KEY, locates);
  }

  return locates;
};

export const getPlasticLocate = (plasticLocateId: string): PlasticLocate | undefined => {
  const locates = sessionStorageUtil.read<PlasticLocate[]>(PLASTIC_LOCATES_KEY);
  const foundLocate = locates.find((locate) => locate.plasticLocateId === plasticLocateId);

  if (!foundLocate) {
    return undefined;
  }

  return {
    ...foundLocate,
    scheduledDate: format(new Date().toISOString(), "yyyy-MM-dd HH:mm:ss"),
    completionDate: format(new Date().toISOString(), "yyyy-MM-dd HH:mm:ss"),
  };
};

// Get measurements for a specific plastic locate by ID
export const getMeasurements = (plasticLocateId: string): Measurement[] | undefined => {
  const measurements = sessionStorageUtil.read<Record<string, { measurements: Measurement[] }>>(
    MEASUREMENTS_KEY
  );
  const foundMeasurements = measurements[plasticLocateId];


  return foundMeasurements ? foundMeasurements.measurements : undefined;
};
