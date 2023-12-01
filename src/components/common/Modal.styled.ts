import { Modal } from "@mui/material";
import styled from "styled-components";

export const StyledModal = styled(Modal)`
  .MuiDialog-paper,
  .modal-body {
    backdrop-filter: blur(0.125rem);
    background-color: #060a11e6;
    box-shadow: 0px 0px 120px #21667b99;
    display: flex;
    flex-direction: column;
    font-size: 1.15rem;
    gap: 1rem;
    justify-content: stretch;
    margin: 0;
    max-height: 60rem;
    overflow-y: auto;
    padding: 3rem;
    position: relative;
    width: 57rem;

    .close-button {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
      z-index: 1;

      img {
        height: 24px;
        pointer-events: none;
        width: 24px;
      }
    }

    .dialog-title {
      margin: 0;
    }
  }
`;

// export const StyledDialog = StyledModal.withComponent(Dialog);
