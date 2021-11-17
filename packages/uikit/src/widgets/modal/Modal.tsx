import React from "react";
import { CgClose } from "react-icons/cg";
import styled, { css } from "styled-components";
import { Themed } from "../../themes";

export const ModalOverlay = styled.div<Themed>`
  z-index: ${(p) => p.theme.zIndex.modal};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 1rem;
`;

export const Modal = styled.div<{ centered?: boolean }>`
  background: ${(p) => p.theme.bgAlt};
  box-shadow: ${(p) => p.theme.cardShadow};
  position: relative;
  max-width: 500px; // TODO: parametrize in ModalOptions
  margin: 1.75rem auto;

  ${(p) =>
    p.centered &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100% - (1.75rem * 2));
      & > * {
        width: 100%;
      }
    `}
`;

const ModalCloseWraper = styled.div`
  cursor: pointer;

  svg {
    transform: scale(0.7);
    transition: 0.25s all;
    color: ${(p) => p.theme.txt200};
  }

  &:hover svg {
    transform: scale(1);
    color: ${(p) => p.theme.txt100};
  }
`;
export const ModalClose: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <ModalCloseWraper onClick={onClick}>
    <CgClose size={25} />
  </ModalCloseWraper>
);
export const ModalHeader = styled.div`
  display: flex;
  background-color: ${(p) => p.theme.bgInput};
  padding: 1.5rem;
  justify-content: space-between;
  align-items: center;
`;
export const ModalTitle = styled.div`
  font-size: 1.4rem;
  color: ${(p) => p.theme.primary};
`;
export const ModalBody = styled.div`
  padding: 1.5rem;
`;
