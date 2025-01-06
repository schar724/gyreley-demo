import { PlasticLocate } from "@/types/locate.type";
import { format } from "date-fns/format";

export type StorageKey = "chats" | "clients" | "dashboard" | "messages" | "plastic-locates" | "measurements" | "location" | "users" | "attachments"

export const sessionStorageUtil = {
  initialize: (key: StorageKey, mockData: any) => {
    const storedData = sessionStorage.getItem(key);
    if (!storedData) {
      if (!storedData) {
        if (key === 'plastic-locates') {
          const modifiedMockData = mockData.map((entry: PlasticLocate) => {
            return {
              ...entry, scheduledDate: format(
                new Date().toISOString(),
                "yyyy-MM-dd HH:mm:ss",
              ), completedDate: format(
                new Date().toISOString(),
                "yyyy-MM-dd HH:mm:ss",
              ),
            }
          })
          sessionStorage.setItem(key, JSON.stringify(modifiedMockData))
        } else {

          sessionStorage.setItem(key, JSON.stringify(mockData))
        }
      }

    }
  },

  read: <T>(key: StorageKey): T => {
    const storedData = sessionStorage.getItem(key)
    return storedData ? JSON.parse(storedData) : [];
  },

  write: <T>(key: StorageKey, data: T): void => {
    sessionStorage.setItem(key, JSON.stringify(data))
  }

}
