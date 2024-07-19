type DropdownOptions = {
    id: number;
    label: string;
    value: string;
    destination: string;
    default?: boolean;
    hidden?: boolean;
    level?: {
        id: number;
        label: string;
        value: string;
        destination: string;
        default?: boolean;
        hidden?: boolean;
        level?: {
            id: number;
            label: string;
            value: string;
            destination: string;
            default?: boolean;
            hidden?: boolean;
        }[];
    }[];
}[];
