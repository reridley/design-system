import { FormEvent, useRef } from "react";
import { Button } from "@mui/material";
import { InventoryFilter } from "@/types/inventories";
// import ConfirmationDialog from '@/components/common/dialogs/confirmation/Dialog';

interface ItemSubmissionProps {
  actionName: string;
  actionSlug: string;
  closeDialog: () => void;
  confirmationCallback?: (
    e?: FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => void;
  confirmationMessage?: string;
  confirmationOnCloseCallback?: () => void;
  current_page: number;
  fetchInventory:
    | ((page: number, trimmedFilters: InventoryFilter) => Promise<any>)
    | undefined;
  filters: () => InventoryFilter;
  isConfirmation?: boolean;
  submissionQuantity: number;
  updateInventory: ({
    fetchInventory,
    filters,
    page,
  }: {
    fetchInventory?: (
      page: number,
      trimmedFilters: InventoryFilter,
    ) => Promise<any>;
    filters?: () => InventoryFilter;
    page: number;
  }) => void;
  valid: boolean;
}

export default function ItemSubmission({
  actionName,
  actionSlug,
  closeDialog,
  // confirmationCallback,
  // confirmationMessage,
  current_page,
  fetchInventory,
  filters,
  //   isConfirmation,
  submissionQuantity,
  updateInventory,
  valid,
}: ItemSubmissionProps) {
  const confirmationParent = useRef(null);
  // const [showConfirmation, setShowConfirmation] = useState(false);
  const quantityText = submissionQuantity > 1 ? "Items" : "Item";

  // const renderWithConfirmation = () => (
  //     <ConfirmationDialog
  //         confirmText="OK"
  //         onClose={() => setShowConfirmation(false)}
  //         onConfirm={() => {
  //             if (confirmationCallback) confirmationCallback();
  //         }}
  //         parentRef={confirmationParent}
  //         rejectText="Cancel"
  //         widthREM={10}
  //     >
  //         {confirmationMessage}
  //     </ConfirmationDialog>
  // );

  const buttonText = () => {
    switch (actionSlug) {
      case "instant-repair":
        return "Repair Instantly";
      case "sell-on-public-market":
        return `Sell ${quantityText} To Public`;
      case "sell-to-vendors":
        return `Sell ${quantityText} To Vendors`;
      default:
        return `${actionName} ${
          submissionQuantity > 1 ? `${submissionQuantity}` : ""
        } ${quantityText}`;
    }
  };

  return (
    <div className="item-dialog__form-submission">
      <div
        className="item-dialog__current-action-buttons"
        ref={confirmationParent}
      >
        <Button
          color="secondary"
          disabled={!valid}
          onClick={() => {
            // if (isConfirmation) {
            //     setShowConfirmation(true);
            // } else {
            updateInventory({
              fetchInventory,
              filters: () => filters,
              page: current_page,
            });

            closeDialog();
            // }
          }}
        >
          <img
            alt=""
            src={`/static/images/inventory/icons/item_${actionSlug}.svg`}
          />
          {buttonText()}
        </Button>
        {/* {showConfirmation && renderWithConfirmation()} */}
      </div>
    </div>
  );
}
