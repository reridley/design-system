import styled from 'styled-components';

interface StyledItemProps {
    $dimension?: string;
    $isButton?: boolean;
}

export const StyledItem = styled.div<StyledItemProps>`
    background-position: 0;
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    ${({ $dimension }) =>
        $dimension ? `height: ${$dimension}; width: ${$dimension};` : 'height: 9.375em; width: 9.375em;'}

    > img {
        bottom: 0;
        left: 0;
        margin: auto;
        max-width: 100%;
        padding: 10%;
        position: absolute;
        right: 0;
        top: 0;
    }

    &.item__framed-img--common {
        background-image: url(/static/images/inventory/frames/common.svg);
    }

    &.item__framed-img--epic {
        background-image: url(/static/images/inventory/frames/epic.svg);
    }

    &.item__framed-img--uncommon {
        background-image: url(/static/images/inventory/frames/uncommon.svg);
    }

    &.item__framed-img--rare {
        background-image: url(/static/images/inventory/frames/rare.svg);
    }

    .item__genetically-bound {
        background-color: #65553d;
        clip-path: ${({ $isButton }) =>
            $isButton
                ? 'polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)'
                : 'polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0% 70%)'};
        display: block;
        line-height: ${({ $isButton }) => ($isButton ? '1.5em' : '2em')};
        padding: ${({ $isButton }) => ($isButton ? '0 0.25em 0.15em 0.25em' : '0 0.5em')};
        position: absolute;
        ${({ $isButton }) => ($isButton ? 'left: 3px' : 'right: 3px')};
        top: 3px;

        &__icon {
            margin-right: ${({ $isButton }) => ($isButton ? '0' : '0.5em')};

            svg {
                height: ${({ $isButton }) => ($isButton ? '1em' : '2em')};
                vertical-align: middle;
                width: 1.25em;
            }
        }
    }

    .item__condition {
        color: #d1e6dd;
        font-size: 0.75em;
        margin: 0 0.25em;
        position: absolute;
        right: 3px;
        top: 3px;
    }

    .item__amount {
        bottom: 5px;
        color: #fff;
        font-size: 0.75em;
        position: absolute;
        right: 7px;
    }
`;
