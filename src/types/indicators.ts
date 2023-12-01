import { Expiration } from './common';

export enum IndicatorsEnum {
    Bodyguard = 'bodyguard',
    Vip = 'vip',
    Visa = 'visa',
    WellFed = 'well_fed',
}

export interface Indicator {
    active: boolean;
    expires?: Expiration;
    renewal_area?: string;
    renewable?: boolean;
    renewable_from?: string;
}

export type Indicators = {
    [key in IndicatorsEnum]: Indicator;
};
