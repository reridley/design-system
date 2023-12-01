import { Numeral, Pager, Price } from "@/types/common";
import { Stats } from "@/types/frameState";
import { Message } from "@/types/pageState";

export interface ActionsSummary {
  enabled: number;
  messages: string[];
}

export interface ItemStatBoost {
  name: string;
  percentage: number;
  slug: string;
}

export interface ItemType {
  name: string;
  slug: string;
  sort_order?: number;
  stackable?: number | boolean;
}

export interface Medical {
  agility_boost: number;
  base_toxicity: number;
  base_toxicity_formatted: string;
  intelligence_boost: number;
  social_boost: number;
  stamina_boost: number;
  strength_boost: number;
}

export interface Armor {
  energy: number;
  impact: number;
  piercing: number;
}

export interface WeaponType {
  is_long_range: boolean;
  name: string;
}

export interface Weapon {
  accuracy: number;
  energy_damage: number;
  hand_to_hand: boolean;
  impact_damage: number;
  piercing_damage: number;
  weapon_type: WeaponType;
}

export interface InventoryItemDetails {
  bonds?: number;
  description: string;
  image: string;
  item_component_armor?: Armor;
  item_component_medical?: Medical;
  item_component_mod?: object;
  item_component_stats?: ItemStatBoost[];
  item_component_weapon?: Weapon;
  item_type: ItemType;
  mass: number;
  name: string;
  rarity: string;
  stack_size: number;
  slot_type: string;
  slug: string;
  tier: number;
}

export interface PriceRange {
  minimum_price: number;
  maximum_price: number;
}

interface ActionMessage {
  message: string;
}

export type Modifiers = "reputation" | "social";

export interface Modifier {
  amount: number;
  is_good: boolean;
  modifier: number;
  percentage: string;
  reason: string;
  sign: string;
  slug: string;
  type: string;
}

export interface PriceModifiers {
  base_price: Price;
  final_price: Price;
  price_modifiers: Modifier[];
}

export interface ItemActionOptions {
  bonds_fee?: Price;
  credits_fee_multiplier?: number;
  min_credits_fee?: number;
  pricing?: PriceModifiers;
  duration?: string;
  max_purchase_quantity?: string;
}

export interface ItemAction {
  enabled: boolean;
  max_purchase_quantity: string;
  messages: ActionMessage[];
  name: string;
  options: ItemActionOptions;
  slug: string;
  url: string;
}

export interface InventoryItem {
  actions?: ItemAction[];
  actions_summary?: ActionsSummary;
  available_actions?: string[];
  bonds_fee?: Price;
  credits_fee?: number;
  current_quantity?: number;
  equip_index?: number;
  genetically_bound: boolean;
  has_unlimited_quantity: boolean;
  image: string;
  item: InventoryItemDetails;
  price?: Price;
  max_purchase_quantity: string;
  out_of_stock?: boolean;
  price_range?: PriceRange;
  quantity: number;
  repair_level: Numeral;
  slot_type?: string;
  slug: string;
}

export interface FacetItem {
  count: number;
  name: string;
  order?: number;
  slug: string;
}

export interface Facet {
  items: FacetItem[];
  name: string;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface InventoryPercentage {
  exact: number;
  formatted: string;
}

export interface InventoryItems {
  encumbrance?: string;
  facets: Facet[];
  has_filters: boolean;
  items: InventoryItem[];
  mass?: string;
  name: string;
  no_items_message?: string;
  pager: Pager;
  percent_used?: InventoryPercentage;
  total_quantity: number;
}

export interface InventoryEquippedSection {
  current_slots: number;
  items: [] | InventoryItem[];
  max_slots: number;
}

export interface InventoryEquipped {
  armor: InventoryEquippedSection;
  "combat-belt": InventoryEquippedSection;
  weapon: InventoryEquippedSection;
}

export interface renderEmptySlotProps {
  index?: number;
  dimension?: string;
  equippedType?: "armor" | "belt" | "locked" | "weapon";
  locked?: boolean;
  slotKey?: string;
}

export type item_type =
  | "armor"
  | "weapon"
  | "blueprint"
  | "medical"
  | "trade-good"
  | "mission"
  | "ration"
  | "food"
  | "event";

export type rarity = "common" | "uncommon" | "rare" | "epic";

export interface InventoryFilter {
  item_type?: item_type[];
  rarity?: rarity[];
  tier?: number[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface InventoryType {
  "inventory-carried": InventoryItems;
  "inventory-equipped"?: InventoryEquipped;
}

// retrieve
export interface APIResponseInventoryRetrieve {
  messages?: Message[];
  stats?: Stats;
  "inventory-items": InventoryItems;
}

// Area specific Inventory response
export interface APIResponseInventoryArea {
  messages?: Message[];
  stats?: Stats;
  "inventory-area-action": InventoryItems;
}

// Character Inventory response
export interface APIResponseCharacterInventory extends InventoryType {
  messages?: Message[];
  stats?: Stats;
}

// export interface APIResponseFilter
//   extends StaticResponse,
//     InventoryType,
//     SuccessResponse {}
