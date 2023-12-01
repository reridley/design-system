import styled from 'styled-components';

interface StyledEmptySlotProps {
    $dimension?: string;
    $equippedType?: 'armor' | 'belt' | 'weapon' | 'locked';
    $locked?: boolean;
}

export const StyledEmptySlot = styled.div<StyledEmptySlotProps>`
    ${({ $dimension }) =>
        $dimension ? `height: ${$dimension}; width: ${$dimension};` : 'height: 9.375em; width: 9.375em;'}
    background-color: #181d23;
    ${({ $locked }) =>
        $locked
            ? ` background-image: url(/static/images/icons/lock.svg);
                background-size: 2em;
                background-repeat: no-repeat;
                background-position: 50%;`
            : ''}
    ${({ $equippedType }) =>
        $equippedType === 'armor' || $equippedType === 'weapon'
            ? ` background-color: transparent;
                background-image: url(/static/images/inventory/${$equippedType}.svg),linear-gradient(226deg, #121B24 0%, #322B24 100%);
                background-size: 13em, contain;
                background-repeat: no-repeat, no-repeat;
                background-position: 50%, 0% 0%;
                background-origin: padding-box;`
            : ''}
    padding: 0;
    position: relative;
    text-align: center;
`;
