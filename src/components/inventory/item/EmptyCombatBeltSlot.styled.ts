import styled from 'styled-components';

interface StyledEmptySlotProps {
    $dimension?: string;
}

export const StyledEmptySlot = styled.div<StyledEmptySlotProps>`
    ${({ $dimension }) =>
        $dimension ? `height: ${$dimension}; width: ${$dimension};` : 'height: 9.375em; width: 9.375em;'}
    background-color: #181d23;
    border: 1px solid #103559;
    padding: 0;
    position: relative;
    text-align: center;
`;
