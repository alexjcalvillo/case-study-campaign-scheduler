export interface Schedule {
    date_start: string,
    date_end?: string,
    configuration: {
        schedule: {
            time_zone: string,
            specific_time: string, // format HH:mm
            type?: string,
            allowed_days?: string[], //required when type = daily | weekly
            frequency?: number,
            specific_day?: number, // require when type = monthly_specific
            relative_type?: string, // require when type = monthly_relative
        }
    }
}

export interface Toggles {
    endDate: boolean,
    monthlyButtons: boolean
}

interface IObjectKeys {
    [key: string]: boolean,
}

export interface allowedDays extends IObjectKeys {
    'sunday': boolean,
    'monday': boolean,
    'tuesday': boolean,
    'wednesday': boolean,
    'thursday': boolean,
    'friday': boolean,
    'saturday': boolean,
}