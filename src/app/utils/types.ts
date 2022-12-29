export enum FilterControlType {
    DATE = "date",
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
}
export interface FilterControlProps {
    name?: string;
    field?: string;
    datatype: string | FilterControlType;
}

export interface FeedsApiResponse {
    headers: FilterControlProps[];
    data: any[];
    count: number;
}
