import { flow } from "lodash";
import {
  RATE_FLAT,
  RATE_SMALL,
  RATE_MEDIUM,
  RATE_LARGE,
  RATE_OVERNIGHT,
} from "../types/ParkingLot";
import { Size } from "../types/ParkingSpot";

type SizeDictionary = {
  [key in Size]: number;
};

// S vehicles can park in S, M, L,
// M vehicles in M, L
// L vehicles in L
const sizeFees: SizeDictionary = {
  [Size.S]: RATE_SMALL,
  [Size.M]: RATE_MEDIUM,
  [Size.L]: RATE_LARGE,
};

const look = (args: any) => {
  console.log(args);
  return args;
};

// let H = hourly rate, D = duration, F = flat rate
// fee = H(D - 3) + 3F
const calculateByHour = (size: Size, duration: number): number =>
  sizeFees[size] * (duration - 3) + 3 * RATE_FLAT;

// let O = overnight rate, D = duration,
// fee = O(D/24) + calculateFee(remainder)
const calculateOvernight = (size: Size, duration: number): number =>
  flow(
    () => duration / 24,
    look,
    (fraction) => [Math.floor(fraction), Math.ceil(fraction % 1)],
    look,
    ([whole, remainder]) =>
      RATE_OVERNIGHT * whole + calculateFee(size, remainder),
    look
  )();

const calculateFee = (size: Size, duration: number): number =>
  flow(() =>
    duration > 3
      ? duration > 24
        ? calculateOvernight(size, duration)
        : calculateByHour(size, duration)
      : RATE_FLAT
  )();

export default calculateFee;
