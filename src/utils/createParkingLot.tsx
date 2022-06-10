import ParkingLot, {
  RATE_FLAT,
  RATE_LARGE,
  RATE_MEDIUM,
  RATE_OVERNIGHT,
  RATE_SMALL,
} from "../types/ParkingLot";

const createParkingLot = ({
  rateFlat = RATE_FLAT,
  rateSmall = RATE_SMALL,
  rateMedium = RATE_MEDIUM,
  rateLarge = RATE_LARGE,
  rateOvernight = RATE_OVERNIGHT,
  spots = [],
}: Partial<ParkingLot>): ParkingLot => {
  return {
    rateFlat: rateFlat,
    rateSmall: rateSmall,
    rateMedium: rateMedium,
    rateLarge: rateLarge,
    rateOvernight: rateOvernight,
    spots: spots,
  };
};

export default createParkingLot;