import { flow } from "lodash";
import cuid from "cuid";
import styles from "./styles/App.module.css";
import ParkingLot from "./types/ParkingLot";
import createParkingLot from "./utils/createParkingLot";
import createParkingSpots from "./utils/createParkingSpots";
import ParkForm, { ParkInputData } from "./components/ParkForm";
import findParkingSpot from "./utils/findParkingSpot";
import { useState } from "react";
import ParkingRecord from "./types/ParkingRecord";
import DataDisplay from "./components/DataDisplay";
import UnparkForm, { UnparkInputData } from "./components/UnparkForm";
import calculateFee from "./utils/calculateFee";
import getDuration from "./utils/getDuration";
import updateArrayElement from "./utils/updateArrayElement";

const findValidRecord = (id: string, records: ParkingRecord[]): number =>
  records.findIndex(
    (record) => record.id === id && record.timeEnd === undefined
  );

const App = () => {
  const entriesCount = 3;
  const spotsCount = 9;
  const [parkingRecords, setParkingRecords] = useState<ParkingRecord[]>([]);
  const [parkingLot] = useState<ParkingLot>(
    createParkingLot({
      spots: createParkingSpots(entriesCount, spotsCount),
    })
  );

  const handlePark = (input: ParkInputData) =>
    flow(
      () =>
        findParkingSpot(
          input.size,
          input.entry,
          parkingLot.spots,
          parkingRecords
        ),
      (spot) =>
        spot
          ? setParkingRecords((oldRecords) => [
              ...oldRecords,
              {
                id: cuid.slug(),
                timeStart: input.time,
                spotId: spot.id,
                spotSize: spot.size,
                entryIndex: input.entry,
              },
            ])
          : alert("No spot available")
    )();

  const updateRecord = (recordIndex: number, input: UnparkInputData) =>
    flow(
      () => ({ ...parkingRecords[recordIndex], timeEnd: input.time }),
      (record) => ({
        ...record,
        duration: getDuration(record.timeStart, record.timeEnd),
      }),
      (record) => ({
        ...record,
        fee: calculateFee(record.spotSize, record.duration),
      }),
      (record) => updateArrayElement(recordIndex, record, parkingRecords),
      (records) => setParkingRecords(records)
    )();

  const handleUnpark = (input: UnparkInputData) =>
    flow(
      () => findValidRecord(input.record, parkingRecords),
      (recordIndex) =>
        recordIndex >= 0
          ? updateRecord(recordIndex, input)
          : alert("No record found")
    )();

  return (
    <div className={styles["dashboard"]}>
      <span>
        <DataDisplay data={{ parkingLot }} />
      </span>
      <span>
        <DataDisplay data={{ parkingRecords }} />
      </span>
      <span className={styles["forms"]}>
        <ParkForm entriesCount={entriesCount} onSubmit={handlePark} />
        <UnparkForm records={parkingRecords} onSubmit={handleUnpark} />
      </span>
    </div>
  );
};

export default App;
