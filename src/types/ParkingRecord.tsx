import { Size } from "./ParkingSpot";

interface ParkingRecord {
  id: string;
  timeStart: Date;
  spotId: string;
  spotSize: Size;
  entryIndex: number;
  timeEnd?: Date;
  duration?: number;
  fee?: number;
}

export default ParkingRecord;
