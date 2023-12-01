import {
  Avatar,
  CurrentMission,
  MissionTypeEnum,
  NewMission,
} from "@/types/character";
import { Expiration, NameSlug, Numeral } from "@/types/common";
import { Indicators } from "@/types/indicators";
import { Actions } from "@/types/timers";

interface Money {
  value: string;
  abbrev: string;
}

export interface AreaNav extends NameSlug {
  current_area: boolean;
  short_name: string;
  link: string;
  url?: string;
}

export type Missions = {
  [key in MissionTypeEnum]: CurrentMission | NewMission;
};

export interface BankAccount {
  credits: Money;
  bonds: Money;
}

export interface CharacterProgress {
  experience: string;
  level: number;
}

export enum VenturesEnum {
  Career = "career",
  CoreMission = "core",
  DiscreetWork = "discreet-work",
  Mission = "mission",
  SideJob = "side-job",
}

export interface Venture {
  active: boolean;
  name: string;
  title: string;
  url: string;
  confirmation?: string;
}

export interface CurrentVentures {
  available: boolean;
  ventures: {
    [key in VenturesEnum]: Venture;
  };
}

export type EmailUnreadCount = number;

export type GameTime = number;

export interface MissionFlags {
  jobs?: boolean;
  discreet_work?: boolean;
  mission?: boolean;
}

export interface People {
  available: boolean;
  mission_flag_count: number;
  mission_flags?: MissionFlags;
}
export interface CurrentTripDestination extends NameSlug {
  description: string;
}

export interface CurrentTrip {
  acceleration: Numeral;
  arrival_time: string;
  departure_time: string;
  destination: CurrentTripDestination;
  transport_type: NameSlug;
  travel_range: "local" | "interstellar" | "hybrid";
}

export interface AreaConfinementItem extends NameSlug {
  image: string;
}

export interface AreaConfinement {
  actions: Actions;
  avatar: Avatar;
  check_url?: string;
  confinement_message: string | string[];
  create_time: Expiration;
  description: string;
  end_time: Expiration;
  group: string;
  item?: AreaConfinementItem;
  name: string;
  reason: string;
  summary: string;
  type: "confined" | "repairing-item" | "unconscious";
}

export interface Location extends NameSlug {
  affiliation: NameSlug;
  area_confinement?: AreaConfinement;
  area_navigation?: AreaNav[];
  can_obtain_rations: boolean;
  current_trip?: CurrentTrip;
  description?: string;
  destination?: {
    affiliation: NameSlug;
    arrival: string;
    description?: string;
    law_level: number;
    name: string;
    orwellian_level: number;
    station_level: number;
  };
  is_onboard_ship: boolean;
  is_traveling?: boolean;
  location_type: "private_ship" | "public_shuttle" | "station_area" | undefined;
  location_digest: string;
  long_description?: string;
  name: string;
  people?: People;
  route_url: string;
  security_camera?: {
    installed: boolean;
    operational?: boolean;
  };
  short_name: string;
  star?: string;
  station?: string;
  tasks?: {
    available: boolean;
  };
  tutorial?: string;
  visited?: boolean;
}

export type NotificationsUnreadCount = number;

export enum StatsEnum {
  Agility = "agility",
  Encumbrance = "encumbrance",
  Focus = "focus",
  Intelligence = "intelligence",
  Social = "social",
  Stamina = "stamina",
  Strength = "strength",
  ToxinLevel = "toxin_level",
}

export interface Stat {
  current: number;
  display_percentage: number;
  max: number;
  percentage: number;
  is_vip?: boolean;
  real?: number | string;
  refill?: {
    seconds: string;
    segments: string;
    units: string;
  };
}

export type Stats = {
  [key in StatsEnum]: Stat;
};

export type Wallet = Money;

export interface Preference {
  name: string;
  type: string;
  value: boolean;
  view_title: string;
  max_value?: number;
  min_value?: number;
}

export interface NavigationLink {
  link: string;
  url?: string;
  text: string;
  is_current?: true;
}

export interface Navigation {
  admin?: boolean;
  areas: NavigationLink[];
  available?: boolean;
}

export interface NumberPreference extends Omit<Preference, "value"> {
  value: number;
}

export interface Preferences {
  animations_enabled: Preference;
  background_music_enabled: Preference;
  background_music_volume: NumberPreference;
  screen_reader_enhancements: Preference;
  sound_effects_enabled: Preference;
  sound_effects_volume: NumberPreference;
  timed_redirection_enabled: Preference;
}

export interface FrameState {
  "bank-account": BankAccount;
  character: any; // TODO
  "character-progress": CharacterProgress;
  "current-ventures": CurrentVentures;
  "email-unread-count": EmailUnreadCount;
  game_time: GameTime;
  indicators: Indicators;
  location: Location;
  missions?: Missions;
  navigation: Navigation;
  "notifications-unread-count": NotificationsUnreadCount;
  stats: Stats;
  wallet: Wallet;
  preferences: Preferences;
}

export interface RoutingConfig {
  arrivals: boolean;
  astronautics: boolean;
  bank: boolean;
  bar: boolean;
  brig: boolean;
  "career-advisory": boolean;
  clonevat: boolean;
  cockpit: boolean;
  "decommissioned-area": boolean;
  depot: boolean;
  "discreet-work": boolean;
  docks: boolean;
  "electronic-market": boolean;
  "gaule-embassy": boolean;
  "government-center": boolean;
  "hotel-rooms": boolean;
  iatrics: boolean;
  industry: boolean;
  "info-hub": boolean;
  inn: boolean;
  "interstellar-shuttles": boolean;
  "job-center": boolean;
  "local-shuttles": boolean;
  lounge: boolean;
  market: boolean;
  port: boolean;
  regulation: boolean;
  residences: boolean;
  ruins: boolean;
  security: boolean;
  "shipping-bay": boolean;
  shipyard: boolean;
  sickbay: boolean;
  "side-jobs": boolean;
  storage: boolean;
  "syndicate-districts": boolean;
  "syndicate-services": boolean;
  "syndicate-vendors": boolean;
  "the-wilds": boolean;
  "the-wrecks": boolean;
  training: boolean;
  university: boolean;
  vendors: boolean;
  "vip-lounge": boolean;
}
