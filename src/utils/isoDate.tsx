import { flow } from "lodash";

const isoDate: (date: Date) => string = flow(
  (date) => ({
    time: date.getTime(),
    offset: date.getTimezoneOffset() * 60000,
  }),
  ({ time, offset }) => new Date(time - offset).toISOString(),
  (isoDate) => isoDate.slice(0, 16)
);

export default isoDate;
