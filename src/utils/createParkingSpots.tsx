import cuid from "cuid";
import { flow } from "lodash";
import ParkingSpot, { Size } from "../types/ParkingSpot";

const createSize: (index: number, total: number) => Size = flow(
  (index, total) => Math.floor(index / (total / 3)),
  (sizeKey) => Object.values(Size)[sizeKey]
);

const createDistances = (entries: number, spot: number): number[] =>
  [...Array(entries)].map((_, entry) => spot + entry + 1);

const createParkingSpots = (entries: number, spots: number): ParkingSpot[] =>
  [...Array(spots)].map((_, index) => ({
    id: cuid.slug(),
    size: createSize(index, spots),
    distances: createDistances(entries, index),
  }));

export default createParkingSpots;
