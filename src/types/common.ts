export interface Pager {
  current_page: number;
  entries_on_this_page: number;
  entries_per_page: number;
  first_page: number;
  last_page: number;
  next_page: number | null;
  previous_page: number | null;
  total_entries: number;
}

export interface Armor extends NameSlug {
  image: string;
}
export interface Weapon extends NameSlug {
  image: string;
}
export interface Character extends NameSlug {
  weapon?: Weapon;
  armor?: Armor;
  title: string;
  mission_flag?: string;
  contact_type: string;
  is_npc?: boolean;
}

export interface Price {
  currency: string;
  exact: number;
  formatted: string;
}

export interface Period {
  formatted: string;
  exact: number;
  unit: string;
}

export interface Numeral {
  exact: number;
  formatted: string;
}

export interface Expiration {
  gct: string;
  seconds: number;
  epoch?: number;
}

export interface NameSlug {
  name: string;
  slug: string;
}

export interface Distance {
  kilometers: Numeral;
  light_years: Numeral;
}

export interface Destination extends NameSlug {
  affiliation: NameSlug;
  station_level: number;
}

export interface Confinement {
  area?: string;
  confinement_date_gct?: string;
  is_confined: boolean;
  reason?: string;
  release_date?: Expiration;
  cost_in_bonds?: {
    bribe_for_early_release: Price;
    bribe_to_stay_longer?: Price;
    beat_up_inmate?: Price;
    hire_lawyer?: Price;
  };
}

export interface Unconscious {
  is_unconscious: boolean;
  unconscious_until?: Expiration;
}

export interface TrainingEnhancer {
  duration: string;
  gain: string;
  messages: {
    button: string;
    title: string;
  };
  price: Price;
  url: string;
}
type TrainingRiskLevel = "no_risk" | "low_risk" | "high_risk";

export interface TrainingRisk {
  level: TrainingRiskLevel;
  message: string;
}

export interface TrainingStat {
  available: boolean;
  points: number[];
  stat: "strength" | "agility" | "stamina";
  button?: string;
  unavailable_message?: string;
}

type ScaledValue = {
  real: number;
  scaled: number;
};

export type SuggestedAction = {
  name: string;
  reason: string;
  slug: string;
};

export interface FocusStat {
  current_level: ScaledValue;
  is_vip: boolean;
  markers: number[];
  maximum_level: ScaledValue;
  minimum_required: ScaledValue;
}
export interface TrainingOptions {
  available: boolean;
  focus?: FocusStat;
  training_enhancer: TrainingEnhancer;
  training_risk?: TrainingRisk;
  stats?: TrainingStat[];
  unavailable_message?: string;
  suggested_actions?: SuggestedAction[];
}

export interface TrainingAPIResponse {
  "training-options": TrainingOptions;
}

export interface Error {
  code: string;
  title: string;
}

export interface GCTObject {
  segment: number;
  day: number;
  cycle: number;
  unit: number;
  nanounit?: number;
}
