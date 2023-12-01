import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { isNil } from "lodash";
import { TextField } from "@mui/material";
import { ItemAction } from "@/types/inventories";
import Price from "@/components/common/Price";
import Amount from "@/components/inventory/item/item-dialog/Amount";

interface ItemFormControlProps {
  action: ItemAction;
  amount: number;
  availableBeltSlots: number;
  beltEquipSlotNumberState: [number, Dispatch<SetStateAction<number>>];
  isValid: boolean;
  itemName?: string;
  submissionQuantityState: [number, Dispatch<SetStateAction<number>>];
  submissionPriceState: [string, Dispatch<SetStateAction<string>>];
}

export default function ItemFormControl({
  action,
  amount,
  availableBeltSlots,
  beltEquipSlotNumberState: [beltEquipSlotNumber, setBeltEquipSlotNumber],
  isValid,
  itemName,
  submissionQuantityState: [submissionQuantity, setSubmissionQuantity],
  submissionPriceState: [submissionPrice, setSubmissionPrice],
}: ItemFormControlProps) {
  const publicMarketPriceRef = useRef<HTMLDivElement>(null);
  const publicMarketCreditsFee =
    submissionQuantity *
    (Number(submissionPrice) * Number(action?.options?.credits_fee_multiplier));

  useEffect(() => {
    const inputContainer = publicMarketPriceRef.current as HTMLDivElement;
    if (inputContainer !== null) {
      inputContainer.querySelector("input")?.focus();
    }
  }, [submissionPrice]);

  switch (action.slug) {
    case "drop":
      return (
        <>
          <h3 className="item-dialog__form-title">Drop</h3>
          <Amount
            actionSlug={action.slug}
            amount={amount}
            defaultValue={isNil(submissionQuantity) ? "1" : submissionQuantity}
            labelText="Select Amount"
            updateFunction={setSubmissionQuantity}
          />
        </>
      );
    case "equip":
      // only combat belt equip items have multiples
      return (
        <>
          <h3 className="item-dialog__form-title">Equip</h3>
          {amount > 1 && (
            <Amount
              actionSlug={action.slug}
              amount={amount}
              defaultValue={
                isNil(submissionQuantity) ? "1" : submissionQuantity
              }
              labelText="Select Amount"
              updateFunction={setSubmissionQuantity}
            />
          )}
          <Amount
            actionSlug={action.slug}
            amount={availableBeltSlots}
            defaultValue={
              isNil(beltEquipSlotNumber) ? "0" : beltEquipSlotNumber
            }
            labelText="Select Slot"
            startAtZero={true}
            updateFunction={setBeltEquipSlotNumber}
          />
        </>
      );
    case "unequip":
      // only for combat belt unequip has multiples
      return (
        <>
          <h3 className="item-dialog__form-title">Unequip</h3>
          <Amount
            actionSlug={action.slug}
            amount={amount}
            defaultValue={isNil(submissionQuantity) ? "1" : submissionQuantity}
            labelText="Select Amount"
            updateFunction={setSubmissionQuantity}
          />
        </>
      );
    case "retrieve":
      return (
        <>
          <h3 className="item-dialog__form-title">Retrieve</h3>
          <Amount
            actionSlug={action.slug}
            amount={amount}
            defaultValue={isNil(submissionQuantity) ? "1" : submissionQuantity}
            labelText="Select Amount"
            updateFunction={setSubmissionQuantity}
          />
        </>
      );
    case "store":
      return (
        <>
          <h3 className="item-dialog__form-title">Store</h3>
          <Amount
            actionSlug={action.slug}
            amount={amount}
            defaultValue={isNil(submissionQuantity) ? "1" : submissionQuantity}
            labelText="Select Amount"
            updateFunction={setSubmissionQuantity}
          />
        </>
      );
    case "instant-repair":
      return (
        <>
          <h3 className="item-dialog__form-title">
            Instant Repair <span>{itemName}</span>
          </h3>
          <div className="item-dialog__form-row-container">
            <div className="item-dialog__form-row">
              <span>Cost:</span>
              <span className="item-dialog__cost">
                <Price
                  currency="bond"
                  price={action.options.pricing?.final_price.formatted}
                />
              </span>
            </div>
          </div>
        </>
      );
    case "repair":
      return (
        <>
          <h3 className="item-dialog__form-title">
            Repair <span>{itemName}</span> Yourself
          </h3>
          <div className="item-dialog__form-row-container">
            <div className="item-dialog__form-row">
              <span>Time:</span>
              <span className="item-dialog__cost">
                {action.options.duration}
              </span>
            </div>
          </div>
        </>
      );
    case "sell-to-vendors":
      return (
        <>
          {amount > 1 && (
            <>
              <h3 className="item-dialog__form-title">
                Sell <span>{itemName}</span>
              </h3>
              <Amount
                actionSlug={action.slug}
                amount={amount}
                defaultValue={
                  isNil(submissionQuantity) ? "1" : submissionQuantity
                }
                labelText="Select Amount"
                updateFunction={setSubmissionQuantity}
              />
            </>
          )}
        </>
      );
    case "sell-on-public-market":
      return (
        <>
          <h3 className="item-dialog__form-title">Sell To Public Market</h3>
          <TextField
            className="inventory-price"
            color="secondary"
            label="Price to sell (each)"
            onChange={({ target: { value } }) => setSubmissionPrice(value)}
            ref={publicMarketPriceRef}
            size="small"
            value={isNil(submissionPrice) ? "" : submissionPrice}
          />
          {amount > 1 && (
            <Amount
              actionSlug={action.slug}
              amount={amount}
              defaultValue={
                isNil(submissionQuantity) ? "1" : submissionQuantity
              }
              labelText="Select Amount"
              updateFunction={setSubmissionQuantity}
            />
          )}
          {isValid && (
            <div className="item-dialog__stats-row item-dialog__fees">
              <span>Fees</span>
              <span>
                <Price
                  currency="credits"
                  format={true}
                  price={
                    publicMarketCreditsFee > 0
                      ? publicMarketCreditsFee
                      : action.options.min_credits_fee
                  }
                />
                {Boolean(action.options.bonds_fee) && (
                  <>
                    {" + "}
                    <Price
                      currency={action.options.bonds_fee?.currency}
                      price={action.options.bonds_fee?.formatted}
                    />
                  </>
                )}
              </span>
            </div>
          )}
        </>
      );
    case "vendors-buy":
      return (
        <>
          {amount > 1 && (
            <>
              <h3 className="item-dialog__form-title">
                Buy <span>{itemName}</span>
              </h3>
              <Amount
                actionSlug={action.slug}
                amount={Number(action.options.max_purchase_quantity)}
                defaultValue={
                  isNil(submissionQuantity) ? "1" : submissionQuantity
                }
                labelText="Select Amount"
                updateFunction={setSubmissionQuantity}
              />
            </>
          )}
        </>
      );
    default:
      return null;
  }
}
