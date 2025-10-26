import { ContractDate, TimeSpan, DateTimeComponent } from './contract-date';

const MILLISECONDS_PER_DAY = TimeSpan.CONSTANTS.MILLISECONDS_PER_DAY;
const MILLISECONDS_PER_HOUR = TimeSpan.CONSTANTS.MILLISECONDS_PER_HOUR;
const MILLISECONDS_PER_MINUTE = TimeSpan.CONSTANTS.MILLISECONDS_PER_MINUTE;
const SECONDS_PER_DAY = TimeSpan.CONSTANTS.SECONDS_PER_DAY;
const MINUTES_PER_DAY = TimeSpan.CONSTANTS.MINUTES_PER_DAY;

describe('ContractDate class', () => {
    const isDstObservedLocally = (): boolean => {
        let date1 = new Date(2020, 5, 1);
        let date2: Date = new Date(2020, 0, 1);
        return date1.getTimezoneOffset() < date2.getTimezoneOffset();
    };

    describe("constructor", () => {
        it("should accept valid arguments", () => {
            let contractDate = new ContractDate(2020, 0, 1); // Jan. 1st
            expect(contractDate.Year).toBe(2020);
            expect(contractDate.Month).toBe(0);
            expect(contractDate.Day).toBe(1);

            contractDate = new ContractDate(2020, 11, 31); // Dec. 31st
            expect(contractDate.Year).toBe(2020);
            expect(contractDate.Month).toBe(11);
            expect(contractDate.Day).toBe(31);
        });
        it("should reject an invalid year argument", () => {
            expect(() => new ContractDate(1899, 1, 1)).toThrowError("Year is not valid.");
            expect(() => new ContractDate(2201, 1, 1)).toThrowError("Year is not valid.");
            expect(() => new ContractDate(undefined, 1, 1)).toThrowError("Year is not valid.");
            expect(() => new ContractDate(null, 1, 1)).toThrowError("Year is not valid.");
            expect(() => new ContractDate(NaN, 1, 1)).toThrowError("Year is not valid.");
        });
        it("should reject an invalid month argument", () => {
            expect(() => new ContractDate(2000, -1, 1)).toThrowError("Month is not valid.");
            expect(() => new ContractDate(2000, 12, 1)).toThrowError("Month is not valid.");
            expect(() => new ContractDate(2000, undefined, 1)).toThrowError("Month is not valid.");
            expect(() => new ContractDate(2000, null, 1)).toThrowError("Month is not valid.");
            expect(() => new ContractDate(2000, NaN, 1)).toThrowError("Month is not valid.");
        });
        it("should reject an invalid date argument", () => {
            expect(() => new ContractDate(2000, 1, 0)).toThrowError("Day is not valid.");
            expect(() => new ContractDate(2000, 1, 32)).toThrowError("Day is not valid.");
            expect(() => new ContractDate(2000, 1, undefined)).toThrowError("Day is not valid.");
            expect(() => new ContractDate(2000, 1, null)).toThrowError("Day is not valid.");
            expect(() => new ContractDate(2000, 1, NaN)).toThrowError("Day is not valid.");
        });
    });
    describe("Add()", () => {
        it("should reject an invalid argument", () => {
            let contractDate = new ContractDate(1999, 11, 24);
            expect(() => contractDate.Add(null)).toThrowError("TimeSpan argument cannot be null.");
        });
        describe("can add a timespan in", () => {
            it("milliseconds", () => {
                let contractDate = new ContractDate(1999, 11, 24);
                let newContractDate = contractDate.Add(
                    new TimeSpan(MILLISECONDS_PER_DAY * 8 + 8000, DateTimeComponent.Milliseconds));
                expect(newContractDate.Year).toBe(2000);
                expect(newContractDate.Month).toBe(0);
                expect(newContractDate.Day).toBe(1); // round down
            });
            it("seconds", () => {
                let contractDate = new ContractDate(1999, 11, 24);
                let newContractDate = contractDate.Add(
                    new TimeSpan(SECONDS_PER_DAY * 10 - 500, DateTimeComponent.Seconds));
                expect(newContractDate.Year).toBe(2000);
                expect(newContractDate.Month).toBe(0);
                expect(newContractDate.Day).toBe(3); // round up
            });
            it("minutes", () => {
                let contractDate = new ContractDate(1999, 11, 24);
                let newContractDate = contractDate.Add(
                    new TimeSpan(MINUTES_PER_DAY * 8 + 400, DateTimeComponent.Minutes));
                expect(newContractDate.Year).toBe(2000);
                expect(newContractDate.Month).toBe(0);
                expect(newContractDate.Day).toBe(1); // round down
            });
            it("hours", () => {
                let contractDate = new ContractDate(1999, 11, 24);
                let newContractDate = contractDate.Add(
                    new TimeSpan(24 * 8 + 1, DateTimeComponent.Hours));
                expect(newContractDate.Year).toBe(2000);
                expect(newContractDate.Month).toBe(0);
                expect(newContractDate.Day).toBe(1); // round down
            });
            it("days", () => {
                let contractDate = new ContractDate(1999, 11, 24);
                let newContractDate = contractDate.Add(
                    new TimeSpan(9.5, DateTimeComponent.Days));
                expect(newContractDate.Year).toBe(2000);
                expect(newContractDate.Month).toBe(0);
                expect(newContractDate.Day).toBe(3); // round up
            });
            it("months", () => {
                let contractDate = new ContractDate(1999, 11, 24);
                let newContractDate = contractDate.Add(
                    new TimeSpan(5, DateTimeComponent.Months));
                expect(newContractDate.Year).toBe(2000);
                expect(newContractDate.Month).toBe(4);
                expect(newContractDate.Day).toBe(24);
            });
            it("years", () => {
                let contractDate = new ContractDate(1999, 11, 24);
                let newContractDate = contractDate.Add(
                    new TimeSpan(2, DateTimeComponent.Years));
                expect(newContractDate.Year).toBe(2001);
                expect(newContractDate.Month).toBe(11);
                expect(newContractDate.Day).toBe(24);
            });
        });
        describe("can subtract a timespan in", () => {
            it("milliseconds", () => {
                let contractDate = new ContractDate(2000, 0, 1);
                let newContractDate = contractDate.Add(
                    new TimeSpan(MILLISECONDS_PER_DAY * -8 - 8000, DateTimeComponent.Milliseconds));
                expect(newContractDate.Year).toBe(1999);
                expect(newContractDate.Month).toBe(11);
                expect(newContractDate.Day).toBe(24); // round up
            });
            it("seconds", () => {
                let contractDate = new ContractDate(2000, 0, 3);
                let newContractDate = contractDate.Add(
                    new TimeSpan(SECONDS_PER_DAY * -10 + 500, DateTimeComponent.Seconds));
                expect(newContractDate.Year).toBe(1999);
                expect(newContractDate.Month).toBe(11);
                expect(newContractDate.Day).toBe(24); // round down
            });
            it("minutes", () => {
                let contractDate = new ContractDate(2000, 0, 1);
                let newContractDate = contractDate.Add(
                    new TimeSpan(MINUTES_PER_DAY * -8 - 400, DateTimeComponent.Minutes));
                expect(newContractDate.Year).toBe(1999);
                expect(newContractDate.Month).toBe(11);
                expect(newContractDate.Day).toBe(24); // round up
            });
            it("hours", () => {
                let contractDate = new ContractDate(2000, 0, 1);
                let newContractDate = contractDate.Add(
                    new TimeSpan(24 * -8 - 1, DateTimeComponent.Hours));
                expect(newContractDate.Year).toBe(1999);
                expect(newContractDate.Month).toBe(11);
                expect(newContractDate.Day).toBe(24); // round up
            });
            it("days", () => {
                let contractDate = new ContractDate(2000, 0, 3);
                let newContractDate = contractDate.Add(
                    new TimeSpan(-9.5, DateTimeComponent.Days));
                expect(newContractDate.Year).toBe(1999);
                expect(newContractDate.Month).toBe(11);
                expect(newContractDate.Day).toBe(25); // round up
            });
            it("months", () => {
                let contractDate = new ContractDate(2000, 4, 24);
                let newContractDate = contractDate.Add(
                    new TimeSpan(-5, DateTimeComponent.Months));
                expect(newContractDate.Year).toBe(1999);
                expect(newContractDate.Month).toBe(11);
                expect(newContractDate.Day).toBe(24);
            });
            it("years", () => {
                let contractDate = new ContractDate(2001, 11, 24);
                let newContractDate = contractDate.Add(
                    new TimeSpan(-2, DateTimeComponent.Years));
                expect(newContractDate.Year).toBe(1999);
                expect(newContractDate.Month).toBe(11);
                expect(newContractDate.Day).toBe(24);
            });
        });
    });
    describe("Equals()", () => {
        it("returns false when second date is null", () => {
            let date1 = new ContractDate(2015, 5, 1);
            let date2: ContractDate = null;
            expect(date1.Equals(date2)).toBe(false);
        });
        it("returns false when dates are not equal", () => {
            let date1 = new ContractDate(2015, 5, 1);
            let date2 = new ContractDate(2015, 5, 2);
            expect(date1.Equals(date2)).toBe(false);
        });
        it("returns true when dates are equal", () => {
            let date1 = new ContractDate(2015, 5, 2);
            let date2 = new ContractDate(2015, 5, 2);
            expect(date1.Equals(date2)).toBe(true);
        });
    });
    describe("CompareTo()", () => {
        it("should reject an invalid argument", () => {
            let contractDate = new ContractDate(1999, 11, 24);
            expect(() => contractDate.CompareTo(null)).toThrowError("ContractDate argument cannot be null.");
        });
        it("returns 1 when the other date's Year is lower", () => {
            let date1 = new ContractDate(2015, 5, 1);
            let date2 = new ContractDate(2014, 5, 1);
            expect(date1.CompareTo(date2)).toBe(1);
        });
        it("returns 1 when Years are equal and the other date's Month is lower", () => {
            let date1 = new ContractDate(2015, 5, 1);
            let date2 = new ContractDate(2015, 4, 1);
            expect(date1.CompareTo(date2)).toBe(1);
        });
        it("returns 1 when Years and Months are equal and the other date's Day is lower", () => {
            let date1 = new ContractDate(2015, 5, 2);
            let date2 = new ContractDate(2015, 5, 1);
            expect(date1.CompareTo(date2)).toBe(1);
        });
        it("returns 0 when the other date is the same", () => {
            let date1 = new ContractDate(2015, 5, 1);
            let date2 = new ContractDate(2015, 5, 1);
            expect(date1.CompareTo(date2)).toBe(0);
        });
        it("returns -1 when the other date's Year is greater", () => {
            let date1 = new ContractDate(2014, 5, 1);
            let date2 = new ContractDate(2015, 5, 1);
            expect(date1.CompareTo(date2)).toBe(-1);
        });
        it("returns -1 when Years are equal and the other date's Month is greater", () => {
            let date1 = new ContractDate(2015, 4, 1);
            let date2 = new ContractDate(2015, 5, 1);
            expect(date1.CompareTo(date2)).toBe(-1);
        });
        it("returns -1 when Years and Months are equal and the other date's Day is greater", () => {
            let date1 = new ContractDate(2015, 5, 1);
            let date2 = new ContractDate(2015, 5, 2);
            expect(date1.CompareTo(date2)).toBe(-1);
        });
    });
    describe("Difference()", () => {
        it("should reject an invalid argument", () => {
            let contractDate = new ContractDate(1999, 11, 24);
            expect(() => contractDate.Difference(null)).toThrowError("ContractDate argument cannot be null.");
        });
        it("should return a positive value when the given date is earlier", () => {
            expect(new ContractDate(2015, 5, 2)
                .Difference(new ContractDate(2015, 5, 1)))
                .toBe(1 * MILLISECONDS_PER_DAY);
            expect(new ContractDate(2020, 0, 1)
                .Difference(new ContractDate(2019, 0, 1)))
                .toBe(365 * MILLISECONDS_PER_DAY);
            expect(new ContractDate(2021, 0, 1)
                .Difference(new ContractDate(2020, 0, 1)))
                .toBe(366 * MILLISECONDS_PER_DAY); // leap year

             const dstOffset = isDstObservedLocally() ? MILLISECONDS_PER_HOUR : 0;
             expect(new ContractDate(2020, 2, 31)
                 .Difference(new ContractDate(2020, 2, 1)))
                 .toBe(30 * MILLISECONDS_PER_DAY - dstOffset); // one less hour for DST
        });
        it("should return a negative value when the given date is later", () => {
            expect(new ContractDate(2015, 5, 1)
                .Difference(new ContractDate(2015, 5, 2)))
                .toBe(-1 * MILLISECONDS_PER_DAY);
            expect(new ContractDate(2019, 0, 1)
                .Difference(new ContractDate(2020, 0, 1)))
                .toBe(-365 * MILLISECONDS_PER_DAY);
            expect(new ContractDate(2020, 0, 1)
                .Difference(new ContractDate(2021, 0, 1)))
                .toBe(-366 * MILLISECONDS_PER_DAY); // leap year

             const dstOffset = isDstObservedLocally() ? MILLISECONDS_PER_HOUR : 0;
             expect(new ContractDate(2020, 2, 1)
                 .Difference(new ContractDate(2020, 2, 31)))
                 .toBe(-30 * MILLISECONDS_PER_DAY + dstOffset); // one less hour for DST
        });
    });
    describe("DifferenceFromDate()", () => {
        it("should reject an invalid argument", () => {
            let contractDate = new ContractDate(1999, 11, 24);
            expect(() => contractDate.DifferenceFromDate(null)).toThrowError("Date argument cannot be null.");
        });
        describe("with no timezone given", () => {
            it("should return zero when the dates are the same", () => {
                expect(new ContractDate(2020, 5, 1)
                    .DifferenceFromDate(new Date(2020, 5, 1, 5, 30))) // rounds to June 1
                    .toBe(0);
            });
            it("should return a positive value (rounded to the nearest day) when the given date is earlier", () => {
                expect(new ContractDate(2015, 5, 2)
                    .DifferenceFromDate(new Date(2015, 5, 1, 5, 30))) // rounds to June 1
                    .toBe(1 * MILLISECONDS_PER_DAY);
                expect(new ContractDate(2020, 0, 1)
                    .DifferenceFromDate(new Date(2019, 0, 1, 5, 30))) // rounds to Jan. 1
                    .toBe(365 * MILLISECONDS_PER_DAY);
                expect(new ContractDate(2021, 0, 1)
                    .DifferenceFromDate(new Date(2020, 0, 1)))
                    .toBe(366 * MILLISECONDS_PER_DAY); // leap year

                const dstOffset = isDstObservedLocally() ? MILLISECONDS_PER_HOUR : 0;
                expect(new ContractDate(2020, 2, 31)
                    .DifferenceFromDate(new Date(2020, 1, 29, 13, 45))) // rounds to March 1
                    .toBe(30 * MILLISECONDS_PER_DAY - dstOffset); // one less hour for DST
            });
            it("should return a negative value (rounded to the nearest day) when the given date is later", () => {
                expect(new ContractDate(2015, 5, 1)
                    .DifferenceFromDate(new Date(2015, 5, 2, 5, 30))) // rounds to June 2
                    .toBe(-1 * MILLISECONDS_PER_DAY);
                expect(new ContractDate(2019, 0, 1)
                    .DifferenceFromDate(new Date(2020, 0, 1, 5, 30))) // rounds to Jan. 1
                    .toBe(-365 * MILLISECONDS_PER_DAY);
                expect(new ContractDate(2020, 0, 1)
                    .DifferenceFromDate(new Date(2021, 0, 1)))
                    .toBe(-366 * MILLISECONDS_PER_DAY); // leap year

                const dstOffset = isDstObservedLocally() ? MILLISECONDS_PER_HOUR : 0;
                expect(new ContractDate(2020, 2, 1)
                    .DifferenceFromDate(new Date(2020, 2, 30, 20, 15))) // rounds to April 1
                    .toBe(-30 * MILLISECONDS_PER_DAY + dstOffset); // one less hour for DST
            });
        });
        describe("with a timezone given", () => {
            // These local functions are designed to allow these tests
            // to pass regardless of the timezone setting of the host OS.
            const adjustToTimeZone = (date: Date, udtOffsetHours: number): Date => {
                const localTimeZoneOffset =
                    new TimeSpan(- date.getTimezoneOffset() - (udtOffsetHours * 60),
                    DateTimeComponent.Minutes);
                localTimeZoneOffset.addToDate(date);
                return date;
            };
            const makeCST = (date: Date): Date => adjustToTimeZone(date, -6); // applies between Nov. 1 to March 8
            const makeCDT = (date: Date): Date => adjustToTimeZone(date, -5); // applies between March 8 to Nov. 1

            const pstTimeZoneOffset = new TimeSpan(-8, DateTimeComponent.Hours); // applies between March 8 to Nov. 1
            const pdtTimeZoneOffset = new TimeSpan(-7, DateTimeComponent.Hours); // applies between Nov. 1 to March 8
            const estTimeZoneOffset = new TimeSpan(-5, DateTimeComponent.Hours); // applies between March 8 to Nov. 1
            const edtTimeZoneOffset = new TimeSpan(-4, DateTimeComponent.Hours); // applies between Nov. 1 to March 8

            describe('when the dates and times are equivalent', () => {
                it("should return zero (PDT)", () => {
                    const contractDate = new ContractDate(2015, 5, 2);
                    const localDate = makeCDT(new Date(2015, 5, 2, 2, 0)); // CDT is 2 hours ahead of PDT
                    const diff = contractDate.DifferenceFromDate(localDate, pdtTimeZoneOffset);
                    expect(diff).toBe(0);
                });
                it("should return zero (PST)", () => {
                    const contractDate = new ContractDate(2015, 2, 2);
                    const localDate = makeCST(new Date(2015, 2, 2, 2, 0)); // CST is 2 hours ahead of PST
                    const diff = contractDate.DifferenceFromDate(localDate, pstTimeZoneOffset);
                    expect(diff).toBe(0);
                });
                it("should return zero (EDT)", () => {
                    const contractDate = new ContractDate(2015, 5, 2);
                    const localDate = makeCDT(new Date(2015, 5, 1, 23, 0)); // CDT is 1 hours behind EDT
                    const diff = contractDate.DifferenceFromDate(localDate, edtTimeZoneOffset);
                    expect(diff).toBe(0);
                });
                it("should return zero (EST)", () => {
                    const contractDate = new ContractDate(2015, 2, 2);
                    const localDate = makeCST(new Date(2015, 2, 1, 23, 0)); // CST is 1 hour behind EST
                    const diff = contractDate.DifferenceFromDate(localDate, estTimeZoneOffset);
                    expect(diff).toBe(0);
                });
            });

            describe('when the given date is earlier', () => {
                it("should return a positive value (case 1)", () => {
                    const contractDate = new ContractDate(2020, 2, 2);
                    const localDate = makeCST(new Date(2020, 2, 1, 2, 0));
                    const diff = contractDate.DifferenceFromDate(localDate, pstTimeZoneOffset);
                    expect(diff).toBe(1 * MILLISECONDS_PER_DAY);
                });
                it("should return a positive value (case 2)", () => {
                    const contractDate = new ContractDate(2020, 2, 1)
                    const localDate = makeCST(new Date(2019, 2, 1, 2, 0));
                    const diff = contractDate.DifferenceFromDate(localDate, pstTimeZoneOffset);
                    expect(diff).toBe(366 * MILLISECONDS_PER_DAY); // leap year
                });
                it("should return a positive value (case 3)", () => {
                    const contractDate = new ContractDate(2020, 2, 1)
                    const localDate = makeCST(new Date(2020, 1, 1, 2, 0));
                    const diff = contractDate.DifferenceFromDate(localDate, pstTimeZoneOffset);
                    expect(diff).toBe(29 * MILLISECONDS_PER_DAY);
                });
                it("should return a positive value (case 4)", () => {
                    const contractDate = new ContractDate(2020, 2, 1)
                    const localDate = makeCST(new Date(2020, 1, 1, 10, 15, 10));
                    const diff = contractDate.DifferenceFromDate(localDate, pstTimeZoneOffset);
                    expect(diff).toBe(28 * MILLISECONDS_PER_DAY
                                    + 15 * MILLISECONDS_PER_HOUR
                                    + 44 * MILLISECONDS_PER_MINUTE
                                    + 50 * 1000);
                });
                it("should return a positive value (case 5)", () => {
                    const contractDate = new ContractDate(2020, 2, 1)
                    const localDate = makeCST(new Date(2019, 2, 1, 10, 15, 10));
                    const diff = contractDate.DifferenceFromDate(localDate, pstTimeZoneOffset);
                    expect(diff).toBe(365 * MILLISECONDS_PER_DAY
                                    + 15 * MILLISECONDS_PER_HOUR
                                    + 44 * MILLISECONDS_PER_MINUTE
                                    + 50 * 1000);
                });
                it("should return a positive value (case 6)", () => {
                    const contractDate = new ContractDate(2020, 0, 1)
                    const localDate = makeCST(new Date(2018, 11, 31, 23, 0));
                    const diff = contractDate.DifferenceFromDate(localDate, estTimeZoneOffset);
                    expect(diff).toBe(365 * MILLISECONDS_PER_DAY);
                });
                it("should return a positive value (case 7)", () => {
                    const contractDate = new ContractDate(2021, 0, 1)
                    const localDate = makeCST(new Date(2020, 0, 1, 2, 0));
                    const diff = contractDate.DifferenceFromDate(localDate, pstTimeZoneOffset);
                    expect(diff).toBe(366 * MILLISECONDS_PER_DAY); // leap year
                });
                it("should return a positive value (case 8)", () => {
                    const contractDate = new ContractDate(2020, 2, 31)
                    const localDate = makeCST(new Date(2020, 2, 1, 2, 0));
                    const diff = contractDate.DifferenceFromDate(localDate, pdtTimeZoneOffset);
                    expect(diff).toBe(30 * MILLISECONDS_PER_DAY - MILLISECONDS_PER_HOUR); // one less hour for DST
                });
                it("should return a positive value (case 9)", () => {
                    expect(new ContractDate(2015, 5, 3)
                        .DifferenceFromDate(makeCDT(new Date(2015, 5, 1, 5, 30)), edtTimeZoneOffset))
                        .toBe(1 * MILLISECONDS_PER_DAY
                            + 17 * MILLISECONDS_PER_HOUR
                            + 30 * MILLISECONDS_PER_MINUTE);
                });
            });

            describe('when the given date is later', () => {
                it("should return a negative value (case 1)", () => {
                    const contractDate = new ContractDate(2020, 2, 1);
                    const localDate = makeCST(new Date(2020, 2, 2, 2, 0));
                    const diff = contractDate.DifferenceFromDate(localDate, pstTimeZoneOffset);
                    expect(diff).toBe(-1 * MILLISECONDS_PER_DAY);
                });
                it("should return a negative value (case 2)", () => {
                    const contractDate = new ContractDate(2019, 2, 1)
                    const localDate = makeCST(new Date(2020, 2, 1, 2, 0));
                    const diff = contractDate.DifferenceFromDate(localDate, pstTimeZoneOffset);
                    expect(diff).toBe(-366 * MILLISECONDS_PER_DAY); // leap year
                });
                it("should return a negative value (case 3)", () => {
                    const contractDate = new ContractDate(2020, 1, 1)
                    const localDate = makeCST(new Date(2020, 2, 1, 2, 0));
                    const diff = contractDate.DifferenceFromDate(localDate, pstTimeZoneOffset);
                    expect(diff).toBe(-29 * MILLISECONDS_PER_DAY);
                });
                it("should return a negative value (case 4)", () => {
                    const contractDate = new ContractDate(2020, 1, 1)
                    const localDate = makeCST(new Date(2020, 2, 1, 10, 15, 10));
                    const diff = contractDate.DifferenceFromDate(localDate, pstTimeZoneOffset);
                    expect(diff).toBe(-29 * MILLISECONDS_PER_DAY
                                    - 8 * MILLISECONDS_PER_HOUR
                                    - 15 * MILLISECONDS_PER_MINUTE
                                    - 10 * 1000);
                });
                it("should return a negative value (case 5)", () => {
                    const contractDate = new ContractDate(2019, 2, 1)
                    const localDate = makeCST(new Date(2020, 2, 1, 10, 15, 10));
                    const diff = contractDate.DifferenceFromDate(localDate, pstTimeZoneOffset);
                    expect(diff).toBe(-366 * MILLISECONDS_PER_DAY
                                    - 8 * MILLISECONDS_PER_HOUR
                                    - 15 * MILLISECONDS_PER_MINUTE
                                    - 10 * 1000);
                });
                it("should return a negative value (case 6)", () => {
                    const contractDate = new ContractDate(2019, 0, 1)
                    const localDate = makeCST(new Date(2019, 11, 31, 23, 0));
                    const diff = contractDate.DifferenceFromDate(localDate, estTimeZoneOffset);
                    expect(diff).toBe(-365 * MILLISECONDS_PER_DAY);
                });
                it("should return a negative value (case 7)", () => {
                    const contractDate = new ContractDate(2020, 0, 1)
                    const localDate = makeCST(new Date(2021, 0, 1, 2, 0));
                    const diff = contractDate.DifferenceFromDate(localDate, pstTimeZoneOffset);
                    expect(diff).toBe(-366 * MILLISECONDS_PER_DAY); // leap year
                });
                it("should return a negative value (case 8)", () => {
                    const contractDate = new ContractDate(2020, 2, 1)
                    const localDate = makeCDT(new Date(2020, 2, 31, 2, 0));
                    const diff = contractDate.DifferenceFromDate(localDate, pstTimeZoneOffset);
                    expect(diff).toBe(-30 * MILLISECONDS_PER_DAY + MILLISECONDS_PER_HOUR); // one less hour for DST
                });
                it("should return a negative value (case 9)", () => {
                    expect(new ContractDate(2015, 5, 1)
                        .DifferenceFromDate(makeCDT(new Date(2015, 5, 2, 5, 30)), edtTimeZoneOffset))
                        .toBe(-1 * MILLISECONDS_PER_DAY
                            - 6 * MILLISECONDS_PER_HOUR
                            - 30 * MILLISECONDS_PER_MINUTE);
                });
            });
        });
    });
    describe("toISOString()", () => {
        it("returns the date in the format YYYY-MM-DD", () => {
            let date1 = new ContractDate(2015, 0, 1);
            expect(date1.toISOString()).toBe("2015-01-01");

            date1 = new ContractDate(2020, 11, 31);
            expect(date1.toISOString()).toBe("2020-12-31");
        });
    });
    it('is serialized with Year, Month, and Day properties', () => {
        let date = new ContractDate(2015, 0, 1);
        expect(JSON.stringify(date)).toBe('{"Year":2015,"Month":1,"Day":1}');
    });
});

