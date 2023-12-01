import { useContext } from "react";
import styled from "styled-components";
import { InventoryFilter } from "@/types/inventories";
import { FilterContext } from "./Filter";

const StyledFilterFlags = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`;

const StyledFlag = styled.button`
  background-color: #342b20;
  border: 0;
  color: #fff;
  font-family: "Electrolize", sans-serif;
  font-size: 0.875rem;
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  text-transform: capitalize;

  img {
    height: 0.75rem;
    margin-left: 0.5rem;
    width: 0.75rem;
  }
`;

export default function FilterFlags() {
  const { current_page, filters, setFilters, updateInventory } =
    useContext(FilterContext);

  const handleRemoveFlag = (filterArray: string, filterSlug: string) => {
    const updatedFilters: InventoryFilter = { ...filters };

    updatedFilters[filterArray].splice(
      updatedFilters[filterArray].findIndex(
        (filter: string) => filter === filterSlug,
      ),
      1,
    );

    setFilters(updatedFilters);
    updateInventory({ page: current_page, filters: () => updatedFilters });
  };

  const renderFlag = (filterArray: string, filterSlug: string) => {
    return (
      <StyledFlag
        className="filter-button filter-button-common"
        key={`filter-${filterSlug}`}
        onClick={() => {
          handleRemoveFlag(filterArray, filterSlug);
        }}
      >
        <span className="visuallyhidden">remove </span>
        {filterSlug}
        <span className="visuallyhidden">filter </span>
        <img alt="" src="/static/images/icons/close.svg" />
      </StyledFlag>
    );
  };

  return (
    <StyledFilterFlags>
      {Boolean(filters) &&
        Object.keys(filters as InventoryFilter).map((filterArray) =>
          (filters as InventoryFilter)[filterArray].map((facet: string) =>
            renderFlag(filterArray, facet),
          ),
        )}
    </StyledFilterFlags>
  );
}
