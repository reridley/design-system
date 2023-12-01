import {
  Armor,
  InventoryItemDetails,
  ItemAction,
  ItemStatBoost,
  Medical,
  PriceModifiers,
  Weapon,
} from "@/types/inventories";
import Price from "@/components/common/Price";
import { Numeral } from "@/types/common";
import ItemMedical from "./ItemMedical";
import ItemArmor from "./ItemArmor";
import ItemWeapon from "./ItemWeapon";
import PriceModifier from "./PriceModifiers";

interface ItemDialogContentProps {
  buyAction?: ItemAction;
  current_quantity?: number;
  hasUnlimitedQuantity?: boolean;
  item: InventoryItemDetails;
  isSoldOut?: boolean;
  repair_level: Numeral;
  sellAction?: ItemAction;
}

export default function ItemDialogContent({
  buyAction,
  current_quantity,
  hasUnlimitedQuantity,
  isSoldOut,
  item,
  repair_level,
  sellAction,
}: ItemDialogContentProps) {
  const renderStatBoost = (boostItem: ItemStatBoost, index: number) => (
    <li className="item-dialog__stats-row" key={`stat-boost-${index}`}>
      <span>{boostItem.name} Boost</span>
      <span>{boostItem.percentage}%</span>
    </li>
  );

  return (
    <div className="item-dialog__stats-container">
      {item.item_type.slug === "weapon" && (
        <div className="item-dialog__weapon">
          <div>Weapon Type: {item.item_component_weapon?.weapon_type.name}</div>
          <div>
            {item.item_component_weapon?.weapon_type.is_long_range
              ? `Long Range`
              : `Short Range`}
            {item.item_component_weapon?.hand_to_hand &&
              ", Hand to hand combat"}
          </div>
        </div>
      )}
      <ul className="item-dialog__stats">
        <li className="item-dialog__stats-row">
          <span>Tier</span> <span>{item.tier}</span>
        </li>
        <li className="item-dialog__stats-row">
          <span>Type</span> <span>{item.item_type.name}</span>
        </li>
        {Boolean(item.item_component_weapon) && (
          <>
            <li className="item-dialog__stats-row">
              <span>Accuracy</span>
              <span>{item.item_component_weapon?.accuracy}</span>
            </li>
            <ItemWeapon weaponItems={item.item_component_weapon as Weapon} />
          </>
        )}
        {Boolean(item.item_component_armor) && (
          <ItemArmor armorItems={item.item_component_armor as Armor} />
        )}
        {Boolean(item.item_component_medical) && (
          <ItemMedical medicalItems={item.item_component_medical as Medical} />
        )}
        {Boolean(item.item_component_stats) &&
          (item.item_component_stats as ItemStatBoost[]).map(renderStatBoost)}
        {(item.item_type.slug === "weapon" ||
          item.item_type.slug === "armor") &&
          repair_level.exact < 1 && (
            <li className="item-dialog__stats-row">
              <span>condition</span>
              <span>{repair_level.formatted}</span>
            </li>
          )}
        {Boolean(sellAction?.slug === "sell-to-vendors") && (
          <>
            <span className="item-dialog__stats-filler"></span>
            <PriceModifier
              pricing={sellAction?.options.pricing as PriceModifiers}
            />
          </>
        )}
        {Boolean(buyAction) && (
          <>
            {isSoldOut && (
              <li className="item-dialog__stats-row visuallyhidden">
                <span>Available</span>
                <span>Sold out</span>
              </li>
            )}
            {Boolean(current_quantity || hasUnlimitedQuantity) && (
              <li className="item-dialog__stats-row">
                <span>Available</span>
                <span>{current_quantity ? current_quantity : "Unlimited"}</span>
              </li>
            )}
            <li className="item-dialog__stats-row">
              <span>Unit price</span>
              <span>
                <Price
                  currency={buyAction?.options.pricing?.base_price.currency}
                  price={buyAction?.options.pricing?.base_price.formatted}
                />
              </span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
