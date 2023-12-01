import {
  FC,
  FormEvent,
  Fragment,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { isNumber, startCase, toLower } from "lodash";
import { Button, IconButton } from "@mui/material";
import {
  InventoryFilter,
  InventoryItem,
  ItemAction,
  PriceModifiers,
} from "@/types/inventories";
import { fetchAPIV1 } from "@/utilities/fetch";
import ItemFormControl from "@/components/inventory/common/ItemFormControl";
import { useInventoryContext } from "@/components/inventory/InventoryContext";
import Item from "@/components/inventory/item/Item";
import { FilterContext } from "@/components/inventory/filter/Filter";
import ItemDialogContent from "./ItemDialogContent";
import StyledItemDialog from "./ItemDialog.styled";
import ItemSubmission from "./ItemSubmission";
import PriceModifier from "./PriceModifiers";

interface ItemDialogProps {
  closeDialog: () => void;
  inventoryItem: InventoryItem;
  dialogOpen: boolean;
}

const ItemDialog: FC<ItemDialogProps> = ({
  closeDialog,
  dialogOpen,
  inventoryItem,
}) => {
  const {
    actions,
    current_quantity,
    genetically_bound,
    has_unlimited_quantity,
    item,
    out_of_stock,
    quantity,
    repair_level,
    slot_type,
    slug,
  } = inventoryItem;

  const [currentAction, setCurrentAction] = useState<ItemAction | undefined>();
  const submissionQuantityState = useState<number>(1);
  const [submissionQuantity] = submissionQuantityState;
  const submissionPriceState = useState("");
  const [submissionPrice] = submissionPriceState;
  const submissionPriceNumber = Number(submissionPrice);
  const beltEquipSlotNumberState = useState<number>(0);
  const [beltEquipSlotNumber] = beltEquipSlotNumberState;

  const {
    pager: { current_page },
    updateInventory,
    _equipped,
  } = useInventoryContext();

  const { filters } = useContext(FilterContext);

  const availableBeltSlots =
    _equipped && _equipped["combat-belt"]
      ? _equipped["combat-belt"].current_slots
      : undefined;
  const isMultipleCombatSlots =
    slot_type === "combat-belt" && availableBeltSlots && availableBeltSlots > 1;

  const hasMultipleItems =
    quantity > 1 || has_unlimited_quantity || (current_quantity as number) > 1;
  const buyFromVendors = actions?.find(
    ({ slug: actionSlug }) => actionSlug === "vendors-buy",
  );
  const sellToVendorsHasSingleItem =
    currentAction?.slug === "sell-to-vendors" && quantity === 1;

  const isMultipleActions = actions?.length && actions.length > 1;
  const containsEquipWeaponAction =
    actions?.find(({ slug: actionSlug }) => actionSlug === "equip") &&
    slot_type === "weapon";

  const isRepairAction =
    currentAction?.slug === "repair" ||
    currentAction?.slug === "instant-repair";
  const isCombatBeltEquipAction =
    currentAction?.slug === "equip" && slot_type === "combat-belt";
  const isPublicMarketSellAction =
    currentAction?.slug === "sell-on-public-market";
  const isValid =
    isPublicMarketSellAction &&
    isNumber(submissionPriceNumber) &&
    submissionPriceNumber > 0;

  const showPriceModifier =
    currentAction?.options?.pricing?.price_modifiers?.length;

  useEffect(() => {
    if (actions?.length === 1) {
      setCurrentAction(actions[0]);
    }
  }, []);

  const processButton = (action: ItemAction, slotNumber: number) => {
    if (
      (action.slug === "equip" &&
        item.item_type.slug === "medical" &&
        isMultipleCombatSlots) ||
      action.slug === "instant-repair" ||
      action.slug === "repair" ||
      (quantity > 1 && action.slug !== "consume") ||
      action.slug === "vendors-buy"
    ) {
      setCurrentAction(action);
    } else {
      const fetchInventory = (page: number, trimmedFilters: InventoryFilter) =>
        fetchAPIV1(action.url, {
          method: "POST",
          body: {
            item: slug,
            quantity: submissionQuantity,
            page: { number: page },
            ...(trimmedFilters && { filter: trimmedFilters }),
            ...(slot_type && { slot_type: slot_type, slot_number: slotNumber }),
            ...(action.slug === "sell-on-public-market" && {
              unit_price: submissionPrice,
            }),
          },
        });

      updateInventory({
        fetchInventory,
        filters: () => filters,
        page: current_page,
      });
      closeDialog();
    }
  };

  const fetchInventory = (page: number, trimmedFilters: InventoryFilter) =>
    fetchAPIV1(currentAction?.url as string, {
      method: "POST",
      body: {
        item: slug,
        quantity: submissionQuantity,
        page: {
          number: page,
        },
        ...(trimmedFilters && {
          filter: trimmedFilters,
        }),
        ...(slot_type && {
          slot_type: slot_type,
        }),
        ...(currentAction?.slug === "equip" && {
          slot_number: beltEquipSlotNumber,
        }),
        ...(currentAction?.slug === "sell-on-public-market" && {
          unit_price: Number.parseFloat(submissionPrice).toFixed(2),
        }),
      },
    });

  const onSubmit = (e?: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    if (e) e.preventDefault();

    updateInventory({
      fetchInventory,
      filters: () => filters,
      page: current_page,
    });

    closeDialog();
  };

  const renderAction = (action: ItemAction, index: number) => {
    return (
      <Fragment key={`action-${action.slug}-${index}`}>
        {slot_type === "weapon" && action.slug === "equip" ? (
          <>
            <Button color="secondary" onClick={() => processButton(action, 0)}>
              <img
                alt=""
                src="/static/images/inventory/icons/item_equip_primary.svg"
              />
              Equip Primary
            </Button>
            <Button color="secondary" onClick={() => processButton(action, 1)}>
              <img
                alt=""
                src="/static/images/inventory/icons/item_equip_secondary.svg"
              />
              Equip Secondary
            </Button>
          </>
        ) : (
          <Button color="secondary" onClick={() => processButton(action, 0)}>
            <img
              alt=""
              src={`/static/images/inventory/icons/item_${action.slug}.svg`}
            />
            {action.slug === "repair"
              ? "Self Repair"
              : startCase(toLower(action?.name))}
          </Button>
        )}
      </Fragment>
    );
  };

  function ModifierContainer({ children }: { children: ReactNode }) {
    return showPriceModifier ? (
      sellToVendorsHasSingleItem ? (
        <div className="item-dialog__right-column">{children}</div>
      ) : (
        <>{children}</>
      )
    ) : (
      <div className="item-dialog__right-column">{children}</div>
    );
  }

  function StatsContainer({ children }: { children: ReactNode }) {
    return sellToVendorsHasSingleItem ? (
      <div className="item-dialog__stats-column">{children}</div>
    ) : (
      <>{children}</>
    );
  }

  const renderItemSubmission = () => (
    <ItemSubmission
      actionName={currentAction?.name as string}
      actionSlug={currentAction?.slug as string}
      closeDialog={closeDialog}
      current_page={current_page}
      fetchInventory={fetchInventory}
      filters={filters as () => InventoryFilter}
      isConfirmation={isPublicMarketSellAction}
      submissionQuantity={submissionQuantity}
      updateInventory={updateInventory}
      valid={isPublicMarketSellAction ? isValid : true}
      {...(isPublicMarketSellAction && {
        confirmationCallback: onSubmit,
        confirmationMessage: `Are you sure you want to sell ${submissionQuantity} ${
          item.name
        } for ${submissionPrice} credits ${
          submissionQuantity > 1 ? `each` : ""
        }?`,
      })}
    />
  );

  return (
    <StyledItemDialog
      $showPriceModifier={Boolean(showPriceModifier)}
      container={document.getElementById("equippable-modal-container")}
      id="item-dialog"
      onClose={closeDialog}
      open={dialogOpen}
    >
      <div className="item-dialog__content">
        <div className="item-dialog__body">
          <h2 className="item-dialog__header">{item.name}</h2>
          <IconButton
            className="close-button"
            color="secondary"
            onClick={closeDialog}
            size="large"
          >
            <img
              alt="Close Item Details"
              src="/static/images/icons/close.svg"
            />
          </IconButton>
          <div className="item-dialog__row-detail">
            <div className="item-dialog__rarity-container">
              <span>Rarity:</span>
              <span className={`item-dialog__rarity-${item.rarity}`}>
                {startCase(toLower(item.rarity))}
              </span>
            </div>
            <div className="item-dialog__mass">Mass {item.mass}kg</div>
          </div>
          {Boolean(isMultipleActions || containsEquipWeaponAction) && (
            <div className="item-actions">{actions?.map(renderAction)}</div>
          )}
          <div className="item-dialog__columns">
            <div className="item-dialog__content">
              <div className="item-dialog__image-container">
                <Item
                  dimension="20em"
                  image={item.image}
                  isGeneticallyBound={genetically_bound}
                  isSoldOut={out_of_stock}
                  quantity={quantity}
                  rarity={item.rarity}
                  showAmount={true}
                  stackSize={item.stack_size}
                />
                <p className="item-dialog__description">{item.description}</p>
              </div>
              <ModifierContainer>
                <StatsContainer>
                  <ItemDialogContent
                    buyAction={buyFromVendors}
                    current_quantity={current_quantity}
                    hasUnlimitedQuantity={has_unlimited_quantity}
                    isSoldOut={out_of_stock}
                    item={item}
                    repair_level={repair_level}
                  />
                  {Boolean(showPriceModifier) && (
                    <PriceModifier
                      pricing={currentAction?.options.pricing as PriceModifiers}
                      submissionQuantity={submissionQuantity}
                    />
                  )}
                </StatsContainer>
                {currentAction &&
                  (hasMultipleItems ||
                  isRepairAction ||
                  isCombatBeltEquipAction ||
                  isPublicMarketSellAction ? (
                    <form
                      className="item-dialog__form-container"
                      onSubmit={onSubmit}
                    >
                      {isMultipleActions && (
                        <IconButton
                          className="close-button"
                          color="secondary"
                          onClick={(event) => {
                            event.preventDefault();
                            setCurrentAction(undefined);
                          }}
                          size="large"
                        >
                          <img
                            alt="Close Item Form"
                            src="/static/images/icons/close.svg"
                          />
                        </IconButton>
                      )}
                      <ItemFormControl
                        action={currentAction as ItemAction}
                        amount={
                          quantity ||
                          Number(
                            currentAction?.options.max_purchase_quantity,
                          ) ||
                          1
                        }
                        availableBeltSlots={availableBeltSlots || 1}
                        beltEquipSlotNumberState={beltEquipSlotNumberState}
                        isValid={isValid}
                        itemName={item.name}
                        submissionPriceState={submissionPriceState}
                        submissionQuantityState={submissionQuantityState}
                      />
                      {renderItemSubmission()}
                    </form>
                  ) : out_of_stock ? null : (
                    <div className="item-dialog__submission-container">
                      {renderItemSubmission()}
                    </div>
                  ))}
              </ModifierContainer>
            </div>
          </div>
        </div>
      </div>
    </StyledItemDialog>
  );
};

export default ItemDialog;
