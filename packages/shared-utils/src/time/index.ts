import dayjs, { type Dayjs, type OpUnitType } from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

// ----------------------------------------------------------------------

/**
 * @Docs
 * https://day.js.org/docs/en/display/format
 */

/**
 * Default timezones
 * https://day.js.org/docs/en/timezone/set-default-timezone#docsNav
 *
 */

/**
 * UTC
 * https://day.js.org/docs/en/plugin/utc
 * @install
 * import utc from 'dayjs/plugin/utc';
 * dayjs.extend(utc);
 * @usage
 * dayjs().utc().format()
 *
 */

export type DurationProps = {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};

dayjs.extend(duration);
dayjs.extend(relativeTime);

// ----------------------------------------------------------------------

export type DatePickerFormat =
  | Dayjs
  | Date
  | string
  | number
  | null
  | undefined;

export const formatTimePatterns = {
  dateTime: "DD MMM YYYY h:mm a", // 17 Apr 2022 12:00 am
  date: "DD MMM YYYY", // 17 Apr 2022
  time: "h:mm a", // 12:00 am
  split: {
    dateTime: "DD/MM/YYYY h:mm a", // 17/04/2022 12:00 am
    date: "DD/MM/YYYY", // 17/04/2022
  },
  paramCase: {
    dateTime: "DD-MM-YYYY h:mm a", // 17-04-2022 12:00 am
    date: "DD-MM-YYYY", // 17-04-2022
  },
};

const isValidDate = (date: DatePickerFormat) =>
  date !== null && date !== undefined && dayjs(date).isValid();

// ----------------------------------------------------------------------

/**
 * Utility functions for formatting times
 */
export const Time = {
  /**
   * Returns today's date
   * @returns {string}
   */
  today(template?: string): string {
    return dayjs(new Date()).startOf("day").format(template);
  },

  /**
   * Formats a date into human-readable date-time string
   * @output 17 Apr 2022 12:00 am
   */
  dateTime(date: DatePickerFormat, template?: string): string | null {
    if (!isValidDate(date)) return null;

    return dayjs(date).format(template ?? formatTimePatterns.dateTime);
  },

  /**
   * Formats a date into a short date string
   * @output 17 Apr 2022
   */
  date(date: DatePickerFormat, template?: string): string | null {
    if (!isValidDate(date)) return null;

    return dayjs(date).format(template ?? formatTimePatterns.date);
  },

  /**
   * Formats a date into a time string
   * @output 12:00 am
   */
  time(date: DatePickerFormat, template?: string): string | null {
    if (!isValidDate(date)) return null;

    return dayjs(date).format(template ?? formatTimePatterns.time);
  },

  /**
   * Returns a UNIX timestamp (milliseconds) from a date
   * @output 1713250100
   */
  timestamp(date: DatePickerFormat): number | null {
    if (!isValidDate(date)) return null;

    return dayjs(date).valueOf();
  },

  /**
   * Returns a human-readable relative time string
   * @output a few seconds, 2 years
   */
  toNow(date: DatePickerFormat): string | null {
    if (!isValidDate(date)) return null;

    return dayjs(date).toNow(true);
  },

  /**
   * Checks whether a date is between two other dates (inclusive)
   * @output boolean
   */
  isBetween(
    inputDate: DatePickerFormat,
    startDate: DatePickerFormat,
    endDate: DatePickerFormat
  ): boolean {
    if (
      !isValidDate(inputDate) ||
      !isValidDate(startDate) ||
      !isValidDate(endDate)
    )
      return false;

    const formattedInputDate = this.timestamp(inputDate);
    const formattedStartDate = this.timestamp(startDate);
    const formattedEndDate = this.timestamp(endDate);

    if (!formattedInputDate || !formattedStartDate || !formattedEndDate)
      return false;

    return (
      formattedInputDate >= formattedStartDate &&
      formattedInputDate <= formattedEndDate
    );
  },

  /**
   * Checks if one date is after another
   * @output boolean
   */
  isAfter(startDate: DatePickerFormat, endDate: DatePickerFormat): boolean {
    if (!isValidDate(startDate) || !isValidDate(endDate)) return false;

    return dayjs(startDate).isAfter(endDate);
  },

  /**
   * Checks if two dates are the same based on the given unit (default: "year")
   * @output boolean
   */
  isSame(
    startDate: DatePickerFormat,
    endDate: DatePickerFormat,
    unitToCompare?: OpUnitType
  ): boolean {
    if (!isValidDate(startDate) || !isValidDate(endDate)) return false;

    return dayjs(startDate).isSame(endDate, unitToCompare ?? "year");
  },

  /**
   * Creates a human-readable range label between two dates
   * @output
   * Same day: 26 Apr 2024
   * Same month: 25 - 26 Apr 2024
   * Same month: 25 - 26 Apr 2024
   * Same year: 25 Apr - 26 May 2024
   */
  dateRangeShortLabel(
    startDate: DatePickerFormat,
    endDate: DatePickerFormat,
    initial?: boolean
  ): string | null {
    if (
      !isValidDate(startDate) ||
      !isValidDate(endDate) ||
      this.isAfter(startDate, endDate)
    )
      return null;

    let label = `${this.date(startDate)} - ${this.date(endDate)}`;

    if (initial) {
      return label;
    }

    const isSameYear = this.isSame(startDate, endDate, "year");
    const isSameMonth = this.isSame(startDate, endDate, "month");
    const isSameDay = this.isSame(startDate, endDate, "day");

    if (isSameYear && !isSameMonth) {
      label = `${this.date(startDate, "DD MMM")} - ${this.date(endDate)}`;
    } else if (isSameYear && isSameMonth && !isSameDay) {
      label = `${this.date(startDate, "DD")} - ${this.date(endDate)}`;
    } else if (isSameYear && isSameMonth && isSameDay) {
      label = `${this.date(endDate)}`;
    }

    return label;
  },

  /**
   * Adds duration to the current date and returns ISO string.
   * @output 2024-05-28T05:55:31+00:00
   */
  add({
    years = 0,
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
  }: DurationProps) {
    const result = dayjs()
      .add(
        dayjs.duration({
          years,
          months,
          days,
          hours,
          minutes,
          seconds,
          milliseconds,
        })
      )
      .format();

    return result;
  },

  /**
   * Subtracts duration from the current date and returns ISO string
   * @output 2024-05-28T05:55:31+00:00
   */
  sub({
    years = 0,
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
  }: DurationProps) {
    const result = dayjs()
      .subtract(
        dayjs.duration({
          years,
          months,
          days,
          hours,
          minutes,
          seconds,
          milliseconds,
        })
      )
      .format();

    return result;
  },
};
