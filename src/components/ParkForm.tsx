import { flow } from "lodash";
import { useState } from "react";
import { Size } from "../types/ParkingSpot";
import styles from "../styles/ParkForm.module.css";

const isoDate: (date: Date) => string = flow(
  (date) => ({
    time: date.getTime(),
    offset: date.getTimezoneOffset() * 60000,
  }),
  ({ time, offset }) => new Date(time - offset).toISOString(),
  (isoDate) => isoDate.slice(0, 16)
);

interface ParkInputData {
  entry: number;
  size: Size;
  time: Date;
}

type ChangeHandler<T> = React.ChangeEventHandler<T>;

interface ParkFormProps {
  entriesCount: number;
  onPark(data: ParkInputData): void;
}

const ParkForm: React.FC<ParkFormProps> = ({ entriesCount, onPark }) => {
  const [values, setValues] = useState<ParkInputData>({
    entry: 0,
    size: Size.Small,
    time: new Date(),
  });

  const handleEntryChange: ChangeHandler<HTMLSelectElement> = (e) => {
    setValues((oldValues) => ({
      ...oldValues,
      entry: parseInt(e.target.value),
    }));
  };

  const handleSizeChange: ChangeHandler<HTMLSelectElement> = (e) => {
    setValues((oldValues) => ({
      ...oldValues,
      size: e.target.value as Size,
    }));
  };

  const handleTimeChange: ChangeHandler<HTMLInputElement> = (e) => {
    setValues((oldValues) => ({
      ...oldValues,
      time: new Date(e.target.value),
    }));
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    onPark(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <span>Park Vehicle</span>
      <span className={styles["form-row"]}>
        <label>Entry</label>
        <select name="entry" value={values.entry} onChange={handleEntryChange}>
          {[...Array(entriesCount)].map((_, entry) => (
            <option key={entry}>{entry}</option>
          ))}
        </select>
      </span>
      <span className={styles["form-row"]}>
        <label>Size</label>
        <select name="size" value={values.size} onChange={handleSizeChange}>
          <option>{Size.Small}</option>
          <option>{Size.Medium}</option>
          <option>{Size.Large}</option>
        </select>
      </span>
      <span className={styles["form-row"]}>
        <label>Time</label>
        <input
          name="time"
          type="datetime-local"
          value={isoDate(values.time)}
          onChange={handleTimeChange}
        />
      </span>
      <input type="submit" />
    </form>
  );
};

export default ParkForm;
