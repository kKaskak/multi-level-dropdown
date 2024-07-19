type DropdownOptions = {
    id: number;
    label: string;
    value: string;
    destination: string;
    default?: boolean;
    hidden?: boolean;
    level?: Item[];
}[];

type Item = {
    id: number;
    label: string;
    value: string;
    destination: string;
    default?: boolean;
    hidden?: boolean;
    level?: Item[];
};