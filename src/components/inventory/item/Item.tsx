import { FC } from "react";
import classNames from "classnames";
import { Numeral } from "@/types/common";
import { StyledItem } from "./Item.styled";

interface ItemProps {
  dimension?: string;
  image: string;
  isButton?: boolean;
  isGeneticallyBound?: boolean;
  isSoldOut?: boolean;
  name?: string;
  quantity?: number;
  repairLevel?: Numeral;
  rarity: string;
  showAmount?: boolean;
  stackSize?: number;
  type?: string;
}

const Item: FC<ItemProps> = ({
  dimension,
  image,
  isButton = false,
  isGeneticallyBound,
  isSoldOut,
  name,
  quantity,
  repairLevel,
  rarity,
  showAmount = false,
  stackSize,
  type,
}) => {
  return (
    <>
      <StyledItem
        $dimension={dimension}
        $isButton={isButton}
        className={`item__framed-img--${rarity}`}
      >
        <img alt="" src={image} />
        {isSoldOut && (
          <img alt="" src="/static/images/inventory/sold-out.svg" />
        )}
        {Boolean(isGeneticallyBound) && (
          <span
            {...(isButton && { "aria-hidden": true })}
            className="item__genetically-bound"
          >
            <span className="item__genetically-bound__icon">
              <svg>
                <use xlinkHref="/static/images/icons.svg#icon-genetically-bound"></use>
              </svg>
            </span>
            <span className={classNames({ visuallyhidden: isButton })}>
              Genetically Bound
            </span>
          </span>
        )}
        {Boolean(name) && (
          <span className="item__name">
            <span className="visuallyhidden">{type}: </span>
            {name}
          </span>
        )}
        {repairLevel && repairLevel.exact < 1 && (
          <span className="item__condition">
            <span className="visuallyhidden">Damage percent: </span>
            {repairLevel.formatted}
          </span>
        )}
        {showAmount && Boolean(stackSize && stackSize > 1) && (
          <span className="item__amount">
            <span className="visuallyhidden">Stack Amount: </span>
            {quantity}
          </span>
        )}
      </StyledItem>
    </>
  );
};

export default Item;
