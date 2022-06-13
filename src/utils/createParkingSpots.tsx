import { flow } from "lodash";
import ParkingSpot, { Size } from "../types/ParkingSpot";

const createSize: (entries: number, spot: number) => Size = flow(
  (entries, spot) => [Math.floor(spot / entries), entries],
  ([index, entries]) => Math.min(index, entries - 1),
  (index) => Object.values(Size)[index]
);

const createDistances = (entries: number, spot: number): number[] =>
  [...Array(entries)].map((_, entry) => spot + entry + 1);

const createParkingSpots = (entries: number, spots: number): ParkingSpot[] =>
  [...Array(spots)].map((_, spot) => ({
    id: spot,
    size: createSize(entries, spot),
    distances: createDistances(entries, spot),
  }));

export default createParkingSpots;
