import ParkingSpot, { Size } from "../types/ParkingSpot";

const park = (
  size: Size,
  entry: number,
  spots: ParkingSpot[],
  date: Date = new Date()
) => {
  console.log(spots);
  console.log(date);
};

export default park;
