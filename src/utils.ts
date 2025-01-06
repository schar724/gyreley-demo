import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { User, UserDirectory } from "./types/user.type";
import { Client, ClientDirectory } from "./types/client.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function parseWKT(wkt: string) {
  const pointRegex = /^POINT\(\s*(-?\d+(\.\d+)?)\s+(-?\d+(\.\d+)?)\s*\)$/;

  const match = wkt.match(pointRegex);
  if (match) {
    const lng = parseFloat(match[1]);
    const lat = parseFloat(match[3]);
    return { lng, lat };
  } else {
    throw new Error("Invalid WKT");
  }
}

export function generateProfilePhoto(
  name: string,
  size: number = 100,
  bgColor: string = "#172554",
  textColor: string = "#ffffff",
): string {
  // Create a canvas element
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to get canvas context");
  }

  // Set canvas dimensions
  canvas.width = size;
  canvas.height = size;

  // Draw background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  // Generate initials
  const initials = name
    .split(" ")
    .map((part) => part[0].toUpperCase())
    .join("");

  // Set text properties
  ctx.font = `${size / 2}px Arial`;
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Draw initials
  ctx.fillText(initials, size / 2, size / 2);

  // Return the data URL of the canvas
  return canvas.toDataURL();
}

type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];
type JsonValue = string | number | boolean | JsonObject | JsonArray;

export const toCamelCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v)) as unknown as T;
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((result, key) => {
      const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      const value = (obj as JsonObject)[key];
      (result as JsonObject)[camelCaseKey] = toCamelCase(value);
      return result;
    }, {} as T);
  }
  return obj;
};

export function createUserDirectory(users: User[]): UserDirectory {
  // Sort users alphabetically by last name
  const sortedUsers = users.sort((a, b) =>
    a.lastName.localeCompare(b.lastName),
  );

  // Construct the UserDirectory
  const directory = sortedUsers.reduce(
    (directory: UserDirectory, user: User) => {
      const firstLetter = user.lastName.charAt(0).toUpperCase();

      // Initialize the array for the letter if it doesn't exist
      if (!directory[firstLetter]) {
        directory[firstLetter] = [];
      }

      // Push the user to the corresponding array
      directory[firstLetter].push(user);

      return directory;
    },
    {},
  );

  // Sort users in each letter group (optional, since we already sorted the array)
  Object.keys(directory).forEach((letter) => {
    directory[letter].sort((a, b) => a.lastName.localeCompare(b.lastName));
  });

  return directory;
}
export function createClientDirectory(clients: Client[]): ClientDirectory {
  // Sort clients alphabetically by name
  const sortedClients = clients.sort((a, b) => a.name.localeCompare(b.name));

  // Construct the ClientDirectory
  const directory = sortedClients.reduce(
    (directory: ClientDirectory, client: Client) => {
      const firstLetter = client.name.charAt(0).toUpperCase();

      // Initialize the array for the letter if it doesn't exist
      if (!directory[firstLetter]) {
        directory[firstLetter] = [];
      }

      // Push the client to the corresponding array
      directory[firstLetter].push(client);

      return directory;
    },
    {} as ClientDirectory, // Initial value of the accumulator
  );

  // Sort clients in each letter group (optional, since we already sorted the array)
  Object.keys(directory).forEach((letter) => {
    directory[letter].sort((a, b) => a.name.localeCompare(b.name));
  });

  return directory;
}

export function formatDate(timestamp: string) {
  const messageDate = new Date(timestamp);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const comparisonDate = new Date(messageDate);
  comparisonDate.setHours(0, 0, 0, 0);

  if (comparisonDate.getTime() === today.getTime()) {
    return (
      "Today at " +
      messageDate.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  } else {
    return messageDate.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
}

//For testing purposes
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
