export interface Option {
    label: string;
    value: unknown;
}

export interface CountryGroup {
    label: string;
    options: Option[];
}
