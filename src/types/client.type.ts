import { Place } from "./place.type";

export type ClientDirectory = {
  [key: string]: Client[];
};
export type Client = {
  name: string;
  location: Place;
  clientId: string;
};
