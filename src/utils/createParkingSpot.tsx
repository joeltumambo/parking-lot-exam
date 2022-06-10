import { flow } from "lodash";
import ParkingSpot, { Size } from "../types/ParkingSpot";

const createSize = flow(
  (entries: number, spot: number) => [Math.floor(spot / entries), entries],
  ([index, entries]) => Math.min(index, entries - 1),
  (index) => Object.values(Size)[index]
);

const createDistances = (entries: number, spot: number): number[] =>
  [...Array(entries)].map((_, entry) => spot + entry + 1);

const createParkingSpots = (entries: number, spots: number): ParkingSpot[] =>
  [...Array(spots)].map((_, spot) => ({
    size: createSize(entries, spot),
    distances: createDistances(entries, spot),
  }));

export default createParkingSpots;
