import styled from 'styled-components';

interface StyledFilterProps {
    $alwaysShow?: boolean;
}

export default styled.div<StyledFilterProps>`
    ${({ $alwaysShow }) => ($alwaysShow ? '' : 'width: 12.5rem;')}

    ul {
        background-color: #27292d;
        margin: 0;
        padding: 1em 0;
    }

    li {
        height: 2em;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }

    label {
        align-items: center;
        color: #d1e6dd;
        cursor: pointer;
        display: flex;
        flex-direction: revert;
        justify-content: space-between;
        padding: 0.15rem 0.5rem 0.15rem 1.75rem;

        img {
            height: 1em;
            opacity: 0;
        }

        &::before {
            content: '';
            background: #dcad54;
            border-radius: 50%;
            bottom: 0;
            display: block;
            height: 0.5em;
            left: 0.5em;
            margin: auto;
            position: absolute;
            top: 0;
            width: 0.5em;
        }
    }

    input {
        left: -1em;
        opacity: 0;
        position: absolute;
        top: -1em;

        &:checked + label {
            background-color: #342b20;
            position: relative;

            img {
                opacity: 1;
            }
        }
    }

    .filter__top {
        display: flex;

        h3 {
            color: #e2faf0;
            font-size: 1.25em;
            margin: 0;
            padding: 0.25em;
            text-align: center;
            width: 50%;
        }
    }

    .filter__trigger {
        background-color: #1d2227;
        border: 0;
        color: #e2faf0;
        font-family: 'Share Tech', sans-serif;
        font-size: 1rem;
        padding: 0.5em;
        text-transform: uppercase;
        width: 7rem;

        &:focus {
            outline: 2px dotted #f3d98f;
        }

        &:focus:not(:focus-visible) {
            outline: none;
        }
    }

    h4 {
        color: #e2faf0;
        font-size: 1.25em;
        margin: 0.5em 1.25em;
    }

    .filter__main {
        ${({ $alwaysShow }) => ($alwaysShow ? '' : 'height: 42em;')}
        overflow: auto;
        z-index: 2;

        ${({ $alwaysShow }) =>
            $alwaysShow
                ? ''
                : `
                    position: absolute;
                    width: 11em;
                `}
    }

    .MuiAccordion-root {
        background-color: #1d2227;
    }

    .MuiAccordionSummary-root.Mui-focusVisible {
        border: 1px dashed #f3d98f;
    }

    .MuiAccordionSummary-content {
        display: flex;
        justify-content: space-between;
        margin: 0;

        h4 {
            margin: 0;
        }

        img {
            width: 1em;
        }

        &.Mui-expanded img {
            transform: scale(1, -1);
        }
    }

    .MuiAccordionDetails-root {
        padding: 0;
    }
`;
