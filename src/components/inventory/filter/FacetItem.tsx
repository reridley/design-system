import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FacetItem, InventoryFilter } from "@/types/inventories";
import { FilterContext } from "@/components/inventory/filter/Filter";

export default function FacetItemComponent({
  item,
  facetSlug,
}: {
  item: FacetItem;
  facetSlug: string;
}) {
  const { current_page, filters, setFilters, updateInventory } =
    useContext(FilterContext);
  const [checked, setChecked] = useState(
    (filters as InventoryFilter)[facetSlug].includes(item.slug),
  );

  useEffect(() => {
    if (!(filters as InventoryFilter)[facetSlug].includes(item.slug)) {
      setChecked(false);
    }
  }, [filters]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedFilters: InventoryFilter = { ...filters };
    const filterArrayName = event.target.dataset.filterType;

    const inputValue =
      filterArrayName === "tier"
        ? parseInt(event.target.value)
        : event.target.value;

    // update filters
    if (event.target.checked) {
      updatedFilters[filterArrayName as string].push(inputValue);
    } else {
      updatedFilters[filterArrayName as string].splice(
        updatedFilters[filterArrayName as string].findIndex(
          (element: number | string) => element === inputValue,
        ),
        1,
      );
    }

    setChecked(!checked);
    setFilters(updatedFilters);
    updateInventory({ page: current_page, filters: () => updatedFilters });
  };

  return (
    <li key={`filter-item-${facetSlug}-${item.slug}`}>
      <input
        checked={checked}
        data-filter-type={facetSlug}
        id={`item_type_${item.slug}`}
        onChange={handleChange}
        type="checkbox"
        value={item.slug}
      />
      <label htmlFor={`item_type_${item.slug}`}>
        <span>
          <span>{item.name}</span>
          {item.count > 0 && (
            <span className="filter__item__quantity"> [{item.count}]</span>
          )}
        </span>
        <img alt="" src="/static/images/icons/close.svg" />
      </label>
    </li>
  );
}
