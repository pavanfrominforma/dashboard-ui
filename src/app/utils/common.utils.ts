import * as moment from "moment";

export const prefixZero = (digit: number) => {
    const digitstr = String(digit);
    return digitstr.length > 1 ? digit : "0" + digitstr;
};

export const stringSorter = (
    prev: any,
    next: any,
    sortField: string = null
) => {
    const prevValue: string = sortField != null ? prev[sortField] : prev;
    const nextValue: string = sortField != null ? next[sortField] : next;
    return prevValue?.localeCompare(nextValue);
};

export const numericSorter = (
    prev: any,
    next: any,
    sortField: string = null
) => {
    const prevValue: number = sortField != null ? prev[sortField] : prev;
    const nextValue: number = sortField != null ? next[sortField] : next;
    return prevValue - nextValue;
};

export const dateSorter = (prev: any, next: any, sortField: string = null) => {
    const prevValue: Date = sortField != null ? prev[sortField] : prev;
    const nextValue: Date = sortField != null ? next[sortField] : next;
    return moment(prevValue).diff(nextValue, "ms");
};

export const getSorterBy = (datatype: string) => {
    if (datatype == "number") return numericSorter;
    if (datatype == "string") return stringSorter;
    if (datatype == "date") return dateSorter;
    return null;
};
