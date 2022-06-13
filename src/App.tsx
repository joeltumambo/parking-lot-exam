import { flow, split } from "lodash";
import cuid from "cuid";
import styles from "./styles/App.module.css";
import ParkingLot from "./types/ParkingLot";
import createParkingLot from "./utils/createParkingLot";
import createParkingSpots from "./utils/createParkingSpots";
import ParkForm from "./components/ParkForm";
import findParkingSpot from "./utils/findParkingSpot";
import { useState } from "react";
import ParkingRecord from "./types/ParkingRecord";
import DataDisplay from "./components/DataDisplay";

const App = () => {
  const entriesCount = 3;
  const spotsCount = 3;
  const [parkingRecords, setParkingRecords] = useState<ParkingRecord[]>([]);
  const [parkingLot] = useState<ParkingLot>(
    createParkingLot({
      spots: createParkingSpots(entriesCount, spotsCount),
    })
  );

  const handlePark = (parkingRecord: ParkingRecord) => {
    setParkingRecords((oldRecords) => [...oldRecords, parkingRecord]);
  };

  return (
    <div className={styles["dashboard"]}>
      <span>
        <DataDisplay data={{ parkingLot }} />
      </span>
      <span>
        <DataDisplay data={{ parkingRecords }} />
      </span>
      <span>
        <ParkForm
          entriesCount={entriesCount}
          onPark={flow(
            (input) => ({
              spot: findParkingSpot(
                input.size,
                input.entry,
                parkingLot.spots,
                parkingRecords
              ),
              input,
            }),
            ({ spot, input }) =>
              spot
                ? handlePark({
                    id: cuid.slug(),
                    timeIn: input.time,
                    spotId: spot.id,
                    entryIndex: input.entry,
                    vehicleSize: input.size,
                  })
                : alert("No spot available")
          )}
        />
      </span>
    </div>
  );
};

export default App;
