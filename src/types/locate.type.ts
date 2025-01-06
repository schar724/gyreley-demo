export interface PlasticLocate {
  contactDetail: string;
  contactName: string;
  identifier: string;
  inspectionStatusId: string;
  inspectionStatusName: string;
  inspectorId: string;
  scheduledDate: string;
  plasticLocateId: string;
  requestorId: string;
  requestorName: string;
  clientId?: string;
  place?: Place;
  notes?: string;
  deviceMountId?: string;
  deviceMountName?: string;
  deviceId?: string;
  completionDate?: string;
  pipeTag?: string;
  placeId?: string;
  inspectorName?: string;
  deviceTag?: string;
  measurements?: PlasticMeasurement[];
  pipe?: Pipe;
  attachments?: Attachement[];
}

export interface Attachement {
  attachmentId: string;
  attachmentName: string;
  mimeType: string;
}

export interface Pipe {
  pipeId: string;
  pipeTag: string;
  pipeMaterialId: string;
  pipeWkt: string;
}

export interface PlasticMeasurement {
  plasticMeasurementId: string;
  personId: string;
  deviceId: string;
  measurementGeo: string;
  measurementJson: string;
  measurementWkt: string;
  measurementDate: string;
  foundInd: boolean;
}

export type UpdatePlasticLocateStatusBody = {
  plasticLocateId: string;
  inspectionStatusId: string;
  completionDate: Date | null;
};

export type UpdatePlasticLocateInspectorBody = {
  plasticLocateId: string;
  inspectorId: string;
};

export type Place = {
  formattedAddress: string;
  placeId: string;
  url: string;
  lat: number;
  lng: number;
};

export type PipeData = {
  "Device Tag": string;
  "Device Mount": string;
  "Pipe Tag": string;
};

export type PlaceData = {
  Address: string;
  "Contact Name": string;
  "Phone Number": string;
};

export type LocateData = {
  Identifier: string;
  Status: string;
  Requestor: string;
  Inspector: string;
  Scheduled: string;
  Completed: string;
  Notes: string;
};

export type GeoData = {
  contactName: string;
  contactDetail: string;
  location: {
    lat: number;
    lng: number;
  };
} & Place;

export type CompletedMeasurements = {
  [key: string]: string;
};

export type FormattedLocate = {
  pipeData: PipeData;
  placeData: PlaceData;
  locateData: LocateData;
  geoData: GeoData;
  completedMeasurements: CompletedMeasurements;
  attachements: Attachement[];
};

export type Measurement = {
  plasticLocateId: string;
  clientId: string;
  personId: string;
  lat: number;
  lng: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number;
  pipeDetected: boolean;
};

export type PostMeasurementBody = {
  measurementsWKT: string[];
  plasticLocateId: string;
  personId: string;
  deviceId: string;
  measurementDate: string;
};
