import { Key } from "react";
import classNames from "classnames";
import { Modifier, PriceModifiers } from "@/types/inventories";
import Price from "@/components/common/Price";

interface PriceModifierProps {
  pricing: PriceModifiers;
  submissionQuantity?: number;
}

export default function PriceModifier({
  pricing,
  submissionQuantity,
}: PriceModifierProps) {
  const { base_price, final_price, price_modifiers } = pricing;
  return (
    <div className="item-dialog__price-modifier">
      <ul className="item-dialog__stats">
        <li className="item-dialog__stats-row">
          <span>Base price</span>
          <span>
            <Price
              currency={base_price.currency}
              price={
                submissionQuantity
                  ? (submissionQuantity * Number(base_price.exact)).toFixed(2)
                  : base_price.formatted
              }
            />
          </span>
        </li>
        {price_modifiers.map(
          (
            { amount, is_good, percentage, reason, sign, type }: Modifier,
            index: Key,
          ) => (
            <li
              className={classNames(
                "item-dialog__stats-row item-dialog__stats-row--modifier",
                {
                  "item-dialog__stats-row--decrease": is_good === false,
                },
              )}
              key={index}
            >
              <span className="item-dialog__stats-modifier-label">
                <span>
                  {percentage}% {type}
                </span>
                <span className="visuallyhidden"> for </span>
                <span>{reason}</span>
              </span>
              <span>
                {sign}
                <Price
                  currency={base_price.currency}
                  price={
                    submissionQuantity
                      ? (submissionQuantity * Number(amount)).toFixed(2)
                      : amount
                  }
                />
              </span>
            </li>
          ),
        )}
        <li className="item-dialog__stats-row">
          <span>Final price</span>
          <span>
            <Price
              currency={final_price.currency}
              price={
                submissionQuantity
                  ? (submissionQuantity * Number(final_price.exact)).toFixed(2)
                  : final_price.formatted
              }
            />
          </span>
        </li>
      </ul>
    </div>
  );
}
