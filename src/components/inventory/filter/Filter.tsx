import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { InventoryType, Facet, InventoryFilter } from "@/types/inventories";
import { useInventoryContext } from "@/components/inventory/InventoryContext";
import Filters from "@/components/inventory/filter/Filters";
import FilterFlags from "@/components/inventory/filter/FilterFlags";
import ClearFilter from "@/components/inventory/filter/ClearFilter";

interface FilterContextProps {
  current_page: number;
  facets: Facet[];
  filters: InventoryFilter | undefined;
  setFilters: Dispatch<SetStateAction<InventoryFilter | undefined>>;
  updateInventory: ({
    fetchInventory,
    filters,
    page,
  }: {
    fetchInventory?: (
      page: number,
      trimmedFilters: InventoryFilter,
    ) => Promise<InventoryType>;
    filters?: () => InventoryFilter | undefined;
    page: number;
  }) => void;
}

export const FilterContext = createContext<FilterContextProps>(
  {} as FilterContextProps,
);

interface FilterProps {
  children: JSX.Element | JSX.Element[];
}

export function Filter(props: FilterProps) {
  const {
    facets,
    pager: { current_page },
    updateInventory,
  } = useInventoryContext();

  const [filters, setFilters] = useState<InventoryFilter>();

  useEffect(() => {
    const filterObject: InventoryFilter = {};
    facets?.forEach((facet) => (filterObject[facet.slug] = []));
    setFilters(filterObject);
  }, []);

  if (!facets) return null;

  return (
    <FilterContext.Provider
      value={{
        current_page,
        facets,
        filters,
        setFilters,
        updateInventory,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
}

Filter.Clear = ClearFilter;
Filter.Flags = FilterFlags;
Filter.Selections = Filters;
