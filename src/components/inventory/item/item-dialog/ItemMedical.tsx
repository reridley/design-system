import { FC } from "react";
import { Medical } from "@/types/inventories";

interface ItemMedicalProps {
  medicalItems: Medical;
}

const ItemMedical: FC<ItemMedicalProps> = ({ medicalItems }) => {
  const {
    strength_boost,
    agility_boost,
    stamina_boost,
    intelligence_boost,
    social_boost,
    base_toxicity_formatted,
  } = medicalItems;

  return (
    <>
      <li className="item-dialog__stats-row">
        <span>Strength Boost</span>
        <span>{strength_boost}</span>
      </li>
      <li className="item-dialog__stats-row">
        <span>Agility Boost</span>
        <span>{agility_boost}</span>
      </li>
      <li className="item-dialog__stats-row">
        <span>Stamina Boost</span>
        <span>{stamina_boost}</span>
      </li>
      <li className="item-dialog__stats-row">
        <span>Intelligence Boost</span>
        <span>{intelligence_boost}</span>
      </li>
      <li className="item-dialog__stats-row">
        <span>Social Boost</span>
        <span>{social_boost}</span>
      </li>
      <li className="item-dialog__stats-row">
        <span>Toxicity</span>
        <span>{base_toxicity_formatted}</span>
      </li>
    </>
  );
};

export default ItemMedical;
