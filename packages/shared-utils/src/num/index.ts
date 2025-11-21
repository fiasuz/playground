export type InputNumberValue = string | number | null | undefined;
type Options = Intl.NumberFormatOptions;

function validateNumber(inputValue: InputNumberValue): number | null {
  if (inputValue === null || Number.isNaN(inputValue)) return null;
  return Number(inputValue);
}

/**
 * Utility functions for formatting numbers
 */
export const Num = {
  /**
   * Make number with spaces
   * @example
   * ```ts
   * Num.formatNumber(12345.678) // "12 345,68"
   * ```
   * @param {InputNumberValue} inputValue - The number or string to format.
   * @returns {string} A formatted number string, or an empty string if invalid.
   */
  formatNumber(inputValue: InputNumberValue): string | "invalid_input" {
    const number = validateNumber(inputValue);
    if (number === null) return "invalid_input";

    const fm = new Intl.NumberFormat("uz-UZ", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(number);

    return fm;
  },

  /**
   * Make number with percent
   * * @example
   * ```ts
   * Num.formatPercent(25)       // "25%"
   * ```
   * @param {InputNumberValue} inputValue - The number or string to format.
   * @returns {string} A formatted number string, or an empty string if invalid.
   */
  formatPercent(inputValue: InputNumberValue): string | "invalid_input" {
    const number = validateNumber(inputValue);
    if (number === null) return "invalid_input";

    const fm = new Intl.NumberFormat("uz-UZ", {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(number / 100);

    return fm;
  },

  /**
   * Make shorten number
   * @example
   * ```ts
   * Num.formatShorten(1500000)  // "1,5 mln"
   * ```
   * @param {InputNumberValue} inputValue - The number or string to format.
   * @returns {string} A formatted number string, or an empty string if invalid.
   */
  formatShorten(inputValue: InputNumberValue): string | "invalid_input" {
    const number = validateNumber(inputValue);
    if (number === null) return "invalid_input";

    const fm = new Intl.NumberFormat("uz-UZ", {
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(number);

    return fm.replace(/[A-Z]/g, (match) => match.toLowerCase());
  },

  /**
   * Convert bytes human readable data
   * @example
   * ```ts
   * Num.data(2048)        // "2 Kb"
   * ```
   * @param {InputNumberValue} inputValue - The number or string to format.
   * @returns {string} A formatted number string, or an empty string if invalid.
   */
  formatData(inputValue: InputNumberValue): string {
    const number = validateNumber(inputValue);
    if (number === null || number === 0) return "0 bytes";

    const units = ["bytes", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"];
    const decimal = 2;
    const baseValue = 1024;

    const index = Math.floor(Math.log(number) / Math.log(baseValue));
    const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`;

    return fm;
  },

  /**
   * Format phone number
   * @param value Number to be formatted
   * @returns {string} Formatted phone number
   */
  formatPhone(value: string | number): string {
    const digits = value.toString().replace(/\D/g, "");

    if (digits.length === 0) return "";

    const prefix = digits.startsWith("998") ? "+998 " : "+998 ";
    let formattedNumber = prefix;

    if (digits.length > 3) formattedNumber += digits.slice(3, 5);
    if (digits.length > 5) formattedNumber += " " + digits.slice(5, 8);
    if (digits.length > 8) formattedNumber += "-" + digits.slice(8, 10);
    if (digits.length > 10) formattedNumber += "-" + digits.slice(10, 12);

    return formattedNumber.trim();
  },

  /**
   * Convert value to a safe number
   * @param value Value to be converted to safe number
   * @returns Safe number
   * @example
   * ```ts
   * Num.formatSafeNumber('1234.56') // 1234.56
   * Num.formatSafeNumber('abc')      // 0
   * Num.formatSafeNumber(null)       // 0
   * Num.formatSafeNumber('')         // 0
   * ```
   */

  formatSafeNumber(value: string): number {
    if (value === "" || value === null || value === undefined) return 0;
    const numValue = parseFloat(value.toString().replace(/[^\d.-]/g, "")) || 0;
    return isNaN(numValue) ? 0 : numValue;
  },

  /**
   * Default locale for currency formatting
   */
  formatCurrency(
    inputValue: InputNumberValue,
    options?: Options
  ): string | "invalid_input" {
    const number = validateNumber(inputValue);
    if (number === null) return "invalid_input";

    const fm = new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: "UZS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options,
    }).format(number);

    return fm;
  },
};
