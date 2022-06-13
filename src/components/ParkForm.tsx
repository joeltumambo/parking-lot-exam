import { useState } from "react";
import { Size } from "../types/ParkingSpot";
import styles from "../styles/ParkForm.module.css";
import isoDate from "../utils/isoDate";

export interface ParkInputData {
  entry: number;
  size: Size;
  time: Date;
}

type ChangeHandler<T> = React.ChangeEventHandler<T>;

interface ParkFormProps {
  entriesCount: number;
  onSubmit(data: ParkInputData): void;
}

const ParkForm: React.FC<ParkFormProps> = ({ entriesCount, onSubmit }) => {
  const [values, setValues] = useState<ParkInputData>({
    entry: 0,
    size: Size.S,
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
    onSubmit(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
          <option>{"Small"}</option>
          <option>{"Medium"}</option>
          <option>{"Large"}</option>
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
      <button type="submit">Park</button>
    </form>
  );
};

export default ParkForm;
