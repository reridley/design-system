import { FC, useRef, useState } from "react";
import { InventoryItem } from "@/types/inventories";
import { StyledItemButtonContainer } from "./ItemButton.styled";
import Item from "./Item";
import ItemDialog from "./item-dialog/ItemDialog";

interface ItemProps {
  dimension?: string;
  inventoryItem: InventoryItem;
}

const ItemButton: FC<ItemProps> = ({ dimension, inventoryItem }) => {
  const { genetically_bound, item, out_of_stock, quantity, repair_level } =
    inventoryItem;
  const [dialogOpen, setDialogOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const openDialog = () => dialogOpen || setDialogOpen(true);

  const closeDialog = () => {
    if (dialogOpen) {
      setDialogOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <>
      <StyledItemButtonContainer $dimension={dimension}>
        <button onClick={openDialog} ref={buttonRef}>
          <Item
            dimension={dimension}
            image={item.image}
            isButton={true}
            isGeneticallyBound={genetically_bound}
            isSoldOut={out_of_stock}
            name={item.name}
            quantity={quantity}
            rarity={item.rarity}
            repairLevel={repair_level}
            showAmount={true}
            stackSize={item.stack_size}
            type={item.item_type.slug}
          />
          <span className="visuallyhidden">
            Show item detail and available actions
          </span>
        </button>
      </StyledItemButtonContainer>
      {dialogOpen && (
        <ItemDialog
          closeDialog={closeDialog}
          dialogOpen={dialogOpen}
          inventoryItem={inventoryItem}
        />
      )}
    </>
  );
};

export default ItemButton;