describe('TimeSpan class', () => {
    describe('getTotalDays()', () => {
        it('should work for milliseconds', () => {
            const timeSpan = new TimeSpan(MILLISECONDS_PER_DAY, DateTimeComponent.Milliseconds);
            const days = timeSpan.getTotalDays();
            expect(days).toBe(1);
        });
        it('should work for seconds', () => {
            const timeSpan = new TimeSpan(-4 * SECONDS_PER_DAY, DateTimeComponent.Seconds);
            const days = timeSpan.getTotalDays();
            expect(days).toBe(-4);
        });
        it('should work for minutes', () => {
            const timeSpan = new TimeSpan(3 * MINUTES_PER_DAY, DateTimeComponent.Minutes);
            const days = timeSpan.getTotalDays();
            expect(days).toBe(3);
        });
        it('should work for hours', () => {
            const timeSpan = new TimeSpan(-48, DateTimeComponent.Hours);
            const days = timeSpan.getTotalDays();
            expect(days).toBe(-2);
        });
        it('should work for days', () => {
            const timeSpan = new TimeSpan(-5, DateTimeComponent.Days);
            const days = timeSpan.getTotalDays();
            expect(days).toBe(-5);
        });
        it('should not work for months', () => {
            const timeSpan = new TimeSpan(2, DateTimeComponent.Months);
            expect(() => timeSpan.getTotalDays()).toThrowError("A number of Months cannot be reliably converted to Days.");
        });
        it('should not work for years', () => {
            const timeSpan = new TimeSpan(2, DateTimeComponent.Years);
            expect(() => timeSpan.getTotalDays()).toThrowError("A number of Years cannot be reliably converted to Days.");
        });
    });
    describe('addToDate()', () => {
        it('should work for milliseconds', () => {
            const date = new Date(2020, 6, 16);
            const timeSpan = new TimeSpan(MILLISECONDS_PER_DAY, DateTimeComponent.Milliseconds);
            timeSpan.addToDate(date);

            const expectedDate = new Date(2020, 6, 17);
            expect(date.getFullYear()).toBe(expectedDate.getFullYear());
            expect(date.getMonth()).toBe(expectedDate.getMonth());
            expect(date.getDate()).toBe(expectedDate.getDate());
            expect(date.valueOf()).toBe(expectedDate.valueOf());
        });
        it('should work for seconds', () => {
            const date = new Date(2020, 6, 16);
            const timeSpan = new TimeSpan(-4 * SECONDS_PER_DAY, DateTimeComponent.Seconds);
            timeSpan.addToDate(date);

            const expectedDate = new Date(2020, 6, 12);
            expect(date.getFullYear()).toBe(expectedDate.getFullYear());
            expect(date.getMonth()).toBe(expectedDate.getMonth());
            expect(date.getDate()).toBe(expectedDate.getDate());
            expect(date.valueOf()).toBe(expectedDate.valueOf());
        });
        it('should work for minutes', () => {
            const date = new Date(2020, 6, 16);
            const timeSpan = new TimeSpan(3 * MINUTES_PER_DAY, DateTimeComponent.Minutes);
            timeSpan.addToDate(date);

            const expectedDate = new Date(2020, 6, 19);
            expect(date.getFullYear()).toBe(expectedDate.getFullYear());
            expect(date.getMonth()).toBe(expectedDate.getMonth());
            expect(date.getDate()).toBe(expectedDate.getDate());
            expect(date.valueOf()).toBe(expectedDate.valueOf());
        });
        it('should work for hours', () => {
            const date = new Date(2020, 6, 16);
            const timeSpan = new TimeSpan(-48, DateTimeComponent.Hours);
            timeSpan.addToDate(date);

            const expectedDate = new Date(2020, 6, 14);
            expect(date.getFullYear()).toBe(expectedDate.getFullYear());
            expect(date.getMonth()).toBe(expectedDate.getMonth());
            expect(date.getDate()).toBe(expectedDate.getDate());
            expect(date.valueOf()).toBe(expectedDate.valueOf());
        });
        it('should work for days', () => {
            const date = new Date(2020, 6, 16);
            const timeSpan = new TimeSpan(-5, DateTimeComponent.Days);
            timeSpan.addToDate(date);

            const expectedDate = new Date(2020, 6, 11);
            expect(date.getFullYear()).toBe(expectedDate.getFullYear());
            expect(date.getMonth()).toBe(expectedDate.getMonth());
            expect(date.getDate()).toBe(expectedDate.getDate());
            expect(date.valueOf()).toBe(expectedDate.valueOf());
        });
        it('should work for months', () => {
            const date = new Date(2020, 6, 16);
            const timeSpan = new TimeSpan(-2, DateTimeComponent.Months);
            timeSpan.addToDate(date);

            const expectedDate = new Date(2020, 4, 16);
            expect(date.getFullYear()).toBe(expectedDate.getFullYear());
            expect(date.getMonth()).toBe(expectedDate.getMonth());
            expect(date.getDate()).toBe(expectedDate.getDate());
            expect(date.valueOf()).toBe(expectedDate.valueOf());
        });
        it('should work for years', () => {
            const date = new Date(2020, 6, 16);
            const timeSpan = new TimeSpan(2, DateTimeComponent.Years);
            timeSpan.addToDate(date);

            const expectedDate = new Date(2022, 6, 16);
            expect(date.getFullYear()).toBe(expectedDate.getFullYear());
            expect(date.getMonth()).toBe(expectedDate.getMonth());
            expect(date.getDate()).toBe(expectedDate.getDate());
            expect(date.valueOf()).toBe(expectedDate.valueOf());
        });
    });
});