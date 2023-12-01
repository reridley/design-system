import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Pager } from "@/types/common";
import {
  Facet,
  InventoryEquipped,
  InventoryFilter,
  InventoryItem,
  InventoryPercentage,
  InventoryType,
} from "@/types/inventories";

interface InventoryContextProps {
  encumbrance?: string;
  _equipped?: InventoryEquipped;
  facets: Facet[];
  has_filters: boolean;
  items: InventoryItem[];
  mass?: string;
  name?: string;
  pager: Pager;
  percent_used?: InventoryPercentage;
  setInventory: Dispatch<SetStateAction<InventoryType | undefined>>;
  total_quantity: number;
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

export const InventoryContext = createContext<InventoryContextProps>(
  {} as InventoryContextProps,
);
export const useInventoryContext = () => useContext(InventoryContext);
