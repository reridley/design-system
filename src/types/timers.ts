import { Expiration, NameSlug, Price } from "@/types/common";

export interface Accelerate {
  url: string;
  price: Price;
}

export interface Action extends NameSlug {
  action_group: "admin" | "bonds" | "credits" | "free";
  available: boolean;
  description: string;
  price?: Price;
  url: string;
  url_parameters?: Record<string, unknown>;
}

export interface Actions {
  admin?: Action[];
  bonds?: Action[];
  credits?: Action[];
  free?: Action[];
}

export interface Admin {
  name: string;
  url: string;
}

export interface Clone {
  agility: number;
  genotype: string;
  stamina: number;
  strength: number;
  type: string;
}

export interface DepartureArea {
  name: string;
  url: string;
}

export interface Reduction {
  bonds: number;
  percent: number;
}

export interface BaseTimer extends NameSlug {
  expires: Expiration;
}

export interface ActivityTimer extends BaseTimer {
  admin?: { finish_activity_now_url: string };
  type: "activity";
  quit_activity_url: string;
}

export interface ActivityRepairItemTimer extends Omit<ConfinedTimer, "type"> {
  type: "activity-repair-item";
}

export interface BuffTimer extends BaseTimer {
  type: "buff";
}

export interface CampaignTimer extends BaseTimer {
  type: "campaign";
}

export interface CharacterCooldownTimer extends BaseTimer {
  reduction: Reduction;
  type: "character-cooldown";
}

export interface CloneGestationTimer extends BaseTimer {
  clone: Clone;
  type: "clone-gestation";
}

export interface ConfinedTimer extends BaseTimer {
  actions: Actions;
  check_url?: string;
  description: string;
  group: string;
  summary: string;
  type: "confined-brig" | "confined-sickbay" | "confined-clonevat";
}

export interface CourseTimer extends BaseTimer {
  accelerate?: Accelerate;
  type: "course";
}

export interface GlobalMessageTimer extends BaseTimer {
  message: string;
  type: "global-message";
}

export interface HotelRoomTimer extends BaseTimer {
  type: "hotel-room";
}

export interface MissionTimer extends BaseTimer {
  type: "mission";
}

export interface ShipCooldownTimer extends BaseTimer {
  reduction: Reduction;
  ship: string;
  type: "ship-cooldown";
}

export interface ShipTravelTimer extends BaseTimer {
  admin?: Admin;
  type: "ship-travel";
}

export interface ShuttleTicketTimer extends BaseTimer {
  cancel_shuttle_ticket_url: string;
  departure_area: DepartureArea;
  type: "shuttle-ticket";
  admin?: Admin;
}

export interface SpecialEventTimer extends BaseTimer {
  description: string;
  type: "special-event";
}

export interface SyndicateCampaignTimer extends BaseTimer {
  type: "syndicate-campaign";
}

export interface SyndicateCooldownTimer extends BaseTimer {
  reduction: Reduction;
  type: "syndicate-cooldown";
}

export interface UnconsciousTimer extends Omit<ConfinedTimer, "type"> {
  type: "unconscious";
}

export type Timer =
  | ActivityTimer
  | ActivityRepairItemTimer
  | BuffTimer
  | CampaignTimer
  | CharacterCooldownTimer
  | CloneGestationTimer
  | ConfinedTimer
  | CourseTimer
  | GlobalMessageTimer
  | HotelRoomTimer
  | MissionTimer
  | ShipCooldownTimer
  | ShipTravelTimer
  | ShuttleTicketTimer
  | SpecialEventTimer
  | SyndicateCampaignTimer
  | SyndicateCooldownTimer
  | UnconsciousTimer;
