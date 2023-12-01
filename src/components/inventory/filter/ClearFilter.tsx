import { useContext } from "react";
import styled from "styled-components";
import { InventoryFilter } from "@/types/inventories";
import { FilterContext } from "@/components/inventory/filter/Filter";

const StyledClearFilter = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: #e2faf0;
  display: flex;
  font-family: "Electrolize", sans-serif;
  height: 2em;
  justify-content: center;
  width: 9rem;

  img {
    height: 0.75rem;
    margin-left: 0.25rem;
  }
`;

export default function ClearFilter() {
  const { current_page, filters, setFilters, updateInventory } =
    useContext(FilterContext);

  const handleClearFilter = () => {
    const updatedFilters: InventoryFilter = { ...filters };
    Object.keys(updatedFilters).forEach(
      (filterArray) => (updatedFilters[filterArray] = []),
    );
    setFilters(updatedFilters);
    updateInventory({ page: current_page, filters: () => updatedFilters });
  };

  return (
    <StyledClearFilter className="clear-filter" onClick={handleClearFilter}>
      <span>
        Clear <span className="visuallyhidden">all filters</span>
      </span>
      <img alt="" src="/static/images/icons/close.svg" />
    </StyledClearFilter>
  );
}
