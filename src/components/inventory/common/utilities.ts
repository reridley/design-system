import pickBy from "lodash/pickBy";
import { InventoryFilter } from "@/types/inventories";

// temp function needed to trim filters to endpoint requirements
export function trimFilters(
  filters: (() => InventoryFilter | undefined) | undefined,
) {
  const filterObject = filters?.();

  if (filterObject) {
    return pickBy(filterObject, (array: unknown[]) => array.length);
  }
}
