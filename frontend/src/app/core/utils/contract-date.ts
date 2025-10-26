/** Represents a date without any time of day.
*   The exact time is determined by a legal contract
*   that the software does not have details about.
*/
export class ContractDate
{
    /** Tracks the Day, Month, and Year as of midnight, local time. */
    private readonly ReferenceDate: Date;

    /** Initializes a new instance of the ContractDate structure to the specified
    *   year, month (0-based), and day. */
    public constructor(year: number, month: number, day: number) {
        if (!year || year < 1900 || year > 2200)
            throw new Error("Year is not valid.");
        if ((!month && month !== 0) || month < 0 || month > 11)
            throw new Error("Month is not valid.");
        if (!day || day < 1 || day > 31)
            throw new Error("Day is not valid.");

        this.ReferenceDate = new Date(year, month, day);
    }

    /** Gets the year component of the date represented by this instance. */
    public get Year(): number { return this.ReferenceDate.getFullYear(); }

    /** Gets the 0-based month component of the date represented by this instance. */
    public get Month(): number { return this.ReferenceDate.getMonth(); }

    /** Gets the day of the month represented by this instance. */
    public get Day(): number { return this.ReferenceDate.getDate(); }

    /** Returns a new ContractDate that adds the number of days (rounded) in
    *   the given timeSpan to the value of this instance. */
    public Add(timeSpan: TimeSpan): ContractDate {
        if (!timeSpan)
            throw new Error("TimeSpan argument cannot be null.");

        let newDate: Date = new Date(this.ReferenceDate);
        switch (timeSpan.Units) {
            // Years and Months have to be handled differently
            // because we can't convert those to a number of days.
            case DateTimeComponent.Years:
                newDate.setFullYear(newDate.getFullYear() + timeSpan.Value);
                break;
            case DateTimeComponent.Months:
                newDate.setMonth(newDate.getMonth() + timeSpan.Value);
                break;
            default:
                let days = Math.round(timeSpan.getTotalDays());
                newDate.setDate(newDate.getDate() + days);
                break;
        }

        return new ContractDate(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
    }

    /**
    * Returns the difference (in milliseconds) between this contract date and
    * the given date (which is assumed to be local)
    * when the contract date is treated as representing midnight in the given
    * contractTimeZoneOffset.  
    * "contractTimeZoneOffset" is the number of hours the contract timezone is ahead of UTC.
    * If contractTimeZoneOffset is omitted,
    * the result will be rounded to the nearest day.
    * So, if the given date is later, the result will be a negative TimeSpan.
    */
    public DifferenceFromDate(date: Date, contractTimeZoneOffset: TimeSpan = null): number {
        if (!date)
            throw new Error("Date argument cannot be null.");

        let roundToNearestDay = false;
        let contractDate = new Date(this.ReferenceDate);

        if (contractTimeZoneOffset === null) {
            roundToNearestDay = true;
        }
        else {
            // Adjust contract date to UTC
            let localTimeZoneOffset = new TimeSpan(-1 * contractDate.getTimezoneOffset(),
                DateTimeComponent.Minutes);
            localTimeZoneOffset.addToDate(contractDate);

            // Adjust to the given contract time zone
            contractTimeZoneOffset = new TimeSpan(contractTimeZoneOffset.Value * -1, contractTimeZoneOffset.Units);
            contractTimeZoneOffset.addToDate(contractDate);
        }

        if (!roundToNearestDay) {
            return contractDate.valueOf() - date.valueOf();
        }
        else {
            return contractDate.valueOf() - this.RoundToNearestFullDay(date).valueOf();
        }
    }

    /**
    * Returns the difference (in milliseconds) between this contract date and
    * the given contract date, which are assumed to be in the same time zone.
    * So, if the given date is later, the result will be negative.
    */
    public Difference(other: ContractDate): number {
        if (!other)
            throw new Error("ContractDate argument cannot be null.");

        return this.ReferenceDate.valueOf() - other.ReferenceDate.valueOf();
    }

    /** Indicates whether this instance and a specified ContractDate are equal. */
    public Equals(other: ContractDate): boolean {
        if (!other)
            return false;

        return this.CompareTo(other) === 0;
    }

    /**
    * Returns 0 if the instances are equal.
    * Returns 1 if this instance is greater than the other.
    * Returns -1 if this instance is less than the other.
    */
    public CompareTo(other: ContractDate): number {
        if (!other)
            throw new Error("ContractDate argument cannot be null.");

        if (this.ReferenceDate < other.ReferenceDate) return -1;
        if (this.ReferenceDate > other.ReferenceDate) return 1;
        return 0;
    }

    public toISOString(): string {
        const pad = (num: number): string => {
            return (num.toString()).padStart(2, "0");
        };
        return `${this.Year}-${pad(this.Month+1)}-${pad(this.Day)}`;
    }

    /** Override default behavior of JSON.stringify() */
    public toJSON(): object {
        return {Year: this.Year, Month: this.Month + 1, Day: this.Day};
    }

    private RoundToNearestFullDay(date: Date): Date {
        if (date.getHours() >= 12) // round up?
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        else
            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
}

export class TimeSpan {
    public static readonly CONSTANTS = class constants {
        public static readonly MILLISECONDS_PER_DAY: number = 86400000;
        public static readonly MILLISECONDS_PER_HOUR: number = 3600000;
        public static readonly MILLISECONDS_PER_MINUTE: number = 60000;
        public static readonly SECONDS_PER_DAY: number = 86400;
        public static readonly MINUTES_PER_DAY: number = 1440;
    };

    public constructor(value?: number, units?: DateTimeComponent) {
        this.Value = value ?? 0;
        this.Units = units ?? DateTimeComponent.Milliseconds;
    }

    public readonly Value: number;
    public readonly Units: DateTimeComponent;

    /** Add this timespan to the given Date. */
    public addToDate(date: Date): void {
        switch (this.Units) {
            case DateTimeComponent.Milliseconds:
                date.setMilliseconds(date.getMilliseconds() + this.Value);
                break;
            case DateTimeComponent.Seconds:
                date.setSeconds(date.getSeconds() + this.Value);
                break;
            case DateTimeComponent.Minutes:
                date.setMinutes(date.getMinutes() + this.Value);
                break;
            case DateTimeComponent.Hours:
                date.setHours(date.getHours() + this.Value);
                break;
            case DateTimeComponent.Days:
                date.setDate(date.getDate() + this.Value);
                break;
            case DateTimeComponent.Months:
                date.setMonth(date.getMonth() + this.Value);
                break;
            case DateTimeComponent.Years:
                date.setFullYear(date.getFullYear() + this.Value);
                break;
        }
    }

    /** Convert this timespan to total number of days.
    *   Months and Years are not convertible to smaller units. */
    public getTotalDays(): number {
        switch (this.Units) {
            case DateTimeComponent.Milliseconds:
                return this.Value / TimeSpan.CONSTANTS.MILLISECONDS_PER_DAY;
            case DateTimeComponent.Seconds:
                return this.Value / TimeSpan.CONSTANTS.SECONDS_PER_DAY;
            case DateTimeComponent.Minutes:
                return this.Value / TimeSpan.CONSTANTS.MINUTES_PER_DAY;
            case DateTimeComponent.Hours:
                return this.Value / 24;
            case DateTimeComponent.Days:
                return this.Value;
            case DateTimeComponent.Months:
                throw new Error("A number of Months cannot be reliably converted to Days.");
            case DateTimeComponent.Years:
                throw new Error("A number of Years cannot be reliably converted to Days.");
            default:
                throw new Error("Unrecognized DateTimeComponent");
        }
    }
}

export enum DateTimeComponent {
    Years, Months, Days, Hours, Minutes, Seconds, Milliseconds
}