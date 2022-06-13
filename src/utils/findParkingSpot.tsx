import { flow } from "lodash";
import ParkingRecord from "../types/ParkingRecord";
import ParkingSpot, { Size } from "../types/ParkingSpot";

type SizeDictionary = {
  [key in Size]: Size[];
};

// S vehicles can park in S, M, L,
// M vehicles in M, L
// L vehicles in L
const sizeFilters: SizeDictionary = {
  [Size.S]: [Size.S, Size.M, Size.L],
  [Size.M]: [Size.M, Size.L],
  [Size.L]: [Size.L],
};

const isVehicleAllowed = (vehicleSize: Size, spotSize: Size): boolean =>
  sizeFilters[vehicleSize].includes(spotSize);

const isSpotAvailable = (spotId: string, records: ParkingRecord[]): boolean =>
  records.filter(
    (record) => record.spotId === spotId && record.timeOut === undefined
  ).length === 0;

const getAvailableSpots = (
  spots: ParkingSpot[],
  vehicleSize: Size,
  records: ParkingRecord[]
): ParkingSpot[] =>
  spots.filter(
    (spot) =>
      isVehicleAllowed(vehicleSize, spot.size) &&
      isSpotAvailable(spot.id, records)
  );

const sortByNearest = (
  spots: ParkingSpot[],
  entryIndex: number
): ParkingSpot[] =>
  spots.sort((a, b) => a.distances[entryIndex] - b.distances[entryIndex]);

const findParkingSpot = (
  vehicleSize: Size,
  entryIndex: number,
  spots: ParkingSpot[],
  records: ParkingRecord[]
): ParkingSpot =>
  flow(
    () => getAvailableSpots(spots, vehicleSize, records),
    (spots) => sortByNearest(spots, entryIndex),
    (spots) => spots[0]
  )();

export default findParkingSpot;
