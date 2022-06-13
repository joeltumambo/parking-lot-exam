import { Size } from "./ParkingSpot";

interface ParkingRecord {
  id: string;
  timeIn: Date;
  spotId: string;
  entryIndex: number;
  vehicleSize: Size;
  timeOut?: Date;
  fee?: number;
}

export default ParkingRecord;
