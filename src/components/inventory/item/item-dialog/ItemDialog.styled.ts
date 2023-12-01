import styled from "styled-components";
import { StyledModal } from "@/components/common/Modal.styled";

interface StyledItemDialogProps {
  $backgroundColor?: string;
  $showPriceModifier?: boolean;
}

export default styled(StyledModal)<StyledItemDialogProps>`
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor || "#0a212499"};

  .MuiDialog-paper {
    background-color: #1e1d22;
    display: grid;
    min-height: 49em;
    overflow: hidden;
    padding: 0;
    width: initial;
  }

  .item-dialog__content {
    background: transparent linear-gradient(239deg, #010306 0%, #13232bed 100%)
      0% 0% no-repeat padding-box;
    display: flex;
    grid-area: 1/1/2/2;

    .item-actions {
      align-items: center;
      background: transparent linear-gradient(90deg, #1c2a34 0%, #1e1d22 100%)
        0% 0% no-repeat padding-box;
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-bottom: 2em;
      padding: 1em;
      width: 100%;

      button {
        border-width: 1px;
        font-size: 0.875rem;
        min-width: 12em;
        padding: 0.5em;

        img {
          margin-right: 1em;
          width: 2em;
        }

        + button {
          margin-left: 1em;
        }
      }
    }

    .item-dialog__weapon {
      color: #d1e6dd;
      margin-bottom: 1em;
      div + div {
        margin-top: 0.5em;
      }
    }
  }

  .item-dialog__body {
    display: flex;
    flex-direction: column;
    justify-content: top;
    position: relative;
    width: 925px;

    .item-dialog__columns {
      display: flex;
      flex: 1;
      margin-bottom: 2em;
      padding: 0 3em;
    }

    .item-dialog__header {
      color: #f3d98f;
      display: flex;
      font-size: 1.5rem;
      height: 3.875rem;
      margin: 0;
      padding-left: 3rem;
      padding-top: 2em;
      text-transform: uppercase;
    }

    .item-dialog__row-detail {
      color: #d1e6dd;
      display: flex;
      height: 4em;
      justify-content: space-between;
      padding: 2rem 3rem 0 3rem;
      text-transform: capitalize;

      .item-dialog__rarity-common {
        color: #9494a7;
        margin-left: 0.5em;
      }

      .item-dialog__rarity-uncommon {
        color: #186f44;
        margin-left: 0.5em;
      }

      .item-dialog__rarity-rare {
        color: #11607f;
        margin-left: 0.5em;
      }

      .item-dialog__rarity-epic {
        color: #4b1fb3;
        margin-left: 0.5em;
      }
    }

    .item-dialog__content {
      border: 0;
      display: flex;
      flex-direction: row;
      flex-flow: row wrap;
      margin-top: 0;
      padding: 0;
      width: 100%;

      &[hidden] {
        display: none;
      }

      .item__amount {
        bottom: 0.5em;
        color: #fff;
        position: absolute;
        right: 1em;
      }

      .item-dialog__description {
        color: #d1e6dd;
        margin: 1em 0 0;
      }

      .item-dialog__image-container {
        ${({ $showPriceModifier }) => ($showPriceModifier ? "order: 1;" : "")};
        width: 45%;
      }

      .item-dialog__stats-container {
        display: flex;
        flex-direction: column;
        ${({ $showPriceModifier }) =>
          $showPriceModifier
            ? " margin-left: 5%; order: 2; width: 50%;"
            : "width: 100%;"};
      }

      .item-dialog__form-container,
      .item-dialog__submission-container {
        display: flex;
        justify-content: start;
        ${({ $showPriceModifier }) =>
          $showPriceModifier
            ? " margin-left: 5%; order: 4; width: 50%;"
            : "width: 100%;"};
      }

      .item-dialog__submission-container {
        ${({ $showPriceModifier }) =>
          $showPriceModifier ? "margin-left: 0;" : "order: 3;"};
      }

      .item-dialog__right-column {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 5%;
        order: 2;
        width: 50%;

        .item-dialog__image-container,
        .item-dialog__stats-container,
        .item-dialog__price-modifier,
        .item-dialog__form-container,
        .item-dialog__submission-container {
          width: 100%;
        }

        .item-dialog__price-modifier {
          margin-left: 5%;
        }

        .item-dialog__stats-container > .item-dialog__stats {
          margin-top: 0;
        }
      }

      .item-dialog__stats-column {
        order: 2;

        .item-dialog__price-modifier,
        .item-dialog__stats-container {
          margin-left: 0;
        }
      }

      .item-dialog__fees {
        margin-top: 0.75em;
      }

      .item-dialog__stats-row {
        align-items: center;
        background-color: #1e1d22;
        color: #d1e6dd;
        display: flex;
        justify-content: space-between;
        padding: 0.25em 0.5em;
        word-break: break-word;

        &--modifier {
          color: #47a295;
          font-size: 0.8em;
          padding: 0.125em 1.5em;
        }

        &--decrease {
          color: #a24747;
        }

        .item-dialog__stats-modifier-label {
          display: flex;
          flex-direction: column;
          text-transform: capitalize;
        }

        .MuiInputLabel-root {
          color: #fff;
        }

        > span {
          width: 50%;
        }
      }

      ul.item-dialog__stats {
        display: flex;
        flex: 1;
        flex-direction: column;
        list-style-type: none;
        padding: 0;

        li {
          margin: 0;
          padding: 0 0.25em;

          &:not(:first-of-type) {
            margin-top: 0.5em;
          }
        }

        .item-dialog__stats-filler {
          flex: 1;
        }
      }

      .item-dialog__price-modifier {
        width: 45%;
        ${({ $showPriceModifier }) => ($showPriceModifier ? " order: 3;" : "")};
      }
    }
  }

  .item-dialog__form-container {
    display: flex;
    flex-direction: column;
    height: auto;
    justify-content: end;
    padding: 0;
    position: relative;

    .close-button {
      right: -1rem;
      top: 0.75rem;
    }

    .item-dialog__form-title {
      color: #f3d98f;
      margin: 0;
      padding: 0.875em 0;

      span {
        color: #ffffff;
      }
    }

    .item-dialog__form-row-container {
      display: flex;
      width: 100%;
    }

    .item-dialog__form-row {
      background-color: #1e1d22;
      color: #d1e6dd;
      display: flex;
      justify-content: space-between;
      padding: 0.5em 0 0.5em 1em;
      width: 100%;
    }

    .item-dialog__form-close {
      border-width: 1px;
      position: absolute;
      right: 0;
      top: 0.875em;
      width: 80px;
    }

    .item-dialog__cost {
      width: 9em;
    }

    legend {
      color: #d1e6dd;
    }

    .MuiInputLabel-root {
      color: #d1e6dd;

      &.Mui-focused {
        color: #d1e6dd;
      }
    }

    .MuiInputBase-root {
      width: 100%;
    }

    .inventory-amount-container {
      display: flex;
      justify-content: end;
      margin-top: 2.5rem;
      width: 100%;

      .MuiSelect-select {
        padding-bottom: 0.75em;
      }
    }

    .inventory-price {
      width: 100%;

      + .inventory-amount-container {
        margin-top: 1rem;
      }
    }
  }

  .item-dialog__form-submission {
    align-content: end;
    display: grid;
    width: 100%;

    .item-dialog__current-action-buttons {
      align-items: center;
      border-bottom: 1px solid #433d26;
      display: flex;
      height: 6rem;
      justify-content: end;
      width: 100%;

      img {
        margin-right: 1em;
        width: 1.75rem;
      }

      button {
        border-width: 1px;
        font-size: 0.875em;
        padding: 0.5rem 1rem;
      }

      .sell-price {
        flex: 1;
      }
    }

    .item-dialog__current-action-description {
      align-items: center;
      background-color: #1e1d22;
      color: #d1e6dd;
      display: flex;
      justify-content: space-between;
      padding: 0.25em 0.5em;
      word-break: break-word;

      > * {
        width: 50%;
      }
    }

    .item-dialog__bottom-row-submission {
      margin-right: 3em;
    }

    .MuiButton-root {
      min-width: 10em;
    }

    .modal-body {
      left: -9em;
      top: -2em;
      width: 24em;
    }
  }
`;
