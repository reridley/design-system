import { FC } from "react";
import { Armor } from "@/types/inventories";

interface ItemArmorProps {
  armorItems: Armor;
}

const ItemArmor: FC<ItemArmorProps> = ({ armorItems }) => {
  const { piercing, impact, energy } = armorItems;
  return (
    <>
      <li className="item-dialog__stats-row">
        <span>Piercing defense</span>
        <span>{piercing}</span>
      </li>
      <li className="item-dialog__stats-row">
        <span>Impact defense</span>
        <span>{impact}</span>
      </li>
      <li className="item-dialog__stats-row">
        <span>Energy defense</span>
        <span>{energy}</span>
      </li>
    </>
  );
};

export default ItemArmor;
