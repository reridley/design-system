import styled from 'styled-components';

interface StyledButtonContainerProps {
    $dimension?: string;
}

export const StyledItemButtonContainer = styled.div<StyledButtonContainerProps>`
    ${({ $dimension }) =>
        $dimension ? `height: ${$dimension}; width: ${$dimension};` : 'height: 9.375em; width: 9.375em;'}
    padding: 0;
    position: relative;
    text-align: center;

    .item__name {
        bottom: -1.5em;
        color: #d1e6dd;
        display: block;
        font-size: 0.875em;
        overflow: hidden;
        position: absolute;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }

    .item__amount {
        bottom: 0.25em;
        color: #fff;
        position: absolute;
        right: 0.5em;
    }

    button {
        ${({ $dimension }) =>
            $dimension ? `height: ${$dimension}; width: ${$dimension};` : 'height: 9.375em; width: 9.375em;'}
        background-color: transparent;
        border: 0;
        display: grid;
        font-family: 'Electrolize', sans-serif;
        font-size: 1rem;
        margin: 0;
        padding: 0;
        position: relative;

        &:focus,
        &:hover {
            box-shadow: 0 0 0.1em 0.2em #999;
            outline: 0;
        }
    }
`;
