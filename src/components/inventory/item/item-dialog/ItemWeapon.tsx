import { FC } from "react";
import { Weapon } from "@/types/inventories";

interface ItemWeaponProps {
  weaponItems: Weapon;
}

const ItemWeapon: FC<ItemWeaponProps> = ({ weaponItems }) => {
  const { piercing_damage, impact_damage, energy_damage } = weaponItems;
  return (
    <>
      <li className="item-dialog__stats-row">
        <span>Piercing damage</span>
        <span>{piercing_damage}</span>
      </li>
      <li className="item-dialog__stats-row">
        <span>Impact damage</span>
        <span>{impact_damage}</span>
      </li>
      <li className="item-dialog__stats-row">
        <span>Energy damage</span>
        <span>{energy_damage}</span>
      </li>
    </>
  );
};

export default ItemWeapon;
