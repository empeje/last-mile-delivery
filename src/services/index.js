import googleMaps from "@google/maps";
import { GOOGLE_MAPS_API_KEY } from "../config";

export const googleMapsClient = googleMaps.createClient({
  key: GOOGLE_MAPS_API_KEY,
  Promise
});
