import ParkingSpot, { Size } from "../types/ParkingSpot";

const getSize = (key: number): Size => Object.values(Size)[key];

const createParkingSpots = (spots: number, entries: number): ParkingSpot[] =>
  [...Array(spots)].map((_, spot) => ({
    size: getSize(Math.floor(spot / entries)),
    distances: [...Array(entries)].map((_, entry) => spot + entry + 1),
  }));

export default createParkingSpots;
