import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Facet, FacetItem } from "@/types/inventories";
import FacetItemComponent from "@/components/inventory/filter/FacetItem";

export default function FacetList({
  facet,
  index,
}: {
  facet: Facet;
  index: number;
}) {
  const renderFacetItem = (
    item: FacetItem,
    itemIndex: number,
    facetSlug: string,
  ) => {
    return (
      <FacetItemComponent
        facetSlug={facetSlug}
        item={item}
        key={`${facetSlug}-facet-item-${itemIndex}`}
      />
    );
  };

  return (
    <div className="facet">
      <Accordion
        defaultExpanded={index === 0}
        disableGutters={true}
        square={true}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary
          aria-controls={`panel${index}-content`}
          id={`panel${index}-header`}
        >
          <h4>{facet.name}</h4>
          <img alt="" src="/static/images/icons/expand.svg" />
        </AccordionSummary>
        <AccordionDetails>
          <ul className="filter__list" id="filter-accordion-item_type">
            {facet.items.map((item, itemIndex) =>
              renderFacetItem(item, itemIndex, facet.slug),
            )}
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
