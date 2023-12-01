import { Dispatch, SetStateAction } from "react";
import { InventoryFilter, InventoryType } from "@/types/inventories";
import { InventoryContext } from "@/components/inventory/InventoryContext";

export interface InventoryProviderProps {
  children: JSX.Element | JSX.Element[];
  inventory: InventoryType;
  setInventory: Dispatch<SetStateAction<InventoryType | undefined>>;
  updateInventory: ({
    fetchInventory,
    filters,
    page,
  }: {
    fetchInventory?: (
      page: number,
      trimmedFilters: InventoryFilter,
    ) => Promise<any>;
    filters?: () => InventoryFilter | undefined;
    page: number;
  }) => void;
}

export function InventoryProvider({
  children,
  inventory,
  setInventory,
  updateInventory,
}: InventoryProviderProps) {
  const { "inventory-carried": _inventory, "inventory-equipped": _equipped } =
    inventory;
  const {
    encumbrance,
    facets,
    has_filters,
    items,
    mass,
    pager,
    percent_used,
    total_quantity,
  } = _inventory;

  return (
    <InventoryContext.Provider
      value={{
        encumbrance,
        facets,
        has_filters,
        items,
        mass,
        pager,
        percent_used,
        setInventory,
        total_quantity,
        updateInventory,
        _equipped,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}
