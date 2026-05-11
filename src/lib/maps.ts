export type TravelMode = "driving" | "transit";

export function googleMapsUrl(
  origin: string,
  destination: string,
  mode: TravelMode
): string {
  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
    travelmode: mode,
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function googleMapsPlaceUrl(address: string): string {
  const params = new URLSearchParams({
    api: "1",
    query: address,
  });
  return `https://www.google.com/maps/search/?${params.toString()}`;
}
