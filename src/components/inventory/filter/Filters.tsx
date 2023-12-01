import { useContext, useEffect, useState } from "react";
import { Facet } from "@/types/inventories";
import StyledFilter from "./Filter.styled";
import { FilterContext } from "./Filter";
import FacetList from "./FacetList";

export interface FiltersProps {
  alwaysShow?: boolean;
}

export default function Filters({ alwaysShow = false }: FiltersProps) {
  const { facets } = useContext(FilterContext);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    alwaysShow && setShowFilter(true);
  }, [alwaysShow]);

  const toggleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const renderFacetList = (facet: Facet, index: number) => (
    <FacetList facet={facet} index={index} key={`facet-${index}`} />
  );

  return (
    <StyledFilter
      $alwaysShow={alwaysShow}
      aria-label="Item management filter"
      role="region"
    >
      <div id="filter-selections">
        {alwaysShow || (
          <div className="filter__top">
            <button className="filter__trigger" onClick={toggleShowFilter}>
              {showFilter && "Close"} Filter
            </button>
          </div>
        )}
        {showFilter && (
          <div className="filter__main">{facets.map(renderFacetList)}</div>
        )}
      </div>
    </StyledFilter>
  );
}
